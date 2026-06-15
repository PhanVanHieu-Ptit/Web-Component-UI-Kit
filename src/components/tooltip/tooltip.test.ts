import { fixture, html, expect, aTimeout } from '@open-wc/testing';
import type { UITooltip } from './tooltip.js';
import './tooltip.js';

describe('UITooltip', () => {
  describe('rendering', () => {
    it('renders with default attributes', async () => {
      const el = await fixture<UITooltip>(html`
        <ui-tooltip content="Hello"><button>Trigger</button></ui-tooltip>
      `);
      expect(el).to.exist;
      expect(el.content).to.equal('Hello');
      expect(el.placement).to.equal('top');
      expect(el.trigger).to.equal('hover');
      expect(el.delay).to.equal(0);
    });

    it('renders tooltip element in shadow DOM', async () => {
      const el = await fixture<UITooltip>(html`
        <ui-tooltip content="Tip"><button>T</button></ui-tooltip>
      `);
      const tooltip = el.shadowRoot!.querySelector('.tooltip');
      expect(tooltip).to.exist;
    });

    it('tooltip has role=tooltip', async () => {
      const el = await fixture<UITooltip>(html`
        <ui-tooltip content="Tip"><button>T</button></ui-tooltip>
      `);
      expect(el.shadowRoot!.querySelector('.tooltip')!.getAttribute('role')).to.equal('tooltip');
    });

    it('does not render tooltip element when content is empty', async () => {
      const el = await fixture<UITooltip>(html`
        <ui-tooltip><button>T</button></ui-tooltip>
      `);
      expect(el.shadowRoot!.querySelector('.tooltip')).to.not.exist;
    });

    it('tooltip is not visible by default', async () => {
      const el = await fixture<UITooltip>(html`
        <ui-tooltip content="Tip"><button>T</button></ui-tooltip>
      `);
      const tooltip = el.shadowRoot!.querySelector('.tooltip')!;
      expect(tooltip.classList.contains('visible')).to.be.false;
    });
  });

  describe('placement', () => {
    const placements = ['top', 'bottom', 'left', 'right', 'top-start', 'bottom-end'] as const;

    for (const placement of placements) {
      it(`applies ${placement} placement class`, async () => {
        const el = await fixture<UITooltip>(html`
          <ui-tooltip content="Tip" placement=${placement}><button>T</button></ui-tooltip>
        `);
        const tooltip = el.shadowRoot!.querySelector('.tooltip')!;
        expect(tooltip.classList.contains(placement)).to.be.true;
      });
    }
  });

  describe('hover trigger', () => {
    it('shows tooltip on mouseenter', async () => {
      const el = await fixture<UITooltip>(html`
        <ui-tooltip content="Tip" trigger="hover"><button>T</button></ui-tooltip>
      `);
      const wrapper = el.shadowRoot!.querySelector('div')!;
      wrapper.dispatchEvent(new MouseEvent('mouseenter'));
      await el.updateComplete;
      const tooltip = el.shadowRoot!.querySelector('.tooltip')!;
      expect(tooltip.classList.contains('visible')).to.be.true;
    });

    it('hides tooltip on mouseleave', async () => {
      const el = await fixture<UITooltip>(html`
        <ui-tooltip content="Tip" trigger="hover"><button>T</button></ui-tooltip>
      `);
      const wrapper = el.shadowRoot!.querySelector('div')!;
      wrapper.dispatchEvent(new MouseEvent('mouseenter'));
      await el.updateComplete;
      wrapper.dispatchEvent(new MouseEvent('mouseleave'));
      await el.updateComplete;
      const tooltip = el.shadowRoot!.querySelector('.tooltip')!;
      expect(tooltip.classList.contains('visible')).to.be.false;
    });
  });

  describe('click trigger', () => {
    it('toggles tooltip on click', async () => {
      const el = await fixture<UITooltip>(html`
        <ui-tooltip content="Tip" trigger="click"><button>T</button></ui-tooltip>
      `);
      const wrapper = el.shadowRoot!.querySelector('div')!;
      wrapper.dispatchEvent(new MouseEvent('click'));
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('.tooltip')!.classList.contains('visible')).to.be.true;
      wrapper.dispatchEvent(new MouseEvent('click'));
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('.tooltip')!.classList.contains('visible')).to.be.false;
    });
  });

  describe('focus trigger', () => {
    it('shows on focusin', async () => {
      const el = await fixture<UITooltip>(html`
        <ui-tooltip content="Tip" trigger="focus"><button>T</button></ui-tooltip>
      `);
      const wrapper = el.shadowRoot!.querySelector('div')!;
      wrapper.dispatchEvent(new FocusEvent('focusin'));
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('.tooltip')!.classList.contains('visible')).to.be.true;
    });

    it('hides on focusout', async () => {
      const el = await fixture<UITooltip>(html`
        <ui-tooltip content="Tip" trigger="focus"><button>T</button></ui-tooltip>
      `);
      const wrapper = el.shadowRoot!.querySelector('div')!;
      wrapper.dispatchEvent(new FocusEvent('focusin'));
      await el.updateComplete;
      wrapper.dispatchEvent(new FocusEvent('focusout'));
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('.tooltip')!.classList.contains('visible')).to.be.false;
    });
  });

  describe('events', () => {
    it('fires ui-show when shown', async () => {
      const el = await fixture<UITooltip>(html`
        <ui-tooltip content="Tip" trigger="hover"><button>T</button></ui-tooltip>
      `);
      let fired = false;
      el.addEventListener('ui-show', () => (fired = true));
      el.shadowRoot!.querySelector('div')!.dispatchEvent(new MouseEvent('mouseenter'));
      await el.updateComplete;
      await aTimeout(0);
      expect(fired).to.be.true;
    });

    it('fires ui-hide when hidden', async () => {
      const el = await fixture<UITooltip>(html`
        <ui-tooltip content="Tip" trigger="hover"><button>T</button></ui-tooltip>
      `);
      const wrapper = el.shadowRoot!.querySelector('div')!;
      wrapper.dispatchEvent(new MouseEvent('mouseenter'));
      await el.updateComplete;
      let fired = false;
      el.addEventListener('ui-hide', () => (fired = true));
      wrapper.dispatchEvent(new MouseEvent('mouseleave'));
      await el.updateComplete;
      await aTimeout(0);
      expect(fired).to.be.true;
    });
  });
});
