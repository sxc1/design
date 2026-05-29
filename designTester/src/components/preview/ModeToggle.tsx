import { useTokenStore } from '@/store/tokenStore';
import type { PreviewMode } from '@/types/tokens';

const OPTIONS: { value: PreviewMode; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '☀' },
  { value: 'dark', label: 'Dark', icon: '☾' },
];

export function ModeToggle() {
  const mode = useTokenStore((s) => s.previewMode);
  const setMode = useTokenStore((s) => s.setPreviewMode);

  return (
    <div
      role="radiogroup"
      aria-label="Preview mode"
      className="inline-flex rounded-md border border-app-border bg-app-bg p-0.5 text-xs font-medium"
    >
      {OPTIONS.map((opt) => {
        const active = mode === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setMode(opt.value)}
            title={`Switch to ${opt.label.toLowerCase()} mode`}
            className={[
              'inline-flex items-center gap-1.5 rounded px-2.5 py-1 transition',
              active
                ? 'bg-app-surface text-app-fg shadow-sm'
                : 'text-app-muted hover:text-app-fg',
            ].join(' ')}
          >
            <span aria-hidden className="text-sm leading-none">
              {opt.icon}
            </span>
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
