# Design Token Selector

An interactive React + Vite app for building a design token set — entering
color candidates, mapping them to semantic roles, tuning typography and
spacing, and exporting a Tailwind v3 config.

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

Clicking **Export Tailwind Config** downloads:

- `tailwind.config.js` — primitive palettes as `theme.extend.colors.{name}`,
  semantic roles as CSS-variable references with `<alpha-value>` support,
  plus typography, spacing, radius, and shadow tokens.
- `tokens.css` — the CSS custom properties for `:root` (light) and `.dark`,
  matching the shadcn/ui convention.

Drop both into a Tailwind v3 project and you have a working theme.

## Stack

- Vite + React 18 + TypeScript
- Zustand (with `persist` middleware) for token state
- Culori for OKLCH color math and contrast checking
- Tailwind CSS v3 for the app's own styling
- file-saver for download triggers
