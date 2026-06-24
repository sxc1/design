import { useState } from 'react';

export function ShadcnShowcase() {
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
          shadcn/ui
        </h1>
        <p
          style={{
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          Subtle borders, muted surfaces, restrained radius — the shadcn idiom.{' '}
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgb(var(--ds-primary))', textDecoration: 'underline' }}
          >
            Learn more
          </a>
        </p>
      </header>

      <Breadcrumb />

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-[var(--ds-space-6,1.5rem)]"
        style={{ padding: 'var(--ds-space-6, 1.5rem)' }}
      >
        <Card title="Buttons & Badges">
          <div className="flex flex-col gap-[var(--ds-space-4,1rem)]">
            <div className="flex flex-wrap gap-[var(--ds-space-2,0.5rem)]">
              <PreviewButton tone="primary">Primary</PreviewButton>
              <PreviewButton tone="secondary">Secondary</PreviewButton>
              <PreviewButton tone="accent">Accent</PreviewButton>
              <PreviewButton tone="destructive">Destructive</PreviewButton>
              <PreviewButton tone="ghost">Ghost</PreviewButton>
            </div>
            <div className="h-px" style={{ background: 'rgb(var(--ds-border))' }} />
            <div className="flex flex-wrap gap-[var(--ds-space-2,0.5rem)]">
              <Badge tone="primary">Primary</Badge>
              <Badge tone="secondary">Secondary</Badge>
              <Badge tone="muted">Muted</Badge>
              <Badge tone="accent">Accent</Badge>
              <Badge tone="destructive">Destructive</Badge>
            </div>
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

        <Card title="Selection controls">
          <SelectionControls />
        </Card>

        <Card title="Data table">
          <DataTable />
        </Card>

        <Card title="Dialog">
          <DialogPreview />
        </Card>

        <Card title="Command palette">
          <CommandPalette />
        </Card>

        <Card title="Tabs">
          <Tabs />
        </Card>

        <Card title="Dropdown menu">
          <DropdownMenu />
        </Card>

        <Card title="Avatar & Skeleton">
          <AvatarSkeleton />
        </Card>

        <Card title="Toast">
          <ToastPreview />
        </Card>
      </div>
    </div>
  );
}

function Breadcrumb() {
  const crumbs = ['Home', 'Components', 'Buttons'];
  return (
    <nav
      className="flex items-center gap-[var(--ds-space-2,0.5rem)] border-b px-[var(--ds-space-6,1.5rem)] py-[var(--ds-space-3,0.75rem)]"
      style={{
        borderColor: 'rgb(var(--ds-border))',
        background: 'rgb(var(--ds-background))',
        fontSize: 'var(--ds-text-sm, 0.875rem)',
      }}
    >
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb} className="flex items-center gap-[var(--ds-space-2,0.5rem)]">
            <span
              style={{
                color: isLast
                  ? 'rgb(var(--ds-foreground))'
                  : 'rgb(var(--ds-muted-foreground))',
                fontWeight: isLast
                  ? 'var(--ds-weight-medium, 500)'
                  : 'var(--ds-weight-normal, 400)',
              }}
            >
              {crumb}
            </span>
            {!isLast && (
              <span style={{ color: 'rgb(var(--ds-muted-foreground))' }}>/</span>
            )}
          </span>
        );
      })}
    </nav>
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

