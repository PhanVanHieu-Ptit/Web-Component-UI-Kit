import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { dispatch } from '../../utils/index.js';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * A modal dialog component.
 *
 * @element ui-modal
 *
 * @slot header  - Modal title area
 * @slot         - Default slot for modal body content
 * @slot footer  - Modal footer (actions)
 *
 * @fires {CustomEvent<void>} ui-open  - Fired when the modal becomes visible
 * @fires {CustomEvent<void>} ui-close - Fired when the modal is dismissed
 *
 * @csspart overlay - The backdrop overlay
 * @csspart dialog  - The dialog container
 * @csspart header  - The header section
 * @csspart body    - The body section
 * @csspart footer  - The footer section
 *
 * @cssprop --ui-modal-border-radius - Dialog border radius (default: 8px)
 * @cssprop --ui-modal-backdrop      - Backdrop background (default: rgba(0,0,0,0.5))
 */
@customElement('ui-modal')
export class UIModal extends LitElement {
  static override styles = css`
    :host {
      --ui-modal-border-radius: 8px;
      --ui-modal-backdrop: rgba(0, 0, 0, 0.5);
      --ui-modal-z-index: 1000;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: var(--ui-modal-backdrop);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: var(--ui-modal-z-index);
      padding: 1rem;
      box-sizing: border-box;
    }

    :host(:not([open])) .overlay {
      display: none;
    }

    .dialog {
      background: #fff;
      border-radius: var(--ui-modal-border-radius);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - 2rem);
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      outline: none;
    }

    .dialog.sm {
      max-width: 384px;
    }
    .dialog.md {
      max-width: 512px;
    }
    .dialog.lg {
      max-width: 640px;
    }
    .dialog.xl {
      max-width: 768px;
    }
    .dialog.full {
      max-width: 100%;
      max-height: 100vh;
      margin: 0;
      border-radius: 0;
    }

    .header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      color: #6b7280;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.15s;
    }
    .close-btn:hover {
      color: #111827;
    }
    .close-btn:focus-visible {
      outline: 3px solid #3b82f6;
      outline-offset: 2px;
    }

    .body {
      padding: 1.5rem;
      overflow-y: auto;
      flex: 1;
    }

    .footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      flex-shrink: 0;
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ reflect: true }) size: ModalSize = 'md';
  @property({ type: Boolean, attribute: 'close-on-overlay' }) closeOnOverlay = true;
  @property({ type: Boolean, attribute: 'close-on-escape' }) closeOnEscape = true;

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        dispatch(this, 'ui-open');
        this.shadowRoot?.querySelector<HTMLElement>('.dialog')?.focus();
      } else {
        dispatch(this, 'ui-close');
      }
    }
  }

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.open && this.closeOnEscape) {
      this.close();
    }
  };

  private _handleOverlayClick(e: MouseEvent): void {
    if (this.closeOnOverlay && e.target === e.currentTarget) {
      this.close();
    }
  }

  show(): void {
    this.open = true;
  }

  close(): void {
    this.open = false;
  }

  toggle(): void {
    this.open = !this.open;
  }

  override render() {
    return html`
      <div class="overlay" part="overlay" role="presentation" @click=${this._handleOverlayClick}>
        <div
          class="dialog ${this.size}"
          part="dialog"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
        >
          <div class="header" part="header">
            <slot name="header"></slot>
            <button class="close-btn" aria-label="Close modal" @click=${() => this.close()}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div class="body" part="body">
            <slot></slot>
          </div>
          <div class="footer" part="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-modal': UIModal;
  }
}
