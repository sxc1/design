export function ComponentShowcase() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-6,1.5rem)]"
      style={{ padding: 'var(--ds-space-6, 1.5rem)' }}
    >
      <Card title="Buttons">
        <div className="flex flex-wrap gap-[var(--ds-space-2,0.5rem)]">
          <PreviewButton tone="primary">Primary</PreviewButton>
          <PreviewButton tone="secondary">Secondary</PreviewButton>
          <PreviewButton tone="accent">Accent</PreviewButton>
          <PreviewButton tone="destructive">Destructive</PreviewButton>
          <PreviewButton tone="ghost">Ghost</PreviewButton>
        </div>
      </Card>

      <Card title="Form fields">
        <div className="flex flex-col gap-[var(--ds-space-3,0.75rem)]">
          <label className="flex flex-col gap-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)]">
            <span style={{ color: 'rgb(var(--ds-foreground))' }}>Email</span>
            <input
              type="email"
              defaultValue="you@example.com"
              className="rounded-[var(--ds-radius-md,0.375rem)] px-3 py-2 text-[length:var(--ds-text-sm,0.875rem)] outline-none"
              style={{
                background: 'rgb(var(--ds-background))',
                color: 'rgb(var(--ds-foreground))',
                border: '1px solid rgb(var(--ds-input))',
              }}
            />
          </label>
          <label className="flex flex-col gap-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)]">
            <span style={{ color: 'rgb(var(--ds-foreground))' }}>Bio</span>
            <textarea
              defaultValue="A short bio..."
              rows={3}
              className="rounded-[var(--ds-radius-md,0.375rem)] px-3 py-2 text-[length:var(--ds-text-sm,0.875rem)] outline-none"
              style={{
                background: 'rgb(var(--ds-background))',
                color: 'rgb(var(--ds-foreground))',
                border: '1px solid rgb(var(--ds-input))',
              }}
            />
          </label>
        </div>
      </Card>

      <Card title="Badges">
        <div className="flex flex-wrap gap-[var(--ds-space-2,0.5rem)]">
          <Badge tone="primary">Primary</Badge>
          <Badge tone="secondary">Secondary</Badge>
          <Badge tone="muted">Muted</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="destructive">Destructive</Badge>
        </div>
      </Card>

      <Card title="Alerts">
        <div className="flex flex-col gap-[var(--ds-space-2,0.5rem)]">
          <Alert tone="muted" title="Heads up">
            This is a low-emphasis notice.
          </Alert>
          <Alert tone="accent" title="Tip">
            You can use accent for callouts.
          </Alert>
          <Alert tone="destructive" title="Error">
            Something went wrong. Try again.
          </Alert>
        </div>
      </Card>

      <Card title="Typography">
        <div className="flex flex-col gap-[var(--ds-space-1,0.25rem)]">
          <h1
            style={{
              fontSize: 'var(--ds-text-4xl, 2.25rem)',
              fontWeight: 'var(--ds-weight-bold, 700)',
              lineHeight: 'var(--ds-leading-tight, 1.25)',
            }}
          >
            Display heading
          </h1>
          <h2
            style={{
              fontSize: 'var(--ds-text-2xl, 1.5rem)',
              fontWeight: 'var(--ds-weight-semibold, 600)',
            }}
          >
            Section heading
          </h2>
          <p
            style={{
              fontSize: 'var(--ds-text-base, 1rem)',
              lineHeight: 'var(--ds-leading-relaxed, 1.625)',
              color: 'rgb(var(--ds-foreground))',
            }}
          >
            Body copy uses the foreground color and the base text size from the
            scale. The quick brown fox jumps over the lazy dog.
          </p>
          <p
            style={{
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              color: 'rgb(var(--ds-muted-foreground))',
            }}
          >
            Muted caption text sits below at the small step.
          </p>
          <code
            style={{
              fontFamily: 'var(--ds-font-mono)',
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              background: 'rgb(var(--ds-muted))',
              color: 'rgb(var(--ds-muted-foreground))',
              padding:
                'var(--ds-space-0\\.5, 0.125rem) var(--ds-space-2, 0.5rem)',
              borderRadius: 'var(--ds-radius-sm, 0.25rem)',
              width: 'fit-content',
            }}
          >
            inline code
          </code>
        </div>
      </Card>

      <Card title="Surface stack">
        <div
          className="rounded-[var(--ds-radius-lg,0.5rem)] p-[var(--ds-space-4,1rem)]"
          style={{
            background: 'rgb(var(--ds-muted))',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          <div className="text-[length:var(--ds-text-sm,0.875rem)]">
            Muted container
          </div>
          <div
            className="mt-[var(--ds-space-2,0.5rem)] rounded-[var(--ds-radius-md,0.375rem)] p-[var(--ds-space-3,0.75rem)]"
            style={{
              background: 'rgb(var(--ds-card))',
              color: 'rgb(var(--ds-card-foreground))',
              boxShadow: 'var(--ds-elev-raised)',
            }}
          >
            Card on muted
          </div>
        </div>
      </Card>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="rounded-[var(--ds-radius-lg,0.5rem)] p-[var(--ds-space-4,1rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        border: '1px solid rgb(var(--ds-border))',
        boxShadow: 'var(--ds-elev-raised)',
      }}
    >
      <h3
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          fontWeight: 'var(--ds-weight-semibold, 600)',
          color: 'rgb(var(--ds-muted-foreground))',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: 'var(--ds-space-3, 0.75rem)',
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

