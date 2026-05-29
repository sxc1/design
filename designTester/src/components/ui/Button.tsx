import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-app-accent text-white hover:opacity-90 active:opacity-80 border border-transparent',
  secondary:
    'bg-app-surface text-app-fg hover:bg-app-bg border border-app-border',
  ghost:
    'bg-transparent text-app-fg hover:bg-app-bg border border-transparent',
  danger:
    'bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 border border-transparent',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'h-7 px-2 text-xs',
  md: 'h-9 px-3 text-sm',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={[
        'inline-flex items-center justify-center gap-1.5 rounded-md font-medium shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className ?? '',
      ].join(' ')}
    />
  );
}
