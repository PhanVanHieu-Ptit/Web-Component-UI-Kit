import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dispatch, uniqueId } from '../../utils/index.js';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * A form input component with label, helper text, and validation states.
 *
 * @element ui-input
 *
 * @fires {CustomEvent<string>} ui-input  - Fired on every keystroke with current value
 * @fires {CustomEvent<string>} ui-change - Fired when value is committed (blur or Enter)
 * @fires {CustomEvent<void>}   ui-focus  - Fired when the input gains focus
 * @fires {CustomEvent<void>}   ui-blur   - Fired when the input loses focus
 *
 * @csspart wrapper - Outermost container div
 * @csspart label   - The `<label>` element
 * @csspart input   - The `<input>` element
 * @csspart helper  - The helper/error text paragraph
 */
@customElement('ui-input')
export class UIInput extends LitElement {
  static override styles = css`
    :host {
      display: block;
      --ui-input-border-radius: 6px;
      --ui-input-border-color: #d1d5db;
      --ui-input-focus-color: #3b82f6;
      --ui-input-error-color: #ef4444;
      --ui-input-success-color: #22c55e;
      --ui-input-font-family: inherit;
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    label {
      font-family: var(--ui-input-font-family);
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    label.required::after {
      content: ' *';
      color: var(--ui-input-error-color);
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      border: 1.5px solid var(--ui-input-border-color);
      border-radius: var(--ui-input-border-radius);
      font-family: var(--ui-input-font-family);
      background: #fff;
      color: #111827;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
      outline: none;
    }

    input.sm {
      font-size: 0.75rem;
      padding: 0.375rem 0.625rem;
    }
    input.md {
      font-size: 0.875rem;
      padding: 0.5rem 0.75rem;
    }
    input.lg {
      font-size: 1rem;
      padding: 0.625rem 1rem;
    }

    input:focus {
      border-color: var(--ui-input-focus-color);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    input:disabled {
      background: #f9fafb;
      color: #9ca3af;
      cursor: not-allowed;
    }

    input[readonly] {
      background: #f3f4f6;
      cursor: default;
    }

    :host([error]) input {
      border-color: var(--ui-input-error-color);
    }

    :host([error]) input:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }

    :host([success]) input {
      border-color: var(--ui-input-success-color);
    }

    :host([success]) input:focus {
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
    }

    .helper {
      font-size: 0.75rem;
      color: #6b7280;
      margin: 0;
    }

    .helper.error {
      color: var(--ui-input-error-color);
    }
    .helper.success {
      color: var(--ui-input-success-color);
    }
  `;

  @property() type: InputType = 'text';
  @property() label = '';
  @property() placeholder = '';
  @property() value = '';
  @property({ attribute: 'error-message' }) errorMessage = '';
  @property({ attribute: 'helper-text' }) helperText = '';
  @property({ reflect: true }) size: InputSize = 'md';
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;

  @state() private _inputId = uniqueId('input');

  private _handleInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    dispatch<string>(this, 'ui-input', this.value);
  }

  private _handleChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    dispatch<string>(this, 'ui-change', this.value);
  }

  private _handleFocus(): void {
    dispatch(this, 'ui-focus');
  }

  private _handleBlur(): void {
    dispatch(this, 'ui-blur');
  }

  override render() {
    const helperContent = this.error && this.errorMessage ? this.errorMessage : this.helperText;
    const helperClass = this.error ? 'helper error' : this.success ? 'helper success' : 'helper';

    return html`
      <div class="wrapper" part="wrapper">
        ${this.label
          ? html`
              <label for=${this._inputId} part="label" class=${this.required ? 'required' : ''}>
                ${this.label}
              </label>
            `
          : ''}
        <div class="input-wrapper">
          <input
            id=${this._inputId}
            part="input"
            class=${this.size}
            type=${this.type}
            placeholder=${this.placeholder}
            .value=${this.value}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-describedby=${helperContent ? `${this._inputId}-helper` : ''}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          />
        </div>
        ${helperContent
          ? html`
              <p id=${`${this._inputId}-helper`} class=${helperClass} part="helper">
                ${helperContent}
              </p>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-input': UIInput;
  }
}