type ButtonTone = 'primary' | 'secondary' | 'accent' | 'destructive' | 'ghost';

function PreviewButton({
  tone,
  children,
}: {
  tone: ButtonTone;
  children: React.ReactNode;
}) {
  const style = (() => {
    switch (tone) {
      case 'primary':
        return {
          background: 'rgb(var(--ds-primary))',
          color: 'rgb(var(--ds-primary-foreground))',
          border: '1px solid transparent',
        };
      case 'secondary':
        return {
          background: 'rgb(var(--ds-secondary))',
          color: 'rgb(var(--ds-secondary-foreground))',
          border: '1px solid transparent',
        };
      case 'accent':
        return {
          background: 'rgb(var(--ds-accent))',
          color: 'rgb(var(--ds-accent-foreground))',
          border: '1px solid transparent',
        };
      case 'destructive':
        return {
          background: 'rgb(var(--ds-destructive))',
          color: 'rgb(var(--ds-destructive-foreground))',
          border: '1px solid transparent',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: 'rgb(var(--ds-foreground))',
          border: '1px solid rgb(var(--ds-border))',
        };
    }
  })();

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium transition hover:opacity-90"
      style={style}
    >
      {children}
    </button>
  );
}

type BadgeTone = 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive';

function Badge({ tone, children }: { tone: BadgeTone; children: React.ReactNode }) {
  const style = {
    primary: {
      background: 'rgb(var(--ds-primary))',
      color: 'rgb(var(--ds-primary-foreground))',
    },
    secondary: {
      background: 'rgb(var(--ds-secondary))',
      color: 'rgb(var(--ds-secondary-foreground))',
    },
    muted: {
      background: 'rgb(var(--ds-muted))',
      color: 'rgb(var(--ds-muted-foreground))',
    },
    accent: {
      background: 'rgb(var(--ds-accent))',
      color: 'rgb(var(--ds-accent-foreground))',
    },
    destructive: {
      background: 'rgb(var(--ds-destructive))',
      color: 'rgb(var(--ds-destructive-foreground))',
    },
  }[tone];

  return (
    <span
      className="inline-flex items-center rounded-[var(--ds-radius-full,9999px)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-0\\.5,0.125rem)] text-[length:var(--ds-text-xs,0.75rem)] font-semibold"
      style={style}
    >
      {children}
    </span>
  );
}

type AlertTone = 'muted' | 'accent' | 'destructive';

function Alert({
  tone,
  title,
  children,
}: {
  tone: AlertTone;
  title: string;
  children: React.ReactNode;
}) {
  const style = {
    muted: {
      background: 'rgb(var(--ds-muted))',
      color: 'rgb(var(--ds-muted-foreground))',
      borderColor: 'rgb(var(--ds-border))',
    },
    accent: {
      background: 'rgb(var(--ds-accent))',
      color: 'rgb(var(--ds-accent-foreground))',
      borderColor: 'rgb(var(--ds-accent))',
    },
    destructive: {
      background: 'rgb(var(--ds-destructive))',
      color: 'rgb(var(--ds-destructive-foreground))',
      borderColor: 'rgb(var(--ds-destructive))',
    },
  }[tone];

  return (
    <div
      className="rounded-[var(--ds-radius-md,0.375rem)] border p-[var(--ds-space-3,0.75rem)]"
      style={style}
    >
      <div
        style={{
          fontWeight: 'var(--ds-weight-semibold, 600)',
          fontSize: 'var(--ds-text-sm, 0.875rem)',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          marginTop: 'var(--ds-space-1, 0.25rem)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
