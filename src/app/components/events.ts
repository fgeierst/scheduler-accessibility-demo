import type { SchedulerEvent } from './dhtmlx-scheduler/dhtmlx-scheduler';
import type { CalendarEvent } from './fullcalendar/fullcalendar';
import type { SyncfusionEvent } from './syncfusion/syncfusion';

export interface SampleCalendarEvent {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

export const sampleCalendarInitialDate = new Date(2024, 9, 16, 10);

export const sampleCalendarEvents: readonly SampleCalendarEvent[] = [
  {
    id: '1',
    title: 'Walk with Dog',
    description: 'A full-day reminder to take the dog for a relaxed walk.',
    start: new Date(2024, 9, 17),
    end: new Date(2024, 9, 18),
    allDay: true,
  },
  {
    id: '2',
    title: 'Tee with Bee',
    description: 'Morning tea break with honey and a quick planning note.',
    start: new Date(2024, 9, 15, 8),
    end: new Date(2024, 9, 15, 8, 30),
  },
  {
    id: '3',
    title: 'Lunch with Llama',
    description: 'Midday lunch reservation with time to review the schedule.',
    start: new Date(2024, 9, 16, 12),
    end: new Date(2024, 9, 16, 13),
  },
];

export function getFullCalendarEvents(): CalendarEvent[] {
  return sampleCalendarEvents.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    start: copyDate(event.start),
    end: copyDate(event.end),
    allDay: event.allDay,
  }));
}

export function getDhtmlxSchedulerEvents(): SchedulerEvent[] {
  return sampleCalendarEvents.map((event) => ({
    id: event.id,
    text: event.title,
    description: event.description,
    start_date: formatDhtmlxDate(event.start),
    end_date: formatDhtmlxDate(event.end),
    all_day: event.allDay,
  }));
}

export function getSyncfusionEvents(): SyncfusionEvent[] {
  return sampleCalendarEvents.map((event) => ({
    Id: event.id,
    Subject: event.title,
    Description: event.description,
    StartTime: copyDate(event.start),
    EndTime: copyDate(event.end),
    IsAllDay: event.allDay,
  }));
}

function copyDate(date: Date): Date {
  return new Date(date.getTime());
}

function formatDhtmlxDate(date: Date): string {
  return (
    [date.getFullYear(), padDatePart(date.getMonth() + 1), padDatePart(date.getDate())].join('-') +
    ` ${padDatePart(date.getHours())}:${padDatePart(date.getMinutes())}`
  );
}

function padDatePart(value: number): string {
  return value.toString().padStart(2, '0');
}
