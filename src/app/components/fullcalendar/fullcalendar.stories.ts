import type { Meta, StoryObj } from '@storybook/angular';
import { getFullCalendarEvents, sampleCalendarInitialDate } from '../events';
import { FullcalendarComponent } from './fullcalendar';

const meta: Meta<FullcalendarComponent> = {
  title: 'Calendars/FullCalendar',
  component: FullcalendarComponent,
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
type Story = StoryObj<FullcalendarComponent>;

/**
 * FullCalendar with time grid view
 */
export const Playground: Story = {
  args: {
    events: getFullCalendarEvents(),
    initialDate: sampleCalendarInitialDate,
    initialView: 'timeGridWeek',
    height: '600px',
  },
};
