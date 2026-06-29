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
          Google's design system for bold, tactile, motion-rich interfaces.{' '}
          <a
            href="https://mui.com/material-ui/"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgb(var(--ds-primary))', textDecoration: 'underline' }}
          >
            Learn more
          </a>
        </p>
      </header>

      <div style={{ padding: 'var(--ds-space-6, 1.5rem)' }}>
      <div
        className="grid grid-cols-1 gap-[var(--ds-space-6,1.5rem)] md:grid-cols-2"
      >
        <MCard title="Buttons">
          <div className="flex flex-wrap items-center gap-[var(--ds-space-3,0.75rem)]">
            <MButton variant="contained">Contained</MButton>
            <MButton variant="outlined">Outlined</MButton>
            <MButton variant="text">Text</MButton>
          </div>
          <div className="mt-[var(--ds-space-4,1rem)]">
            <SpeedDial />
          </div>
        </MCard>

        <MCard title="Snackbar & badge">
          <div className="flex items-center gap-[var(--ds-space-5,1.25rem)]">
            <div className="relative inline-flex">
              <button
                type="button"
                aria-label="Notifications"
                className="flex h-12 w-12 items-center justify-center rounded-[var(--ds-radius-full,9999px)] text-xl"
                style={{
                  background: 'rgb(var(--ds-muted))',
                  color: 'rgb(var(--ds-muted-foreground))',
                }}
              >
                ✉
              </button>
              <span
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-[var(--ds-radius-full,9999px)] px-1"
                style={{
                  background: 'rgb(var(--ds-destructive))',
                  color: 'rgb(var(--ds-destructive-foreground))',
                  fontSize: 'var(--ds-text-xs, 0.75rem)',
                  fontWeight: 'var(--ds-weight-semibold, 600)',
                }}
              >
                4
              </span>
            </div>
            <span
              style={{
                fontSize: 'var(--ds-text-sm, 0.875rem)',
                color: 'rgb(var(--ds-muted-foreground))',
              }}
            >
              Badge overlay
            </span>
          </div>
          <div
            className="mt-[var(--ds-space-4,1rem)] flex items-center justify-between gap-[var(--ds-space-3,0.75rem)] rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)]"
            style={{
              background: 'rgb(var(--ds-foreground))',
              color: 'rgb(var(--ds-background))',
              boxShadow: 'var(--ds-shadow-lg)',
            }}
          >
            <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}>
              Message sent
            </span>
            <button
              type="button"
              className="text-[length:var(--ds-text-sm,0.875rem)]"
              style={{
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 'var(--ds-weight-medium, 500)',
                color: 'rgb(var(--ds-accent))',
              }}
            >
              Undo
            </button>
          </div>
        </MCard>

        <MCard title="Chips">
          <div className="flex flex-wrap gap-[var(--ds-space-2,0.5rem)]">
            <Chip>Default</Chip>
            <Chip filled>Filled</Chip>
            <Chip>React ✕</Chip>
            <Chip destructive>Design ✕</Chip>
          </div>
        </MCard>

        <MCard title="Toggles">
          <div className="flex flex-col gap-[var(--ds-space-4,1rem)]">
            <RadioCheckboxGroup />
            <div className="flex items-center gap-[var(--ds-space-4,1rem)]">
              <MSwitch defaultOn />
              <MSwitch />
            </div>
          </div>
        </MCard>

        <MCard title="Card with media">
          <div
            className="mb-[var(--ds-space-4,1rem)] h-32 w-full rounded-[var(--ds-radius-sm,0.25rem)]"
            style={{
              background:
                'linear-gradient(135deg, rgb(var(--ds-primary)), rgb(var(--ds-accent)))',
            }}
          />
          <h4
            className="mb-[var(--ds-space-1,0.25rem)]"
            style={{
              fontSize: 'var(--ds-text-lg, 1.125rem)',
              fontWeight: 'var(--ds-weight-semibold, 600)',
            }}
          >
            Lizard
          </h4>
          <p
            style={{
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              color: 'rgb(var(--ds-muted-foreground))',
              lineHeight: 'var(--ds-leading-tight, 1.25)',
            }}
          >
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species ranging across all continents except Antarctica.
          </p>
          <div className="mt-[var(--ds-space-4,1rem)] flex gap-[var(--ds-space-2,0.5rem)]">
            <MButton variant="text">Share</MButton>
            <MButton variant="text">Learn more</MButton>
          </div>
        </MCard>

        <MCard title="Form">
          <SelectField label="Country" value="United States" />
          <div className="h-[var(--ds-space-4,1rem)]" />
          <OutlinedField label="Email" value="you@example.com" />
          <div className="h-[var(--ds-space-4,1rem)]" />
          <OutlinedField label="Password" value="" type="password" />
        </MCard>

        <MCard title="Avatar group">
          <AvatarGroup />
        </MCard>

        <MCard title="Circular progress">
          <CircularProgress value={68} />
        </MCard>

        <MCard title="Slider">
          <MSlider />
        </MCard>

        <MCard title="Accordion">
          <MAccordion />
        </MCard>

        <MCard title="Stepper">
          <MStepper />
        </MCard>

        <MCard title="Tabs">
          <MTabs />
        </MCard>
      </div>
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
        className="w-full rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-3,0.75rem)] text-[length:var(--ds-text-sm,0.875rem)] outline-hidden"
        style={{
          background: 'transparent',
          color: 'rgb(var(--ds-foreground))',
          border: '1px solid rgb(var(--ds-input))',
        }}
      />
    </label>
  );
}

