import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { UIInput } from './input.js';
import './input.js';

type Story = StoryObj<UIInput>;

const meta: Meta<UIInput> = {
  title: 'Components/Input',
  component: 'ui-input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    success: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
  },
  render: (args) => html`
    <ui-input
      type=${args.type ?? 'text'}
      size=${args.size ?? 'md'}
      label=${args.label ?? ''}
      placeholder=${args.placeholder ?? ''}
      helper-text=${args.helperText ?? ''}
      error-message=${args.errorMessage ?? ''}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      ?success=${args.success}
      ?required=${args.required}
      style="width: 320px"
    ></ui-input>
  `,
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'Enter your email',
    type: 'email',
    helperText: "We'll never share your email.",
  },
};

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: true,
    errorMessage: 'Username must be at least 3 characters.',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    success: true,
    helperText: 'Username is available!',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Required field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    helperText: 'Minimum 8 characters.',
  },
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:1rem;width:320px;">
      <ui-input size="sm" label="Small" placeholder="Small input"></ui-input>
      <ui-input size="md" label="Medium" placeholder="Medium input"></ui-input>
      <ui-input size="lg" label="Large" placeholder="Large input"></ui-input>
    </div>
  `,
};
