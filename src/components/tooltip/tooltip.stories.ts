import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { UITooltip } from './tooltip.js';
import type { TooltipPlacement } from './tooltip.js';
import './tooltip.js';
import '../button/button.js';

type Story = StoryObj<UITooltip>;

const meta: Meta<UITooltip> = {
  title: 'Components/Tooltip',
  component: 'ui-tooltip',
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus'],
    },
    content: { control: 'text' },
    delay: { control: 'number' },
    maxWidth: { control: 'text' },
  },
  decorators: [
    (story) => html`
      <div style="padding:4rem;display:flex;justify-content:center;">${story()}</div>
    `,
  ],
  render: (args) => html`
    <ui-tooltip
      content=${args.content ?? 'Tooltip content'}
      placement=${args.placement ?? 'top'}
      trigger=${args.trigger ?? 'hover'}
      delay=${args.delay ?? 0}
      max-width=${args.maxWidth ?? '200px'}
    >
      <ui-button variant="outline">Hover me</ui-button>
    </ui-tooltip>
  `,
};

export default meta;

export const Default: Story = {
  args: { content: 'This is a tooltip', placement: 'top', trigger: 'hover' },
};

export const Bottom: Story = {
  args: { content: 'Bottom tooltip', placement: 'bottom' },
};

export const Left: Story = {
  args: { content: 'Left tooltip', placement: 'left' },
};

export const Right: Story = {
  args: { content: 'Right tooltip', placement: 'right' },
};

export const ClickTrigger: Story = {
  args: { content: 'Click to toggle', trigger: 'click' },
};

export const FocusTrigger: Story = {
  args: { content: 'Focused!', trigger: 'focus' },
};

export const WithDelay: Story = {
  args: { content: 'Delayed tooltip', delay: 500 },
};

export const AllPlacements: Story = {
  render: () => {
    const placements: (TooltipPlacement | '')[] = [
      'top-start',
      'top',
      'top-end',
      'left',
      '',
      'right',
      'bottom-start',
      'bottom',
      'bottom-end',
    ];
    return html`
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;width:400px;">
        ${placements.map((p) =>
          p
            ? html`
                <ui-tooltip content=${p} placement=${p}>
                  <ui-button variant="outline" size="sm">${p}</ui-button>
                </ui-tooltip>
              `
            : html`
                <div></div>
              `,
        )}
      </div>
    `;
  },
};