function Chip({
  children,
  filled,
  destructive,
}: {
  children: React.ReactNode;
  filled?: boolean;
  destructive?: boolean;
}) {
  const style = destructive
    ? {
        background: 'rgb(var(--ds-destructive))',
        color: 'rgb(var(--ds-destructive-foreground))',
      }
    : filled
      ? {
          background: 'rgb(var(--ds-primary))',
          color: 'rgb(var(--ds-primary-foreground))',
        }
      : {
          background: 'rgb(var(--ds-muted))',
          color: 'rgb(var(--ds-muted-foreground))',
        };
  return (
    <span
      className="inline-flex items-center rounded-[var(--ds-radius-full,9999px)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)]"
      style={style}
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

function RadioCheckboxGroup() {
  const [radio, setRadio] = useState('a');
  const [checks, setChecks] = useState<Record<string, boolean>>({
    x: true,
    y: false,
  });
  const radios = [
    { id: 'a', label: 'Option A' },
    { id: 'b', label: 'Option B' },
  ];
  const boxes = [
    { id: 'x', label: 'Notifications' },
    { id: 'y', label: 'Newsletter' },
  ];
  return (
    <div className="flex flex-col gap-[var(--ds-space-3,0.75rem)]">
      {radios.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => setRadio(r.id)}
          className="flex items-center gap-[var(--ds-space-3,0.75rem)] text-left"
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
            style={{
              border: `2px solid ${radio === r.id ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-input))'}`,
            }}
          >
            {radio === r.id && (
              <span
                className="h-2.5 w-2.5 rounded-[var(--ds-radius-full,9999px)]"
                style={{ background: 'rgb(var(--ds-primary))' }}
              />
            )}
          </span>
          <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}>{r.label}</span>
        </button>
      ))}
      {boxes.map((b) => (
        <button
          key={b.id}
          type="button"
          onClick={() => setChecks((c) => ({ ...c, [b.id]: !c[b.id] }))}
          className="flex items-center gap-[var(--ds-space-3,0.75rem)] text-left"
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-[var(--ds-radius-sm,0.25rem)]"
            style={{
              background: checks[b.id] ? 'rgb(var(--ds-primary))' : 'transparent',
              color: 'rgb(var(--ds-primary-foreground))',
              border: `2px solid ${checks[b.id] ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-input))'}`,
              fontSize: 'var(--ds-text-xs, 0.75rem)',
            }}
          >
            {checks[b.id] && '✓'}
          </span>
          <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}>{b.label}</span>
        </button>
      ))}
    </div>
  );
}

