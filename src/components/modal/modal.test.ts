import { fixture, html, expect, aTimeout } from '@open-wc/testing';
import type { UIModal } from './modal.js';
import './modal.js';

describe('UIModal', () => {
  describe('rendering', () => {
    it('renders with default attributes', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal></ui-modal>
      `);
      expect(el).to.exist;
      expect(el.open).to.be.false;
      expect(el.size).to.equal('md');
      expect(el.closeOnOverlay).to.be.true;
      expect(el.closeOnEscape).to.be.true;
    });

    it('overlay is hidden when open=false', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal></ui-modal>
      `);
      const overlay = el.shadowRoot!.querySelector('.overlay') as HTMLElement;
      const style = getComputedStyle(overlay);
      expect(style.display).to.equal('none');
    });

    it('overlay is visible when open=true', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal open></ui-modal>
      `);
      const overlay = el.shadowRoot!.querySelector('.overlay') as HTMLElement;
      const style = getComputedStyle(overlay);
      expect(style.display).to.not.equal('none');
    });

    it('applies size class to dialog', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal open size="lg"></ui-modal>
      `);
      const dialog = el.shadowRoot!.querySelector('.dialog')!;
      expect(dialog.classList.contains('lg')).to.be.true;
    });

    it('dialog has role=dialog and aria-modal', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal open></ui-modal>
      `);
      const dialog = el.shadowRoot!.querySelector('.dialog')!;
      expect(dialog.getAttribute('role')).to.equal('dialog');
      expect(dialog.getAttribute('aria-modal')).to.equal('true');
    });
  });

  describe('slots', () => {
    it('renders header slot', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal open>
          <span slot="header" id="modal-title">My Title</span>
        </ui-modal>
      `);
      const headerSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="header"]');
      expect(headerSlot).to.exist;
      expect(headerSlot!.assignedElements()[0].id).to.equal('modal-title');
    });

    it('renders footer slot', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal open>
          <span slot="footer" id="modal-footer">Footer</span>
        </ui-modal>
      `);
      const footerSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="footer"]');
      expect(footerSlot).to.exist;
      expect(footerSlot!.assignedElements()[0].id).to.equal('modal-footer');
    });
  });

  describe('open/close methods', () => {
    it('show() sets open to true', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal></ui-modal>
      `);
      el.show();
      await el.updateComplete;
      expect(el.open).to.be.true;
    });

    it('close() sets open to false', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal open></ui-modal>
      `);
      el.close();
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    it('toggle() flips open state', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal></ui-modal>
      `);
      el.toggle();
      await el.updateComplete;
      expect(el.open).to.be.true;
      el.toggle();
      await el.updateComplete;
      expect(el.open).to.be.false;
    });
  });

  describe('close button', () => {
    it('close button exists in shadow DOM', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal open></ui-modal>
      `);
      const closeBtn = el.shadowRoot!.querySelector('.close-btn');
      expect(closeBtn).to.exist;
    });

    it('clicking close button closes the modal', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal open></ui-modal>
      `);
      const closeBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.close-btn')!;
      closeBtn.click();
      await el.updateComplete;
      expect(el.open).to.be.false;
    });
  });

  describe('events', () => {
    it('fires ui-open when opened', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal></ui-modal>
      `);
      let fired = false;
      el.addEventListener('ui-open', () => (fired = true));
      el.open = true;
      await el.updateComplete;
      await aTimeout(0);
      expect(fired).to.be.true;
    });

    it('fires ui-close when closed', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal open></ui-modal>
      `);
      let fired = false;
      el.addEventListener('ui-close', () => (fired = true));
      el.open = false;
      await el.updateComplete;
      await aTimeout(0);
      expect(fired).to.be.true;
    });
  });

  describe('Escape key', () => {
    it('closes modal on Escape when closeOnEscape=true', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal open></ui-modal>
      `);
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    it('does not close on Escape when closeOnEscape=false', async () => {
      const el = await fixture<UIModal>(html`
        <ui-modal open close-on-escape="false"></ui-modal>
      `);
      el.closeOnEscape = false;
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await el.updateComplete;
      expect(el.open).to.be.true;
    });
  });
});
