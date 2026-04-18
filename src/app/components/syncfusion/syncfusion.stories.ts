import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { getSyncfusionEvents, sampleCalendarInitialDate } from '../events';
import { SyncfusionEvent, SyncfusionSchedulerComponent } from './syncfusion';

const events: SyncfusionEvent[] = getSyncfusionEvents();

const eventClicked = fn<(event: SyncfusionEvent) => void>();

const meta: Meta<SyncfusionSchedulerComponent> = {
  title: 'Calendars/Syncfusion Scheduler',
  component: SyncfusionSchedulerComponent,
};

export default meta;
type Story = StoryObj<SyncfusionSchedulerComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: {
      ...args,
      onEventClicked: eventClicked,
    },
    moduleMetadata: {
      imports: [SyncfusionSchedulerComponent],
    },
    template: `
      <app-syncfusion-scheduler
        [events]="events"
        [selectedDate]="selectedDate"
        [currentView]="currentView"
        [height]="height"
        (eventClicked)="onEventClicked($event)"
      />
    `,
  }),
  args: {
    events,
    selectedDate: sampleCalendarInitialDate,
    currentView: 'Week',
    height: '600px',
  },
  play: async ({ canvasElement }) => {
    eventClicked.mockClear();
    const canvas = within(canvasElement);
    const application = await canvas.findByRole('application', { name: 'Syncfusion Scheduler' });
    const previousButton = await canvas.findByRole('button', { name: 'Previous' });
    const nextButton = await canvas.findByRole('button', { name: 'Next' });
    const weekButton = await canvas.findByRole('button', { name: 'Week' });
    const lunchWithLlama = await canvas.findByRole('button', { name: /Lunch with Llama/ });
    const initialRange = await canvas.findByText(/October 13 - 19, 2024/i);

    await expect(application).toBeVisible();
    await expect(initialRange).toBeVisible();
    await expect(previousButton).toBeVisible();
    await expect(nextButton).toBeVisible();
    await expect(weekButton).toBeVisible();
    await expect(lunchWithLlama).toBeVisible();

    await userEvent.click(lunchWithLlama);
    await waitFor(() => {
      expect(eventClicked).toHaveBeenCalledWith(
        expect.objectContaining({ Subject: 'Lunch with Llama' }),
      );
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
