export function ChakraShowcase() {
  return (
    <div
      className="min-h-full"
      style={{ padding: 'var(--ds-space-8, 2rem)' }}
    >
      <header className="mb-[var(--ds-space-8,2rem)]">
        <h1
          style={{
            fontSize: 'var(--ds-text-3xl, 1.875rem)',
            fontWeight: 'var(--ds-weight-bold, 700)',
            lineHeight: 'var(--ds-leading-tight, 1.25)',
          }}
        >
          Chakra UI
        </h1>
        <p
          className="mt-[var(--ds-space-2,0.5rem)]"
          style={{
            fontSize: 'var(--ds-text-base, 1rem)',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          Friendly, rounded, and roomy — soft shadows and generous spacing.
        </p>
      </header>

      <div className="flex flex-col gap-[var(--ds-space-8,2rem)]">
        <CCard title="Button variants">
          <div className="flex flex-wrap gap-[var(--ds-space-4,1rem)]">
            <CButton variant="solid">Solid</CButton>
            <CButton variant="subtle">Subtle</CButton>
            <CButton variant="outline">Outline</CButton>
            <CButton variant="ghost">Ghost</CButton>
          </div>
        </CCard>

        <CCard title="Profile card">
          <div className="flex items-center gap-[var(--ds-space-5,1.25rem)]">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
              style={{
                background: 'rgb(var(--ds-accent))',
                color: 'rgb(var(--ds-accent-foreground))',
                fontSize: 'var(--ds-text-xl, 1.25rem)',
                fontWeight: 'var(--ds-weight-bold, 700)',
              }}
            >
              LC
            </div>
            <div className="flex-1">
              <div
                style={{
                  fontSize: 'var(--ds-text-lg, 1.125rem)',
                  fontWeight: 'var(--ds-weight-semibold, 600)',
                }}
              >
                Liam Chen
              </div>
              <div
                style={{
                  fontSize: 'var(--ds-text-sm, 0.875rem)',
                  color: 'rgb(var(--ds-muted-foreground))',
                }}
              >
                Product Designer
              </div>
              <div className="mt-[var(--ds-space-2,0.5rem)] flex gap-[var(--ds-space-2,0.5rem)]">
                <CBadge>Pro</CBadge>
                <CBadge subtle>Online</CBadge>
              </div>
            </div>
            <CButton variant="solid">Follow</CButton>
          </div>
        </CCard>

        <CCard title="Alerts">
          <div className="flex flex-col gap-[var(--ds-space-4,1rem)]">
            <CAlert tone="accent" title="Heads up">
              Chakra alerts use a colored left bar and a soft tinted background.
            </CAlert>
            <CAlert tone="destructive" title="There was an error">
              Your changes could not be saved. Please try again.
            </CAlert>
          </div>
        </CCard>

        <CCard title="Input">
          <label className="flex flex-col gap-[var(--ds-space-2,0.5rem)]">
            <span
              style={{
                fontSize: 'var(--ds-text-sm, 0.875rem)',
                fontWeight: 'var(--ds-weight-medium, 500)',
              }}
            >
              Workspace name
            </span>
            <input
              defaultValue="Acme Inc."
              className="rounded-[var(--ds-radius-lg,0.5rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)] text-[length:var(--ds-text-base,1rem)] outline-none"
              style={{
                background: 'rgb(var(--ds-background))',
                color: 'rgb(var(--ds-foreground))',
                border: '2px solid rgb(var(--ds-input))',
              }}
            />
          </label>
        </CCard>
      </div>
    </div>
  );
}

function CCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="rounded-[var(--ds-radius-xl,0.75rem)] p-[var(--ds-space-6,1.5rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        boxShadow: 'var(--ds-shadow-lg)',
      }}
    >
      <h3
        className="mb-[var(--ds-space-5,1.25rem)]"
        style={{
          fontSize: 'var(--ds-text-base, 1rem)',
          fontWeight: 'var(--ds-weight-semibold, 600)',
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

function CButton({
  variant,
  children,
}: {
  variant: 'solid' | 'subtle' | 'outline' | 'ghost';
  children: React.ReactNode;
}) {
  const style =
    variant === 'solid'
      ? {
          background: 'rgb(var(--ds-primary))',
          color: 'rgb(var(--ds-primary-foreground))',
        }
      : variant === 'subtle'
        ? {
            background: 'rgb(var(--ds-accent))',
            color: 'rgb(var(--ds-accent-foreground))',
          }
        : variant === 'outline'
          ? {
              background: 'transparent',
              color: 'rgb(var(--ds-primary))',
              border: '1px solid rgb(var(--ds-primary))',
            }
          : { background: 'transparent', color: 'rgb(var(--ds-primary))' };
  return (
    <button
      type="button"
      className="rounded-[var(--ds-radius-lg,0.5rem)] px-[var(--ds-space-5,1.25rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] font-semibold transition hover:opacity-90"
      style={style}
    >
      {children}
    </button>
  );
}

function CBadge({ children, subtle }: { children: React.ReactNode; subtle?: boolean }) {
  return (
    <span
      className="inline-flex items-center rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-0\\.5,0.125rem)]"
      style={{
        fontSize: 'var(--ds-text-xs, 0.75rem)',
        fontWeight: 'var(--ds-weight-bold, 700)',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        background: subtle ? 'rgb(var(--ds-muted))' : 'rgb(var(--ds-primary))',
        color: subtle
          ? 'rgb(var(--ds-muted-foreground))'
          : 'rgb(var(--ds-primary-foreground))',
      }}
    >
      {children}
    </span>
  );
}

function CAlert({
  tone,
  title,
  children,
}: {
  tone: 'accent' | 'destructive';
  title: string;
  children: React.ReactNode;
}) {
  const accent =
    tone === 'accent' ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-destructive))';
  const bg =
    tone === 'accent' ? 'rgb(var(--ds-accent))' : 'rgb(var(--ds-destructive))';
  const fg =
    tone === 'accent'
      ? 'rgb(var(--ds-accent-foreground))'
      : 'rgb(var(--ds-destructive-foreground))';
  return (
    <div
      className="rounded-[var(--ds-radius-lg,0.5rem)] p-[var(--ds-space-4,1rem)]"
      style={{
        background: bg,
        color: fg,
        borderLeft: `4px solid ${accent}`,
      }}
    >
      <div
        style={{
          fontWeight: 'var(--ds-weight-bold, 700)',
          fontSize: 'var(--ds-text-sm, 0.875rem)',
        }}
      >
        {title}
      </div>
      <div
        className="mt-[var(--ds-space-1,0.25rem)]"
        style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}
      >
        {children}
      </div>
    </div>
  );
}
