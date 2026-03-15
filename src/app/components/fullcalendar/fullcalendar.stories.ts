import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CalendarEvent, FullcalendarComponent } from './fullcalendar';

// Wrapper component that includes FullCalendar
@Component({
  selector: 'app-fullcalendar-demo',
  imports: [FullcalendarComponent],
  template: `
    <app-fullcalendar
      [events]="events"
      [initialDate]="initialDate"
      [initialView]="'timeGridWeek'"
      [height]="'600px'"
      (eventCreated)="onEventCreated($event)"
      (eventUpdated)="onEventUpdated($event)"
      (eventDeleted)="onEventDeleted($event)"
      (eventClicked)="onEventClicked($event)"
    />

    @if (lastAction) {
      <div class="mt-4 p-4 bg-gray-100 rounded"><strong>Last Action:</strong> {{ lastAction }}</div>
    }
  `,
  styles: [
    `
      .calendar-demo {
        padding: 1rem;
      }
    `,
  ],
})
class FullcalendarDemoComponent {
  events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Meeting',
      start: '2024-10-07T09:00:00',
      end: '2024-10-07T13:00:00',
    },
    {
      id: '2',
      title: 'Project Review',
      start: '2024-10-08T10:00:00',
      end: '2024-10-08T12:00:00',
    },
    {
      id: '3',
      title: 'Client Presentation',
      start: '2024-10-09T14:00:00',
      end: '2024-10-09T16:00:00',
    },
    {
      id: '4',
      title: 'Lunch Meeting',
      start: '2024-10-10T11:00:00',
      end: '2024-10-10T12:30:00',
    },
  ];

  initialDate = new Date(2024, 9, 7, 10); // October 7, 2024
  lastAction = '';

  onEventCreated(event: CalendarEvent): void {
    this.lastAction = `Event created: ${event.title}`;
    console.log('Event created:', event);
  }

  onEventUpdated(event: CalendarEvent): void {
    this.lastAction = `Event updated: ${event.title}`;
    console.log('Event updated:', event);
  }

  onEventDeleted(event: { id: number | string }): void {
    this.lastAction = `Event deleted: ${event.id}`;
    console.log('Event deleted:', event);
  }

  onEventClicked(event: CalendarEvent): void {
    this.lastAction = `Event clicked: ${event.title}`;
    console.log('Event clicked:', event);
  }
}

const meta: Meta<FullcalendarDemoComponent> = {
  title: 'FullCalendar',
  component: FullcalendarDemoComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FullcalendarComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A minimal FullCalendar wrapper component with Angular signals and TypeScript support.',
      },
    },
  },
  argTypes: {
    events: {
      description: 'Array of calendar events to display',
      control: 'object',
    },
    initialDate: {
      description: 'Initial date to display in the calendar',
      control: 'date',
    },
  },
};

export default meta;
type Story = StoryObj<FullcalendarDemoComponent>;

/**
 * FullCalendar with time grid view
 */
export const Playground: Story = {};
