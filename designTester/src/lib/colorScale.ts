import { converter, formatHex, parse } from 'culori';
import type { Oklch } from 'culori';
import { SHADE_STEPS, type ShadeScale, type ShadeStep } from '@/types/tokens';

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
