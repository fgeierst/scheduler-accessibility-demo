import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { SyncfusionEvent, SyncfusionSchedulerComponent } from './syncfusion';

@Component({
  selector: 'app-syncfusion-scheduler-demo',
  imports: [SyncfusionSchedulerComponent],
  template: `
    <app-syncfusion-scheduler
      [events]="events"
      [selectedDate]="selectedDate"
      [currentView]="'Week'"
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
  styles: [`
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
  `],
})
class SyncfusionSchedulerDemoComponent {
  events: SyncfusionEvent[] = [
    {
      Id: '1',
      Subject: 'Team Meeting',
      StartTime: new Date(2024, 9, 14, 9, 0),
      EndTime: new Date(2024, 9, 14, 11, 0),
    },
    {
      Id: '2',
      Subject: 'Project Review',
      StartTime: new Date(2024, 9, 15, 10, 0),
      EndTime: new Date(2024, 9, 15, 12, 0),
    },
    {
      Id: '3',
      Subject: 'Client Presentation',
      StartTime: new Date(2024, 9, 16, 14, 0),
      EndTime: new Date(2024, 9, 16, 15, 30),
    },
    {
      Id: '4',
      Subject: 'Lunch Meeting',
      StartTime: new Date(2024, 9, 17, 12, 0),
      EndTime: new Date(2024, 9, 17, 13, 0),
    },
    {
      Id: '5',
      Subject: 'Launch Planning',
      StartTime: new Date(2024, 9, 18, 15, 0),
      EndTime: new Date(2024, 9, 18, 16, 30),
    },
    {
      Id: '6',
      Subject: 'Offsite Prep',
      StartTime: new Date(2024, 9, 18, 0, 0),
      EndTime: new Date(2024, 9, 18, 23, 59),
      IsAllDay: true,
    },
  ];

  selectedDate = new Date(2024, 9, 16, 10);
  lastAction = '';

  onEventCreated(event: SyncfusionEvent): void {
    this.lastAction = `Event created: ${event.Subject}`;
  }

  onEventUpdated(event: SyncfusionEvent): void {
    this.lastAction = `Event updated: ${event.Subject}`;
  }

  onEventDeleted(event: SyncfusionEvent): void {
    this.lastAction = `Event deleted: ${event.Subject}`;
  }

  onEventClicked(event: SyncfusionEvent): void {
    this.lastAction = `Event clicked: ${event.Subject}`;
  }
}

const meta: Meta<SyncfusionSchedulerDemoComponent> = {
  title: 'Calendars/Syncfusion Scheduler',
  component: SyncfusionSchedulerDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [SyncfusionSchedulerComponent],
    }),
  ],
  parameters: {
    a11y: {
      test: 'off',
    },
  },
};

export default meta;
type Story = StoryObj<SyncfusionSchedulerDemoComponent>;

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const application = await canvas.findByRole('application', { name: 'Syncfusion Scheduler' });
    const previousButton = await canvas.findByRole('button', { name: 'Previous' });
    const nextButton = await canvas.findByRole('button', { name: 'Next' });
    const weekButton = await canvas.findByRole('button', { name: 'Week' });
    const teamMeeting = await canvas.findByRole('button', { name: /Team Meeting/ });
    const initialRange = await canvas.findByText(/October 13 - 19, 2024/i);

    await expect(application).toBeVisible();
    await expect(initialRange).toBeVisible();
    await expect(previousButton).toBeVisible();
    await expect(nextButton).toBeVisible();
    await expect(weekButton).toBeVisible();
    await expect(teamMeeting).toBeVisible();

    await userEvent.click(teamMeeting);
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Last Action: Event clicked: Team Meeting');
    });

    nextButton.focus();
    await expect(nextButton).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(canvas.queryByText(/October 13 - 19, 2024/i)).toBeNull();
    });

    previousButton.focus();
    await expect(previousButton).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(canvas.getByText(/October 13 - 19, 2024/i)).toBeVisible();
    });
  },
};
