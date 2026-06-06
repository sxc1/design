import { converter, formatHex, parse } from 'culori';
import {
  SHADE_STEPS,
  type PrimitivePalette,
  type SemanticMap,
  type SemanticReference,
  type SemanticRoleId,
  type ShadeRef,
  type ShadeScale,
  type ShadeStep,
  type TokenState,
} from '@/types/tokens';
import { generateScale, paletteShadeEntries, sortPalettesByColor } from '@/lib/colorScale';
import { SEMANTIC_ROLES } from '@/constants/semanticRoles';

const ROLE_IDS = new Set<string>(SEMANTIC_ROLES.map((r) => r.id));
const SHADE_SUFFIXES = SHADE_STEPS.map(String);
const toOklab = converter('oklab');

/** Per-slug primitive data lifted out of a CSS file. */
interface PrimitiveEntry {
  base?: string;
  shades: Partial<ShadeScale>;
}

export interface ParsedCssTokens {
  primitives: Map<string, PrimitiveEntry>;
  semanticLight: Partial<Record<SemanticRoleId, string>>;
  semanticDark: Partial<Record<SemanticRoleId, string>>;
}

export interface ImportSummary {
  /** Palettes built from imported primitive variables. */
  paletteCount: number;
  /** Palettes synthesized to hold imported semantic colors. */
  synthesizedCount: number;
  lightRoleCount: number;
  darkRoleCount: number;
  hasPrimitives: boolean;
  hasSemantics: boolean;
}

export interface ImportResult {
  patch: Partial<Pick<TokenState, 'palettes' | 'semantic'>>;
  summary: ImportSummary;
}

function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function makePalette(name: string, baseColor: string): PrimitivePalette {
  return {
    id: newId(),
    name,
    baseColor,
    scale: generateScale(baseColor),
    overrides: {},
  };
}

/**
 * Normalize any CSS color value we might find to a hex string. Handles hex,
 * `rgb()`/`hsl()`/named colors, and the bare space/comma-separated triplets the
 * shadcn convention uses — RGB (`255 255 255`, this app's export) or HSL
 * (`0 0% 100%`, stock shadcn), told apart by the presence of a `%`.
 */
function cssValueToHex(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;

  const direct = parse(value);
  if (direct) return formatHex(direct) ?? null;

  const parts = value.split(/[\s,]+/).filter(Boolean);
  if (parts.length === 3) {
    const isHsl = parts[1].includes('%') || parts[2].includes('%');
    const fn = isHsl
      ? `hsl(${parts[0]} ${parts[1]} ${parts[2]})`
      : `rgb(${parts[0]} ${parts[1]} ${parts[2]})`;
    const parsed = parse(fn);
    if (parsed) return formatHex(parsed) ?? null;
  }
  return null;
}

/** Collect the bodies of every block matching a bare selector (no nesting). */
function blockBodies(css: string, selector: string): string {
  const bodies: string[] = [];
  let from = 0;
  for (;;) {
    const sel = css.indexOf(selector, from);
    if (sel === -1) break;
    const open = css.indexOf('{', sel);
    if (open === -1) break;
    const close = css.indexOf('}', open);
    if (close === -1) break;
    bodies.push(css.slice(open + 1, close));
    from = close + 1;
  }
  return bodies.join('\n');
}

function parseDecls(body: string): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  const re = /--([\w-]+)\s*:\s*([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    out.push([m[1], m[2].trim()]);
  }
  return out;
}

type Classification =
  | { kind: 'semantic'; role: SemanticRoleId }
  | { kind: 'primitive'; slug: string; shade: ShadeRef }
  | null;

function classify(name: string): Classification {
  if (ROLE_IDS.has(name)) return { kind: 'semantic', role: name as SemanticRoleId };
  const m = name.match(/^(.+)-(base|\d{2,3})$/);
  if (m && (m[2] === 'base' || SHADE_SUFFIXES.includes(m[2]))) {
    const shade: ShadeRef = m[2] === 'base' ? 'base' : (Number(m[2]) as ShadeStep);
    return { kind: 'primitive', slug: m[1], shade };
  }
  return null;
}

function readSemantics(body: string): Partial<Record<SemanticRoleId, string>> {
  const out: Partial<Record<SemanticRoleId, string>> = {};
  for (const [name, value] of parseDecls(body)) {
    const c = classify(name);
    if (c?.kind !== 'semantic') continue;
    const hex = cssValueToHex(value);
    if (hex) out[c.role] = hex;
  }
  return out;
}

export function parseCssTokens(css: string): ParsedCssTokens {
  const hasRoot = css.includes(':root');
  const hasDark = css.includes('.dark');
  // Fall back to treating the whole file as a single light block when it has no
  // recognizable selector wrappers (just a bag of declarations).
  const lightBody = hasRoot || hasDark ? blockBodies(css, ':root') : css;
  const darkBody = blockBodies(css, '.dark');

  const primitives = new Map<string, PrimitiveEntry>();
  for (const [name, value] of parseDecls(lightBody)) {
    const c = classify(name);
    if (c?.kind !== 'primitive') continue;
    const hex = cssValueToHex(value);
    if (!hex) continue;
    const entry = primitives.get(c.slug) ?? { shades: {} };
    if (c.shade === 'base') {
      entry.base = hex;
    } else {
      entry.shades[c.shade] = hex;
    }
    primitives.set(c.slug, entry);
  }

  return {
    primitives,
    semanticLight: readSemantics(lightBody),
    semanticDark: readSemantics(darkBody),
  };
}