function Tabs() {
  const tabs = ['Progress', 'Form fields', 'Accordion'] as const;
  const [active, setActive] = useState<(typeof tabs)[number]>('Progress');
  return (
    <div className="flex flex-col gap-[var(--ds-space-4,1rem)]">
      <div
        className="flex gap-[var(--ds-space-4,1rem)]"
        style={{ borderBottom: '1px solid rgb(var(--ds-border))' }}
      >
        {tabs.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              type="button"
              key={tab}
              onClick={() => setActive(tab)}
              className="pb-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)]"
              style={{
                fontWeight: isActive
                  ? 'var(--ds-weight-semibold, 600)'
                  : 'var(--ds-weight-normal, 400)',
                color: isActive
                  ? 'rgb(var(--ds-foreground))'
                  : 'rgb(var(--ds-muted-foreground))',
                borderBottom: isActive
                  ? '2px solid rgb(var(--ds-primary))'
                  : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div>
        {active === 'Progress' && <ProgressPreview />}
        {active === 'Form fields' && <FormFields />}
        {active === 'Accordion' && <Accordion />}
      </div>
    </div>
  );
}

function FormFields() {
  return (
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
  );
}

function SelectionControls() {
  const [checkbox, setCheckbox] = useState(true);
  const [radio, setRadio] = useState('comfortable');
  const [toggle, setToggle] = useState(true);
  const [slider, setSlider] = useState(60);

  const radioOptions = ['default', 'comfortable', 'compact'];

  return (
    <div className="flex flex-col gap-[var(--ds-space-4,1rem)]">
      {/* Checkbox */}
      <label className="flex items-center gap-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] cursor-pointer">
        <button
          type="button"
          onClick={() => setCheckbox((v) => !v)}
          className="inline-flex h-4 w-4 items-center justify-center rounded-[var(--ds-radius-sm,0.25rem)]"
          style={{
            background: checkbox ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-background))',
            color: 'rgb(var(--ds-primary-foreground))',
            border: checkbox
              ? '1px solid rgb(var(--ds-primary))'
              : '1px solid rgb(var(--ds-input))',
            fontSize: '0.625rem',
            lineHeight: 1,
          }}
        >
          {checkbox ? '✓' : ''}
        </button>
        <span style={{ color: 'rgb(var(--ds-foreground))' }}>Accept terms</span>
      </label>

      {/* Radio group */}
      <div className="flex flex-col gap-[var(--ds-space-2,0.5rem)]">
        {radioOptions.map((opt) => {
          const isOn = radio === opt;
          return (
            <label
              key={opt}
              className="flex items-center gap-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] cursor-pointer"
            >
              <button
                type="button"
                onClick={() => setRadio(opt)}
                className="inline-flex h-4 w-4 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
                style={{
                  background: 'rgb(var(--ds-background))',
                  border: isOn
                    ? '1px solid rgb(var(--ds-primary))'
                    : '1px solid rgb(var(--ds-input))',
                }}
              >
                {isOn && (
                  <span
                    className="h-2 w-2 rounded-[var(--ds-radius-full,9999px)]"
                    style={{ background: 'rgb(var(--ds-primary))' }}
                  />
                )}
              </button>
              <span
                style={{ color: 'rgb(var(--ds-foreground))', textTransform: 'capitalize' }}
              >
                {opt}
              </span>
            </label>
          );
        })}
      </div>

      {/* Switch */}
      <label className="flex items-center justify-between text-[length:var(--ds-text-sm,0.875rem)] cursor-pointer">
        <span style={{ color: 'rgb(var(--ds-foreground))' }}>Airplane mode</span>
        <button
          type="button"
          onClick={() => setToggle((v) => !v)}
          className="relative inline-flex h-5 w-9 items-center rounded-[var(--ds-radius-full,9999px)] transition"
          style={{
            background: toggle ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-input))',
            padding: '2px',
          }}
        >
          <span
            className="h-4 w-4 rounded-[var(--ds-radius-full,9999px)] transition"
            style={{
              background: 'rgb(var(--ds-background))',
              transform: toggle ? 'translateX(16px)' : 'translateX(0)',
            }}
          />
        </button>
      </label>

      {/* Slider */}
      <div className="flex flex-col gap-[var(--ds-space-2,0.5rem)]">
        <div className="flex items-center justify-between text-[length:var(--ds-text-sm,0.875rem)]">
          <span style={{ color: 'rgb(var(--ds-foreground))' }}>Volume</span>
          <span style={{ color: 'rgb(var(--ds-muted-foreground))' }}>{slider}%</span>
        </div>
        <div className="relative h-4 w-full">
          {/* Track */}
          <div
            className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-[var(--ds-radius-full,9999px)]"
            style={{ background: 'rgb(var(--ds-muted))' }}
          />
          {/* Filled */}
          <div
            className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-[var(--ds-radius-full,9999px)]"
            style={{ width: `${slider}%`, background: 'rgb(var(--ds-primary))' }}
          />
          {/* Thumb (visual only) */}
          <div
            className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-[var(--ds-radius-full,9999px)]"
            style={{
              left: `${slider}%`,
              background: 'rgb(var(--ds-background))',
              border: '1px solid rgb(var(--ds-primary))',
              boxShadow: 'var(--ds-shadow-sm)',
            }}
          />
          {/* Transparent native range drives interaction (drag + keyboard) */}
          <input
            type="range"
            min={0}
            max={100}
            value={slider}
            onChange={(e) => setSlider(Number(e.target.value))}
            aria-label="Volume"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
      </div>
    </div>
  );
}

