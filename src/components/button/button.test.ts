import { fixture, html, expect, aTimeout } from '@open-wc/testing';
import type { UIButton } from './button.js';
import './button.js';

describe('UIButton', () => {
  describe('rendering', () => {
    it('renders with default attributes', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button>Click me</ui-button>
      `);
      expect(el).to.exist;
      expect(el.variant).to.equal('primary');
      expect(el.size).to.equal('md');
      expect(el.disabled).to.be.false;
      expect(el.loading).to.be.false;
    });

    it('reflects variant attribute to host', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button variant="danger"></ui-button>
      `);
      expect(el.getAttribute('variant')).to.equal('danger');
    });

    it('reflects size attribute to host', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button size="lg"></ui-button>
      `);
      expect(el.getAttribute('size')).to.equal('lg');
    });

    it('renders a button element in shadow DOM', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button>Label</ui-button>
      `);
      const btn = el.shadowRoot!.querySelector('button');
      expect(btn).to.exist;
    });

    it('applies variant class to inner button', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button variant="outline"></ui-button>
      `);
      const btn = el.shadowRoot!.querySelector('button')!;
      expect(btn.classList.contains('outline')).to.be.true;
    });

    it('applies size class to inner button', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button size="sm"></ui-button>
      `);
      const btn = el.shadowRoot!.querySelector('button')!;
      expect(btn.classList.contains('sm')).to.be.true;
    });

    it('renders prefix slot', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button>
          <span slot="prefix" id="prefix-icon">Icon</span>
          Label
        </ui-button>
      `);
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="prefix"]');
      expect(slot).to.exist;
      const assigned = slot!.assignedElements();
      expect(assigned[0].id).to.equal('prefix-icon');
    });
  });

  describe('disabled state', () => {
    it('sets disabled on the internal button', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button disabled></ui-button>
      `);
      const btn = el.shadowRoot!.querySelector('button')!;
      expect(btn.disabled).to.be.true;
    });

    it('does not fire ui-click when disabled', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button disabled>Click</ui-button>
      `);
      let fired = false;
      el.addEventListener('ui-click', () => (fired = true));
      el.shadowRoot!.querySelector('button')!.click();
      await aTimeout(0);
      expect(fired).to.be.false;
    });

    it('reflects disabled attribute to host', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button disabled></ui-button>
      `);
      expect(el.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('loading state', () => {
    it('shows spinner when loading', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button loading></ui-button>
      `);
      const spinner = el.shadowRoot!.querySelector('.spinner');
      expect(spinner).to.exist;
    });

    it('disables the button when loading', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button loading></ui-button>
      `);
      const btn = el.shadowRoot!.querySelector('button')!;
      expect(btn.disabled).to.be.true;
    });

    it('does not fire ui-click when loading', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button loading>Click</ui-button>
      `);
      let fired = false;
      el.addEventListener('ui-click', () => (fired = true));
      el.shadowRoot!.querySelector('button')!.click();
      await aTimeout(0);
      expect(fired).to.be.false;
    });
  });

  describe('events', () => {
    it('fires ui-click on click', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button>Click me</ui-button>
      `);
      let eventFired = false;
      el.addEventListener('ui-click', () => (eventFired = true));
      el.shadowRoot!.querySelector('button')!.click();
      await aTimeout(0);
      expect(eventFired).to.be.true;
    });

    it('ui-click event bubbles and is composed', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button>Click me</ui-button>
      `);
      let event: CustomEvent | null = null;
      document.addEventListener('ui-click', (e) => (event = e as CustomEvent), { once: true });
      el.shadowRoot!.querySelector('button')!.click();
      await aTimeout(0);
      expect(event).to.not.be.null;
      expect((event as unknown as CustomEvent).bubbles).to.be.true;
      expect((event as unknown as CustomEvent).composed).to.be.true;
    });
  });

  describe('property changes', () => {
    it('updates variant reactively', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button></ui-button>
      `);
      el.variant = 'danger';
      await el.updateComplete;
      const btn = el.shadowRoot!.querySelector('button')!;
      expect(btn.classList.contains('danger')).to.be.true;
    });

    it('updates disabled reactively', async () => {
      const el = await fixture<UIButton>(html`
        <ui-button></ui-button>
      `);
      el.disabled = true;
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('button')!.disabled).to.be.true;
    });
  });
});