function MSlider() {
  const [value, setValue] = useState(45);
  return (
    <div className="py-[var(--ds-space-4,1rem)]">
      <div className="relative h-4 w-full">
        <div
          className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-[var(--ds-radius-full,9999px)]"
          style={{ background: 'rgb(var(--ds-muted))' }}
        />
        <div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-[var(--ds-radius-full,9999px)]"
          style={{ width: `${value}%`, background: 'rgb(var(--ds-primary))' }}
        />
        <div
          className="ds-slider-thumb pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-[var(--ds-radius-full,9999px)]"
          style={{
            left: `${value}%`,
            background: 'rgb(var(--ds-primary))',
            boxShadow: 'var(--ds-shadow-md)',
          }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Slider"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
      <p
        className="mt-[var(--ds-space-3,0.75rem)]"
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        Value: {value}
      </p>
    </div>
  );
}

function MTabs() {
  const [active, setActive] = useState(0);
  const tabs = ['Overview', 'Activity', 'Settings'];
  return (
    <div>
      <div
        className="flex border-b"
        style={{ borderColor: 'rgb(var(--ds-border))' }}
      >
        {tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(i)}
            className="relative px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)] text-[length:var(--ds-text-sm,0.875rem)]"
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontWeight: 'var(--ds-weight-medium, 500)',
              color:
                active === i
                  ? 'rgb(var(--ds-primary))'
                  : 'rgb(var(--ds-muted-foreground))',
            }}
          >
            {t}
            {active === i && (
              <span
                className="absolute bottom-0 left-0 h-0.5 w-full"
                style={{ background: 'rgb(var(--ds-primary))' }}
              />
            )}
          </button>
        ))}
      </div>
      <p
        className="mt-[var(--ds-space-4,1rem)]"
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        {tabs[active]} content
      </p>
    </div>
  );
}

function MStepper() {
  const steps = ['Cart', 'Address', 'Payment'];
  const current = 1;
  return (
    <div className="flex items-center">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-1 items-center last:flex-none">
          <div className="flex items-center gap-[var(--ds-space-2,0.5rem)]">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
              style={{
                background:
                  i <= current ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-muted))',
                color:
                  i <= current
                    ? 'rgb(var(--ds-primary-foreground))'
                    : 'rgb(var(--ds-muted-foreground))',
                fontSize: 'var(--ds-text-sm, 0.875rem)',
                fontWeight: 'var(--ds-weight-medium, 500)',
              }}
            >
              {i < current ? '✓' : i + 1}
            </span>
            <span
              style={{
                fontSize: 'var(--ds-text-sm, 0.875rem)',
                color:
                  i <= current
                    ? 'rgb(var(--ds-foreground))'
                    : 'rgb(var(--ds-muted-foreground))',
                fontWeight:
                  i === current
                    ? 'var(--ds-weight-medium, 500)'
                    : 'var(--ds-weight-normal, 400)',
              }}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="mx-[var(--ds-space-3,0.75rem)] h-px flex-1"
              style={{ background: 'rgb(var(--ds-border))' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function MAccordion() {
  const [open, setOpen] = useState(true);
  return (
    <div
      className="rounded-[var(--ds-radius-sm,0.25rem)]"
      style={{ border: '1px solid rgb(var(--ds-border))' }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)]"
      >
        <span
          style={{
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            fontWeight: 'var(--ds-weight-medium, 500)',
          }}
        >
          Accordion panel
        </span>
        <span
          className="transition-transform"
          style={{
            color: 'rgb(var(--ds-muted-foreground))',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        >
          ▾
        </span>
      </button>
      {open && (
        <div
          className="border-t px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)]"
          style={{ borderColor: 'rgb(var(--ds-border))' }}
        >
          <p
            style={{
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              color: 'rgb(var(--ds-muted-foreground))',
              lineHeight: 'var(--ds-leading-tight, 1.25)',
            }}
          >
            Expansion panels contain creation flows and allow lightweight editing
            of an element.
          </p>
        </div>
      )}
    </div>
  );
}

function CircularProgress({ value }: { value: number }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-20 w-20">
        <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="rgb(var(--ds-muted))"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="rgb(var(--ds-primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            fontWeight: 'var(--ds-weight-semibold, 600)',
          }}
        >
          {value}%
        </span>
      </div>
    </div>
  );
}

