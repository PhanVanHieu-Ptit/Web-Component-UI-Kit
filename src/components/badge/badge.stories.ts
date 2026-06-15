import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { UIBadge } from './badge.js';
import './badge.js';

type Story = StoryObj<UIBadge>;

const meta: Meta<UIBadge> = {
  title: 'Components/Badge',
  component: 'ui-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['rounded', 'pill'] },
  },
  render: (args) => html`
    <ui-badge
      variant=${args.variant ?? 'default'}
      size=${args.size ?? 'md'}
      shape=${args.shape ?? 'rounded'}
    >
      Badge
    </ui-badge>
  `,
};

export default meta;

export const Default: Story = {
  args: { variant: 'default', size: 'md', shape: 'rounded' },
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;">
      <ui-badge variant="default">Default</ui-badge>
      <ui-badge variant="primary">Primary</ui-badge>
      <ui-badge variant="success">Success</ui-badge>
      <ui-badge variant="warning">Warning</ui-badge>
      <ui-badge variant="danger">Danger</ui-badge>
      <ui-badge variant="info">Info</ui-badge>
    </div>
  `,
};

export const Pill: Story = {
  render: () => html`
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;">
      <ui-badge variant="primary" shape="pill">Primary</ui-badge>
      <ui-badge variant="success" shape="pill">Success</ui-badge>
      <ui-badge variant="danger" shape="pill">Danger</ui-badge>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display:flex;gap:0.5rem;align-items:center;">
      <ui-badge size="sm">Small</ui-badge>
      <ui-badge size="md">Medium</ui-badge>
      <ui-badge size="lg">Large</ui-badge>
    </div>
  `,
};

export const WithIcon: Story = {
  render: () => html`
    <ui-badge variant="success">
      <svg slot="icon" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
        <path
          d="M5 0a5 5 0 110 10A5 5 0 015 0zm2.28 3.22a.75.75 0 00-1.06 0L4 5.44l-.72-.72a.75.75 0 00-1.06 1.06l1.25 1.25a.75.75 0 001.06 0l2.75-2.75a.75.75 0 000-1.06z"
        />
      </svg>
      Verified
    </ui-badge>
  `,
};
