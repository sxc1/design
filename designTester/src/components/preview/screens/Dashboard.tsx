import { useState } from 'react';

const CRUMBS = ['Home', 'Overview', 'Dashboard'];

const STEPS = ['Provision', 'Configure', 'Deploy', 'Verify'];
const CURRENT_STEP = 2;

const STATS = [
  { label: 'Active Instances', value: '24', delta: '12%', up: true },
  { label: 'Requests / min', value: '12.4k', delta: '8.2%', up: true },
  { label: 'Error Rate', value: '0.42%', delta: '3%', up: false },
  { label: 'p95 Latency', value: '128ms', delta: '5%', up: false },
];

const ROWS = [
  { name: 'API Gateway', env: 'prod', status: 'Running', cpu: '42%' },
  { name: 'Auth Service', env: 'prod', status: 'Running', cpu: '18%' },
  { name: 'Billing Worker', env: 'staging', status: 'Degraded', cpu: '77%' },
  { name: 'Search Index', env: 'prod', status: 'Stopped', cpu: '0%' },
];

const ALERTS: { kind: 'secondary' | 'success' | 'warning' | 'error'; text: string }[] = [
  { kind: 'success', text: 'Deployment to prod-us-1 completed successfully.' },
  { kind: 'error', text: 'Billing Worker CPU has been above 75% for 10 min.' },
  { kind: 'secondary', text: 'A new platform version is available — review changelog.' },
];

const TABS = ['Overview', 'Metrics', 'Logs', 'Settings'];

const REGIONS = ['us-west-2', 'us-east-1', 'eu-central-1'];

export function Dashboard() {
  return (
    <div className="min-h-full">
      {/* shadcn breadcrumbs */}
      <Breadcrumb />

      <div
        className="flex flex-col gap-[var(--ds-space-5,1.25rem)]"
        style={{ padding: 'var(--ds-space-6, 1.5rem)' }}
      >
        {/* Page header + Ant buttons */}
        <header className="flex flex-wrap items-end justify-between gap-[var(--ds-space-4,1rem)]">
          <div>
            <h1
              style={{
                fontSize: 'var(--ds-text-2xl, 1.5rem)',
                fontWeight: 'var(--ds-weight-bold, 700)',
              }}
            >
              Dashboard
            </h1>
            <p
              style={{
                fontSize: 'var(--ds-text-sm, 0.875rem)',
                color: 'rgb(var(--ds-muted-foreground))',
              }}
            >
              Monitor your services, traffic, and recent activity.
            </p>
          </div>
          <div className="flex flex-wrap gap-[var(--ds-space-2,0.5rem)]">
            <AButton type="default">↻ Refresh</AButton>
            <AButton type="default">Export</AButton>
            <AButton type="primary">+ New instance</AButton>
            <AButton type="danger">Terminate</AButton>
          </div>
        </header>

        {/* Ant stat cards */}
        <div className="grid grid-cols-2 gap-[var(--ds-space-3,0.75rem)] lg:grid-cols-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Ant progress stepper */}
        <AntCard>
          <Stepper />
        </AntCard>

        {/* Ant grid (data table) */}
        <AntCard flush>
          <table
            className="w-full border-collapse"
            style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}
          >
            <thead>
              <tr
                style={{
                  background: 'rgb(var(--ds-muted))',
                  color: 'rgb(var(--ds-muted-foreground))',
                }}
              >
                <AntTh>Service</AntTh>
                <AntTh>Env</AntTh>
                <AntTh>Status</AntTh>
                <AntTh align="right">CPU</AntTh>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.name} style={{ borderTop: '1px solid rgb(var(--ds-border))' }}>
                  <AntTd>{r.name}</AntTd>
                  <AntTd>
                    <Tag>{r.env}</Tag>
                  </AntTd>
                  <AntTd>
                    <StatusTag status={r.status} />
                  </AntTd>
                  <AntTd align="right">{r.cpu}</AntTd>
                </tr>
              ))}
            </tbody>
          </table>
        </AntCard>

        {/* Ant create-instance form + notifications & tabs */}
        <div className="grid grid-cols-1 gap-[var(--ds-space-5,1.25rem)] md:grid-cols-2">
          <AntCard>
            <CreateInstanceForm />
          </AntCard>
          <AntCard>
            <NotificationsTabs />
          </AntCard>
        </div>

        {/* Chakra profile + Material snackbar & badge */}
        <div className="grid grid-cols-1 gap-[var(--ds-space-5,1.25rem)] md:grid-cols-2">
          <ChakraProfile />
          <MaterialNotices />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── shadcn ─────────────────────────── */

