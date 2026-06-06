import { converter, formatHex, parse } from 'culori';
import type { Oklch } from 'culori';
import {
  BASE_SHADE,
  SHADE_STEPS,
  type PrimitivePalette,
  type ShadeRef,
  type ShadeScale,
  type ShadeStep,
} from '@/types/tokens';

const toOklch = converter('oklch');

const TARGET_LIGHTNESS: Record<ShadeStep, number> = {
  50: 0.985,
  100: 0.96,
  200: 0.91,
  300: 0.84,
  400: 0.74,
  500: 0.63,
  600: 0.55,
  700: 0.47,
  800: 0.38,
  900: 0.28,
  950: 0.18,
};

const CHROMA_MULTIPLIER: Record<ShadeStep, number> = {
  50: 0.15,
  100: 0.3,
  200: 0.55,
  300: 0.8,
  400: 0.95,
  500: 1.0,
  600: 0.98,
  700: 0.9,
  800: 0.75,
  900: 0.55,
  950: 0.35,
};

export function parseColor(input: string): Oklch | null {
  const parsed = parse(input.trim());
  if (!parsed) return null;
  const oklch = toOklch(parsed);
  if (!oklch) return null;
  return oklch;
}

export function isValidColor(input: string): boolean {
  return parseColor(input) !== null;
}

export function generateScale(baseColor: string): ShadeScale {
  const base = parseColor(baseColor);
  const scale = {} as ShadeScale;

  if (!base) {
    for (const step of SHADE_STEPS) {
      scale[step] = '#000000';
    }
    return scale;
  }

  const baseChroma = base.c ?? 0;
  const baseHue = base.h ?? 0;

  for (const step of SHADE_STEPS) {
    const lightness = TARGET_LIGHTNESS[step];
    const chroma = Math.max(0, baseChroma * CHROMA_MULTIPLIER[step]);

    const shadeColor: Oklch = {
      mode: 'oklch',
      l: lightness,
      c: chroma,
      h: baseHue,
    };

    const hex = formatHex(shadeColor);
    scale[step] = hex ?? '#000000';
  }

  return scale;
}

export function resolveScale(
  baseColor: string,
  overrides: Partial<ShadeScale>,
): ShadeScale {
  const generated = generateScale(baseColor);
  const result = { ...generated } as ShadeScale;
  for (const step of SHADE_STEPS) {
    const override = overrides[step];
    if (override && isValidColor(override)) {
      result[step] = override;
    }
  }
  return result;
}

export function toHexSafe(input: string): string {
  const parsed = parseColor(input);
  if (!parsed) return input;
  return formatHex(parsed) ?? input;
}

export interface ShadeEntry {
  shade: ShadeRef;
  color: string;
}

/**
 * The palette's swatches — the 50…950 shades plus the raw base color — ordered
 * lightest to darkest by OKLCH lightness. Because the generated scale is
 * monotonic in lightness, the numeric steps keep their 50→950 order and the
 * base color slots in wherever its own lightness falls.
 */
export function paletteShadeEntries(palette: PrimitivePalette): ShadeEntry[] {
  const entries: (ShadeEntry & { l: number })[] = SHADE_STEPS.map((step) => ({
    shade: step,
    color: palette.scale[step],
    l: parseColor(palette.scale[step])?.l ?? 0,
  }));
  entries.push({
    shade: BASE_SHADE,
    color: toHexSafe(palette.baseColor),
    l: parseColor(palette.baseColor)?.l ?? 0,
  });
  entries.sort((a, b) => b.l - a.l);
  return entries.map(({ shade, color }) => ({ shade, color }));
}

// Below this OKLCH chroma a color reads as greyscale/neutral and has no
// meaningful hue, so it's sorted ahead of the chromatic colors.
const ACHROMATIC_CHROMA_THRESHOLD = 0.05;

interface PaletteSortKey {
  achromatic: boolean;
  lightness: number;
  hue: number;
}

function paletteSortKey(baseColor: string): PaletteSortKey {
  const oklch = parseColor(baseColor);
  // Treat an unparseable color as a dark neutral so it sorts predictably.
  if (!oklch) return { achromatic: true, lightness: 0, hue: 0 };
  const chroma = oklch.c ?? 0;
  return {
    achromatic: chroma < ACHROMATIC_CHROMA_THRESHOLD,
    lightness: oklch.l ?? 0,
    hue: oklch.h ?? 0,
  };
}

/**
 * Sort palettes by their base color around the hue wheel: greyscale/neutral
 * colors first (lightest to darkest), then chromatic colors by ascending
 * OKLCH hue (red → orange → yellow → green → cyan → blue → violet). Name is
 * the tie-breaker so the order is stable. Returns a new array.
 */
export function sortPalettesByColor<T extends { baseColor: string; name: string }>(
  palettes: T[],
): T[] {
  return [...palettes].sort((a, b) => {
    const ka = paletteSortKey(a.baseColor);
    const kb = paletteSortKey(b.baseColor);
    if (ka.achromatic !== kb.achromatic) return ka.achromatic ? -1 : 1;
    if (ka.achromatic) {
      if (kb.lightness !== ka.lightness) return kb.lightness - ka.lightness;
    } else if (ka.hue !== kb.hue) {
      return ka.hue - kb.hue;
    }
    return a.name.localeCompare(b.name);
  });
}
