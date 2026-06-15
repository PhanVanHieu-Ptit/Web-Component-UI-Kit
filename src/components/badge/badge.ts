import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill';

/**
 * A badge component for labels, statuses, and counts.
 *
 * @element ui-badge
 *
 * @slot - Default slot for the badge text content
 * @slot icon - Slot for an icon displayed before the content
 *
 * @csspart badge - The root span element
 */
@customElement('ui-badge')
export class UIBadge extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      --ui-badge-font-family: inherit;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25em;
      font-family: var(--ui-badge-font-family);
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      box-sizing: border-box;
    }

    .badge.sm {
      font-size: 0.625rem;
      padding: 0.2rem 0.45rem;
    }
    .badge.md {
      font-size: 0.75rem;
      padding: 0.25rem 0.6rem;
    }
    .badge.lg {
      font-size: 0.875rem;
      padding: 0.3rem 0.75rem;
    }

    .badge.rounded {
      border-radius: 4px;
    }
    .badge.pill {
      border-radius: 9999px;
    }

    .badge.default {
      background: #f3f4f6;
      color: #374151;
    }
    .badge.primary {
      background: #dbeafe;
      color: #1d4ed8;
    }
    .badge.success {
      background: #dcfce7;
      color: #15803d;
    }
    .badge.warning {
      background: #fef9c3;
      color: #a16207;
    }
    .badge.danger {
      background: #fee2e2;
      color: #b91c1c;
    }
    .badge.info {
      background: #e0f2fe;
      color: #0369a1;
    }
  `;

  @property({ reflect: true }) variant: BadgeVariant = 'default';
  @property({ reflect: true }) size: BadgeSize = 'md';
  @property({ reflect: true }) shape: BadgeShape = 'rounded';

  override render() {
    const classes = [this.variant, this.size, this.shape].join(' ');
    return html`
      <span class="badge ${classes}" part="badge" role="status">
        <slot name="icon"></slot>
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-badge': UIBadge;
  }
}
