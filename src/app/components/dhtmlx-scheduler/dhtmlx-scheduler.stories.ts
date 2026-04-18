import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect, userEvent, waitFor } from 'storybook/test';
import { getDhtmlxSchedulerEvents, sampleCalendarInitialDate } from '../events';
import { DhtmlxSchedulerComponent, SchedulerEvent } from './dhtmlx-scheduler';

@Component({
  selector: 'app-dhtmlx-scheduler-demo',
  imports: [DhtmlxSchedulerComponent],
  template: `
    <app-dhtmlx-scheduler
      [events]="events"
      [initialDate]="initialDate"
      [initialMode]="'week'"
      [height]="'600px'"
      (eventCreated)="onEventCreated($event)"
      (eventUpdated)="onEventUpdated($event)"
      (eventDeleted)="onEventDeleted($event)"
    />

    @if (lastAction) {
      <div class="mt-4 p-4 bg-gray-100 rounded"><strong>Last Action:</strong> {{ lastAction }}</div>
    }
  `,
})
class DhtmlxSchedulerDemoComponent {
  events: SchedulerEvent[] = getDhtmlxSchedulerEvents();
  initialDate = sampleCalendarInitialDate;
  lastAction = '';

  onEventCreated(event: SchedulerEvent): void {
    this.lastAction = `Event created: ${event.text}`;
    console.log('Event created:', event);
  }

  onEventUpdated(event: SchedulerEvent): void {
    this.lastAction = `Event updated: ${event.text}`;
    console.log('Event updated:', event);
  }

  onEventDeleted(event: { id: number | string }): void {
    this.lastAction = `Event deleted: ${event.id}`;
    console.log('Event deleted:', event);
  }
}

const meta: Meta<DhtmlxSchedulerDemoComponent> = {
  title: 'Calendars/DHTMLX Scheduler',
  component: DhtmlxSchedulerDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [DhtmlxSchedulerComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<DhtmlxSchedulerDemoComponent>;

/**
 * DHTMLX Scheduler with week view demo
 */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const getElements = () => ({
      application: canvasElement.querySelector<HTMLElement>(
        '[role="application"][aria-label="DHTMLX Scheduler"]',
      ),
      calendarGrid: canvasElement.querySelector<HTMLElement>('[aria-label="Calendar grid"]'),
      monthTab: canvasElement.querySelector<HTMLElement>('.dhx_cal_navline [data-tab="month"]'),
      lunchWithLlama: canvasElement.querySelector<HTMLElement>('[aria-label="Lunch with Llama"]'),
    });

    await waitFor(
      () => {
        const { application, calendarGrid, monthTab, lunchWithLlama } = getElements();
        expect(application).not.toBeNull();
        expect(calendarGrid).not.toBeNull();
        expect(monthTab).not.toBeNull();
        expect(lunchWithLlama).not.toBeNull();
      },
      { timeout: 5000 },
    );

    const { application, calendarGrid, monthTab, lunchWithLlama } = getElements();

    if (!application || !calendarGrid || !monthTab || !lunchWithLlama) {
      throw new Error(
        'Expected the DHTMLX scheduler to render its application, grid, tab, and event',
      );
    }

    await expect(application).toBeVisible();
    await expect(calendarGrid).toBeVisible();
    await expect(lunchWithLlama).toBeVisible();
    await expect(monthTab).not.toBeNull();

    application.focus();
    await userEvent.keyboard('{Alt>}{3}{/Alt}');

    await waitFor(
      () => {
        const currentGrid = canvasElement.querySelector<HTMLElement>(
          '[aria-label="Calendar grid"]',
        );
        expect(currentGrid).not.toBeNull();
        expect(currentGrid).toHaveFocus();
      },
      { timeout: 5000 },
    );
  },
};