function AvatarGroup() {
  const avatars = ['A', 'B', 'C'];
  return (
    <div className="flex items-center">
      {avatars.map((a, i) => (
        <span
          key={a}
          className="flex h-10 w-10 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
          style={{
            marginLeft: i === 0 ? 0 : '-0.75rem',
            background: 'rgb(var(--ds-primary))',
            color: 'rgb(var(--ds-primary-foreground))',
            border: '2px solid rgb(var(--ds-card))',
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            fontWeight: 'var(--ds-weight-medium, 500)',
          }}
        >
          {a}
        </span>
      ))}
      <span
        className="flex h-10 w-10 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
        style={{
          marginLeft: '-0.75rem',
          background: 'rgb(var(--ds-muted))',
          color: 'rgb(var(--ds-muted-foreground))',
          border: '2px solid rgb(var(--ds-card))',
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          fontWeight: 'var(--ds-weight-medium, 500)',
        }}
      >
        +3
      </span>
    </div>
  );
}

function SelectField({ label, value }: { label: string; value: string }) {
  const options = ['United States', 'Canada', 'Mexico'];
  const [selected, setSelected] = useState(value);
  const [open, setOpen] = useState(false);
  return (
    <label className="relative block">
      <span
        className="absolute -top-2 left-3 z-10 px-1"
        style={{
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          background: 'rgb(var(--ds-card))',
          color: 'rgb(var(--ds-primary))',
        }}
      >
        {label}
      </span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-3,0.75rem)] text-[length:var(--ds-text-sm,0.875rem)]"
        style={{
          color: 'rgb(var(--ds-foreground))',
          border: '1px solid rgb(var(--ds-input))',
        }}
      >
        <span>{selected}</span>
        <span
          className="transition-transform"
          style={{
            color: 'rgb(var(--ds-muted-foreground))',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        >
          ▾
        </span>
      </button>
      {open && (
        <ul
          className="absolute left-0 right-0 top-full z-20 mt-[var(--ds-space-1,0.25rem)] overflow-hidden rounded-[var(--ds-radius-sm,0.25rem)] py-[var(--ds-space-1,0.25rem)]"
          style={{
            background: 'rgb(var(--ds-card))',
            border: '1px solid rgb(var(--ds-border))',
            boxShadow: 'var(--ds-shadow-lg)',
          }}
        >
          {options.map((opt) => {
            const isSelected = opt === selected;
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(opt);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-left text-[length:var(--ds-text-sm,0.875rem)] transition hover:opacity-80"
                  style={{
                    background: isSelected ? 'rgb(var(--ds-accent))' : 'transparent',
                    color: isSelected
                      ? 'rgb(var(--ds-accent-foreground))'
                      : 'rgb(var(--ds-foreground))',
                  }}
                >
                  <span>{opt}</span>
                  {isSelected && <span>✓</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </label>
  );
}

function SpeedDial() {
  const [open, setOpen] = useState(false);
  const actions = ['✉', '★', '✎'];
  return (
    <div className="flex items-center">
      <button
        type="button"
        aria-label="Toggle speed dial"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 flex-none items-center justify-center rounded-[var(--ds-radius-full,9999px)] text-2xl transition"
        style={{
          background: 'rgb(var(--ds-accent))',
          color: 'rgb(var(--ds-accent-foreground))',
          boxShadow: 'var(--ds-shadow-lg)',
          transform: open ? 'rotate(45deg)' : 'none',
        }}
      >
        +
      </button>
      {actions.map((a, i) => (
        <button
          key={a}
          type="button"
          aria-label="Speed dial action"
          tabIndex={open ? 0 : -1}
          className="flex h-10 flex-none items-center justify-center overflow-hidden rounded-[var(--ds-radius-full,9999px)] transition-all duration-200"
          style={{
            width: open ? '2.5rem' : 0,
            marginLeft: open ? 'var(--ds-space-3, 0.75rem)' : 0,
            opacity: open ? 1 : 0,
            transform: open ? 'translateX(0) scale(1)' : 'translateX(-0.5rem) scale(0.8)',
            transitionDelay: open
              ? `${i * 60}ms`
              : `${(actions.length - 1 - i) * 60}ms`,
            pointerEvents: open ? 'auto' : 'none',
            background: 'rgb(var(--ds-secondary))',
            color: 'rgb(var(--ds-secondary-foreground))',
            boxShadow: 'var(--ds-shadow-md)',
          }}
        >
          {a}
        </button>
      ))}
    </div>
  );
}
