import {
  HARDCODED_RADIUS,
  HARDCODED_SHADOWS,
} from '@/constants/hardcodedTokens';
import { SEMANTIC_ROLES } from '@/constants/semanticRoles';
import { SHADE_STEPS, type TokenState } from '@/types/tokens';
import { resolveSemanticColor } from '@/store/tokenStore';
import { toHexSafe } from '@/lib/colorScale';

function slugifyName(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'palette'
  );
}

// A literal dot is not valid in a CSS custom-property name, so a scale key like
// `0.5` is escaped to `--spacing-0\.5`. Tailwind v4 still emits the matching
// `p-0.5` utility, and it mirrors the `--ds-space-0\.5` form the preview uses.
function escapeKey(key: string): string {
  return key.replace(/\./g, '\\.');
}

export interface ExportResult {
  css: string;
}

/**
 * Serialize the token store into a single Tailwind v4 CSS file (CSS-first
 * config — there is no `tailwind.config.js` in v4):
 *
 * - Primitive palettes are static → emitted directly under `@theme` as
 *   `--color-{slug}` (DEFAULT = base) and `--color-{slug}-{shade}`.
 * - Semantic roles + the qualitative data palette are mode-dependent → their
 *   per-mode values live in `:root` / `.dark` and are mapped into Tailwind's
 *   color system with `@theme inline` (`--color-{role}: var(--{role})`), so the
 *   `.dark` swap happens at runtime.
 * - Typography / spacing / radius / shadow go under `@theme` in v4's namespaces
 *   (`--text-*`, `--font-weight-*`, `--leading-*`, `--spacing-*`, `--radius-*`,
 *   `--shadow-*`).
 *
 * Colors are emitted as hex; v4 resolves `/<opacity>` modifiers via `color-mix`,
 * so the v3 bare-RGB-triplet convention is no longer needed.
 */
export function exportTailwindV4(state: TokenState): ExportResult {
  // ── Primitive palettes (static) ──
  const primitiveLines: string[] = [];
  for (const palette of state.palettes) {
    const slug = slugifyName(palette.name);
    primitiveLines.push(`  --color-${slug}: ${toHexSafe(palette.baseColor)};`);
    for (const shade of SHADE_STEPS) {
      primitiveLines.push(`  --color-${slug}-${shade}: ${palette.scale[shade]};`);
    }
  }

  // ── Semantic roles (mode-dependent) ──
  const lightLines: string[] = [];
  const darkLines: string[] = [];
  const inlineLines: string[] = [];
  for (const role of SEMANTIC_ROLES) {
    const light = resolveSemanticColor(state.semantic.light[role.id], state.palettes);
    const dark = resolveSemanticColor(state.semantic.dark[role.id], state.palettes);
    if (light) lightLines.push(`  --${role.id}: ${light};`);
    if (dark) darkLines.push(`  --${role.id}: ${dark};`);
    if (light || dark) inlineLines.push(`  --color-${role.id}: var(--${role.id});`);
  }

  // ── Qualitative data palette → --data-1, --data-2, … (one per slot, per mode) ──
  const dataLightLines: string[] = [];
  const dataDarkLines: string[] = [];
  const dataInlineLines: string[] = [];
  for (let i = 0; i < state.data.light.length; i++) {
    const n = i + 1;
    const light = resolveSemanticColor(state.data.light[i] ?? undefined, state.palettes);
    const dark = resolveSemanticColor(state.data.dark[i] ?? undefined, state.palettes);
    if (light) dataLightLines.push(`  --data-${n}: ${light};`);
    if (dark) dataDarkLines.push(`  --data-${n}: ${dark};`);
    if (light || dark) dataInlineLines.push(`  --color-data-${n}: var(--data-${n});`);
  }

  // ── Typography (static) ──
  const fontLines = [
    `  --font-sans: ${state.typography.fontFamilySans};`,
    `  --font-serif: ${state.typography.fontFamilySerif};`,
    `  --font-mono: ${state.typography.fontFamilyMono};`,
  ];
  for (const [k, v] of Object.entries(state.typography.fontSizeScale)) {
    fontLines.push(`  --text-${escapeKey(k)}: ${v};`);
  }
  for (const [k, v] of Object.entries(state.typography.fontWeightScale)) {
    fontLines.push(`  --font-weight-${escapeKey(k)}: ${v};`);
  }
  for (const [k, v] of Object.entries(state.typography.lineHeightScale)) {
    fontLines.push(`  --leading-${escapeKey(k)}: ${v};`);
  }

  // ── Spacing / radius / shadow (static) ──
  // v4 derives every `p-<n>` (incl. fractions like `p-0.5`) from a single
  // `--spacing` base via calc(), which is the only clean way to support
  // fractional steps — a literal dot can't live in a `--spacing-0.5` custom
  // property, and escaped dots trip up Lightning CSS. The base is the per-unit
  // rem value; non-fractional keys are then pinned explicitly so hand-edited
  // values survive, while fractional keys derive from the base.
  const spacingLines = [`  --spacing: ${state.spacing.baseUnitPx / 16}rem;`];
  for (const [k, v] of Object.entries(state.spacing.scale)) {
    if (k.includes('.')) continue; // fractional → derived from --spacing
    spacingLines.push(`  --spacing-${k}: ${v};`);
  }
  const radiusLines = Object.entries(HARDCODED_RADIUS).map(
    ([k, v]) => `  --radius-${escapeKey(k)}: ${v};`,
  );
  const shadowLines = Object.entries(HARDCODED_SHADOWS).map(
    ([k, v]) => `  --shadow-${escapeKey(k)}: ${v};`,
  );

  // ── Assemble ──
  const section = (title: string, lines: string[]) => `  /* ${title} */\n${lines.join('\n')}`;

  const rootBlocks: string[] = [];
  if (lightLines.length) rootBlocks.push(section('Semantic colors', lightLines));
  if (dataLightLines.length) rootBlocks.push(section('Data palette', dataLightLines));

  const darkBlocks: string[] = [];
  if (darkLines.length) darkBlocks.push(section('Semantic colors', darkLines));
  if (dataDarkLines.length) darkBlocks.push(section('Data palette', dataDarkLines));

  const inlineAll = [...inlineLines, ...dataInlineLines];

  const themeStatic: string[] = [];
  if (primitiveLines.length) themeStatic.push(section('Primitive palettes', primitiveLines));
  themeStatic.push(section('Typography', fontLines));
  if (spacingLines.length) themeStatic.push(section('Spacing', spacingLines));
  themeStatic.push(section('Radius', radiusLines));
  themeStatic.push(section('Shadow', shadowLines));

  const parts: string[] = [
    '/* Generated by Design Token Selector */',
    '@import "tailwindcss";',
    '/* Class-based dark mode, pairing with the :root / .dark split below. */\n@custom-variant dark (&:where(.dark, .dark *));',
  ];
  if (rootBlocks.length) parts.push(`:root {\n${rootBlocks.join('\n\n')}\n}`);
  if (darkBlocks.length) parts.push(`.dark {\n${darkBlocks.join('\n\n')}\n}`);
  if (inlineAll.length) {
    parts.push(
      `/* Mode-swappable roles reference the per-mode vars above. */\n@theme inline {\n${inlineAll.join('\n')}\n}`,
    );
  }
  parts.push(`@theme {\n${themeStatic.join('\n\n')}\n}`);

  return { css: parts.join('\n\n') + '\n' };
}
