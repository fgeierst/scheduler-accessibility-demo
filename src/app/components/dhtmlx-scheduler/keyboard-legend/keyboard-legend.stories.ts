import type { Meta, StoryObj } from '@storybook/angular';
import { KeyboardLegendComponent } from './keyboard-legend';

const meta: Meta<KeyboardLegendComponent> = {
  title: 'DHTMLX Scheduler/Legend',
  component: KeyboardLegendComponent,
  tags: ['autodocs'],
  argTypes: {
    legendId: {
      control: 'text',
      description: 'ID for the legend element to be referenced by aria-describedby',
    },
    variant: {
      control: 'radio',
      options: ['inline', 'full'],
      description: 'Display variant: inline (compact with details) or full (expanded)',
    },
  },
};

export default meta;
type Story = StoryObj<KeyboardLegendComponent>;

/**
 * Inline compact variant with expandable details section.
 * Shows 1-2 lines of essential shortcuts inline, with full list behind a details/summary element.
 */
export const Inline: Story = {
  args: {
    legendId: 'keyboard-legend-inline',
    variant: 'inline',
  },
};

/**
 * Full expanded legend showing all shortcuts at once (legacy).
 */
export const Full: Story = {
  args: {
    legendId: 'keyboard-legend-full',
    variant: 'full',
  },
};
