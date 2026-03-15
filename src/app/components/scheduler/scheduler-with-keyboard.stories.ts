import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { SchedulerComponent, SchedulerEvent } from './scheduler.component';
import { KeyboardLegendComponent } from '../keyboard-legend/keyboard-legend.component';

// Wrapper component that includes both scheduler and keyboard legend
@Component({
  selector: 'app-scheduler-with-keyboard',
  imports: [SchedulerComponent, KeyboardLegendComponent],
  template: `
    <div style="padding: 1rem;">
      <h1 style="margin: 0 0 0.5rem 0; font-size: 2rem;">Accessible Event Scheduler</h1>
      <p style="margin: 0 0 1.5rem 0; color: #6c757d;">
        Use keyboard navigation to interact with the scheduler. Press Tab to focus, then use arrow keys to navigate.
      </p>
      
      <app-keyboard-legend 
        legendId="scheduler-demo-legend"
        variant="inline"
      />
      
      <app-scheduler
        [events]="events"
        [initialDate]="initialDate"
        [initialMode]="'week'"
        [height]="'600px'"
        [keyboardLegendId]="'scheduler-demo-legend'"
      />
    </div>
  `,
})
class SchedulerWithKeyboardComponent {
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
  
  initialDate = new Date(2024, 9, 7); // October 7, 2024
}

const meta: Meta<SchedulerWithKeyboardComponent> = {
  title: 'Components/Scheduler/With Keyboard Navigation',
  component: SchedulerWithKeyboardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SchedulerComponent, KeyboardLegendComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# Scheduler with Keyboard Navigation

This demo shows the scheduler with full keyboard navigation support and a legend of available shortcuts.

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support via the \`key_nav\` plugin
- **ARIA Attributes**: The scheduler has \`role="application"\` and is linked to the keyboard legend via \`aria-describedby\`
- **Focus Management**: Proper focus styles and keyboard focus behavior
- **Screen Reader Support**: Descriptive labels and ARIA attributes for assistive technologies

## Key Features

1. **Tab Navigation**: Press Tab to focus the scheduler, Tab again to leave
2. **Arrow Keys**: Navigate time slots and dates
3. **Event Manipulation**: Copy, cut, paste events with Ctrl+C/X/V
4. **Quick Actions**: Press Enter to create events, Home to go to today
5. **Custom Shortcuts**: Shift+W to show event quick info

## Testing Keyboard Navigation

1. Press **Tab** to focus the scheduler
2. Use **Arrow Keys** to navigate between time slots
3. Press **Enter** to create a new event
4. Select an event and press **E** to select next event
5. Press **Ctrl+C** to copy, **Ctrl+V** to paste
6. Press **Shift+W** while on an event to show quick info
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<SchedulerWithKeyboardComponent>;

/**
 * Complete example with scheduler and keyboard legend
 */
export const FullDemo: Story = {};
