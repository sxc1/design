import { useState } from 'react';

export function MaterialShowcase() {
  return (
    <div className="min-h-full">
      <header
        className="border-b px-[var(--ds-space-6,1.5rem)] py-[var(--ds-space-4,1rem)]"
        style={{
          borderColor: 'rgb(var(--ds-border))',
          background: 'rgb(var(--ds-background))',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--ds-text-2xl, 1.5rem)',
            fontWeight: 'var(--ds-weight-bold, 700)',
          }}
        >
          Material UI
        </h1>
        <p
          style={{
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          Material conventions: filled buttons, FAB, chips, switches, elevation.
        </p>
      </header>

      <div
        className="grid grid-cols-1 gap-[var(--ds-space-6,1.5rem)] md:grid-cols-2"
        style={{ padding: 'var(--ds-space-6, 1.5rem)' }}
      >
        <MCard title="Buttons">
          <div className="flex flex-wrap items-center gap-[var(--ds-space-3,0.75rem)]">
            <MButton variant="contained">Contained</MButton>
            <MButton variant="outlined">Outlined</MButton>
            <MButton variant="text">Text</MButton>
          </div>
          <div className="mt-[var(--ds-space-4,1rem)] flex items-center gap-[var(--ds-space-3,0.75rem)]">
            {/* Floating action button */}
            <button
              type="button"
              aria-label="Add"
              className="flex h-14 w-14 items-center justify-center rounded-[var(--ds-radius-full,9999px)] text-2xl transition hover:opacity-90"
              style={{
                background: 'rgb(var(--ds-accent))',
                color: 'rgb(var(--ds-accent-foreground))',
                boxShadow: 'var(--ds-shadow-lg)',
              }}
            >
              +
            </button>
            <span
              style={{
                fontSize: 'var(--ds-text-sm, 0.875rem)',
                color: 'rgb(var(--ds-muted-foreground))',
              }}
            >
              Floating action button
            </span>
          </div>
        </MCard>

        <MCard title="Text field">
          <OutlinedField label="Email" value="you@example.com" />
          <div className="h-[var(--ds-space-4,1rem)]" />
          <OutlinedField label="Password" value="" type="password" />
        </MCard>

        <MCard title="Chips">
          <div className="flex flex-wrap gap-[var(--ds-space-2,0.5rem)]">
            <Chip>Default</Chip>
            <Chip filled>Filled</Chip>
            <Chip>React ✕</Chip>
            <Chip filled>Design ✕</Chip>
          </div>
        </MCard>

        <MCard title="Switches & progress">
          <div className="flex items-center gap-[var(--ds-space-4,1rem)]">
            <MSwitch defaultOn />
            <MSwitch />
          </div>
          <div
            className="mt-[var(--ds-space-4,1rem)] h-1 w-full overflow-hidden rounded-[var(--ds-radius-full,9999px)]"
            style={{ background: 'rgb(var(--ds-muted))' }}
          >
            <div
              className="h-full"
              style={{ width: '64%', background: 'rgb(var(--ds-primary))' }}
            />
          </div>
        </MCard>
      </div>
    </div>
  );
}

function MCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="rounded-[var(--ds-radius-md,0.375rem)] p-[var(--ds-space-5,1.25rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        boxShadow: 'var(--ds-shadow-md)',
      }}
    >
      <h3
        className="mb-[var(--ds-space-4,1rem)]"
        style={{
          fontSize: 'var(--ds-text-base, 1rem)',
          fontWeight: 'var(--ds-weight-medium, 500)',
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

function MButton({
  variant,
  children,
}: {
  variant: 'contained' | 'outlined' | 'text';
  children: React.ReactNode;
}) {
  const base =
    'rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] transition hover:opacity-90';
  const style =
    variant === 'contained'
      ? {
          background: 'rgb(var(--ds-primary))',
          color: 'rgb(var(--ds-primary-foreground))',
          boxShadow: 'var(--ds-shadow-sm)',
        }
      : variant === 'outlined'
        ? {
            background: 'transparent',
            color: 'rgb(var(--ds-primary))',
            border: '1px solid rgb(var(--ds-primary))',
          }
        : { background: 'transparent', color: 'rgb(var(--ds-primary))' };
  return (
    <button
      type="button"
      className={base}
      style={{
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        fontWeight: 'var(--ds-weight-medium, 500)',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function OutlinedField({
  label,
  value,
  type = 'text',
}: {
  label: string;
  value: string;
  type?: string;
}) {
  return (
    <label className="relative block">
      <span
        className="absolute -top-2 left-3 px-1"
        style={{
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          background: 'rgb(var(--ds-card))',
          color: 'rgb(var(--ds-primary))',
        }}
      >
        {label}
      </span>
      <input
        type={type}
        defaultValue={value}
        className="w-full rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-3,0.75rem)] text-[length:var(--ds-text-sm,0.875rem)] outline-none"
        style={{
          background: 'transparent',
          color: 'rgb(var(--ds-foreground))',
          border: '1px solid rgb(var(--ds-input))',
        }}
      />
    </label>
  );
}

function Chip({ children, filled }: { children: React.ReactNode; filled?: boolean }) {
  return (
    <span
      className="inline-flex items-center rounded-[var(--ds-radius-full,9999px)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)]"
      style={
        filled
          ? {
              background: 'rgb(var(--ds-primary))',
              color: 'rgb(var(--ds-primary-foreground))',
            }
          : {
              background: 'rgb(var(--ds-muted))',
              color: 'rgb(var(--ds-muted-foreground))',
            }
      }
    >
      {children}
    </span>
  );
}

function MSwitch({ defaultOn }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(Boolean(defaultOn));
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className="relative h-4 w-10 rounded-[var(--ds-radius-full,9999px)] transition"
      style={{
        background: on ? 'rgb(var(--ds-accent))' : 'rgb(var(--ds-muted))',
      }}
    >
      <span
        className="absolute -top-1 h-6 w-6 rounded-[var(--ds-radius-full,9999px)] transition-all"
        style={{
          left: on ? '1.25rem' : '-0.25rem',
          background: on ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-background))',
          boxShadow: 'var(--ds-shadow-md)',
        }}
      />
    </button>
  );
}
