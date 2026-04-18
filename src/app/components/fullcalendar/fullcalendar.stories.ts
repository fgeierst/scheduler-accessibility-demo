import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect, userEvent, waitFor } from 'storybook/test';
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
      <p class="visually-hidden" aria-live="polite">Last Action: {{ lastAction }}</p>
    }
  `,
  styles: [
    `
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `,
  ],
})
class FullcalendarDemoComponent {
  events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Meeting',
      start: '2024-10-14T09:00:00',
      end: '2024-10-14T11:00:00',
    },
    {
      id: '2',
      title: 'Project Review',
      start: '2024-10-15T10:00:00',
      end: '2024-10-15T12:00:00',
    },
    {
      id: '3',
      title: 'Client Presentation',
      start: '2024-10-16T14:00:00',
      end: '2024-10-16T15:30:00',
    },
    {
      id: '4',
      title: 'Lunch Meeting',
      start: '2024-10-17T12:00:00',
      end: '2024-10-17T13:00:00',
    },
    {
      id: '5',
      title: 'Launch Planning',
      start: '2024-10-18T15:00:00',
      end: '2024-10-18T16:30:00',
    },
    {
      id: '6',
      title: 'Offsite Prep',
      start: '2024-10-18',
      allDay: true,
    },
  ];

  initialDate = new Date(2024, 9, 16, 10); // October 16, 2024
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
  title: 'Calendars/FullCalendar',
  component: FullcalendarDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [FullcalendarComponent],
    }),
  ],
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
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(
        canvasElement.querySelector('[role="application"][aria-label="FullCalendar"]'),
      ).not.toBeNull();
    });

    const application = canvasElement.querySelector<HTMLElement>(
      '[role="application"][aria-label="FullCalendar"]',
    );
    const previousButton = canvasElement.querySelector<HTMLButtonElement>('.fc-prev-button');
    const nextButton = canvasElement.querySelector<HTMLButtonElement>('.fc-next-button');
    const title = canvasElement.querySelector<HTMLElement>('.fc-toolbar-title');
    const teamMeeting = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('.fc-timegrid-event .fc-event-title'),
    ).find((element) => element.textContent?.trim() === 'Team Meeting');
    const frameWindow = canvasElement.ownerDocument.defaultView;

    if (!application || !previousButton || !nextButton || !title || !teamMeeting) {
      throw new Error(
        'Expected FullCalendar to render its application root, navigation, title, and events',
      );
    }

    await expect(application).toBeVisible();
    await expect(previousButton).toBeVisible();
    await expect(nextButton).toBeVisible();
    expect(title.textContent).toMatch(/Oct 13.*19, 2024/);
    await expect(teamMeeting).toBeVisible();

    const originalConfirm = frameWindow?.confirm;
    if (frameWindow) {
      frameWindow.confirm = () => false;
    }

    try {
      await userEvent.click(teamMeeting);
      await waitFor(() => {
        expect(canvasElement.textContent).toContain('Last Action: Event clicked: Team Meeting');
      });

      nextButton.focus();
      await expect(nextButton).toHaveFocus();
      await userEvent.keyboard('{Enter}');

      await waitFor(() => {
        expect(title.textContent).not.toContain('Oct 13');
      });

      previousButton.focus();
      await expect(previousButton).toHaveFocus();
      await userEvent.keyboard('{Enter}');

      await waitFor(() => {
        expect(title.textContent).toContain('Oct 13');
      });
    } finally {
      if (frameWindow && originalConfirm) {
        frameWindow.confirm = originalConfirm;
      }
    }
  },
};
