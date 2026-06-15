import { fixture, html, expect } from '@open-wc/testing';
import type { UIBadge } from './badge.js';
import './badge.js';

describe('UIBadge', () => {
  describe('rendering', () => {
    it('renders with default attributes', async () => {
      const el = await fixture<UIBadge>(html`
        <ui-badge>Label</ui-badge>
      `);
      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('md');
      expect(el.shape).to.equal('rounded');
    });

    it('renders a span with badge class in shadow DOM', async () => {
      const el = await fixture<UIBadge>(html`
        <ui-badge>Label</ui-badge>
      `);
      const badge = el.shadowRoot!.querySelector('.badge');
      expect(badge).to.exist;
    });

    it('renders slotted content', async () => {
      const el = await fixture<UIBadge>(html`
        <ui-badge>Active</ui-badge>
      `);
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;
      const assigned = slot.assignedNodes({ flatten: true });
      const text = assigned
        .map((n) => n.textContent)
        .join('')
        .trim();
      expect(text).to.equal('Active');
    });

    it('has role=status', async () => {
      const el = await fixture<UIBadge>(html`
        <ui-badge>Info</ui-badge>
      `);
      expect(el.shadowRoot!.querySelector('.badge')!.getAttribute('role')).to.equal('status');
    });
  });

  describe('variants', () => {
    const variants = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const;

    for (const variant of variants) {
      it(`applies ${variant} class`, async () => {
        const el = await fixture<UIBadge>(html`
          <ui-badge variant=${variant}></ui-badge>
        `);
        const badge = el.shadowRoot!.querySelector('.badge')!;
        expect(badge.classList.contains(variant)).to.be.true;
      });
    }
  });

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      it(`applies ${size} size class`, async () => {
        const el = await fixture<UIBadge>(html`
          <ui-badge size=${size}></ui-badge>
        `);
        expect(el.shadowRoot!.querySelector('.badge')!.classList.contains(size)).to.be.true;
      });
    }
  });

  describe('shapes', () => {
    it('applies rounded class', async () => {
      const el = await fixture<UIBadge>(html`
        <ui-badge shape="rounded"></ui-badge>
      `);
      expect(el.shadowRoot!.querySelector('.badge')!.classList.contains('rounded')).to.be.true;
    });

    it('applies pill class', async () => {
      const el = await fixture<UIBadge>(html`
        <ui-badge shape="pill"></ui-badge>
      `);
      expect(el.shadowRoot!.querySelector('.badge')!.classList.contains('pill')).to.be.true;
    });
  });

  describe('property reflection', () => {
    it('reflects variant to attribute', async () => {
      const el = await fixture<UIBadge>(html`
        <ui-badge variant="danger"></ui-badge>
      `);
      expect(el.getAttribute('variant')).to.equal('danger');
    });

    it('reflects size to attribute', async () => {
      const el = await fixture<UIBadge>(html`
        <ui-badge size="lg"></ui-badge>
      `);
      expect(el.getAttribute('size')).to.equal('lg');
    });

    it('reflects shape to attribute', async () => {
      const el = await fixture<UIBadge>(html`
        <ui-badge shape="pill"></ui-badge>
      `);
      expect(el.getAttribute('shape')).to.equal('pill');
    });
  });

  describe('icon slot', () => {
    it('renders icon slot', async () => {
      const el = await fixture<UIBadge>(html`
        <ui-badge>
          <span slot="icon" id="icon">★</span>
          Text
        </ui-badge>
      `);
      const iconSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="icon"]');
      expect(iconSlot).to.exist;
      expect(iconSlot!.assignedElements()[0].id).to.equal('icon');
    });
  });
});
