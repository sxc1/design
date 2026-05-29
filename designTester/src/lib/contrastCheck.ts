import { converter, parse } from 'culori';
import type { Rgb } from 'culori';

const toRgb = converter('rgb');

function relativeLuminance(rgb: Rgb): number {
  const channel = (c: number) => {
    const v = c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return v;
  };
  return (
    0.2126 * channel(rgb.r) +
    0.7152 * channel(rgb.g) +
    0.0722 * channel(rgb.b)
  );
}

export function contrastRatio(color1: string, color2: string): number | null {
  const c1 = parse(color1);
  const c2 = parse(color2);
  if (!c1 || !c2) return null;
  const rgb1 = toRgb(c1);
  const rgb2 = toRgb(c2);
  if (!rgb1 || !rgb2) return null;

  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export type WcagGrade = 'AAA' | 'AA' | 'AA Large' | 'Fail';

export function gradeContrast(ratio: number | null): WcagGrade {
  if (ratio == null) return 'Fail';
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}
