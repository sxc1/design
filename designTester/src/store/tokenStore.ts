import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  SHADE_STEPS,
  type PreviewMode,
  type PrimitivePalette,
  type SemanticMap,
  type SemanticReference,
  type SemanticRoleId,
  type ShadeStep,
  type SpacingTokens,
  type TokenState,
  type TypographyTokens,
} from '@/types/tokens';
import { generateScale, resolveScale, sortPalettesByColor } from '@/lib/colorScale';
import { SXC1_PRESET, SXC1_SEMANTIC_PICKS } from '@/constants/sxc1Preset';

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

function ref(paletteId: string, shade: ShadeStep): SemanticReference {
  return { paletteId, shade };
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

function buildSxc1State(prev: TokenState): TokenState {
  const palettes = SXC1_PRESET.map((entry) =>
    buildPalette(entry.name, entry.baseColor),
  );
  const byName = new Map(palettes.map((p) => [p.name, p]));
  const brand = byName.get(SXC1_SEMANTIC_PICKS.brand)!;
  const neutral = byName.get(SXC1_SEMANTIC_PICKS.neutral)!;
  const destructive = byName.get(SXC1_SEMANTIC_PICKS.destructive)!;
  const semantic = buildDefaultSemantics([brand, neutral, destructive]);
  return {
    ...prev,
    palettes: sortPalettesByColor(palettes),
    semantic,
  };
}

const INITIAL_STATE: TokenState = {
  // Semantics are built from DEFAULT_PALETTES by index above; the stored array
  // is sorted by color (references are by id, so resolution is unaffected).
  palettes: sortPalettesByColor(DEFAULT_PALETTES),
  semantic: DEFAULT_SEMANTICS,
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
  setShadeOverride: (id: string, shade: ShadeStep, value: string | null) => void;
  resetPaletteOverrides: (id: string) => void;

  setSemantic: (
    mode: PreviewMode,
    role: SemanticRoleId,
    reference: SemanticReference,
  ) => void;
  clearSemantic: (mode: PreviewMode, role: SemanticRoleId) => void;

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
  resetAll: () => void;
  loadSxc1Preset: () => void;
}

export type TokenStore = TokenState & TokenActions;

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
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
        })),

      renamePalette: (id, name) =>
        set((state) => ({
          palettes: state.palettes.map((p) => (p.id === id ? { ...p, name } : p)),
        })),

      setPaletteBaseColor: (id, baseColor) =>
        set((state) => ({
          palettes: sortPalettesByColor(
            state.palettes.map((p) =>
              p.id === id
                ? {
                    ...p,
                    baseColor,
                    scale: resolveScale(baseColor, p.overrides),
                  }
                : p,
            ),
          ),
        })),

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

      resetAll: () => set({ ...INITIAL_STATE }),

      loadSxc1Preset: () => set((state) => buildSxc1State(state)),
    }),
    {
      name: 'design-token-selector',
      version: 2,
      // v2 sorts palettes by color; re-sort any state persisted under v1.
      migrate: (persisted, _version) => {
        const state = persisted as Partial<TokenState> | undefined;
        if (state && Array.isArray(state.palettes)) {
          state.palettes = sortPalettesByColor(state.palettes);
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

export function resolveSemanticColor(
  reference: SemanticReference | undefined,
  palettes: PrimitivePalette[],
): string | null {
  if (!reference) return null;
  const palette = palettes.find((p) => p.id === reference.paletteId);
  if (!palette) return null;
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