function Breadcrumb() {
  return (
    <nav
      className="flex items-center gap-[var(--ds-space-2,0.5rem)] border-b px-[var(--ds-space-6,1.5rem)] py-[var(--ds-space-3,0.75rem)]"
      style={{
        borderColor: 'rgb(var(--ds-border))',
        background: 'rgb(var(--ds-background))',
        fontSize: 'var(--ds-text-sm, 0.875rem)',
      }}
    >
      {CRUMBS.map((crumb, i) => {
        const isLast = i === CRUMBS.length - 1;
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
            {!isLast && <span style={{ color: 'rgb(var(--ds-muted-foreground))' }}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}

/* ─────────────────────────── Ant Design ─────────────────────────── */

function AntCard({
  children,
  flush,
}: {
  children: React.ReactNode;
  flush?: boolean;
}) {
  return (
    <section
      className={`rounded-[var(--ds-radius-sm,0.25rem)] ${flush ? 'overflow-hidden' : 'p-[var(--ds-space-4,1rem)]'}`}
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        border: '1px solid rgb(var(--ds-border))',
      }}
    >
      {children}
    </section>
  );
}

function AButton({
  type,
  children,
}: {
  type: 'primary' | 'default' | 'dashed' | 'danger';
  children: React.ReactNode;
}) {
  const style =
    type === 'primary'
      ? {
          background: 'rgb(var(--ds-primary))',
          color: 'rgb(var(--ds-primary-foreground))',
          border: '1px solid rgb(var(--ds-primary))',
        }
      : type === 'danger'
        ? {
            background: 'rgb(var(--ds-destructive))',
            color: 'rgb(var(--ds-destructive-foreground))',
            border: '1px solid rgb(var(--ds-destructive))',
          }
        : {
            background: 'rgb(var(--ds-background))',
            color: 'rgb(var(--ds-foreground))',
            border:
              type === 'dashed'
                ? '1px dashed rgb(var(--ds-input))'
                : '1px solid rgb(var(--ds-input))',
          };
  return (
    <button
      type="button"
      className="rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)] transition hover:opacity-90"
      style={style}
    >
      {children}
    </button>
  );
}

function Stepper() {
  return (
    <div className="flex items-center">
      {STEPS.map((label, i) => {
        const done = i < CURRENT_STEP;
        const active = i === CURRENT_STEP;
        return (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex items-center gap-[var(--ds-space-2,0.5rem)]">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
                style={{
                  fontSize: 'var(--ds-text-sm, 0.875rem)',
                  background:
                    done || active ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-muted))',
                  color:
                    done || active
                      ? 'rgb(var(--ds-primary-foreground))'
                      : 'rgb(var(--ds-muted-foreground))',
                }}
              >
                {done ? '✓' : i + 1}
              </div>
              <span
                style={{
                  fontSize: 'var(--ds-text-sm, 0.875rem)',
                  fontWeight: active
                    ? 'var(--ds-weight-semibold, 600)'
                    : 'var(--ds-weight-normal, 400)',
                  color: active
                    ? 'rgb(var(--ds-foreground))'
                    : 'rgb(var(--ds-muted-foreground))',
                }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 ? (
              <div
                className="mx-[var(--ds-space-2,0.5rem)] h-px flex-1"
                style={{ background: 'rgb(var(--ds-border))' }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function StatCard({
  label,
  value,
  delta,
  up,
}: {
  label: string;
  value: string;
  delta: string;
  up: boolean;
}) {
  return (
    <div
      className="rounded-[var(--ds-radius-sm,0.25rem)] p-[var(--ds-space-4,1rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        border: '1px solid rgb(var(--ds-border))',
      }}
    >
      <div
        style={{
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        {label}
      </div>
      <div
        className="mt-[var(--ds-space-1,0.25rem)]"
        style={{
          fontSize: 'var(--ds-text-2xl, 1.5rem)',
          fontWeight: 'var(--ds-weight-semibold, 600)',
        }}
      >
        {value}
      </div>
      <div
        className="mt-[var(--ds-space-1,0.25rem)]"
        style={{
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          color: up ? 'rgb(var(--ds-accent-foreground))' : 'rgb(var(--ds-destructive))',
        }}
      >
        {up ? '↑' : '↓'} {delta}
      </div>
    </div>
  );
}

function AntTh({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <th
      className="px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)]"
      style={{
        textAlign: align,
        fontSize: 'var(--ds-text-xs, 0.75rem)',
        fontWeight: 'var(--ds-weight-semibold, 600)',
      }}
    >
      {children}
    </th>
  );
}

function AntTd({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <td
      className="px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)]"
      style={{ textAlign: align }}
    >
      {children}
    </td>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-0_5,0.125rem)]"
      style={{
        fontSize: 'var(--ds-text-xs, 0.75rem)',
        background: 'rgb(var(--ds-accent))',
        color: 'rgb(var(--ds-accent-foreground))',
        border: '1px solid rgb(var(--ds-border))',
      }}
    >
      {children}
    </span>
  );
}

function StatusTag({ status }: { status: string }) {
  const map: Record<string, { bg: string; fg: string }> = {
    Running: { bg: 'rgb(var(--ds-accent))', fg: 'rgb(var(--ds-accent-foreground))' },
    Degraded: { bg: 'rgb(var(--ds-warning))', fg: 'rgb(var(--ds-warning-foreground))' },
    Stopped: { bg: 'rgb(var(--ds-destructive))', fg: 'rgb(var(--ds-destructive-foreground))' },
  };
  const c = map[status] ?? map.Running;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-0_5,0.125rem)]"
      style={{ fontSize: 'var(--ds-text-xs, 0.75rem)', background: c.bg, color: c.fg }}
    >
      ● {status}
    </span>
  );
}

function CreateInstanceForm() {
  return (
    <form className="flex flex-col gap-[var(--ds-space-3,0.75rem)]">
      <FormRow label="Name">
        <AntInput placeholder="my-instance" />
      </FormRow>
      <FormRow label="Region">
        <SelectDropdown />
      </FormRow>
      <FormRow label="Description">
        <AntInput placeholder="Optional" />
      </FormRow>
      <div className="flex justify-end gap-[var(--ds-space-2,0.5rem)] pl-[8rem]">
        <AButton type="default">Cancel</AButton>
        <AButton type="primary">Submit</AButton>
      </div>
    </form>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[var(--ds-space-3,0.75rem)]">
      <label
        className="w-[8rem] shrink-0"
        style={{
          textAlign: 'right',
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          color: 'rgb(var(--ds-foreground))',
        }}
      >
        {label}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function AntInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)]"
      style={{
        fontSize: 'var(--ds-text-sm, 0.875rem)',
        background: 'rgb(var(--ds-background))',
        color: 'rgb(var(--ds-foreground))',
        border: '1px solid rgb(var(--ds-input))',
      }}
    />
  );
}

function SelectDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(REGIONS[0]);
  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)]"
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          background: 'rgb(var(--ds-background))',
          color: 'rgb(var(--ds-foreground))',
          border: '1px solid rgb(var(--ds-input))',
        }}
      >
        {selected}
        <span style={{ color: 'rgb(var(--ds-muted-foreground))' }}>▾</span>
      </button>
      {open ? (
        <ul
          className="absolute z-10 mt-[var(--ds-space-1,0.25rem)] w-full overflow-hidden rounded-[var(--ds-radius-sm,0.25rem)]"
          style={{
            background: 'rgb(var(--ds-card))',
            border: '1px solid rgb(var(--ds-border))',
          }}
        >
          {REGIONS.map((opt) => {
            const isSel = opt === selected;
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(opt);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-left"
                  style={{
                    fontSize: 'var(--ds-text-sm, 0.875rem)',
                    background: isSel ? 'rgb(var(--ds-accent))' : 'transparent',
                    color: isSel
                      ? 'rgb(var(--ds-accent-foreground))'
                      : 'rgb(var(--ds-foreground))',
                    fontWeight: isSel
                      ? 'var(--ds-weight-medium, 500)'
                      : 'var(--ds-weight-normal, 400)',
                  }}
                >
                  {opt}
                  {isSel ? <span>✓</span> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function NotificationsTabs() {
  return (
    <>
      <div className="flex flex-col gap-[var(--ds-space-2,0.5rem)]">
        {ALERTS.map((a) => (
          <AlertBanner key={a.kind} kind={a.kind} text={a.text} />
        ))}
      </div>
      <div className="mt-[var(--ds-space-4,1rem)]">
        <Tabs />
      </div>
    </>
  );
}

function AlertBanner({
  kind,
  text,
}: {
  kind: 'secondary' | 'success' | 'warning' | 'error';
  text: string;
}) {
  const map = {
    secondary: {
      bg: 'rgb(var(--ds-secondary))',
      fg: 'rgb(var(--ds-secondary-foreground))',
      glyph: '●',
    },
    success: {
      bg: 'rgb(var(--ds-accent))',
      fg: 'rgb(var(--ds-accent-foreground))',
      glyph: '✓',
    },
    warning: {
      bg: 'rgb(var(--ds-warning))',
      fg: 'rgb(var(--ds-warning-foreground))',
      glyph: '▸',
    },
    error: {
      bg: 'rgb(var(--ds-destructive))',
      fg: 'rgb(var(--ds-destructive-foreground))',
      glyph: '●',
    },
  } as const;
  const c = map[kind];
  return (
    <div
      className="flex items-center gap-[var(--ds-space-2,0.5rem)] rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
      style={{
        background: c.bg,
        color: c.fg,
        fontSize: 'var(--ds-text-sm, 0.875rem)',
        border: '1px solid rgb(var(--ds-border))',
      }}
    >
      <span>{c.glyph}</span>
      {text}
    </div>
  );
}

function Tabs() {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div
        className="flex gap-[var(--ds-space-4,1rem)]"
        style={{ borderBottom: '1px solid rgb(var(--ds-border))' }}
      >
        {TABS.map((t, i) => {
          const isActive = active === i;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setActive(i)}
              className="pb-[var(--ds-space-2,0.5rem)]"
              style={{
                fontSize: 'var(--ds-text-sm, 0.875rem)',
                fontWeight: isActive
                  ? 'var(--ds-weight-semibold, 600)'
                  : 'var(--ds-weight-normal, 400)',
                color: isActive
                  ? 'rgb(var(--ds-primary))'
                  : 'rgb(var(--ds-muted-foreground))',
                borderBottom: isActive
                  ? '2px solid rgb(var(--ds-primary))'
                  : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {t}
            </button>
          );
        })}
      </div>
      <div
        className="pt-[var(--ds-space-3,0.75rem)]"
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        Content for the {TABS[active]} tab.
      </div>
    </div>
  );
}

/* ─────────────────────────── Chakra UI ─────────────────────────── */

function ChakraProfile() {
  return (
    <section
      className="rounded-[var(--ds-radius-xl,0.75rem)] p-[var(--ds-space-6,1.5rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        boxShadow: 'var(--ds-shadow-lg)',
      }}
    >
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
          EP
        </div>
        <div className="flex-1">
          <div
            style={{
              fontSize: 'var(--ds-text-lg, 1.125rem)',
              fontWeight: 'var(--ds-weight-semibold, 600)',
            }}
          >
            Ethan Park
          </div>
          <div
            style={{
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              color: 'rgb(var(--ds-muted-foreground))',
            }}
          >
            Site Reliability Engineer
          </div>
          <div className="mt-[var(--ds-space-2,0.5rem)] flex gap-[var(--ds-space-2,0.5rem)]">
            <CBadge>Pro</CBadge>
            <CBadge subtle>Online</CBadge>
          </div>
        </div>
        <CButton variant="solid">Follow</CButton>
      </div>

      <div
        className="my-[var(--ds-space-5,1.25rem)] h-px"
        style={{ background: 'rgb(var(--ds-border))' }}
      />

      <div className="flex justify-between">
        {[
          { label: 'Services', value: '18' },
          { label: 'Uptime', value: '99.98%' },
          { label: 'Incidents', value: '142' },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-[var(--ds-space-1,0.25rem)]">
            <span
              style={{
                fontSize: 'var(--ds-text-xl, 1.25rem)',
                fontWeight: 'var(--ds-weight-bold, 700)',
              }}
            >
              {s.value}
            </span>
            <span
              style={{
                fontSize: 'var(--ds-text-xs, 0.75rem)',
                color: 'rgb(var(--ds-muted-foreground))',
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CButton({
  variant,
  children,
}: {
  variant: 'solid' | 'outline';
  children: React.ReactNode;
}) {
  const style =
    variant === 'solid'
      ? {
          background: 'rgb(var(--ds-primary))',
          color: 'rgb(var(--ds-primary-foreground))',
        }
      : {
          background: 'transparent',
          color: 'rgb(var(--ds-primary))',
          border: '1px solid rgb(var(--ds-primary))',
        };
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

/* ─────────────────────────── Material UI ─────────────────────────── */

const BELL_PATH =
  'M12 2a6 6 0 0 0-6 6c0 3.5-1.2 5.3-2 6.2-.3.4 0 1 .5 1h15c.5 0 .8-.6.5-1-.8-.9-2-2.7-2-6.2a6 6 0 0 0-6-6Z M10 20a2 2 0 0 0 4 0';

function MaterialNotices() {
  return (
    <section
      className="flex flex-col rounded-[var(--ds-radius-lg,0.5rem)] p-[var(--ds-space-6,1.5rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        border: '1px solid rgb(var(--ds-border))',
        boxShadow: 'var(--ds-elev-raised)',
      }}
    >
      <div className="flex items-center gap-[var(--ds-space-6,1.5rem)]">
        <IconBadge count={4} label="Messages">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </IconBadge>
        <IconBadge count={12} label="Alerts">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={BELL_PATH} />
          </svg>
        </IconBadge>
        <IconBadge count={3} label="Tasks">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 11l3 3 8-8" />
            <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
          </svg>
        </IconBadge>
      </div>

      {/* spacer pushes the snackbar to the bottom edge */}
      <div className="min-h-[var(--ds-space-6,1.5rem)] flex-1" />

      {/* Snackbar */}
      <div
        className="flex items-center justify-between gap-[var(--ds-space-3,0.75rem)] rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)]"
        style={{
          background: 'rgb(var(--ds-foreground))',
          color: 'rgb(var(--ds-background))',
          boxShadow: 'var(--ds-shadow-lg)',
        }}
      >
        <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}>
          Instance provisioned successfully
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
    </section>
  );
}

function IconBadge({
  count,
  label,
  children,
}: {
  count: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-[var(--ds-space-2,0.5rem)]">
      <div className="relative inline-flex">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
          style={{
            background: 'rgb(var(--ds-muted))',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          {children}
        </span>
        <span
          className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-[var(--ds-radius-full,9999px)] px-1"
          style={{
            background: 'rgb(var(--ds-destructive))',
            color: 'rgb(var(--ds-destructive-foreground))',
            fontSize: 'var(--ds-text-xs, 0.75rem)',
            fontWeight: 'var(--ds-weight-semibold, 600)',
          }}
        >
          {count}
        </span>
      </div>
      <span
        style={{
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        {label}
      </span>
    </div>
  );
}
