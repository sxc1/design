export const HARDCODED_RADIUS = {
  none: '0px',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
} as const;

export const HARDCODED_SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

export const HARDCODED_ELEVATION = {
  flat: HARDCODED_SHADOWS.none,
  raised: HARDCODED_SHADOWS.sm,
  overlay: HARDCODED_SHADOWS.md,
  popover: HARDCODED_SHADOWS.lg,
  modal: HARDCODED_SHADOWS.xl,
} as const;

export type HardcodedRadiusKey = keyof typeof HARDCODED_RADIUS;
export type HardcodedShadowKey = keyof typeof HARDCODED_SHADOWS;
export type HardcodedElevationKey = keyof typeof HARDCODED_ELEVATION;
