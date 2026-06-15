import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { UIModal } from './modal.js';
import './modal.js';
import '../button/button.js';

type Story = StoryObj<UIModal>;

const meta: Meta<UIModal> = {
  title: 'Components/Modal',
  component: 'ui-modal',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnOverlay: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
};

export default meta;

export const Default: Story = {
  render: (args) => {
    const toggle = () => {
      const modal = document.querySelector<UIModal>('ui-modal');
      if (modal) modal.open = !modal.open;
    };
    return html`
      <ui-button variant="primary" @click=${toggle}>Open Modal</ui-button>
      <ui-modal
        ?open=${args.open ?? false}
        size=${args.size ?? 'md'}
        ?close-on-overlay=${args.closeOnOverlay ?? true}
        ?close-on-escape=${args.closeOnEscape ?? true}
      >
        <span slot="header" style="font-weight:600;font-size:1.125rem;">Modal Title</span>
        <p>This is the modal body content. You can put any content here.</p>
        <div slot="footer">
          <ui-button variant="ghost" @click=${toggle}>Cancel</ui-button>
          <ui-button variant="primary" @click=${toggle}>Confirm</ui-button>
        </div>
      </ui-modal>
    `;
  },
  args: { open: false, size: 'md', closeOnOverlay: true, closeOnEscape: true },
};

export const Open: Story = {
  args: { open: true, size: 'md' },
  render: (args) => html`
    <ui-modal ?open=${args.open} size=${args.size ?? 'md'}>
      <span slot="header" style="font-weight:600;">Open Modal</span>
      <p>This modal is open by default for preview.</p>
    </ui-modal>
  `,
};

export const Large: Story = {
  args: { open: true, size: 'lg' },
  render: (args) => html`
    <ui-modal ?open=${args.open} size=${args.size ?? 'lg'}>
      <span slot="header" style="font-weight:600;">Large Modal</span>
      <p>Large modal body content.</p>
    </ui-modal>
  `,
};

export const NoOverlayClose: Story = {
  args: { open: true, closeOnOverlay: false, closeOnEscape: false },
  render: (args) => html`
    <ui-modal
      ?open=${args.open}
      ?close-on-overlay=${args.closeOnOverlay}
      ?close-on-escape=${args.closeOnEscape}
    >
      <span slot="header" style="font-weight:600;">Persistent Modal</span>
      <p>This modal can only be closed via the X button.</p>
    </ui-modal>
  `,
};