function DropdownMenu() {
  return (
    <div className="flex flex-col gap-[var(--ds-space-3,0.75rem)]">
      <button
        type="button"
        className="inline-flex w-fit items-center gap-[var(--ds-space-2,0.5rem)] rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium"
        style={{
          background: 'rgb(var(--ds-background))',
          color: 'rgb(var(--ds-foreground))',
          border: '1px solid rgb(var(--ds-border))',
        }}
      >
        Options <span style={{ color: 'rgb(var(--ds-muted-foreground))' }}>▾</span>
      </button>
      <div
        className="w-48 rounded-[var(--ds-radius-md,0.375rem)] p-[var(--ds-space-1,0.25rem)]"
        style={{
          background: 'rgb(var(--ds-card))',
          color: 'rgb(var(--ds-card-foreground))',
          border: '1px solid rgb(var(--ds-border))',
          boxShadow: 'var(--ds-shadow-md)',
        }}
      >
        {['Profile', 'Billing', 'Settings'].map((item) => (
          <MenuItem key={item}>{item}</MenuItem>
        ))}
        <div
          className="my-[var(--ds-space-1,0.25rem)] h-px"
          style={{ background: 'rgb(var(--ds-border))' }}
        />
        <MenuItem destructive>Log out</MenuItem>
      </div>
    </div>
  );
}

function MenuItem({
  children,
  destructive,
}: {
  children: React.ReactNode;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-1,0.25rem)] text-left text-[length:var(--ds-text-sm,0.875rem)] transition hover:opacity-80"
      style={{
        color: destructive
          ? 'rgb(var(--ds-destructive))'
          : 'rgb(var(--ds-foreground))',
      }}
    >
      {children}
    </button>
  );
}

