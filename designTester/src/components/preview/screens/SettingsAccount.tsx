import { useState } from 'react';

const NAV = ['Profile', 'Account', 'Notifications', 'Billing', 'Team'];

export function SettingsAccount() {
  const [active, setActive] = useState('Profile');
  return (
    <div className="min-h-full" style={{ padding: 'var(--ds-space-6, 1.5rem)' }}>
      <header className="mb-[var(--ds-space-6,1.5rem)]">
        <h1
          style={{
            fontSize: 'var(--ds-text-2xl, 1.5rem)',
            fontWeight: 'var(--ds-weight-bold, 700)',
          }}
        >
          Settings
        </h1>
        <p
          style={{
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          Manage your profile, preferences, and billing.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-[var(--ds-space-6,1.5rem)] md:grid-cols-[12rem_1fr]">
        <nav className="flex flex-col gap-[var(--ds-space-1,0.25rem)]">
          {NAV.map((item) => {
            const on = item === active;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setActive(item)}
                className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-left text-[length:var(--ds-text-sm,0.875rem)] transition"
                style={
                  on
                    ? {
                        background: 'rgb(var(--ds-secondary))',
                        color: 'rgb(var(--ds-secondary-foreground))',
                        fontWeight: 'var(--ds-weight-semibold, 600)',
                      }
                    : { color: 'rgb(var(--ds-muted-foreground))' }
                }
              >
                {item}
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col gap-[var(--ds-space-6,1.5rem)]">
          <Section
            title="Profile"
            description="This information is displayed on your public profile."
          >
            <div className="flex items-center gap-[var(--ds-space-4,1rem)]">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
                style={{
                  background: 'rgb(var(--ds-accent))',
                  color: 'rgb(var(--ds-accent-foreground))',
                  fontSize: 'var(--ds-text-xl, 1.25rem)',
                  fontWeight: 'var(--ds-weight-bold, 700)',
                }}
              >
                AT
              </div>
              <GhostButton>Change avatar</GhostButton>
            </div>
            <Field label="Full name" value="Ava Thompson" />
            <Field label="Email" value="ava@example.com" type="email" />
          </Section>

          <Section
            title="Preferences"
            description="Choose how the product behaves for you."
          >
            <Toggle label="Email notifications" defaultOn />
            <Toggle label="Product updates" defaultOn />
            <Toggle label="Weekly digest" />
          </Section>

          <Section title="Billing" description="You are on the Pro plan.">
            <div
              className="flex items-center justify-between rounded-[var(--ds-radius-md,0.375rem)] p-[var(--ds-space-4,1rem)]"
              style={{
                background: 'rgb(var(--ds-muted))',
                color: 'rgb(var(--ds-muted-foreground))',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 'var(--ds-text-sm, 0.875rem)',
                    fontWeight: 'var(--ds-weight-semibold, 600)',
                    color: 'rgb(var(--ds-foreground))',
                  }}
                >
                  Pro · $49/mo
                </div>
                <div style={{ fontSize: 'var(--ds-text-xs, 0.75rem)' }}>
                  Renews on July 1, 2026
                </div>
              </div>
              <PrimaryButton>Manage plan</PrimaryButton>
            </div>
          </Section>

          <div className="flex justify-end gap-[var(--ds-space-2,0.5rem)]">
            <GhostButton>Cancel</GhostButton>
            <PrimaryButton>Save changes</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-[var(--ds-radius-lg,0.5rem)] p-[var(--ds-space-5,1.25rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        border: '1px solid rgb(var(--ds-border))',
        boxShadow: 'var(--ds-elev-raised)',
      }}
    >
      <h2
        style={{
          fontSize: 'var(--ds-text-lg, 1.125rem)',
          fontWeight: 'var(--ds-weight-semibold, 600)',
        }}
      >
        {title}
      </h2>
      <p
        className="mb-[var(--ds-space-4,1rem)]"
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        {description}
      </p>
      <div className="flex flex-col gap-[var(--ds-space-3,0.75rem)]">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  type = 'text',
}: {
  label: string;
  value: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-[var(--ds-space-1,0.25rem)]">
      <span
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          fontWeight: 'var(--ds-weight-medium, 500)',
        }}
      >
        {label}
      </span>
      <input
        type={type}
        defaultValue={value}
        className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] outline-none"
        style={{
          background: 'rgb(var(--ds-background))',
          color: 'rgb(var(--ds-foreground))',
          border: '1px solid rgb(var(--ds-input))',
        }}
      />
    </label>
  );
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(Boolean(defaultOn));
  return (
    <div className="flex items-center justify-between">
      <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className="relative h-6 w-11 rounded-[var(--ds-radius-full,9999px)] transition"
        style={{
          background: on ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-muted))',
        }}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-[var(--ds-radius-full,9999px)] transition-all"
          style={{
            left: on ? '1.375rem' : '0.125rem',
            background: 'rgb(var(--ds-background))',
            boxShadow: 'var(--ds-shadow-sm)',
          }}
        />
      </button>
    </div>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium transition hover:opacity-90"
      style={{
        background: 'rgb(var(--ds-primary))',
        color: 'rgb(var(--ds-primary-foreground))',
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium transition hover:opacity-90"
      style={{
        background: 'transparent',
        color: 'rgb(var(--ds-foreground))',
        border: '1px solid rgb(var(--ds-border))',
      }}
    >
      {children}
    </button>
  );
}
