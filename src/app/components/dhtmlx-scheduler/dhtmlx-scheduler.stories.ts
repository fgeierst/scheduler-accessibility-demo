import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DhtmlxSchedulerComponent, SchedulerEvent } from './dhtmlx-scheduler';
import { KeyboardLegendComponent } from './keyboard-legend/keyboard-legend';

// Wrapper component that includes scheduler with inline keyboard legend
@Component({
  selector: 'app-dhtmlx-scheduler-demo',
  imports: [DhtmlxSchedulerComponent, KeyboardLegendComponent],
  template: `
    <app-keyboard-legend legendId="dhtmlx-scheduler-legend" variant="inline" />

    <app-dhtmlx-scheduler
      [events]="events"
      [initialDate]="initialDate"
      [initialMode]="'week'"
      [height]="'600px'"
      [keyboardLegendId]="'dhtmlx-scheduler-legend'"
    />
  `,
})
class DhtmlxSchedulerDemoComponent {
  events: SchedulerEvent[] = [
    {
      id: 1,
      start_date: '2024-10-07 09:00',
      end_date: '2024-10-07 13:00',
      text: 'Team Meeting',
    },
    {
      id: 2,
      start_date: '2024-10-08 10:00',
      end_date: '2024-10-08 12:00',
      text: 'Project Review',
    },
    {
      id: 3,
      start_date: '2024-10-09 14:00',
      end_date: '2024-10-09 16:00',
      text: 'Client Presentation',
    },
    {
      id: 4,
      start_date: '2024-10-10 11:00',
      end_date: '2024-10-10 12:30',
      text: 'Lunch Meeting',
    },
  ];

  initialDate = new Date(2024, 9, 7, 10); // October 7, 2024
}

const meta: Meta<DhtmlxSchedulerDemoComponent> = {
  title: 'DHTMLX Scheduler',
  component: DhtmlxSchedulerDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [DhtmlxSchedulerComponent, KeyboardLegendComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<DhtmlxSchedulerDemoComponent>;

/**
 * DHTMLX Scheduler with inline keyboard legend
 */
export const Playground: Story = {};
