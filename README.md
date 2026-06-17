# Web Component UI Kit

A framework-agnostic component library built with [Lit 3](https://lit.dev/) and TypeScript. Drop `<ui-button>`, `<ui-modal>`, and friends into any stack — React, Vue, Svelte, or vanilla HTML — without adapter glue or framework lock-in.

---

## Demo / Storybook

> **Live Storybook** — run `npm run storybook` locally to browse all components with interactive controls, accessibility checks, and source code.

Live demo: https://web-component-ui-kit.vercel.app/


<img width="538" height="920" alt="image" src="https://github.com/user-attachments/assets/68980ebb-6d3b-457a-8611-e35115a5dac6" />


---

## Tech Stack

| Tool | Why |
|---|---|
| **[Lit 3](https://lit.dev/)** | Thin layer over native Web Components — reactive properties, scoped Shadow DOM styles, and declarative templates with zero framework runtime overhead |
| **[TypeScript 5.8](https://www.typescriptlang.org/)** | Strict typing for component props/events; bundled `.d.ts` declarations so consumers get autocomplete out of the box |
| **[Vite 6](https://vitejs.dev/) + vite-plugin-dts** | Sub-second HMR in dev; library mode outputs dual ESM + CJS bundles with source maps in a single command |
| **[Storybook 8](https://storybook.js.org/)** | Interactive playground and living documentation; `@storybook/addon-a11y` catches accessibility regressions before they ship |
| **[@web/test-runner](https://modern-web.dev/docs/test-runner/overview/)** | Runs unit tests in a real browser (via Playwright) — no jsdom quirks, actual Shadow DOM behaviour, real CSS |
| **[Playwright](https://playwright.dev/)** | End-to-end tests that drive a browser the same way a user would — keyboard navigation, focus traps, overlay clicks |
| **ESLint + `eslint-plugin-lit` / `eslint-plugin-wc`** | Catches Lit-specific anti-patterns (missing `override`, unsafe property access) that generic linters miss |
| **Prettier** | Consistent formatting enforced on commit; zero debates about style |

---

## Features

### Components

- **`<ui-button>`** — 5 variants (`primary`, `secondary`, `outline`, `ghost`, `danger`), 3 sizes, built-in loading spinner, `prefix`/`suffix` icon slots
- **`<ui-input>`** — label, helper text, error/success validation states, `required` marker, full `disabled` / `readonly` support, auto-generated `id` linkage for accessibility
- **`<ui-badge>`** — 6 semantic variants, 3 sizes, `rounded` or `pill` shape, icon slot
- **`<ui-modal>`** — 5 sizes up to `full`, backdrop click to close, `Escape` key to close, focus auto-management on open, `header`/`footer` named slots
- **`<ui-tooltip>`** — 12 placement options (`top`, `top-start`, `top-end`, `bottom-*`, `left-*`, `right-*`), 3 trigger modes (`hover`, `click`, `focus`), configurable show delay

### Developer Experience

- **Framework-agnostic** — works in any environment that runs HTML; no adapter needed
- **Dual ESM + CJS output** — `import` in modern bundlers, `require()` in Node toolchains, both from one package
- **Bundled TypeScript declarations** — single rolled-up `.d.ts` file, no `typeRoots` gymnastics
- **CSS Custom Properties** — every visual token (`--ui-button-border-radius`, `--ui-tooltip-background`, …) is overridable from outside Shadow DOM
- **CSS Parts** — expose internal elements (`::part(button)`, `::part(dialog)`, …) for deep styling without hacks
- **Custom Events** — all interactions fire typed `CustomEvent`s (`ui-click`, `ui-open`, `ui-show`, …) that bubble and pierce Shadow DOM boundaries
- **Accessible by default** — ARIA roles, `aria-busy`, `aria-invalid`, `aria-modal`, `aria-label`, and `focus-visible` rings baked into every component

---

## Installation & Setup

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### 1. Clone and install

```bash
git clone https://github.com/PhanVanHieu-Ptit/Web-Component-UI-Kit.git
cd Web-Component-UI-Kit
npm install
```

### 2. Start the dev server

```bash
npm run dev          # Vite dev server at http://localhost:3000
```

### 3. Browse components in Storybook

```bash
npm run storybook    # Opens at http://localhost:6006
```

### 4. Run tests

```bash
npm test             # Unit tests (real browser via @web/test-runner) with coverage
npm run test:watch   # Watch mode
npm run test:e2e     # Playwright end-to-end tests
npm run test:e2e:ui  # Playwright UI mode (interactive)
```

### 5. Build for production

```bash
npm run build        # Outputs ESM + CJS bundles to dist/
```

### Using in your project

After building (or publishing), drop the components in:

```html
<!-- Vanilla HTML -->
<script type="module">
  import '@ui-kit/web-components';
</script>

<ui-button variant="primary" size="lg">Click me</ui-button>
<ui-tooltip content="Hello!" placement="bottom">
  <ui-badge variant="success">Active</ui-badge>
</ui-tooltip>
```

```ts
// TypeScript / any bundler
import { UIButton, UIModal } from '@ui-kit/web-components';
```

---

## What I Learned Building This

**Web Components are more capable than I expected.** Shadow DOM's style encapsulation is real — but CSS Custom Properties and `::part()` give consumers exactly the escape hatches they need without leaking internals. Getting that balance right took several iterations.

**Lit makes the boilerplate disappear, not the concepts.** I still needed to understand the Web Components lifecycle (`connectedCallback`, `disconnectedCallback`, `updated`) deeply. Lit just removes the ceremony so the logic stays readable.

**Testing in a real browser changes everything.** Moving from jsdom to `@web/test-runner` running against an actual Chromium instance caught Shadow DOM edge cases that would have been invisible in a simulated environment — particularly around focus management in the Modal and event bubbling across the shadow boundary.

**Building a library is a different discipline than building an app.** Every API surface becomes a contract. I learned to think carefully about what to expose (CSS parts, custom properties, typed events) and what to keep internal — because consumers can't easily adapt around a bad abstraction the way app code can.

**Playwright E2E tests are your integration contract.** Unit tests verified component logic in isolation; Playwright tests verified that components actually behaved correctly from a user's perspective — keyboard navigation, overlay interaction, focus traps. That distinction became very clear, very fast.

---

## License

MIT
