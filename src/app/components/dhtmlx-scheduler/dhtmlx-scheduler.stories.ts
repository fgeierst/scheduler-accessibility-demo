import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
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
export const Playground: Story = {};
