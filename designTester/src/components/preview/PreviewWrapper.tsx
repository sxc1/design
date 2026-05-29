import { useMemo, type CSSProperties, type ReactNode } from 'react';
import { converter, parse } from 'culori';
import { resolveSemanticColor, useTokenStore } from '@/store/tokenStore';
import { SEMANTIC_ROLES } from '@/constants/semanticRoles';
import {
  HARDCODED_ELEVATION,
  HARDCODED_RADIUS,
  HARDCODED_SHADOWS,
} from '@/constants/hardcodedTokens';

const toRgb = converter('rgb');

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

interface PreviewWrapperProps {
  children: ReactNode;
}

export function PreviewWrapper({ children }: PreviewWrapperProps) {
  const previewMode = useTokenStore((s) => s.previewMode);
  const palettes = useTokenStore((s) => s.palettes);
  const semantic = useTokenStore((s) => s.semantic[previewMode]);
  const typography = useTokenStore((s) => s.typography);
  const spacing = useTokenStore((s) => s.spacing);

  const cssVars = useMemo(() => {
    const vars: Record<string, string> = {};

    for (const role of SEMANTIC_ROLES) {
      const ref = semantic[role.id];
      const color = resolveSemanticColor(ref, palettes);
      const triplet = hexToRgbTriplet(color);
      if (triplet) {
        vars[`--ds-${role.id}`] = triplet;
      }
    }

    vars['--ds-font-sans'] = typography.fontFamilySans;
    vars['--ds-font-serif'] = typography.fontFamilySerif;
    vars['--ds-font-mono'] = typography.fontFamilyMono;

    for (const [key, value] of Object.entries(typography.fontSizeScale)) {
      vars[`--ds-text-${key}`] = value;
    }
    for (const [key, value] of Object.entries(typography.fontWeightScale)) {
      vars[`--ds-weight-${key}`] = String(value);
    }
    for (const [key, value] of Object.entries(typography.lineHeightScale)) {
      vars[`--ds-leading-${key}`] = value;
    }
    for (const [key, value] of Object.entries(spacing.scale)) {
      vars[`--ds-space-${key}`] = value;
    }

    for (const [key, value] of Object.entries(HARDCODED_RADIUS)) {
      vars[`--ds-radius-${key}`] = value;
    }
    for (const [key, value] of Object.entries(HARDCODED_SHADOWS)) {
      vars[`--ds-shadow-${key}`] = value;
    }
    for (const [key, value] of Object.entries(HARDCODED_ELEVATION)) {
      vars[`--ds-elev-${key}`] = value;
    }

    return vars;
  }, [palettes, semantic, typography, spacing]);

  return (
    <div
      className="preview-root h-full overflow-auto"
      data-mode={previewMode}
      style={
        {
          ...cssVars,
          background: 'rgb(var(--ds-background))',
          color: 'rgb(var(--ds-foreground))',
          fontFamily: 'var(--ds-font-sans)',
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
