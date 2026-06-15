import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { UIButton } from './button.js';
import './button.js';

type Story = StoryObj<UIButton>;

const meta: Meta<UIButton> = {
  title: 'Components/Button',
  component: 'ui-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    label: { control: 'text' },
  },
  render: (args) => html`
    <ui-button
      variant=${args.variant ?? 'primary'}
      size=${args.size ?? 'md'}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      label=${args.label ?? ''}
    >
      ${args.label || 'Button'}
    </ui-button>
  `,
};

export default meta;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', disabled: false, loading: false },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md' },
};

export const Outline: Story = {
  args: { variant: 'outline', size: 'md' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md' },
};

export const Danger: Story = {
  args: { variant: 'danger', size: 'md' },
};

export const Loading: Story = {
  args: { variant: 'primary', size: 'md', loading: true },
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', disabled: true },
};

export const WithPrefix: Story = {
  render: () => html`
    <ui-button variant="primary">
      <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path
          d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 1a6 6 0 100 12A6 6 0 008 2zm0 2.75a.75.75 0 01.75.75v3.5l2.25 1.25a.75.75 0 01-.75 1.3l-2.5-1.4a.75.75 0 01-.5-.7V6.5A.75.75 0 018 5.75z"
        />
      </svg>
      With Icon
    </ui-button>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;">
      <ui-button variant="primary">Primary</ui-button>
      <ui-button variant="secondary">Secondary</ui-button>
      <ui-button variant="outline">Outline</ui-button>
      <ui-button variant="ghost">Ghost</ui-button>
      <ui-button variant="danger">Danger</ui-button>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display:flex;gap:1rem;align-items:center;">
      <ui-button size="sm">Small</ui-button>
      <ui-button size="md">Medium</ui-button>
      <ui-button size="lg">Large</ui-button>
    </div>
  `,
};
