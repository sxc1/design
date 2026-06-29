# Design Token Selector

An interactive React + Vite app for building a design token set — entering
color candidates, mapping them to semantic roles, tuning typography and
spacing, and exporting a Tailwind v4 theme.

## Quick start

```bash
npm install
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`).

## How it works

The app is a two-column layout. The left side is a tabbed panel for editing
tokens, and the right side is a live preview of a mock app page styled with
those tokens.

- **Primitive Colors** — define named palettes (e.g. `brand`, `neutral`,
  `destructive`). Enter a base color and the app generates a full 50–950 shade
  scale using OKLCH interpolation. Individual shades can be overridden.
- **Semantic Colors** — map each role (`background`, `primary`,
  `destructive`, etc.) to a specific `{palette}.{shade}` for light mode and
  dark mode. Foreground/background pairs are checked for WCAG contrast.
- **Typography** — font family stacks, size scale, weight scale, and line
  height scale, all user-adjustable.
- **Spacing** — base unit and numeric scale (Tailwind-compatible keys).

The preview pane has a light/dark toggle in its header. Border radius,
shadows, and elevation are intentionally hardcoded in
`src/constants/hardcodedTokens.ts`.

State persists to `localStorage` so your work survives a refresh.

## Export

Clicking **Export Tailwind CSS** downloads a single `tokens.css` for a Tailwind
v4 (CSS-first) project — v4 has no `tailwind.config.js`:

- `@import "tailwindcss";` plus `@custom-variant dark` for class-based dark mode.
- Primitive palettes under `@theme` as `--color-{name}` / `--color-{name}-{shade}`.
- Semantic roles and the data palette as per-mode custom properties in `:root`
  and `.dark`, mapped into the theme with `@theme inline`
  (`--color-{role}: var(--{role})`) — the shadcn/ui-for-v4 convention.
- Typography, spacing, radius, and shadow under `@theme` (`--text-*`,
  `--font-weight-*`, `--leading-*`, `--spacing-*`, `--radius-*`, `--shadow-*`).

`@import` it from your CSS entry and you have a working theme. Colors are emitted
as hex; `/<opacity>` modifiers resolve via v4's `color-mix`.

## Stack

- Vite + React 18 + TypeScript
- Zustand (with `persist` middleware) for token state
- Culori for OKLCH color math and contrast checking
- Tailwind CSS v4 for the app's own styling
- file-saver for download triggers
