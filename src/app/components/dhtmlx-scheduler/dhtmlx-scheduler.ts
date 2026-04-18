import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  OnDestroy,
  OnInit,
  output,
  viewChild,
} from '@angular/core';
import { scheduler, SchedulerStatic } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';

export interface SchedulerEvent {
  id: number | string;
  start_date: string | Date;
  end_date: string | Date;
  text: string;
  [key: string]: unknown;
}

export interface SchedulerConfig {
  date?: Date;
  mode?: string;
  dateFormat?: string;
}

@Component({
  selector: 'app-dhtmlx-scheduler',
  template: `
    <div
      #schedulerContainer
      class="dhx_cal_container"
      role="application"
      aria-label="DHTMLX Scheduler"
      [style.width]="width()"
      [style.height]="height()"
    >
      <div class="dhx_cal_navline">
        <div class="dhx_cal_prev_button"></div>
        <div class="dhx_cal_next_button"></div>
        <div class="dhx_cal_today_button"></div>
        <div class="dhx_cal_date"></div>
        <div class="dhx_cal_tab" data-tab="day"></div>
        <div class="dhx_cal_tab" data-tab="week"></div>
        <div class="dhx_cal_tab" data-tab="month"></div>
      </div>
      <div class="dhx_cal_header"></div>
      <div class="dhx_cal_data"></div>
    </div>
  `,
  styleUrls: ['./dhtmlx-scheduler.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DhtmlxSchedulerComponent implements OnInit, OnDestroy {
  /** Reference to the scheduler container element */
  private schedulerContainer = viewChild.required<ElementRef>('schedulerContainer');

  /** Scheduler instance */
  private schedulerInstance?: SchedulerStatic;

  /** Flag to track if scheduler is initialized */
  private isInitialized = false;

  /** Scheduler event handler ids for cleanup */
  private schedulerEventIds: string[] = [];

  /** Container keydown handler cleanup */
  private removeKeydownListener?: () => void;

  /** Width of the scheduler */
  width = input<string>('100%');

  /** Height of the scheduler */
  height = input<string>('600px');

  /** Events to display in the scheduler */
  events = input<SchedulerEvent[]>([]);

  /** Initial date to display */
  initialDate = input<Date>(new Date());

  /** Initial view mode */
  initialMode = input<string>('week');

  /** Date format */
  dateFormat = input<string>('%Y-%m-%d %H:%i');

  /** Event when a new event is created */
  eventCreated = output<SchedulerEvent>();

  /** Event when an event is updated */
  eventUpdated = output<SchedulerEvent>();

  /** Event when an event is deleted */
  eventDeleted = output<{ id: number | string }>();

  constructor() {
    // Watch for events changes and update scheduler
    effect(() => {
      this.syncEvents();
    });
  }

  ngOnInit(): void {
    const container = this.schedulerContainer().nativeElement as HTMLElement;
    const schedulerInstance = scheduler;

    this.schedulerInstance = schedulerInstance;

    // Enable keyboard navigation plugin
    schedulerInstance.plugins({
      key_nav: true,
    });

    // Configure scheduler
    schedulerInstance.config.date_format = this.dateFormat();
    schedulerInstance.config.header = ['day', 'week', 'month', 'date', 'prev', 'today', 'next'];

    // Initialize scheduler
    schedulerInstance.init(container, this.initialDate(), this.initialMode());

    // Setup accessibility attributes for the data area
    this.setupDataAreaAccessibility();

    // Set up event handlers
    this.setupEventHandlers(schedulerInstance);

    // Set up custom keyboard shortcuts
    this.setupMacOSAltNumberShortcuts();

    this.isInitialized = true;
    this.syncEvents();
  }

  private setupDataAreaAccessibility(): void {
    const container = this.schedulerContainer().nativeElement;
    const dataArea = container.querySelector('.dhx_cal_data') as HTMLElement;

    if (dataArea) {
      // Make the data area focusable
      dataArea.setAttribute('tabindex', '-1');
      // Add aria-label for screen readers
      dataArea.setAttribute('aria-label', 'Calendar grid');
    }
  }

  ngOnDestroy(): void {
    this.isInitialized = false;
    this.removeKeydownListener?.();
    this.removeKeydownListener = undefined;

    if (this.schedulerInstance) {
      for (const eventId of this.schedulerEventIds) {
        this.schedulerInstance.detachEvent(eventId);
      }
      this.schedulerEventIds = [];
      this.schedulerInstance.clearAll();
      this.schedulerInstance.destructor();
      this.schedulerInstance = undefined;
    }
  }

  private syncEvents(): void {
    const schedulerInstance = this.schedulerInstance;

    if (!this.isInitialized || !schedulerInstance) {
      return;
    }

    const events = this.events();

    schedulerInstance.clearAll();
    if (events.length > 0) {
      schedulerInstance.parse(events);
    }
  }

  private setupEventHandlers(schedulerInstance: SchedulerStatic): void {
    // Handle event creation
    this.schedulerEventIds = [
      schedulerInstance.attachEvent('onEventAdded', (id) => {
        const event = schedulerInstance.getEvent(id);
        if (event) {
          this.eventCreated.emit({
            id: event.id,
            start_date: event.start_date,
            end_date: event.end_date,
            text: event.text,
          });
        }
        return true;
      }),

      // Handle event update
      schedulerInstance.attachEvent('onEventChanged', (id) => {
        const event = schedulerInstance.getEvent(id);
        if (event) {
          this.eventUpdated.emit({
            id: event.id,
            start_date: event.start_date,
            end_date: event.end_date,
            text: event.text,
          });
        }
        return true;
      }),

      // Handle event deletion
      schedulerInstance.attachEvent('onEventDeleted', (id) => {
        this.eventDeleted.emit({ id });
        return true;
      }),

      // Handle event activation
      schedulerInstance.attachEvent('onClick', (id) => {
        schedulerInstance.showLightbox(id);
        return false;
      }),

      // Handle view change to restore focus
      schedulerInstance.attachEvent('onViewChange', () => {
        // Restore focus to the data area after view change
        // Use setTimeout to ensure DOM has been updated
        setTimeout(() => {
          this.restoreFocusToDataArea();
        }, 0);
        return true;
      }),
    ];
  }

  private restoreFocusToDataArea(): void {
    const container = this.schedulerContainer().nativeElement;
    const dataArea = container.querySelector('.dhx_cal_data') as HTMLElement;

    if (dataArea) {
      // Make the data area focusable if it isn't already
      if (!dataArea.hasAttribute('tabindex')) {
        dataArea.setAttribute('tabindex', '-1');
      }

      // Focus the data area
      dataArea.focus();
    }
  }

  private setupMacOSAltNumberShortcuts(): void {
    // Fix Alt+number shortcuts for macOS
    // On macOS, Alt+number produces special characters, so we need to handle the actual key codes
    const container = this.schedulerContainer().nativeElement;

    // Add keydown listener to handle Alt+number on macOS
    const handleKeydown = (e: KeyboardEvent) => {
      // Check if Alt/Option key is pressed
      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        // Map of keyCodes for number keys (1-9)
        const numberKey = e.code.match(/^(Digit|Numpad)([1-9])$/);

        if (numberKey) {
          const num = parseInt(numberKey[2], 10);
          const tabs = container.querySelectorAll('.dhx_cal_navline .dhx_cal_tab');

          if (tabs[num - 1]) {
            e.preventDefault();
            (tabs[num - 1] as HTMLElement).click();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeydown);
    this.removeKeydownListener = () => {
      container.removeEventListener('keydown', handleKeydown);
    };
  }

  getSchedulerInstance(): SchedulerStatic | undefined {
    return this.schedulerInstance;
  }
}
