import { converter, parse } from 'culori';
import {
  HARDCODED_RADIUS,
  HARDCODED_SHADOWS,
} from '@/constants/hardcodedTokens';
import { SEMANTIC_ROLES } from '@/constants/semanticRoles';
import { SHADE_STEPS, type TokenState } from '@/types/tokens';
import { resolveSemanticColor } from '@/store/tokenStore';

const toRgb = converter('rgb');

function slugifyName(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'palette'
  );
}

function hexToRgbTriplet(input: string | null): string | null {
  if (!input) return null;
  const parsed = parse(input);
  if (!parsed) return null;
  const rgb = toRgb(parsed);
  if (!rgb) return null;
  const r = Math.round(rgb.r * 255);
  const g = Math.round(rgb.g * 255);
  const b = Math.round(rgb.b * 255);
  return `${r} ${g} ${b}`;
}

function indent(text: string, depth: number): string {
  const pad = '  '.repeat(depth);
  return text
    .split('\n')
    .map((line) => (line.length ? pad + line : line))
    .join('\n');
}

function toJsObjectLiteral(value: unknown, depth = 0): string {
  if (typeof value === 'string') {
    return JSON.stringify(value);
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value
      .map((v) => indent(toJsObjectLiteral(v, depth + 1), 1))
      .join(',\n');
    return `[\n${items}\n${'  '.repeat(depth)}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    const lines = entries.map(([k, v]) => {
      const key = /^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
      return indent(`${key}: ${toJsObjectLiteral(v, depth + 1)}`, 1);
    });
    return `{\n${lines.join(',\n')}\n${'  '.repeat(depth)}}`;
  }
  return 'null';
}

export interface ExportResult {
  config: string;
  css: string;
}

export function exportTailwindV3(state: TokenState): ExportResult {
  const colors: Record<string, Record<string, string>> = {};
  for (const palette of state.palettes) {
    const slug = slugifyName(palette.name);
    colors[palette.name] = {
      DEFAULT: `var(--${slug}-base)`,
    };
    for (const shade of SHADE_STEPS) {
      colors[palette.name][shade] = `var(--${slug}-${shade})`;
    }
  }

  const semanticColors: Record<string, string> = {};
  for (const role of SEMANTIC_ROLES) {
    semanticColors[role.id] = `rgb(var(--${role.id}) / <alpha-value>)`;
  }

  // Qualitative data palette → --data-1, --data-2, … (one entry per slot,
  // resolved per mode). Slots that don't resolve are skipped, keeping the rest
  // at their slot-based number.
  const dataColors: Record<string, string> = {};
  const dataLightLines: string[] = [];
  const dataDarkLines: string[] = [];
  for (let i = 0; i < state.data.light.length; i++) {
    const n = i + 1;
    const lightTriplet = hexToRgbTriplet(
      resolveSemanticColor(state.data.light[i] ?? undefined, state.palettes),
    );
    const darkTriplet = hexToRgbTriplet(
      resolveSemanticColor(state.data.dark[i] ?? undefined, state.palettes),
    );
    if (lightTriplet || darkTriplet) {
      dataColors[`data-${n}`] = `rgb(var(--data-${n}) / <alpha-value>)`;
    }
    if (lightTriplet) dataLightLines.push(`  --data-${n}: ${lightTriplet};`);
    if (darkTriplet) dataDarkLines.push(`  --data-${n}: ${darkTriplet};`);
  }

  const fontFamily = {
    sans: state.typography.fontFamilySans
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    serif: state.typography.fontFamilySerif
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    mono: state.typography.fontFamilyMono
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  };

  const themeExtend = {
    colors: {
      ...semanticColors,
      ...dataColors,
      ...colors,
    },
    fontFamily,
    fontSize: state.typography.fontSizeScale,
    fontWeight: state.typography.fontWeightScale,
    lineHeight: state.typography.lineHeightScale,
    spacing: state.spacing.scale,
    borderRadius: { ...HARDCODED_RADIUS },
    boxShadow: { ...HARDCODED_SHADOWS },
  };

  const config = `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: ${indent(toJsObjectLiteral(themeExtend), 2).trimStart()},
  },
  plugins: [],
};
`;

  const primitiveLines: string[] = [];
  for (const palette of state.palettes) {
    primitiveLines.push(`  --${slugifyName(palette.name)}-base: ${palette.baseColor};`);
    for (const shade of SHADE_STEPS) {
      primitiveLines.push(
        `  --${slugifyName(palette.name)}-${shade}: ${palette.scale[shade]};`,
      );
    }
  }

  const lightLines: string[] = [];
  const darkLines: string[] = [];
  for (const role of SEMANTIC_ROLES) {
    const lightTriplet = hexToRgbTriplet(
      resolveSemanticColor(state.semantic.light[role.id], state.palettes),
    );
    const darkTriplet = hexToRgbTriplet(
      resolveSemanticColor(state.semantic.dark[role.id], state.palettes),
    );
    if (lightTriplet) lightLines.push(`  --${role.id}: ${lightTriplet};`);
    if (darkTriplet) darkLines.push(`  --${role.id}: ${darkTriplet};`);
  }

  // Radius and typography are mode-independent, so they live only in :root.
  const radiusLines = Object.entries(HARDCODED_RADIUS).map(
    ([key, value]) => `  --radius-${key}: ${value};`,
  );

  const fontLines = [
    `  --font-sans: ${state.typography.fontFamilySans};`,
    `  --font-serif: ${state.typography.fontFamilySerif};`,
    `  --font-mono: ${state.typography.fontFamilyMono};`,
  ];
  for (const [key, value] of Object.entries(state.typography.fontSizeScale)) {
    fontLines.push(`  --font-size-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(state.typography.fontWeightScale)) {
    fontLines.push(`  --font-weight-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(state.typography.lineHeightScale)) {
    fontLines.push(`  --line-height-${key}: ${value};`);
  }

  // Only emit the data section when at least one slot resolves.
  const dataLightBlock = dataLightLines.length
    ? `\n\n  /* Data palette */\n${dataLightLines.join('\n')}`
    : '';
  const dataDarkBlock = dataDarkLines.length
    ? `\n\n  /* Data palette */\n${dataDarkLines.join('\n')}`
    : '';

  const css = `/* Generated by Design Token Selector */
@layer base {
  :root {
  /* Primitive palettes */
${primitiveLines.join('\n')}

  /* Semantic colors */
${lightLines.join('\n')}${dataLightBlock}

  /* Radius */
${radiusLines.join('\n')}

  /* Typography */
${fontLines.join('\n')}
  }

  .dark {
${darkLines.join('\n')}${dataDarkBlock}
  }
}
`;

  return { config, css };
}
