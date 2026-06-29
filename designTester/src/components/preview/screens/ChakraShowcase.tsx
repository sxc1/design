import { useState } from 'react';

export function ChakraShowcase() {
  const [tab, setTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [switchOn, setSwitchOn] = useState(true);
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('standard');
  const [slider, setSlider] = useState(60);
  const [tags, setTags] = useState(['Design', 'Research', 'Frontend', 'Roadmap']);
  const [menuOpen, setMenuOpen] = useState(true);

  const tabs = ['Overview', 'Activity', 'Settings'];
  const tabPanels = [
    'A friendly summary of your workspace and recent highlights.',
    'See who did what, and when — your team activity stream.',
    'Tune preferences, members, and integrations here.',
  ];
  const accordionItems = [
    { q: 'How do I invite teammates?', a: 'Open Settings → Members and send an email invite. They will join your workspace instantly.' },
    { q: 'Can I change my plan later?', a: 'Yes — upgrade or downgrade anytime. Changes are prorated to your billing cycle.' },
    { q: 'Is my data backed up?', a: 'We back up continuously and retain restorable snapshots for 30 days.' },
  ];

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
          Friendly, rounded, and roomy — soft shadows and generous spacing.{' '}
          <a
            href="https://chakra-ui.com/"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgb(var(--ds-primary))', textDecoration: 'underline' }}
          >
            Learn more
          </a>
        </p>
      </header>

      <nav
        className="mb-[var(--ds-space-6,1.5rem)] flex items-center gap-[var(--ds-space-2,0.5rem)]"
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        <a href="#" className="hover:opacity-80" style={{ color: 'rgb(var(--ds-muted-foreground))' }}>
          Home
        </a>
        <span aria-hidden>›</span>
        <a href="#" className="hover:opacity-80" style={{ color: 'rgb(var(--ds-muted-foreground))' }}>
          Workspace
        </a>
        <span aria-hidden>›</span>
        <span style={{ color: 'rgb(var(--ds-foreground))', fontWeight: 'var(--ds-weight-medium, 500)' }}>
          Settings
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-[var(--ds-space-8,2rem)] md:grid-cols-2">
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

        <CCard title="Stats">
          <div className="flex flex-wrap gap-[var(--ds-space-8,2rem)]">
            <CStat label="Monthly active users" value="71,887" change="+12.4%" up />
            <CStat label="New signups" value="3,210" change="+5.1%" up />
            <CStat label="Churn rate" value="2.3%" change="-0.8%" up={false} />
            <CStat label="Avg. session" value="8m 42s" change="+3.2%" up />
          </div>
        </CCard>

        <CCard title="Button variants">
          <div className="flex flex-wrap gap-[var(--ds-space-4,1rem)]">
            <CButton variant="solid">Solid</CButton>
            <CButton variant="subtle">Subtle</CButton>
            <CButton variant="outline">Outline</CButton>
            <CButton variant="ghost">Ghost</CButton>
            <CButton variant="destructive">Danger</CButton>
          </div>
        </CCard>

        <CCard title="Tags & Avatar">
          <div className="flex flex-wrap items-center gap-[var(--ds-space-3,0.75rem)]">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-[var(--ds-space-2,0.5rem)] rounded-[var(--ds-radius-full,9999px)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)]"
                style={{
                  background: 'rgb(var(--ds-accent))',
                  color: 'rgb(var(--ds-accent-foreground))',
                  fontSize: 'var(--ds-text-sm, 0.875rem)',
                  fontWeight: 'var(--ds-weight-medium, 500)',
                }}
              >
                {t}
                <button
                  type="button"
                  onClick={() => setTags((prev) => prev.filter((x) => x !== t))}
                  className="hover:opacity-70"
                  style={{ fontSize: 'var(--ds-text-xs, 0.75rem)' }}
                  aria-label={`Remove ${t}`}
                >
                  ✕
                </button>
              </span>
            ))}
            <div className="relative ml-[var(--ds-space-2,0.5rem)] inline-flex">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
                style={{
                  background: 'rgb(var(--ds-primary))',
                  color: 'rgb(var(--ds-primary-foreground))',
                  fontSize: 'var(--ds-text-base, 1rem)',
                  fontWeight: 'var(--ds-weight-bold, 700)',
                }}
              >
                MR
              </span>
              <span
                className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-[var(--ds-radius-full,9999px)]"
                style={{
                  background: 'rgb(var(--ds-primary))',
                  border: '2px solid rgb(var(--ds-card))',
                }}
              />
            </div>
          </div>
        </CCard>

        <CCard title="Selection controls">
          <div className="flex flex-col gap-[var(--ds-space-5,1.25rem)]">
            {/* Switch */}
            <button
              type="button"
              onClick={() => setSwitchOn((v) => !v)}
              className="flex items-center gap-[var(--ds-space-3,0.75rem)]"
            >
              <span
                className="relative inline-flex h-6 w-11 items-center rounded-[var(--ds-radius-full,9999px)] transition"
                style={{ background: switchOn ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-muted))' }}
              >
                <span
                  className="inline-block h-5 w-5 rounded-[var(--ds-radius-full,9999px)] transition"
                  style={{
                    background: 'rgb(var(--ds-background))',
                    transform: switchOn ? 'translateX(1.375rem)' : 'translateX(0.125rem)',
                    boxShadow: 'var(--ds-shadow-sm)',
                  }}
                />
              </span>
              <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}>
                Email notifications
              </span>
            </button>

            {/* Checkbox */}
            <button
              type="button"
              onClick={() => setChecked((v) => !v)}
              className="flex items-center gap-[var(--ds-space-3,0.75rem)]"
            >
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-[var(--ds-radius-md,0.375rem)]"
                style={{
                  background: checked ? 'rgb(var(--ds-primary))' : 'transparent',
                  color: 'rgb(var(--ds-primary-foreground))',
                  border: checked ? 'none' : '2px solid rgb(var(--ds-border))',
                  fontSize: 'var(--ds-text-xs, 0.75rem)',
                  fontWeight: 'var(--ds-weight-bold, 700)',
                }}
              >
                {checked ? '✓' : ''}
              </span>
              <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}>
                I agree to the terms
              </span>
            </button>

            {/* Radio group */}
            <div className="flex flex-col gap-[var(--ds-space-2,0.5rem)]">
              {['standard', 'priority'].map((opt) => {
                const on = radio === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setRadio(opt)}
                    className="flex items-center gap-[var(--ds-space-3,0.75rem)] capitalize"
                  >
                    <span
                      className="inline-flex h-5 w-5 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
                      style={{ border: `2px solid ${on ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-border))'}` }}
                    >
                      {on && (
                        <span
                          className="h-2.5 w-2.5 rounded-[var(--ds-radius-full,9999px)]"
                          style={{ background: 'rgb(var(--ds-primary))' }}
                        />
                      )}
                    </span>
                    <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}>{opt} shipping</span>
                  </button>
                );
              })}
            </div>

            {/* Slider */}
            <div className="flex flex-col gap-[var(--ds-space-2,0.5rem)]">
              <div
                className="flex items-center justify-between"
                style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}
              >
                <span>Volume</span>
                <span style={{ color: 'rgb(var(--ds-muted-foreground))' }}>{slider}%</span>
              </div>
              <div className="relative h-2 rounded-[var(--ds-radius-full,9999px)]" style={{ background: 'rgb(var(--ds-muted))' }}>
                <div
                  className="absolute left-0 top-0 h-2 rounded-[var(--ds-radius-full,9999px)]"
                  style={{ width: `${slider}%`, background: 'rgb(var(--ds-primary))' }}
                />
                <span
                  className="ds-slider-thumb absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-[var(--ds-radius-full,9999px)]"
                  style={{
                    left: `calc(${slider}% - 0.5rem)`,
                    background: 'rgb(var(--ds-background))',
                    border: '2px solid rgb(var(--ds-primary))',
                    boxShadow: 'var(--ds-shadow-sm)',
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={slider}
                  onChange={(e) => setSlider(Number(e.target.value))}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
            </div>
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
            {/* Toast */}
            <div
              className="flex items-stretch gap-[var(--ds-space-3,0.75rem)] overflow-hidden rounded-[var(--ds-radius-xl,0.75rem)] p-[var(--ds-space-4,1rem)]"
              style={{
                background: 'rgb(var(--ds-card))',
                border: '1px solid rgb(var(--ds-border))',
                boxShadow: 'var(--ds-shadow-lg)',
              }}
            >
              <div
                className="w-1 rounded-[var(--ds-radius-full,9999px)]"
                style={{ background: 'rgb(var(--ds-primary))' }}
              />
              <div className="flex-1">
                <div style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', fontWeight: 'var(--ds-weight-bold, 700)' }}>
                  Changes saved
                </div>
                <div
                  className="mt-[var(--ds-space-1,0.25rem)]"
                  style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', color: 'rgb(var(--ds-muted-foreground))' }}
                >
                  Your workspace settings were updated successfully.
                </div>
              </div>
              <button
                type="button"
                className="self-start hover:opacity-70"
                style={{ color: 'rgb(var(--ds-muted-foreground))', fontSize: 'var(--ds-text-sm, 0.875rem)' }}
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        </CCard>

        <CCard title="Menu">
          <div className="relative inline-block">
            <CButton variant="outline" onClick={() => setMenuOpen((v) => !v)}>
              Actions ▾
            </CButton>
            {menuOpen && (
              <div
                className="mt-[var(--ds-space-2,0.5rem)] w-56 overflow-hidden rounded-[var(--ds-radius-xl,0.75rem)] p-[var(--ds-space-1,0.25rem)]"
                style={{
                  background: 'rgb(var(--ds-card))',
                  border: '1px solid rgb(var(--ds-border))',
                  boxShadow: 'var(--ds-shadow-lg)',
                }}
              >
                {['Edit profile', 'Duplicate', 'Share'].map((m) => (
                  <CMenuItem key={m}>{m}</CMenuItem>
                ))}
                <div className="my-[var(--ds-space-1,0.25rem)] h-px" style={{ background: 'rgb(var(--ds-border))' }} />
                <CMenuItem destructive>Delete</CMenuItem>
              </div>
            )}
          </div>
        </CCard>

        <CCard title="Accordion">
          <div className="flex flex-col gap-[var(--ds-space-3,0.75rem)]">
            {accordionItems.map((item, i) => {
              const open = openAccordion === i;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-[var(--ds-radius-lg,0.5rem)]"
                  style={{ border: '1px solid rgb(var(--ds-border))' }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(open ? null : i)}
                    className="flex w-full items-center justify-between px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)] text-left"
                    style={{
                      fontSize: 'var(--ds-text-sm, 0.875rem)',
                      fontWeight: 'var(--ds-weight-semibold, 600)',
                      background: open ? 'rgb(var(--ds-accent))' : 'transparent',
                      color: open ? 'rgb(var(--ds-accent-foreground))' : 'rgb(var(--ds-foreground))',
                    }}
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden
                      style={{
                        transition: 'transform 0.2s',
                        transform: open ? 'rotate(180deg)' : 'none',
                        color: 'rgb(var(--ds-muted-foreground))',
                      }}
                    >
                      ▾
                    </span>
                  </button>
                  {open && (
                    <div
                      className="px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)]"
                      style={{
                        fontSize: 'var(--ds-text-sm, 0.875rem)',
                        color: 'rgb(var(--ds-muted-foreground))',
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CCard>

        <CCard title="Tabs">
          <div
            className="inline-flex gap-[var(--ds-space-1,0.25rem)] rounded-[var(--ds-radius-xl,0.75rem)] p-[var(--ds-space-1,0.25rem)]"
            style={{ background: 'rgb(var(--ds-muted))' }}
          >
            {tabs.map((t, i) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(i)}
                className="rounded-[var(--ds-radius-lg,0.5rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] font-semibold transition"
                style={
                  tab === i
                    ? {
                        background: 'rgb(var(--ds-card))',
                        color: 'rgb(var(--ds-foreground))',
                        boxShadow: 'var(--ds-shadow-sm)',
                      }
                    : { background: 'transparent', color: 'rgb(var(--ds-muted-foreground))' }
                }
              >
                {t}
              </button>
            ))}
          </div>
          <p
            className="mt-[var(--ds-space-4,1rem)]"
            style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', color: 'rgb(var(--ds-muted-foreground))' }}
          >
            {tabPanels[tab]}
          </p>
        </CCard>

        <CCard title="Tooltip & Popover">
          <div className="flex items-center gap-[var(--ds-space-8,2rem)]">
            <div className="relative inline-flex pt-[var(--ds-space-8,2rem)]">
              <CButton variant="outline">Hover me</CButton>
              <span
                className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-[var(--ds-radius-lg,0.5rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)]"
                style={{
                  background: 'rgb(var(--ds-foreground))',
                  color: 'rgb(var(--ds-background))',
                  fontSize: 'var(--ds-text-xs, 0.75rem)',
                  boxShadow: 'var(--ds-shadow-md)',
                }}
              >
                More info ★
              </span>
            </div>
            <div
              className="max-w-xs rounded-[var(--ds-radius-xl,0.75rem)] p-[var(--ds-space-4,1rem)]"
              style={{
                background: 'rgb(var(--ds-card))',
                border: '1px solid rgb(var(--ds-border))',
                boxShadow: 'var(--ds-shadow-lg)',
              }}
            >
              <div style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', fontWeight: 'var(--ds-weight-semibold, 600)' }}>
                Quick tip
              </div>
              <div
                className="mt-[var(--ds-space-1,0.25rem)]"
                style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', color: 'rgb(var(--ds-muted-foreground))' }}
              >
                Popovers float above content in a soft rounded surface.
              </div>
            </div>
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
              className="rounded-[var(--ds-radius-lg,0.5rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)] text-[length:var(--ds-text-base,1rem)] outline-hidden"
              style={{
                background: 'rgb(var(--ds-background))',
                color: 'rgb(var(--ds-foreground))',
                border: '2px solid rgb(var(--ds-input))',
              }}
            />
          </label>
        </CCard>

        <CCard title="Skeleton">
          <div className="flex items-center gap-[var(--ds-space-4,1rem)]">
            <div
              className="h-12 w-12 rounded-[var(--ds-radius-full,9999px)]"
              style={{ background: 'rgb(var(--ds-muted))' }}
            />
            <div className="flex flex-1 flex-col gap-[var(--ds-space-2,0.5rem)]">
              <div className="h-3 w-3/4 rounded-[var(--ds-radius-full,9999px)]" style={{ background: 'rgb(var(--ds-muted))' }} />
              <div className="h-3 w-1/2 rounded-[var(--ds-radius-full,9999px)]" style={{ background: 'rgb(var(--ds-muted))' }} />
              <div className="h-3 w-2/3 rounded-[var(--ds-radius-full,9999px)]" style={{ background: 'rgb(var(--ds-muted))' }} />
            </div>
          </div>
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
  onClick,
}: {
  variant: 'solid' | 'subtle' | 'outline' | 'ghost' | 'destructive';
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const style =
    variant === 'solid'
      ? {
          background: 'rgb(var(--ds-primary))',
          color: 'rgb(var(--ds-primary-foreground))',
        }
      : variant === 'destructive'
        ? {
            background: 'rgb(var(--ds-destructive))',
            color: 'rgb(var(--ds-destructive-foreground))',
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
      onClick={onClick}
      className="rounded-[var(--ds-radius-lg,0.5rem)] px-[var(--ds-space-5,1.25rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] font-semibold transition hover:opacity-90"
      style={style}
    >
      {children}
    </button>
  );
}

function CStat({
  label,
  value,
  change,
  up,
}: {
  label: string;
  value: string;
  change: string;
  up: boolean;
}) {
  return (
    <div className="flex flex-col gap-[var(--ds-space-1,0.25rem)]">
      <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', color: 'rgb(var(--ds-muted-foreground))' }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 'var(--ds-text-3xl, 1.875rem)',
          fontWeight: 'var(--ds-weight-bold, 700)',
          lineHeight: 'var(--ds-leading-tight, 1.25)',
        }}
      >
        {value}
      </span>
      <span
        className="inline-flex items-center gap-[var(--ds-space-1,0.25rem)]"
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          fontWeight: 'var(--ds-weight-medium, 500)',
          color: up ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-destructive))',
        }}
      >
        <span aria-hidden>{up ? '↑' : '↓'}</span>
        {change}
      </span>
    </div>
  );
}

function CMenuItem({
  children,
  destructive,
}: {
  children: React.ReactNode;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      className="w-full rounded-[var(--ds-radius-lg,0.5rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-left transition hover:opacity-80"
      style={{
        fontSize: 'var(--ds-text-sm, 0.875rem)',
        color: destructive ? 'rgb(var(--ds-destructive))' : 'rgb(var(--ds-foreground))',
        background: 'transparent',
      }}
    >
      {children}
    </button>
  );
}

function CBadge({ children, subtle }: { children: React.ReactNode; subtle?: boolean }) {
  return (
    <span
      className="inline-flex items-center rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-0_5,0.125rem)]"
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
