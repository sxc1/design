import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  MAX_DATA_COLORS,
  MIN_DATA_COLORS,
  SHADE_STEPS,
  type DataReference,
  type PreviewMode,
  type PrimitivePalette,
  type SemanticMap,
  type SemanticReference,
  type SemanticRoleId,
  type ShadeRef,
  type ShadeStep,
  type SpacingTokens,
  type TokenState,
  type TypographyTokens,
} from '@/types/tokens';
import {
  generateScale,
  resolveScale,
  sortPalettesByColor,
  toHexSafe,
} from '@/lib/colorScale';
import { SXC1_PRESET, SXC1_SEMANTIC_PICKS } from '@/constants/sxc1Preset';
import { importCssTokens, type ImportSummary } from '@/lib/importCss';

const DEFAULT_TYPOGRAPHY: TypographyTokens = {
  fontFamilySans:
    'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontFamilySerif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  fontFamilyMono:
    'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  fontSizeScale: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeightScale: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeightScale: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};

const DEFAULT_SPACING: SpacingTokens = {
  baseUnitPx: 4,
  scale: {
    px: '1px',
    '0': '0px',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
  },
};

function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function buildPalette(name: string, baseColor: string): PrimitivePalette {
  return {
    id: newId(),
    name,
    baseColor,
    scale: generateScale(baseColor),
    overrides: {},
  };
}

const DEFAULT_PALETTES: PrimitivePalette[] = [
  buildPalette('brand', '#3b82f6'),
  buildPalette('neutral', '#64748b'),
  buildPalette('destructive', '#ef4444'),
];
const BASIC_NEUTRAL_PRESET = [{ name: 'neutral', baseColor: '#64748b' }] as const;

// Primitive palettes backing the qualitative data palette. Each base color is
// the swatch its data role should read as; light and dark then each pick the
// 50…950 step whose generated lightness lands closest to the intended swatch.
const DATA_PALETTE_DEFS: { name: string; baseColor: string }[] = [
  // Dark-mode rainbow set.
  { name: 'rainbow-lilac', baseColor: '#c799ff' },
  { name: 'rainbow-mint', baseColor: '#72dbc8' },
  { name: 'rainbow-coral', baseColor: '#ff7893' },
  { name: 'rainbow-blue', baseColor: '#4f8dff' },
  // Light-mode additions (rainbow-lilac above is shared between the modes).
  { name: 'turquoise', baseColor: '#26bfc9' },
  { name: 'rainbow-peach', baseColor: '#fc9253' },
  { name: 'crimson', baseColor: '#8c316e' },
];

interface DataRoleSpec {
  name: string;
  shade: ShadeRef;
}

// Default data roles per mode → {palette, shade}. rainbow-lilac is shared, so
// each mode references a different shade of it.
const DATA_LIGHT_SPECS: DataRoleSpec[] = [
  { name: 'turquoise', shade: 400 }, // ≈ #26bfc9
  { name: 'rainbow-lilac', shade: 500 }, // ≈ #b073ff (nearest shade of the shared palette)
  { name: 'rainbow-peach', shade: 400 }, // ≈ #fc9253
  { name: 'crimson', shade: 700 }, // ≈ #8c316e
];
const DATA_DARK_SPECS: DataRoleSpec[] = [
  { name: 'rainbow-lilac', shade: 400 },
  { name: 'rainbow-mint', shade: 300 },
  { name: 'rainbow-coral', shade: 400 },
  { name: 'rainbow-blue', shade: 500 },
];

// Merged Carbon palettes for Basic with per-series base chosen by request:
// purple: dark, cyan: light, teal: dark, magenta: light.
const BASIC_CARBON_DATA_PALETTE_DEFS: { name: string; baseColor: string }[] = [
  { name: 'cds-purple', baseColor: '#8a3ffc' },
  { name: 'cds-cyan', baseColor: '#1192e8' },
  { name: 'cds-teal', baseColor: '#007d79' },
  { name: 'cds-magenta', baseColor: '#9f1853' },
];

// Opposite-mode shades are the nearest matches from the generated scale.
const BASIC_CARBON_LIGHT_SPECS: DataRoleSpec[] = [
  { name: 'cds-purple', shade: 700 }, // closest to Purple 70 from purple-dark base
  { name: 'cds-cyan', shade: 'base' }, // cyan-light base
  { name: 'cds-teal', shade: 700 }, // closest to Teal 70 from teal-dark base
  { name: 'cds-magenta', shade: 'base' }, // magenta-light base
];
const BASIC_CARBON_DARK_SPECS: DataRoleSpec[] = [
  { name: 'cds-purple', shade: 'base' }, // purple-dark base
  { name: 'cds-cyan', shade: 400 }, // closest to Cyan 40 from cyan-light base
  { name: 'cds-teal', shade: 'base' }, // teal-dark base
  { name: 'cds-magenta', shade: 400 }, // closest to Magenta 40 from magenta-light base
];

const DATA_PALETTES: PrimitivePalette[] = DATA_PALETTE_DEFS.map((d) =>
  buildPalette(d.name, d.baseColor),
);

function ref(paletteId: string, shade: ShadeRef): SemanticReference {
  return { paletteId, shade };
}

// Build the default data references for both modes from a name→palette lookup.
// Used for the initial state and the migration, where the palettes may have
// been merged into an existing set.
function buildDefaultData(byName: Map<string, PrimitivePalette>): {
  light: DataReference[];
  dark: DataReference[];
} {
  return buildDataFromSpecs(byName, DATA_LIGHT_SPECS, DATA_DARK_SPECS);
}

function buildBasicData(byName: Map<string, PrimitivePalette>): {
  light: DataReference[];
  dark: DataReference[];
} {
  return buildDataFromSpecs(byName, BASIC_CARBON_LIGHT_SPECS, BASIC_CARBON_DARK_SPECS);
}

function buildDataFromSpecs(
  byName: Map<string, PrimitivePalette>,
  lightSpecs: DataRoleSpec[],
  darkSpecs: DataRoleSpec[],
): {
  light: DataReference[];
  dark: DataReference[];
} {
  const build = (specs: DataRoleSpec[]): DataReference[] =>
    specs.map((s) => {
      const palette = byName.get(s.name);
      return palette ? ref(palette.id, s.shade) : null;
    });
  return { light: build(lightSpecs), dark: build(darkSpecs) };
}

// A sensible default reference for a newly added data slot: cycle through the
// dark rainbow set, falling back to the first available palette (or unassigned).
function defaultDataRef(palettes: PrimitivePalette[], index: number): DataReference {
  const spec = DATA_DARK_SPECS[index % DATA_DARK_SPECS.length];
  const named = palettes.find((p) => p.name === spec.name);
  if (named) return ref(named.id, spec.shade);
  const first = palettes[0];
  return first ? ref(first.id, 500) : null;
}

function buildDefaultSemantics(palettes: PrimitivePalette[]): {
  light: SemanticMap;
  dark: SemanticMap;
} {
  const brand = palettes[0];
  const neutral = palettes[1];
  const destructive = palettes[2];

  const light: SemanticMap = {
    background: ref(neutral.id, 50),
    foreground: ref(neutral.id, 900),
    card: ref(neutral.id, 50),
    'card-foreground': ref(neutral.id, 900),
    primary: ref(brand.id, 600),
    'primary-foreground': ref(neutral.id, 50),
    secondary: ref(neutral.id, 100),
    'secondary-foreground': ref(neutral.id, 900),
    muted: ref(neutral.id, 100),
    'muted-foreground': ref(neutral.id, 500),
    accent: ref(brand.id, 100),
    'accent-foreground': ref(brand.id, 900),
    destructive: ref(destructive.id, 600),
    'destructive-foreground': ref(neutral.id, 50),
    border: ref(neutral.id, 200),
    input: ref(neutral.id, 200),
    ring: ref(brand.id, 500),
  };

  const dark: SemanticMap = {
    background: ref(neutral.id, 950),
    foreground: ref(neutral.id, 50),
    card: ref(neutral.id, 900),
    'card-foreground': ref(neutral.id, 50),
    primary: ref(brand.id, 500),
    'primary-foreground': ref(neutral.id, 950),
    secondary: ref(neutral.id, 800),
    'secondary-foreground': ref(neutral.id, 50),
    muted: ref(neutral.id, 800),
    'muted-foreground': ref(neutral.id, 400),
    accent: ref(brand.id, 800),
    'accent-foreground': ref(brand.id, 100),
    destructive: ref(destructive.id, 500),
    'destructive-foreground': ref(neutral.id, 50),
    border: ref(neutral.id, 800),
    input: ref(neutral.id, 800),
    ring: ref(brand.id, 400),
  };

  return { light, dark };
}

const DEFAULT_SEMANTICS = buildDefaultSemantics(DEFAULT_PALETTES);
const DEFAULT_DATA = buildDefaultData(new Map(DATA_PALETTES.map((p) => [p.name, p])));

// Merge a preset's palettes into the existing set without dropping any: an
// existing palette with the same name is reused as-is, missing ones are added.
// Returns the merged list plus a name→palette lookup for seeding semantics.
function mergePresetPalettes(
  existing: PrimitivePalette[],
  entries: { name: string; baseColor: string }[],
): { palettes: PrimitivePalette[]; byName: Map<string, PrimitivePalette> } {
  const byName = new Map(existing.map((p) => [p.name, p]));
  const added: PrimitivePalette[] = [];
  for (const entry of entries) {
    if (byName.has(entry.name)) continue;
    const palette = buildPalette(entry.name, entry.baseColor);
    byName.set(palette.name, palette);
    added.push(palette);
  }
  return {
    palettes: sortPalettesByColor([...existing, ...added]),
    byName,
  };
}

function buildSxc1State(prev: TokenState): TokenState {
  const { palettes, byName } = mergePresetPalettes(prev.palettes, [
    ...BASIC_NEUTRAL_PRESET,
    ...SXC1_PRESET,
  ]);
  const brand = byName.get(SXC1_SEMANTIC_PICKS.brand)!;
  const neutral = byName.get(SXC1_SEMANTIC_PICKS.neutral)!;
  const destructive = byName.get(SXC1_SEMANTIC_PICKS.destructive)!;
  return {
    ...prev,
    palettes,
    semantic: buildDefaultSemantics([brand, neutral, destructive]),
    data: buildDefaultData(byName),
  };
}

const INITIAL_STATE: TokenState = {
  // Semantics are built from DEFAULT_PALETTES by index above; the stored array
  // is sorted by color (references are by id, so resolution is unaffected). The
  // rainbow data palettes are added alongside so the data roles resolve.
  palettes: sortPalettesByColor([...DEFAULT_PALETTES, ...DATA_PALETTES]),
  semantic: DEFAULT_SEMANTICS,
  data: DEFAULT_DATA,
  typography: DEFAULT_TYPOGRAPHY,
  spacing: DEFAULT_SPACING,
  previewMode: 'light',
  previewScreen: 'dashboard',
};

export interface TokenActions {
  addPalette: (name: string, baseColor: string) => void;
  removePalette: (id: string) => void;
  renamePalette: (id: string, name: string) => void;
  setPaletteBaseColor: (id: string, baseColor: string) => void;
  sortPalettes: () => void;
  setShadeOverride: (id: string, shade: ShadeStep, value: string | null) => void;
  resetPaletteOverrides: (id: string) => void;

  setSemantic: (
    mode: PreviewMode,
    role: SemanticRoleId,
    reference: SemanticReference,
  ) => void;
  clearSemantic: (mode: PreviewMode, role: SemanticRoleId) => void;

  setDataColor: (
    mode: PreviewMode,
    index: number,
    reference: DataReference,
  ) => void;
  addDataColor: () => void;
  removeDataColor: () => void;

  setTypographyFamily: (
    which: 'fontFamilySans' | 'fontFamilySerif' | 'fontFamilyMono',
    value: string,
  ) => void;
  setFontSize: (key: string, value: string) => void;
  removeFontSize: (key: string) => void;
  addFontSize: (key: string, value: string) => void;
  setFontWeight: (key: string, value: number) => void;
  setLineHeight: (key: string, value: string) => void;

  setSpacingBaseUnit: (px: number) => void;
  setSpacing: (key: string, value: string) => void;
  addSpacing: (key: string, value: string) => void;
  removeSpacing: (key: string) => void;

  setPreviewMode: (mode: PreviewMode) => void;
  setPreviewScreen: (id: string) => void;
  clearAll: () => void;
  loadBasicPreset: () => void;
  loadSxc1Preset: () => void;
  loadExpPreset: () => void;
  importFromCss: (css: string) => ImportSummary | null;
}

export type TokenStore = TokenState & TokenActions;

export const useTokenStore = create<TokenStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      addPalette: (name, baseColor) =>
        set((state) => ({
          palettes: sortPalettesByColor([
            ...state.palettes,
            buildPalette(name, baseColor),
          ]),
        })),

      removePalette: (id) =>
        set((state) => ({
          palettes: state.palettes.filter((p) => p.id !== id),
          semantic: {
            light: stripPaletteRefs(state.semantic.light, id),
            dark: stripPaletteRefs(state.semantic.dark, id),
          },
          data: {
            light: stripPaletteDataRefs(state.data.light, id),
            dark: stripPaletteDataRefs(state.data.dark, id),
          },
        })),

      renamePalette: (id, name) =>
        set((state) => ({
          palettes: state.palettes.map((p) => (p.id === id ? { ...p, name } : p)),
        })),

      // Update in place WITHOUT re-sorting. Re-sorting on every edit would
      // reorder the list mid-keystroke and steal focus from the field being
      // edited; the user re-sorts explicitly via the card's "Confirm" button
      // (sortPalettes).
      setPaletteBaseColor: (id, baseColor) =>
        set((state) => ({
          palettes: state.palettes.map((p) =>
            p.id === id
              ? {
                  ...p,
                  baseColor,
                  scale: resolveScale(baseColor, p.overrides),
                }
              : p,
          ),
        })),

      sortPalettes: () =>
        set((state) => ({ palettes: sortPalettesByColor(state.palettes) })),

      setShadeOverride: (id, shade, value) =>
        set((state) => ({
          palettes: state.palettes.map((p) => {
            if (p.id !== id) return p;
            const overrides = { ...p.overrides };
            if (value === null || value === '') {
              delete overrides[shade];
            } else {
              overrides[shade] = value;
            }
            return {
              ...p,
              overrides,
              scale: resolveScale(p.baseColor, overrides),
            };
          }),
        })),

      resetPaletteOverrides: (id) =>
        set((state) => ({
          palettes: state.palettes.map((p) =>
            p.id === id
              ? { ...p, overrides: {}, scale: generateScale(p.baseColor) }
              : p,
          ),
        })),

      setSemantic: (mode, role, reference) =>
        set((state) => ({
          semantic: {
            ...state.semantic,
            [mode]: { ...state.semantic[mode], [role]: reference },
          },
        })),

      clearSemantic: (mode, role) =>
        set((state) => {
          const next = { ...state.semantic[mode] };
          delete next[role];
          return { semantic: { ...state.semantic, [mode]: next } };
        }),

      setDataColor: (mode, index, reference) =>
        set((state) => {
          if (index < 0 || index >= state.data[mode].length) return {};
          const next = [...state.data[mode]];
          next[index] = reference;
          return { data: { ...state.data, [mode]: next } };
        }),

      // Slot count is shared across modes, so add/remove operate on both.
      addDataColor: () =>
        set((state) => {
          if (state.data.light.length >= MAX_DATA_COLORS) return {};
          const next = defaultDataRef(state.palettes, state.data.light.length);
          return {
            data: {
              light: [...state.data.light, next],
              dark: [...state.data.dark, next ? { ...next } : null],
            },
          };
        }),

      removeDataColor: () =>
        set((state) => {
          if (state.data.light.length <= MIN_DATA_COLORS) return {};
          return {
            data: {
              light: state.data.light.slice(0, -1),
              dark: state.data.dark.slice(0, -1),
            },
          };
        }),

      setTypographyFamily: (which, value) =>
        set((state) => ({
          typography: { ...state.typography, [which]: value },
        })),

      setFontSize: (key, value) =>
        set((state) => ({
          typography: {
            ...state.typography,
            fontSizeScale: { ...state.typography.fontSizeScale, [key]: value },
          },
        })),

      removeFontSize: (key) =>
        set((state) => {
          const next = { ...state.typography.fontSizeScale };
          delete next[key];
          return {
            typography: { ...state.typography, fontSizeScale: next },
          };
        }),

      addFontSize: (key, value) =>
        set((state) => ({
          typography: {
            ...state.typography,
            fontSizeScale: { ...state.typography.fontSizeScale, [key]: value },
          },
        })),

      setFontWeight: (key, value) =>
        set((state) => ({
          typography: {
            ...state.typography,
            fontWeightScale: { ...state.typography.fontWeightScale, [key]: value },
          },
        })),

      setLineHeight: (key, value) =>
        set((state) => ({
          typography: {
            ...state.typography,
            lineHeightScale: { ...state.typography.lineHeightScale, [key]: value },
          },
        })),

      setSpacingBaseUnit: (px) =>
        set((state) => ({
          spacing: { ...state.spacing, baseUnitPx: px },
        })),

      setSpacing: (key, value) =>
        set((state) => ({
          spacing: {
            ...state.spacing,
            scale: { ...state.spacing.scale, [key]: value },
          },
        })),

      addSpacing: (key, value) =>
        set((state) => ({
          spacing: {
            ...state.spacing,
            scale: { ...state.spacing.scale, [key]: value },
          },
        })),

      removeSpacing: (key) =>
        set((state) => {
          const next = { ...state.spacing.scale };
          delete next[key];
          return { spacing: { ...state.spacing, scale: next } };
        }),

      setPreviewMode: (mode) => set({ previewMode: mode }),

      setPreviewScreen: (id) => set({ previewScreen: id }),

      clearAll: () =>
        set({
          palettes: [],
          semantic: { light: {}, dark: {} },
          // Keep the minimum number of (unassigned) data slots.
          data: {
            light: Array.from({ length: MIN_DATA_COLORS }, () => null),
            dark: Array.from({ length: MIN_DATA_COLORS }, () => null),
          },
          previewMode: INITIAL_STATE.previewMode,
          previewScreen: INITIAL_STATE.previewScreen,
        }),

      loadBasicPreset: () =>
        set((state) => {
          const { palettes, byName } = mergePresetPalettes(
            state.palettes,
            [...DEFAULT_PALETTES, ...BASIC_CARBON_DATA_PALETTE_DEFS],
          );
          const basics = DEFAULT_PALETTES.map((p) => byName.get(p.name)!);
          return {
            ...state,
            palettes,
            semantic: buildDefaultSemantics(basics),
            data: buildBasicData(byName),
          };
        }),

      loadSxc1Preset: () => set((state) => buildSxc1State(state)),
      loadExpPreset: () => set((state) => buildSxc1State(state)),

      importFromCss: (css) => {
        const result = importCssTokens(css, get());
        if (!result) return null;
        set(result.patch);
        return result.summary;
      },
    }),
    {
      name: 'design-token-selector',
      version: 4,
      // v2 sorts palettes by color; v3 introduced the qualitative data palette;
      // v4 gives it distinct light/dark defaults, so re-seed when below v4.
      migrate: (persisted, version) => {
        const state = persisted as Partial<TokenState> | undefined;
        if (state) {
          if (Array.isArray(state.palettes)) {
            state.palettes = sortPalettesByColor(state.palettes);
          }
          // Seed/refresh the data palette: merge its backing palettes into the
          // existing set (reusing any with matching names) and re-point the data
          // roles at them.
          if (
            version < 4 ||
            !state.data ||
            !Array.isArray(state.data.light) ||
            !Array.isArray(state.data.dark)
          ) {
            const existing = Array.isArray(state.palettes) ? state.palettes : [];
            const { palettes, byName } = mergePresetPalettes(
              existing,
              DATA_PALETTE_DEFS,
            );
            state.palettes = palettes;
            state.data = buildDefaultData(byName);
          }
        }
        return state as TokenStore;
      },
    },
  ),
);

