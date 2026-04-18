import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import './syncfusion-license';
import {
  ActionEventArgs,
  DayService,
  DragAndDropService,
  EventClickArgs,
  EventSettingsModel,
  MonthService,
  ResizeService,
  ScheduleModule,
  View,
  WeekService,
  WorkWeekService,
} from '@syncfusion/ej2-angular-schedule';

export interface SyncfusionEvent {
  Id: number | string;
  Subject: string;
  StartTime: Date | string;
  EndTime: Date | string;
  IsAllDay?: boolean;
  [key: string]: unknown;
}

@Component({
  selector: 'app-syncfusion-scheduler',
  imports: [ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService],
  template: `
    <div
      class="syncfusion-wrapper"
      role="application"
      aria-label="Syncfusion Scheduler"
      [style.width]="width()"
      [style.height]="height()"
    >
      <ejs-schedule
        [width]="'100%'"
        [height]="'100%'"
        [selectedDate]="selectedDate()"
        [currentView]="currentView()"
        [eventSettings]="eventSettings()"
        [allowKeyboardInteraction]="allowKeyboardInteraction()"
        [allowClipboard]="allowClipboard()"
        [showQuickInfo]="true"
        (actionComplete)="handleActionComplete($event)"
        (eventClick)="handleEventClick($event)"
      />
    </div>
  `,
  styles: [`
    .syncfusion-wrapper {
      padding: 1rem;
      background: #fff;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyncfusionSchedulerComponent {
  width = input('100%');
  height = input('600px');
  events = input<SyncfusionEvent[]>([]);
  selectedDate = input(new Date());
  currentView = input<View>('Week');
  allowKeyboardInteraction = input(true);
  allowClipboard = input(true);

  eventCreated = output<SyncfusionEvent>();
  eventUpdated = output<SyncfusionEvent>();
  eventDeleted = output<SyncfusionEvent>();
  eventClicked = output<SyncfusionEvent>();

  readonly eventSettings = computed<EventSettingsModel>(() => ({
    dataSource: this.events() as Record<string, unknown>[],
  }));

  handleActionComplete(args: ActionEventArgs): void {
    this.emitRecords(args.addedRecords, (event) => this.eventCreated.emit(event));
    this.emitRecords(args.changedRecords, (event) => this.eventUpdated.emit(event));
    this.emitRecords(args.deletedRecords, (event) => this.eventDeleted.emit(event));
  }

  handleEventClick(args: EventClickArgs): void {
    const [event] = this.normalizeRecords(args.event);
    if (event) {
      this.eventClicked.emit(event);
    }
  }

  private emitRecords(
    records: Record<string, unknown>[] | undefined,
    emit: (event: SyncfusionEvent) => void,
  ): void {
    for (const record of this.normalizeRecords(records)) {
      emit(record);
    }
  }

  private normalizeRecords(
    records: Record<string, unknown> | Record<string, unknown>[] | undefined,
  ): SyncfusionEvent[] {
    if (!records) {
      return [];
    }

    return (Array.isArray(records) ? records : [records]) as SyncfusionEvent[];
  }
}
