import { fixture, html, expect, aTimeout } from '@open-wc/testing';
import type { UIInput } from './input.js';
import './input.js';

describe('UIInput', () => {
  describe('rendering', () => {
    it('renders with default attributes', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input></ui-input>
      `);
      expect(el).to.exist;
      expect(el.type).to.equal('text');
      expect(el.size).to.equal('md');
      expect(el.disabled).to.be.false;
      expect(el.error).to.be.false;
      expect(el.success).to.be.false;
    });

    it('renders an input element in shadow DOM', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input></ui-input>
      `);
      expect(el.shadowRoot!.querySelector('input')).to.exist;
    });

    it('renders label when provided', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input label="Email"></ui-input>
      `);
      const label = el.shadowRoot!.querySelector('label');
      expect(label).to.exist;
      expect(label!.textContent?.trim()).to.equal('Email');
    });

    it('does not render label when empty', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input></ui-input>
      `);
      expect(el.shadowRoot!.querySelector('label')).to.not.exist;
    });

    it('renders helper text', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input helper-text="Help text"></ui-input>
      `);
      const helper = el.shadowRoot!.querySelector('.helper');
      expect(helper).to.exist;
      expect(helper!.textContent?.trim()).to.equal('Help text');
    });

    it('renders error message when in error state', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input error error-message="Invalid input"></ui-input>
      `);
      const helper = el.shadowRoot!.querySelector('.helper');
      expect(helper!.textContent?.trim()).to.equal('Invalid input');
      expect(helper!.classList.contains('error')).to.be.true;
    });

    it('required label gets asterisk class', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input label="Name" required></ui-input>
      `);
      const label = el.shadowRoot!.querySelector('label');
      expect(label!.classList.contains('required')).to.be.true;
    });
  });

  describe('input element attributes', () => {
    it('sets type attribute', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input type="email"></ui-input>
      `);
      expect(el.shadowRoot!.querySelector('input')!.type).to.equal('email');
    });

    it('sets placeholder', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input placeholder="Enter text"></ui-input>
      `);
      expect(el.shadowRoot!.querySelector('input')!.placeholder).to.equal('Enter text');
    });

    it('sets disabled on internal input', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input disabled></ui-input>
      `);
      expect(el.shadowRoot!.querySelector('input')!.disabled).to.be.true;
    });

    it('sets readonly on internal input', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input readonly></ui-input>
      `);
      expect(el.shadowRoot!.querySelector('input')!.readOnly).to.be.true;
    });

    it('sets aria-invalid when in error state', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input error></ui-input>
      `);
      expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-invalid')).to.equal('true');
    });
  });

  describe('events', () => {
    it('fires ui-input on keystroke', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input></ui-input>
      `);
      let value = '';
      el.addEventListener('ui-input', (e) => (value = (e as CustomEvent<string>).detail));
      const input = el.shadowRoot!.querySelector('input')!;
      input.value = 'hello';
      input.dispatchEvent(new Event('input'));
      await aTimeout(0);
      expect(value).to.equal('hello');
    });

    it('fires ui-change on change event', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input></ui-input>
      `);
      let value = '';
      el.addEventListener('ui-change', (e) => (value = (e as CustomEvent<string>).detail));
      const input = el.shadowRoot!.querySelector('input')!;
      input.value = 'world';
      input.dispatchEvent(new Event('change'));
      await aTimeout(0);
      expect(value).to.equal('world');
    });

    it('fires ui-focus on focus', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input></ui-input>
      `);
      let fired = false;
      el.addEventListener('ui-focus', () => (fired = true));
      el.shadowRoot!.querySelector('input')!.dispatchEvent(new Event('focus'));
      await aTimeout(0);
      expect(fired).to.be.true;
    });

    it('fires ui-blur on blur', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input></ui-input>
      `);
      let fired = false;
      el.addEventListener('ui-blur', () => (fired = true));
      el.shadowRoot!.querySelector('input')!.dispatchEvent(new Event('blur'));
      await aTimeout(0);
      expect(fired).to.be.true;
    });
  });

  describe('value binding', () => {
    it('updates component value on input', async () => {
      const el = await fixture<UIInput>(html`
        <ui-input></ui-input>
      `);
      const input = el.shadowRoot!.querySelector('input')!;
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      await aTimeout(0);
      expect(el.value).to.equal('test');
    });
  });
});