function stripPaletteRefs(map: SemanticMap, paletteId: string): SemanticMap {
  const next: SemanticMap = {};
  for (const key of Object.keys(map) as SemanticRoleId[]) {
    const value = map[key];
    if (value && value.paletteId !== paletteId) {
      next[key] = value;
    }
  }
  return next;
}

// Null out (but keep) any data slots that pointed at a deleted palette, so the
// slot count — and the --data-N numbering — stays stable.
function stripPaletteDataRefs(
  refs: DataReference[],
  paletteId: string,
): DataReference[] {
  return refs.map((r) => (r && r.paletteId === paletteId ? null : r));
}

export function resolveSemanticColor(
  reference: SemanticReference | undefined,
  palettes: PrimitivePalette[],
): string | null {
  if (!reference) return null;
  const palette = palettes.find((p) => p.id === reference.paletteId);
  if (!palette) return null;
  if (reference.shade === 'base') return toHexSafe(palette.baseColor);
  return palette.scale[reference.shade] ?? null;
}

export function getPaletteShadeLabel(
  reference: SemanticReference | undefined,
  palettes: PrimitivePalette[],
): string {
  if (!reference) return 'Unassigned';
  const palette = palettes.find((p) => p.id === reference.paletteId);
  if (!palette) return 'Unassigned';
  return `${palette.name}.${reference.shade}`;
}

export { SHADE_STEPS };
