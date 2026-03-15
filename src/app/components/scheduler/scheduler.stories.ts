import type { Meta, StoryObj } from '@storybook/angular';
import { expect, within } from 'storybook/test';
import { SchedulerComponent, SchedulerEvent } from './scheduler.component';

const meta: Meta<SchedulerComponent> = {
  title: 'Components/Scheduler',
  component: SchedulerComponent,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: 'Width of the scheduler container',
    },
    height: {
      control: 'text',
      description: 'Height of the scheduler container',
    },
    initialMode: {
      control: 'select',
      options: ['day', 'week', 'month'],
      description: 'Initial view mode of the scheduler',
    },
    initialDate: {
      control: 'date',
      description: 'Initial date to display',
    },
    dateFormat: {
      control: 'text',
      description: 'Date format string',
    },
    events: {
      control: 'object',
      description: 'Array of events to display',
    },
    eventCreated: {
      action: 'eventCreated',
      description: 'Emitted when a new event is created',
    },
    eventUpdated: {
      action: 'eventUpdated',
      description: 'Emitted when an event is updated',
    },
    eventDeleted: {
      action: 'eventDeleted',
      description: 'Emitted when an event is deleted',
    },
  },
};

export default meta;
type Story = StoryObj<SchedulerComponent>;

// Sample events for demonstration
const sampleEvents: SchedulerEvent[] = [
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

/**
 * Default scheduler with sample events
 */
export const Default: Story = {
  args: {
    width: '100%',
    height: '600px',
    initialDate: new Date(2024, 9, 7), // October 7, 2024
    initialMode: 'week',
    dateFormat: '%Y-%m-%d %H:%i',
    events: sampleEvents,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait a bit for scheduler to initialize
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check that scheduler container exists
    const schedulerContainer = canvasElement.querySelector('.dhx_cal_container');
    await expect(schedulerContainer).toBeInTheDocument();
    
    // Check that events are rendered
    const events = canvasElement.querySelectorAll('.dhx_cal_event');
    await expect(events.length).toBeGreaterThan(0);
    await expect(events.length).toBe(4);
  },
};

/**
 * Empty scheduler with no events
 */
export const Empty: Story = {
  args: {
    width: '100%',
    height: '600px',
    initialDate: new Date(2024, 9, 7),
    initialMode: 'week',
    dateFormat: '%Y-%m-%d %H:%i',
    events: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for scheduler to initialize
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check that scheduler container exists
    const schedulerContainer = canvasElement.querySelector('.dhx_cal_container');
    await expect(schedulerContainer).toBeInTheDocument();
    
    // Check that no events are rendered
    const events = canvasElement.querySelectorAll('.dhx_cal_event');
    await expect(events.length).toBe(0);
  },
};

/**
 * Day view mode
 */
export const DayView: Story = {
  args: {
    width: '100%',
    height: '600px',
    initialDate: new Date(2024, 9, 7),
    initialMode: 'day',
    dateFormat: '%Y-%m-%d %H:%i',
    events: sampleEvents,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for scheduler to initialize
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check that scheduler container exists
    const schedulerContainer = canvasElement.querySelector('.dhx_cal_container');
    await expect(schedulerContainer).toBeInTheDocument();
    
    // Check that events are rendered
    const events = canvasElement.querySelectorAll('.dhx_cal_event');
    await expect(events.length).toBeGreaterThan(0);
    
    // In day view for Oct 7, should show 1 event (Team Meeting)
    await expect(events.length).toBe(1);
  },
};

/**
 * Month view mode
 */
export const MonthView: Story = {
  args: {
    width: '100%',
    height: '600px',
    initialDate: new Date(2024, 9, 7),
    initialMode: 'month',
    dateFormat: '%Y-%m-%d %H:%i',
    events: sampleEvents,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for scheduler to initialize
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check that scheduler container exists
    const schedulerContainer = canvasElement.querySelector('.dhx_cal_container');
    await expect(schedulerContainer).toBeInTheDocument();
    
    // Check that events are rendered
    const events = canvasElement.querySelectorAll('.dhx_cal_event');
    await expect(events.length).toBeGreaterThan(0);
    await expect(events.length).toBe(4);
  },
};

/**
 * Scheduler with many events
 */
export const ManyEvents: Story = {
  args: {
    width: '100%',
    height: '600px',
    initialDate: new Date(2024, 9, 7),
    initialMode: 'week',
    dateFormat: '%Y-%m-%d %H:%i',
    events: [
      ...sampleEvents,
      {
        id: 5,
        start_date: '2024-10-07 15:00',
        end_date: '2024-10-07 16:30',
        text: 'Design Review',
      },
      {
        id: 6,
        start_date: '2024-10-08 08:00',
        end_date: '2024-10-08 09:00',
        text: 'Stand-up Meeting',
      },
      {
        id: 7,
        start_date: '2024-10-09 09:00',
        end_date: '2024-10-09 11:00',
        text: 'Code Review',
      },
      {
        id: 8,
        start_date: '2024-10-10 14:00',
        end_date: '2024-10-10 17:00',
        text: 'Workshop',
      },
      {
        id: 9,
        start_date: '2024-10-11 10:00',
        end_date: '2024-10-11 11:00',
        text: 'Sprint Planning',
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for scheduler to initialize
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check that scheduler container exists
    const schedulerContainer = canvasElement.querySelector('.dhx_cal_container');
    await expect(schedulerContainer).toBeInTheDocument();
    
    // Check that all 9 events are rendered
    const events = canvasElement.querySelectorAll('.dhx_cal_event');
    await expect(events.length).toBeGreaterThan(0);
    await expect(events.length).toBe(9);
  },
};

/**
 * Custom sized scheduler
 */
export const CustomSize: Story = {
  args: {
    width: '800px',
    height: '400px',
    initialDate: new Date(2024, 9, 7),
    initialMode: 'week',
    dateFormat: '%Y-%m-%d %H:%i',
    events: sampleEvents,
  },
};
