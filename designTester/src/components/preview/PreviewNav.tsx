import { useEffect, useRef, useState } from 'react';
import { useTokenStore } from '@/store/tokenStore';
import {
  PREVIEW_GROUPS,
  getScreen,
  screensForGroup,
  type PreviewGroupId,
} from './screens/registry';

/**
 * The single token-styled nav that tops every preview screen. It doubles as the
 * screen switcher: the left side holds the "Preview" brand chip (also the
 * it's-the-tool marker) and the three functional group dropdowns; the right side
 * is decorative (search, sign in, avatar) to exercise the design tokens.
 */
export function PreviewNav() {
  const previewScreen = useTokenStore((s) => s.previewScreen);
  const setPreviewScreen = useTokenStore((s) => s.setPreviewScreen);
  const [openGroup, setOpenGroup] = useState<PreviewGroupId | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const activeScreen = getScreen(previewScreen);

  useEffect(() => {
    if (!openGroup) return;
    function onPointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenGroup(null);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenGroup(null);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openGroup]);

  return (
    <nav
      ref={containerRef}
      className="sticky top-0 z-20 flex flex-wrap items-center gap-[var(--ds-space-4,1rem)] border-b px-[var(--ds-space-6,1.5rem)] py-[var(--ds-space-3,0.75rem)]"
      style={{
        borderColor: 'rgb(var(--ds-border))',
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
      }}
    >
      {/* Brand / tool marker */}
      <div
        className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)] font-semibold"
        style={{
          background: 'rgb(var(--ds-primary))',
          color: 'rgb(var(--ds-primary-foreground))',
        }}
      >
        Preview
      </div>

      {/* Group dropdowns (functional) */}
      <div className="flex flex-wrap items-center gap-[var(--ds-space-2,0.5rem)]">
        {PREVIEW_GROUPS.map((group) => {
          const screens = screensForGroup(group.id);
          const isActiveGroup = activeScreen.group === group.id;
          const isOpen = openGroup === group.id;
          const label = isActiveGroup
            ? `${group.label}: ${activeScreen.label}`
            : group.label;

          return (
            <div key={group.id} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => setOpenGroup(isOpen ? null : group.id)}
                className="inline-flex items-center gap-1.5 rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)] transition"
                style={{
                  color: isActiveGroup
                    ? 'rgb(var(--ds-foreground))'
                    : 'rgb(var(--ds-muted-foreground))',
                  fontWeight: isActiveGroup
                    ? 'var(--ds-weight-semibold, 600)'
                    : 'var(--ds-weight-medium, 500)',
                  background: isOpen ? 'rgb(var(--ds-muted))' : 'transparent',
                }}
              >
                <span>{label}</span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={[
                    'h-4 w-4 shrink-0 transition-transform',
                    isOpen ? 'rotate-180' : '',
                  ].join(' ')}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {isOpen ? (
                <div
                  role="menu"
                  className="absolute left-0 z-30 mt-1 min-w-[12rem] overflow-hidden rounded-[var(--ds-radius-md,0.375rem)] py-1"
                  style={{
                    background: 'rgb(var(--ds-card))',
                    color: 'rgb(var(--ds-card-foreground))',
                    border: '1px solid rgb(var(--ds-border))',
                    boxShadow: 'var(--ds-elev-popover)',
                  }}
                >
                  {screens.map((screen) => {
                    const selected = screen.id === previewScreen;
                    return (
                      <button
                        key={screen.id}
                        type="button"
                        role="menuitemradio"
                        aria-checked={selected}
                        onClick={() => {
                          setPreviewScreen(screen.id);
                          setOpenGroup(null);
                        }}
                        className="flex w-full items-center justify-between gap-3 px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-left text-[length:var(--ds-text-sm,0.875rem)] transition"
                        style={
                          selected
                            ? {
                                background: 'rgb(var(--ds-accent))',
                                color: 'rgb(var(--ds-accent-foreground))',
                                fontWeight: 'var(--ds-weight-semibold, 600)',
                              }
                            : { color: 'rgb(var(--ds-muted-foreground))' }
                        }
                      >
                        <span>{screen.label}</span>
                        {selected ? <span aria-hidden>●</span> : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Decorative right side */}
      <div className="ml-auto flex items-center gap-[var(--ds-space-2,0.5rem)]">
        <input
          type="search"
          placeholder="Search…"
          aria-hidden
          tabIndex={-1}
          className="hidden w-40 rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)] outline-none sm:block"
          style={{
            background: 'rgb(var(--ds-background))',
            color: 'rgb(var(--ds-foreground))',
            border: '1px solid rgb(var(--ds-input))',
          }}
        />
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium transition hover:opacity-90"
          style={{
            background: 'transparent',
            color: 'rgb(var(--ds-foreground))',
            border: '1px solid rgb(var(--ds-border))',
          }}
        >
          Sign in
        </button>
        <div
          aria-hidden
          className="h-8 w-8 rounded-[var(--ds-radius-full,9999px)]"
          style={{ background: 'rgb(var(--ds-accent))' }}
        />
      </div>
    </nav>
  );
}