function DialogPreview() {
  return (
    <div
      className="relative flex h-56 items-center justify-center overflow-hidden rounded-[var(--ds-radius-md,0.375rem)]"
      style={{ background: 'rgb(var(--ds-muted))' }}
    >
      {/* Scrim */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgb(var(--ds-foreground))', opacity: 0.4 }}
      />
      {/* Dialog */}
      <div
        className="relative z-10 w-64 rounded-[var(--ds-radius-lg,0.5rem)] p-[var(--ds-space-4,1rem)]"
        style={{
          background: 'rgb(var(--ds-card))',
          color: 'rgb(var(--ds-card-foreground))',
          border: '1px solid rgb(var(--ds-border))',
          boxShadow: 'var(--ds-shadow-lg)',
        }}
      >
        <div className="flex items-start justify-between">
          <h4
            style={{
              fontSize: 'var(--ds-text-base, 1rem)',
              fontWeight: 'var(--ds-weight-semibold, 600)',
            }}
          >
            Delete project
          </h4>
          <button
            type="button"
            style={{ color: 'rgb(var(--ds-muted-foreground))' }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p
          className="mt-[var(--ds-space-2,0.5rem)]"
          style={{
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          This action cannot be undone.
        </p>
        <div className="mt-[var(--ds-space-4,1rem)] flex justify-end gap-[var(--ds-space-2,0.5rem)]">
          <button
            type="button"
            className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium"
            style={{
              background: 'rgb(var(--ds-secondary))',
              color: 'rgb(var(--ds-secondary-foreground))',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium"
            style={{
              background: 'rgb(var(--ds-destructive))',
              color: 'rgb(var(--ds-destructive-foreground))',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function AvatarSkeleton() {
  return (
    <div className="flex flex-col gap-[var(--ds-space-4,1rem)]">
      <div className="flex items-center gap-[var(--ds-space-3,0.75rem)]">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
          style={{
            background: 'rgb(var(--ds-primary))',
            color: 'rgb(var(--ds-primary-foreground))',
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            fontWeight: 'var(--ds-weight-semibold, 600)',
          }}
        >
          MJ
        </span>
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
          style={{
            background: 'rgb(var(--ds-muted))',
            color: 'rgb(var(--ds-muted-foreground))',
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            fontWeight: 'var(--ds-weight-semibold, 600)',
          }}
        >
          JD
        </span>
        <div className="flex flex-col gap-[var(--ds-space-1,0.25rem)]">
          <span
            style={{
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              fontWeight: 'var(--ds-weight-medium, 500)',
            }}
          >
            Michael Jordan
          </span>
          <span
            style={{
              fontSize: 'var(--ds-text-xs, 0.75rem)',
              color: 'rgb(var(--ds-muted-foreground))',
            }}
          >
            Online
          </span>
        </div>
      </div>

      {/* Skeleton */}
      <div className="flex items-center gap-[var(--ds-space-3,0.75rem)]">
        <div
          className="h-10 w-10 rounded-[var(--ds-radius-full,9999px)]"
          style={{ background: 'rgb(var(--ds-muted))' }}
        />
        <div className="flex flex-1 flex-col gap-[var(--ds-space-2,0.5rem)]">
          <div
            className="h-3 w-3/4 rounded-[var(--ds-radius-sm,0.25rem)]"
            style={{ background: 'rgb(var(--ds-muted))' }}
          />
          <div
            className="h-3 w-1/2 rounded-[var(--ds-radius-sm,0.25rem)]"
            style={{ background: 'rgb(var(--ds-muted))' }}
          />
        </div>
      </div>
    </div>
  );
}

function Accordion() {
  const items = [
    { q: 'Is it accessible?', a: 'Yes. It adheres to WAI-ARIA design patterns.' },
    { q: 'Is it styled?', a: 'Yes. It comes with default styles you can override.' },
    { q: 'Is it animated?', a: 'Yes. It is animated by default, but configurable.' },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} style={{ borderBottom: '1px solid rgb(var(--ds-border))' }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-[var(--ds-space-3,0.75rem)] text-left text-[length:var(--ds-text-sm,0.875rem)]"
              style={{
                color: 'rgb(var(--ds-foreground))',
                fontWeight: 'var(--ds-weight-medium, 500)',
              }}
            >
              {item.q}
              <span
                style={{
                  color: 'rgb(var(--ds-muted-foreground))',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.15s',
                }}
              >
                ▾
              </span>
            </button>
            {isOpen && (
              <p
                className="pb-[var(--ds-space-3,0.75rem)]"
                style={{
                  fontSize: 'var(--ds-text-sm, 0.875rem)',
                  color: 'rgb(var(--ds-muted-foreground))',
                }}
              >
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CommandPalette() {
  const groups = [
    { label: 'Suggestions', items: ['Calendar', 'Search Emoji', 'Calculator'] },
    { label: 'Settings', items: ['Profile', 'Billing', 'Keyboard shortcuts'] },
  ];
  return (
    <div
      className="overflow-hidden rounded-[var(--ds-radius-lg,0.5rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        border: '1px solid rgb(var(--ds-border))',
        boxShadow: 'var(--ds-shadow-lg)',
      }}
    >
      <div
        className="flex items-center gap-[var(--ds-space-2,0.5rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
        style={{ borderBottom: '1px solid rgb(var(--ds-border))' }}
      >
        <span style={{ color: 'rgb(var(--ds-muted-foreground))' }}>⌘</span>
        <input
          type="text"
          placeholder="Type a command or search..."
          className="w-full bg-transparent text-[length:var(--ds-text-sm,0.875rem)] outline-none"
          style={{ color: 'rgb(var(--ds-foreground))' }}
        />
      </div>
      <div className="p-[var(--ds-space-2,0.5rem)]">
        {groups.map((group) => (
          <div key={group.label} className="mb-[var(--ds-space-2,0.5rem)]">
            <div
              className="px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-1,0.25rem)]"
              style={{
                fontSize: 'var(--ds-text-xs, 0.75rem)',
                fontWeight: 'var(--ds-weight-medium, 500)',
                color: 'rgb(var(--ds-muted-foreground))',
              }}
            >
              {group.label}
            </div>
            {group.items.map((item) => (
              <button
                type="button"
                key={item}
                className="flex w-full items-center rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-1,0.25rem)] text-left text-[length:var(--ds-text-sm,0.875rem)] transition hover:opacity-80"
                style={{ color: 'rgb(var(--ds-foreground))' }}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ToastPreview() {
  return (
    <div className="flex items-center justify-center py-[var(--ds-space-4,1rem)]">
      <div
        className="flex w-full items-center justify-between gap-[var(--ds-space-3,0.75rem)] rounded-[var(--ds-radius-lg,0.5rem)] p-[var(--ds-space-4,1rem)]"
        style={{
          background: 'rgb(var(--ds-card))',
          color: 'rgb(var(--ds-card-foreground))',
          border: '1px solid rgb(var(--ds-border))',
          boxShadow: 'var(--ds-shadow-lg)',
        }}
      >
        <div className="flex flex-col gap-[var(--ds-space-1,0.25rem)]">
          <span
            style={{
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              fontWeight: 'var(--ds-weight-semibold, 600)',
            }}
          >
            Event scheduled
          </span>
          <span
            style={{
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              color: 'rgb(var(--ds-muted-foreground))',
            }}
          >
            Friday, June 26 at 9:00 AM
          </span>
        </div>
        <button
          type="button"
          className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium"
          style={{
            background: 'transparent',
            color: 'rgb(var(--ds-foreground))',
            border: '1px solid rgb(var(--ds-border))',
          }}
        >
          Undo
        </button>
      </div>
    </div>
  );
}

function ProgressPreview() {
  const value = 65;
  return (
    <div className="flex flex-col gap-[var(--ds-space-2,0.5rem)]">
      <div className="flex items-center justify-between text-[length:var(--ds-text-sm,0.875rem)]">
        <span style={{ color: 'rgb(var(--ds-foreground))' }}>Uploading...</span>
        <span style={{ color: 'rgb(var(--ds-muted-foreground))' }}>{value}%</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-[var(--ds-radius-full,9999px)]"
        style={{ background: 'rgb(var(--ds-muted))' }}
      >
        <div
          className="h-full rounded-[var(--ds-radius-full,9999px)]"
          style={{ width: `${value}%`, background: 'rgb(var(--ds-primary))' }}
        />
      </div>
    </div>
  );
}

function DataTable() {
  const rows = [
    { id: 'INV001', status: 'Paid', amount: '$250.00' },
    { id: 'INV002', status: 'Pending', amount: '$150.00' },
    { id: 'INV003', status: 'Unpaid', amount: '$350.00' },
    { id: 'INV004', status: 'Paid', amount: '$450.00' },
    { id: 'INV005', status: 'Pending', amount: '$550.00' },
  ];
  const [selected, setSelected] = useState<Record<string, boolean>>({ INV002: true });
  const toggle = (id: string) =>
    setSelected((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div
      className="overflow-hidden rounded-[var(--ds-radius-md,0.375rem)]"
      style={{ border: '1px solid rgb(var(--ds-border))' }}
    >
      <table className="w-full text-[length:var(--ds-text-sm,0.875rem)]">
        <thead>
          <tr style={{ borderBottom: '1px solid rgb(var(--ds-border))' }}>
            <th className="w-8 px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]" />
            <th
              className="px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-left"
              style={{
                color: 'rgb(var(--ds-muted-foreground))',
                fontWeight: 'var(--ds-weight-medium, 500)',
              }}
            >
              Invoice
            </th>
            <th
              className="px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-left"
              style={{
                color: 'rgb(var(--ds-muted-foreground))',
                fontWeight: 'var(--ds-weight-medium, 500)',
              }}
            >
              Status
            </th>
            <th
              className="px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-right"
              style={{
                color: 'rgb(var(--ds-muted-foreground))',
                fontWeight: 'var(--ds-weight-medium, 500)',
              }}
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isSelected = !!selected[row.id];
            return (
              <tr
                key={row.id}
                style={{
                  borderBottom: '1px solid rgb(var(--ds-border))',
                  background: isSelected ? 'rgb(var(--ds-muted))' : 'transparent',
                }}
              >
                <td className="px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]">
                  <button
                    type="button"
                    onClick={() => toggle(row.id)}
                    className="inline-flex h-4 w-4 items-center justify-center rounded-[var(--ds-radius-sm,0.25rem)]"
                    style={{
                      background: isSelected
                        ? 'rgb(var(--ds-primary))'
                        : 'rgb(var(--ds-background))',
                      color: 'rgb(var(--ds-primary-foreground))',
                      border: isSelected
                        ? '1px solid rgb(var(--ds-primary))'
                        : '1px solid rgb(var(--ds-input))',
                      fontSize: '0.625rem',
                      lineHeight: 1,
                    }}
                  >
                    {isSelected ? '✓' : ''}
                  </button>
                </td>
                <td
                  className="px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
                  style={{ color: 'rgb(var(--ds-foreground))', fontWeight: 'var(--ds-weight-medium, 500)' }}
                >
                  {row.id}
                </td>
                <td
                  className="px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
                  style={{ color: 'rgb(var(--ds-muted-foreground))' }}
                >
                  {row.status}
                </td>
                <td
                  className="px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-right"
                  style={{ color: 'rgb(var(--ds-foreground))' }}
                >
                  {row.amount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
