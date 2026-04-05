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
      const events = this.events();
      if (this.isInitialized && this.schedulerInstance) {
        this.schedulerInstance.clearAll();
        if (events && events.length > 0) {
          this.schedulerInstance.parse(events);
        }
      }
    });
  }

  ngOnInit(): void {
    const container = this.schedulerContainer().nativeElement;

    // Enable keyboard navigation plugin
    scheduler.plugins({
      key_nav: true,
    });

    // Configure scheduler
    scheduler.config.date_format = this.dateFormat();
    scheduler.config.header = ['day', 'week', 'month', 'date', 'prev', 'today', 'next'];

    // Initialize scheduler
    scheduler.init(container, this.initialDate(), this.initialMode());

    // Setup accessibility attributes for the data area
    this.setupDataAreaAccessibility();

    // Set up event handlers
    this.setupEventHandlers();

    // Set up custom keyboard shortcuts
    this.setupMacOSAltNumberShortcuts();

    // Set instance and mark as initialized
    this.schedulerInstance = scheduler;
    this.isInitialized = true;

    // Don't parse here - let the effect handle it
    // The effect will run after all inputs are set
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
    if (this.schedulerInstance) {
      // Clear events but don't destroy the scheduler instance
      // destructor() destroys the global instance which breaks reinit
      this.schedulerInstance.clearAll();
      // Detach event handlers to prevent memory leaks
      this.schedulerInstance['detachAllEvents']();
      this.schedulerInstance = undefined;
    }
  }

  private setupEventHandlers(): void {
    // Handle event creation
    scheduler.attachEvent('onEventAdded', (id) => {
      const event = scheduler.getEvent(id);
      if (event) {
        this.eventCreated.emit({
          id: event.id,
          start_date: event.start_date,
          end_date: event.end_date,
          text: event.text,
        });
      }
      return true;
    });

    // Handle event update
    scheduler.attachEvent('onEventChanged', (id) => {
      const event = scheduler.getEvent(id);
      if (event) {
        this.eventUpdated.emit({
          id: event.id,
          start_date: event.start_date,
          end_date: event.end_date,
          text: event.text,
        });
      }
      return true;
    });

    // Handle event deletion
    scheduler.attachEvent('onEventDeleted', (id) => {
      this.eventDeleted.emit({ id });
      return true;
    });

    // Handle view change to restore focus
    scheduler.attachEvent('onViewChange', (new_mode, new_date) => {
      // Restore focus to the data area after view change
      // Use setTimeout to ensure DOM has been updated
      setTimeout(() => {
        this.restoreFocusToDataArea();
      }, 0);
      return true;
    });
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
    container.addEventListener('keydown', (e: KeyboardEvent) => {
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
    });
  }

  getSchedulerInstance(): SchedulerStatic | undefined {
    return this.schedulerInstance;
  }
}
