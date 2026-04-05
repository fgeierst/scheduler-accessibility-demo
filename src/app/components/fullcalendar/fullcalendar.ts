import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, DateSelectArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export interface CalendarEvent {
  id: string | number;
  title: string;
  start: string | Date;
  end?: string | Date;
  allDay?: boolean;
  [key: string]: unknown;
}

@Component({
  selector: 'app-fullcalendar',
  imports: [FullCalendarModule],
  template: `
    <div
      class="fullcalendar-wrapper"
      role="application"
      aria-label="FullCalendar"
      [style.width]="width()"
      [style.height]="height()"
    >
      <full-calendar [options]="calendarOptions()" />
    </div>
  `,
  styles: [`
    .fullcalendar-wrapper {
      padding: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullcalendarComponent {
  /** Width of the calendar */
  width = input<string>('100%');

  /** Height of the calendar */
  height = input<string>('600px');

  /** Events to display in the calendar */
  events = input<CalendarEvent[]>([]);

  /** Initial date to display */
  initialDate = input<Date>(new Date());

  /** Initial view mode */
  initialView = input<string>('timeGridWeek');

  /** Event when a new event is created */
  eventCreated = output<CalendarEvent>();

  /** Event when an event is updated */
  eventUpdated = output<CalendarEvent>();

  /** Event when an event is deleted */
  eventDeleted = output<{ id: number | string }>();

  /** Event when an event is clicked */
  eventClicked = output<CalendarEvent>();

  /** Calendar options signal */
  calendarOptions = signal<CalendarOptions>({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    initialDate: new Date(),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    events: [],
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventChange: this.handleEventChange.bind(this),
  });

  constructor() {
    // Watch for input changes and update calendar options
    effect(() => {
      const events = this.events();
      const initialView = this.initialView();
      const initialDate = this.initialDate();

      this.calendarOptions.update(options => ({
        ...options,
        events: events as EventInput[],
        initialView,
        initialDate,
      }));
    });
  }

  private handleDateSelect(selectInfo: DateSelectArg): void {
    const title = prompt('Please enter a title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const eventId = Date.now().toString();
      const newEvent: EventInput = {
        id: eventId,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      calendarApi.addEvent(newEvent);
      
      this.eventCreated.emit({
        id: eventId,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  private handleEventClick(clickInfo: EventClickArg): void {
    const event = clickInfo.event;
    
    this.eventClicked.emit({
      id: event.id,
      title: event.title,
      start: event.start || new Date(),
      end: event.end || undefined,
      allDay: event.allDay,
    });

    if (confirm(`Are you sure you want to delete the event '${event.title}'?`)) {
      event.remove();
      this.eventDeleted.emit({ id: event.id });
    }
  }

  private handleEventChange(changeInfo: any): void {
    const event = changeInfo.event;
    
    this.eventUpdated.emit({
      id: event.id,
      title: event.title,
      start: event.start || new Date(),
      end: event.end || undefined,
      allDay: event.allDay,
    });
  }
}
