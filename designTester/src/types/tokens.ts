export const SHADE_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export type ShadeStep = (typeof SHADE_STEPS)[number];

/**
 * A semantic role can point at one of the generated 50…950 shades or at the
 * palette's raw base color (the source color the scale is derived from).
 */
export const BASE_SHADE = 'base' as const;
export type ShadeRef = ShadeStep | typeof BASE_SHADE;

export type ShadeScale = Record<ShadeStep, string>;

export interface PrimitivePalette {
  id: string;
  name: string;
  baseColor: string;
  scale: ShadeScale;
  overrides: Partial<ShadeScale>;
}

export type SemanticRoleId =
  | 'background'
  | 'foreground'
  | 'card'
  | 'card-foreground'
  | 'primary'
  | 'primary-foreground'
  | 'secondary'
  | 'secondary-foreground'
  | 'muted'
  | 'muted-foreground'
  | 'accent'
  | 'accent-foreground'
  | 'destructive'
  | 'destructive-foreground'
  | 'border'
  | 'input'
  | 'ring';

export interface SemanticReference {
  paletteId: string;
  shade: ShadeRef;
}

export type SemanticMap = Partial<Record<SemanticRoleId, SemanticReference>>;

export type PreviewMode = 'light' | 'dark';

export interface TypographyTokens {
  fontFamilySans: string;
  fontFamilySerif: string;
  fontFamilyMono: string;
  fontSizeScale: Record<string, string>;
  fontWeightScale: Record<string, number>;
  lineHeightScale: Record<string, string>;
}

export interface SpacingTokens {
  baseUnitPx: number;
  scale: Record<string, string>;
}

export interface TokenState {
  palettes: PrimitivePalette[];
  semantic: {
    light: SemanticMap;
    dark: SemanticMap;
  };
  typography: TypographyTokens;
  spacing: SpacingTokens;
  previewMode: PreviewMode;
  /** id of the active preview screen (see preview/screens/registry). */
  previewScreen: string;
}
