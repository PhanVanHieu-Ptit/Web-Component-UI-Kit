import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dispatch, sleep } from '../../utils/index.js';

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export type TooltipTrigger = 'hover' | 'click' | 'focus';

/**
 * A tooltip component that positions a floating label relative to a trigger element.
 *
 * @element ui-tooltip
 *
 * @slot - The trigger element that the tooltip anchors to
 *
 * @fires {CustomEvent<void>} ui-show - Fired when the tooltip becomes visible
 * @fires {CustomEvent<void>} ui-hide - Fired when the tooltip is hidden
 *
 * @csspart tooltip - The tooltip bubble element
 *
 * @cssprop --ui-tooltip-background - Bubble background (default: #111827)
 * @cssprop --ui-tooltip-color      - Text color (default: #f9fafb)
 * @cssprop --ui-tooltip-max-width  - Max width (default: 200px)
 */
@customElement('ui-tooltip')
export class UITooltip extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: relative;
      --ui-tooltip-background: #111827;
      --ui-tooltip-color: #f9fafb;
      --ui-tooltip-max-width: 200px;
    }

    .tooltip {
      position: absolute;
      background: var(--ui-tooltip-background);
      color: var(--ui-tooltip-color);
      font-size: 0.75rem;
      line-height: 1.4;
      padding: 0.375rem 0.625rem;
      border-radius: 4px;
      max-width: var(--ui-tooltip-max-width);
      width: max-content;
      white-space: nowrap;
      pointer-events: auto;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.15s ease,
        visibility 0.15s ease;
    }

    .tooltip.visible {
      opacity: 1;
      visibility: visible;
    }

    .tooltip.top,
    .tooltip.top-start,
    .tooltip.top-end {
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }
    .tooltip.top-start {
      left: 0;
      transform: none;
    }
    .tooltip.top-end {
      left: auto;
      right: 0;
      transform: none;
    }

    .tooltip.bottom,
    .tooltip.bottom-start,
    .tooltip.bottom-end {
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }
    .tooltip.bottom-start {
      left: 0;
      transform: none;
    }
    .tooltip.bottom-end {
      left: auto;
      right: 0;
      transform: none;
    }

    .tooltip.left,
    .tooltip.left-start,
    .tooltip.left-end {
      right: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }
    .tooltip.left-start {
      top: 0;
      transform: none;
    }
    .tooltip.left-end {
      top: auto;
      bottom: 0;
      transform: none;
    }

    .tooltip.right,
    .tooltip.right-start,
    .tooltip.right-end {
      left: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }
    .tooltip.right-start {
      top: 0;
      transform: none;
    }
    .tooltip.right-end {
      top: auto;
      bottom: 0;
      transform: none;
    }
  `;

  @property() content = '';
  @property({ reflect: true }) placement: TooltipPlacement = 'top';
  @property({ reflect: true }) trigger: TooltipTrigger = 'hover';
  @property({ type: Number }) delay = 0;
  @property({ attribute: 'max-width' }) maxWidth = '200px';

  @state() private _visible = false;

  private async _show(): Promise<void> {
    if (this.delay > 0) {
      await sleep(this.delay);
    }
    this._visible = true;
    dispatch(this, 'ui-show');
  }

  private _hide(): void {
    this._visible = false;
    dispatch(this, 'ui-hide');
  }

  private _handleMouseEnter(): void {
    if (this.trigger === 'hover') {
      this._show();
    }
  }

  private _handleMouseLeave(): void {
    if (this.trigger === 'hover') {
      this._hide();
    }
  }

  private _handleClick(): void {
    if (this.trigger === 'click') {
      if (this._visible) {
        this._hide();
      } else {
        this._show();
      }
    }
  }

  private _handleFocusIn(): void {
    if (this.trigger === 'focus') {
      this._show();
    }
  }

  private _handleFocusOut(): void {
    if (this.trigger === 'focus') {
      this._hide();
    }
  }

  override render() {
    const tooltipClass = ['tooltip', this.placement, this._visible ? 'visible' : '']
      .filter(Boolean)
      .join(' ');

    return html`
      <div
        style="--ui-tooltip-max-width: ${this.maxWidth}"
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        @click=${this._handleClick}
        @focusin=${this._handleFocusIn}
        @focusout=${this._handleFocusOut}
      >
        <slot></slot>
        ${this.content
          ? html`
              <div
                class=${tooltipClass}
                part="tooltip"
                role="tooltip"
                aria-hidden=${!this._visible}
              >
                ${this.content}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-tooltip': UITooltip;
  }
}