function colorDistance(aHex: string, bHex: string): number {
  const a = toOklab(parse(aHex) ?? undefined);
  const b = toOklab(parse(bHex) ?? undefined);
  if (!a || !b) return Infinity;
  const dl = a.l - b.l;
  const da = a.a - b.a;
  const db = a.b - b.b;
  return dl * dl + da * da + db * db;
}

interface Match {
  ref: SemanticReference;
  dist: number;
}

/** Find the palette + shade whose color is perceptually closest to `hex`. */
function nearestMatch(hex: string, palettes: PrimitivePalette[]): Match | null {
  let best: Match | null = null;
  for (const palette of palettes) {
    for (const entry of paletteShadeEntries(palette)) {
      const dist = colorDistance(hex, entry.color);
      if (!best || dist < best.dist) {
        best = { ref: { paletteId: palette.id, shade: entry.shade }, dist };
      }
    }
  }
  return best;
}

// Squared OKLab distance below which two colors are treated as the same. ~1e-5
// only collapses colors that differ by at most one 8-bit RGB level — visually
// indistinguishable — so genuinely distinct theme colors still each get a
// palette while round-trips and trivial duplicates reuse an existing shade.
const SAME_COLOR_EPSILON = 1e-5;

function uniqueName(base: string, used: Set<string>): string {
  let name = base;
  let i = 2;
  while (used.has(name)) name = `${base}-${i++}`;
  return name;
}

/**
 * Re-point a semantic map's references onto a freshly built palette set by
 * matching palette names, so roles that weren't in the imported file survive a
 * primitive swap instead of dangling. References whose palette name disappeared
 * are dropped.
 */
function remapByName(
  map: SemanticMap,
  oldNameById: Map<string, string>,
  newByName: Map<string, PrimitivePalette>,
): SemanticMap {
  const out: SemanticMap = {};
  for (const role of Object.keys(map) as SemanticRoleId[]) {
    const ref = map[role];
    if (!ref) continue;
    const name = oldNameById.get(ref.paletteId);
    const next = name ? newByName.get(name) : undefined;
    if (next) out[role] = { paletteId: next.id, shade: ref.shade };
  }
  return out;
}

export function buildImportPatch(
  parsed: ParsedCssTokens,
  current: TokenState,
): ImportResult | null {
  const hasPrimitives = parsed.primitives.size > 0;
  const hasSemantics =
    Object.keys(parsed.semanticLight).length > 0 ||
    Object.keys(parsed.semanticDark).length > 0;
  if (!hasPrimitives && !hasSemantics) return null;

  let newPalettes: PrimitivePalette[] | null = null;
  if (hasPrimitives) {
    const built: PrimitivePalette[] = [];
    for (const [slug, info] of parsed.primitives) {
      // Use the base color; otherwise treat shade 500 as the base. The rest of
      // the 50…950 scale is regenerated, never imported.
      const base = info.base ?? info.shades[500];
      if (!base) continue;
      built.push(makePalette(slug, base));
    }
    if (built.length > 0) newPalettes = sortPalettesByColor(built);
  }

  const basePalettes = newPalettes ?? current.palettes;

  // Seed the next semantic map. When primitives were replaced, carry existing
  // references across by palette name; otherwise keep them as-is.
  let light: SemanticMap;
  let dark: SemanticMap;
  if (newPalettes) {
    const oldNameById = new Map(current.palettes.map((p) => [p.id, p.name]));
    const newByName = new Map(newPalettes.map((p) => [p.name, p]));
    light = remapByName(current.semantic.light, oldNameById, newByName);
    dark = remapByName(current.semantic.dark, oldNameById, newByName);
  } else {
    light = { ...current.semantic.light };
    dark = { ...current.semantic.dark };
  }

  // Resolve each imported semantic color to a reference. Reuse a palette shade
  // — from an existing/imported palette or one already synthesized — when it
  // matches within SAME_COLOR_EPSILON (round-trips, shared colors, and trivial
  // duplicates); otherwise synthesize a base-referenced palette so the color is
  // reproduced. Matching against already-synthesized shades keeps the palette
  // count down when imported colors coincide.
  const synthesized: PrimitivePalette[] = [];
  const usedNames = new Set(basePalettes.map((p) => p.name));

  function refForColor(hex: string, roleName: string): SemanticReference {
    const match = nearestMatch(hex, [...basePalettes, ...synthesized]);
    if (match && match.dist <= SAME_COLOR_EPSILON) return match.ref;
    const palette = makePalette(uniqueName(roleName, usedNames), hex);
    usedNames.add(palette.name);
    synthesized.push(palette);
    return { paletteId: palette.id, shade: 'base' };
  }

  // Iterate in role order so the first role to introduce a color names its
  // palette; light before dark for stable, sensible names.
  for (const role of SEMANTIC_ROLES) {
    const lc = parsed.semanticLight[role.id];
    if (lc) light[role.id] = refForColor(lc, role.id);
  }
  for (const role of SEMANTIC_ROLES) {
    const dc = parsed.semanticDark[role.id];
    if (dc) dark[role.id] = refForColor(dc, role.id);
  }

  const patch: Partial<Pick<TokenState, 'palettes' | 'semantic'>> = {
    semantic: { light, dark },
  };
  if (newPalettes || synthesized.length > 0) {
    patch.palettes = sortPalettesByColor([...basePalettes, ...synthesized]);
  }

  return {
    patch,
    summary: {
      paletteCount: newPalettes?.length ?? 0,
      synthesizedCount: synthesized.length,
      lightRoleCount: Object.keys(parsed.semanticLight).length,
      darkRoleCount: Object.keys(parsed.semanticDark).length,
      hasPrimitives,
      hasSemantics,
    },
  };
}

export function importCssTokens(
  css: string,
  current: TokenState,
): ImportResult | null {
  return buildImportPatch(parseCssTokens(css), current);
}
