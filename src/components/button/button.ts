import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { dispatch } from '../../utils/index.js';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * A versatile button component with multiple variants, sizes, and states.
 *
 * @element ui-button
 *
 * @slot - Default slot for button label text
 * @slot prefix - Slot for a leading icon
 * @slot suffix - Slot for a trailing icon
 *
 * @fires {CustomEvent} ui-click - Fired when the button is clicked and not disabled/loading
 *
 * @csspart button - The internal `<button>` element
 * @csspart prefix - The prefix slot wrapper
 * @csspart suffix - The suffix slot wrapper
 * @csspart spinner - The loading spinner element
 *
 * @cssprop --ui-button-border-radius - Border radius (default: 6px)
 * @cssprop --ui-button-transition - Transition (default: all 0.15s ease)
 * @cssprop --ui-button-font-family - Font family (default: inherit)
 */
@customElement('ui-button')
export class UIButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      --ui-button-border-radius: 6px;
      --ui-button-transition: all 0.15s ease;
      --ui-button-font-family: inherit;
    }

    :host([disabled]) {
      pointer-events: none;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5em;
      border: 2px solid transparent;
      border-radius: var(--ui-button-border-radius);
      cursor: pointer;
      font-family: var(--ui-button-font-family);
      font-weight: 500;
      line-height: 1;
      transition: var(--ui-button-transition);
      white-space: nowrap;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }

    button:focus-visible {
      outline: 3px solid #3b82f6;
      outline-offset: 2px;
    }

    button.sm {
      font-size: 0.75rem;
      padding: 0.375rem 0.75rem;
      min-height: 28px;
    }
    button.md {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
      min-height: 36px;
    }
    button.lg {
      font-size: 1rem;
      padding: 0.625rem 1.25rem;
      min-height: 44px;
    }

    button.primary {
      background: #2563eb;
      color: #fff;
      border-color: #2563eb;
    }
    button.primary:hover:not(:disabled) {
      background: #1d4ed8;
      border-color: #1d4ed8;
    }
    button.primary:active:not(:disabled) {
      background: #1e40af;
      border-color: #1e40af;
    }

    button.secondary {
      background: #6b7280;
      color: #fff;
      border-color: #6b7280;
    }
    button.secondary:hover:not(:disabled) {
      background: #4b5563;
      border-color: #4b5563;
    }
    button.secondary:active:not(:disabled) {
      background: #374151;
      border-color: #374151;
    }

    button.outline {
      background: transparent;
      color: #2563eb;
      border-color: #2563eb;
    }
    button.outline:hover:not(:disabled) {
      background: #eff6ff;
    }
    button.outline:active:not(:disabled) {
      background: #dbeafe;
    }

    button.ghost {
      background: transparent;
      color: #374151;
      border-color: transparent;
    }
    button.ghost:hover:not(:disabled) {
      background: #f3f4f6;
    }
    button.ghost:active:not(:disabled) {
      background: #e5e7eb;
    }

    button.danger {
      background: #dc2626;
      color: #fff;
      border-color: #dc2626;
    }
    button.danger:hover:not(:disabled) {
      background: #b91c1c;
      border-color: #b91c1c;
    }
    button.danger:active:not(:disabled) {
      background: #991b1b;
      border-color: #991b1b;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    button.loading {
      cursor: wait;
    }

    .spinner {
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      flex-shrink: 0;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .slot-hidden {
      display: none;
    }
  `;

  @property({ reflect: true }) variant: ButtonVariant = 'primary';
  @property({ reflect: true }) size: ButtonSize = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property() label = '';

  private _handleClick(e: MouseEvent): void {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    dispatch(this, 'ui-click', { originalEvent: e });
  }

  override render() {
    const classes = [this.variant, this.size, this.loading ? 'loading' : '']
      .filter(Boolean)
      .join(' ');

    return html`
      <button
        part="button"
        class=${classes}
        ?disabled=${this.disabled || this.loading}
        aria-label=${this.label || ''}
        aria-busy=${this.loading ? 'true' : 'false'}
        @click=${this._handleClick}
      >
        ${this.loading
          ? html`
              <span class="spinner" part="spinner" aria-hidden="true"></span>
            `
          : html`
              <slot name="prefix" part="prefix"></slot>
            `}
        <slot class=${this.loading ? 'slot-hidden' : ''}></slot>
        ${!this.loading
          ? html`
              <slot name="suffix" part="suffix"></slot>
            `
          : ''}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-button': UIButton;
  }
}
