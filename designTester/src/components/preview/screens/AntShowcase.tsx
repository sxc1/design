import { useState } from 'react';

const STEPS = ['Account', 'Verify', 'Pay', 'Done'];
const CURRENT_STEP = 2;

const STATS = [
  { label: 'Active Users', value: '8,846', delta: '12%', up: true },
  { label: 'Revenue', value: '$48.2k', delta: '8%', up: true },
  { label: 'Churn Rate', value: '2.4%', delta: '3%', up: false },
  { label: 'Avg. Latency', value: '128ms', delta: '5%', up: false },
];

const TIMELINE = [
  { time: '09:12', text: 'Deployment started on prod-us-1' },
  { time: '09:14', text: 'Database migration completed' },
  { time: '09:18', text: 'Health checks passing' },
  { time: '09:21', text: 'Release marked stable' },
];

const PANELS = [
  {
    title: 'What is a design token?',
    body: 'A design token is a named entity that stores a visual design attribute such as color, spacing, or typography.',
  },
  {
    title: 'How are tokens themed?',
    body: 'Tokens map to CSS custom properties so that swapping a theme updates every consuming component at once.',
  },
  {
    title: 'Can I override a single shade?',
    body: 'Yes — per-shade overrides layer on top of the computed scale without affecting the rest of the palette.',
  },
];

const TABS = ['Overview', 'Metrics', 'Logs', 'Settings'];

const ALERTS: { kind: 'info' | 'success' | 'warning' | 'error'; text: string }[] = [
  { kind: 'info', text: 'A new version is available. Refresh to update.' },
  { kind: 'success', text: 'Your changes have been saved successfully.' },
  { kind: 'warning', text: 'Your trial expires in 3 days.' },
  { kind: 'error', text: 'Failed to connect to the billing service.' },
];

const SELECT_OPTIONS = ['us-west-2', 'us-east-1', 'eu-central-1'];

const ROWS = [
  { name: 'API Gateway', env: 'prod', status: 'Running', cpu: '42%' },
  { name: 'Auth Service', env: 'prod', status: 'Running', cpu: '18%' },
  { name: 'Billing Worker', env: 'staging', status: 'Degraded', cpu: '77%' },
  { name: 'Search Index', env: 'prod', status: 'Stopped', cpu: '0%' },
];

export function AntShowcase() {
  return (
    <div
      className="min-h-full"
      style={{ padding: 'var(--ds-space-6, 1.5rem)' }}
    >
      <header className="mb-[var(--ds-space-5,1.25rem)]">
        <h1
          style={{
            fontSize: 'var(--ds-text-xl, 1.25rem)',
            fontWeight: 'var(--ds-weight-semibold, 600)',
          }}
        >
          Ant Design
        </h1>
        <p
          style={{
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          Dense, enterprise-grade layouts with steps, descriptions, and tables.{' '}
          <a
            href="https://ant.design/"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgb(var(--ds-primary))', textDecoration: 'underline' }}
          >
            Learn more
          </a>
        </p>
      </header>

      {/* Steps */}
      <ACard>
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
                        done || active
                          ? 'rgb(var(--ds-primary))'
                          : 'rgb(var(--ds-muted))',
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
      </ACard>

      <div className="mt-[var(--ds-space-5,1.25rem)] flex flex-wrap gap-[var(--ds-space-2,0.5rem)]">
        <AButton type="primary">Primary</AButton>
        <AButton type="default">Default</AButton>
        <AButton type="dashed">Dashed</AButton>
        <AButton type="danger">Danger</AButton>
      </div>

      {/* Descriptions */}
      <div className="mt-[var(--ds-space-5,1.25rem)]">
        <ACard title="Order details">
          <dl className="grid grid-cols-1 sm:grid-cols-2">
            <Desc term="Order ID" detail="#A1024-8831" />
            <Desc term="Status" detail="Processing" />
            <Desc term="Customer" detail="Ava Thompson" />
            <Desc term="Total" detail="$240.00" />
          </dl>
        </ACard>
      </div>

      {/* Dense table */}
      <div className="mt-[var(--ds-space-5,1.25rem)]">
        <ACard title="Services" flush>
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
                <tr
                  key={r.name}
                  style={{ borderTop: '1px solid rgb(var(--ds-border))' }}
                >
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
        </ACard>
      </div>

      {/* Statistic cards */}
      <div className="mt-[var(--ds-space-5,1.25rem)] grid grid-cols-2 gap-[var(--ds-space-3,0.75rem)] sm:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Activity + Notifications */}
      <div className="mt-[var(--ds-space-5,1.25rem)] grid grid-cols-1 gap-[var(--ds-space-5,1.25rem)] md:grid-cols-2">
        <ACard title="Activity">
          <ol>
            {TIMELINE.map((item, i) => (
              <li key={item.time} className="flex gap-[var(--ds-space-3,0.75rem)]">
                <div className="flex flex-col items-center">
                  <span
                    className="h-2.5 w-2.5 rounded-[var(--ds-radius-full,9999px)]"
                    style={{ background: 'rgb(var(--ds-primary))' }}
                  />
                  {i < TIMELINE.length - 1 ? (
                    <span
                      className="w-px flex-1"
                      style={{ background: 'rgb(var(--ds-border))' }}
                    />
                  ) : null}
                </div>
                <div className="pb-[var(--ds-space-4,1rem)]">
                  <div
                    style={{
                      fontSize: 'var(--ds-text-xs, 0.75rem)',
                      color: 'rgb(var(--ds-muted-foreground))',
                    }}
                  >
                    {item.time}
                  </div>
                  <div style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}>
                    {item.text}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </ACard>

        <ACard title="Notifications & Tabs">
          <div className="flex flex-col gap-[var(--ds-space-2,0.5rem)]">
            {ALERTS.map((a) => (
              <AlertBanner key={a.kind} kind={a.kind} text={a.text} />
            ))}
          </div>
          <div className="mt-[var(--ds-space-4,1rem)]">
            <Tabs />
          </div>
        </ACard>
      </div>

      {/* Progress + Create instance */}
      <div className="mt-[var(--ds-space-5,1.25rem)] grid grid-cols-1 gap-[var(--ds-space-5,1.25rem)] md:grid-cols-2">
        <ACard title="Progress">
          <div className="flex flex-wrap items-center gap-[var(--ds-space-6,1.5rem)]">
            <CircleProgress percent={75} />
            <div className="min-w-[12rem] flex-1">
              <LineProgress percent={66} />
              <div className="mt-[var(--ds-space-4,1rem)]">
                <LineProgress percent={30} />
              </div>
            </div>
          </div>
        </ACard>

        <ACard title="Create instance">
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
        </ACard>
      </div>

      {/* Badge ribbon + result */}
      <div className="mt-[var(--ds-space-5,1.25rem)]">
        <RibbonCard />
      </div>

      {/* Collapse / accordion */}
      <div className="mt-[var(--ds-space-5,1.25rem)]">
        <ACard title="FAQ" flush>
          <Collapse />
        </ACard>
      </div>

      {/* Pagination */}
      <div className="mt-[var(--ds-space-5,1.25rem)]">
        <ACard title="Pagination">
          <Pagination />
        </ACard>
      </div>
    </div>
  );
}

function ACard({
  title,
  children,
  flush,
}: {
  title?: string;
  children: React.ReactNode;
  flush?: boolean;
}) {
  return (
    <section
      className={`rounded-[var(--ds-radius-sm,0.25rem)] ${flush ? 'overflow-hidden' : ''}`}
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        border: '1px solid rgb(var(--ds-border))',
      }}
    >
      {title ? (
        <div
          className="px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)]"
          style={{
            borderBottom: '1px solid rgb(var(--ds-border))',
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            fontWeight: 'var(--ds-weight-semibold, 600)',
          }}
        >
          {title}
        </div>
      ) : null}
      <div className={flush ? '' : 'p-[var(--ds-space-4,1rem)]'}>{children}</div>
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

function Desc({ term, detail }: { term: string; detail: string }) {
  return (
    <div
      className="flex gap-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-2,0.5rem)]"
      style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}
    >
      <dt style={{ color: 'rgb(var(--ds-muted-foreground))', minWidth: '6rem' }}>
        {term}
      </dt>
      <dd style={{ fontWeight: 'var(--ds-weight-medium, 500)' }}>{detail}</dd>
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
    Running: {
      bg: 'rgb(var(--ds-accent))',
      fg: 'rgb(var(--ds-accent-foreground))',
    },
    Degraded: {
      bg: 'rgb(var(--ds-warning))',
      fg: 'rgb(var(--ds-warning-foreground))',
    },
    Stopped: {
      bg: 'rgb(var(--ds-destructive))',
      fg: 'rgb(var(--ds-destructive-foreground))',
    },
  };
  const c = map[status] ?? map.Running;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-0_5,0.125rem)]"
      style={{
        fontSize: 'var(--ds-text-xs, 0.75rem)',
        background: c.bg,
        color: c.fg,
      }}
    >
      ● {status}
    </span>
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
          color: up
            ? 'rgb(var(--ds-accent-foreground))'
            : 'rgb(var(--ds-destructive))',
        }}
      >
        {up ? '↑' : '↓'} {delta}
      </div>
    </div>
  );
}

function Collapse() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {PANELS.map((p, i) => {
        const isOpen = open === i;
        return (
          <div
            key={p.title}
            style={
              i < PANELS.length - 1
                ? { borderBottom: '1px solid rgb(var(--ds-border))' }
                : undefined
            }
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-[var(--ds-space-2,0.5rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)] text-left"
              style={{
                fontSize: 'var(--ds-text-sm, 0.875rem)',
                fontWeight: 'var(--ds-weight-medium, 500)',
              }}
            >
              <span
                style={{
                  color: 'rgb(var(--ds-muted-foreground))',
                  transform: isOpen ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.15s',
                }}
              >
                ▸
              </span>
              {p.title}
            </button>
            {isOpen ? (
              <div
                className="px-[var(--ds-space-4,1rem)] pb-[var(--ds-space-3,0.75rem)]"
                style={{
                  fontSize: 'var(--ds-text-sm, 0.875rem)',
                  color: 'rgb(var(--ds-muted-foreground))',
                }}
              >
                {p.body}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function CircleProgress({ percent }: { percent: number }) {
  const r = 32;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="relative h-[80px] w-[80px]">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="rgb(var(--ds-muted))"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="rgb(var(--ds-primary))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 40 40)"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          fontWeight: 'var(--ds-weight-semibold, 600)',
        }}
      >
        {percent}%
      </span>
    </div>
  );
}

function LineProgress({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-[var(--ds-space-2,0.5rem)]">
      <div
        className="h-2 flex-1 overflow-hidden rounded-[var(--ds-radius-full,9999px)]"
        style={{ background: 'rgb(var(--ds-muted))' }}
      >
        <div
          className="h-full rounded-[var(--ds-radius-full,9999px)]"
          style={{ width: `${percent}%`, background: 'rgb(var(--ds-primary))' }}
        />
      </div>
      <span
        style={{
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          color: 'rgb(var(--ds-muted-foreground))',
          minWidth: '2.5rem',
          textAlign: 'right',
        }}
      >
        {percent}%
      </span>
    </div>
  );
}

function AlertBanner({
  kind,
  text,
}: {
  kind: 'info' | 'success' | 'warning' | 'error';
  text: string;
}) {
  const map = {
    info: {
      bg: 'rgb(var(--ds-warning))',
      fg: 'rgb(var(--ds-warning-foreground))',
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

function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
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

function Pagination() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3];
  const cell =
    'flex h-8 min-w-8 items-center justify-center rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-2,0.5rem)]';
  return (
    <div
      className="flex items-center gap-[var(--ds-space-1,0.25rem)]"
      style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}
    >
      <button
        type="button"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className={cell}
        style={{
          color: 'rgb(var(--ds-muted-foreground))',
          border: '1px solid rgb(var(--ds-border))',
        }}
      >
        ‹
      </button>
      {pages.map((p) => {
        const isActive = page === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => setPage(p)}
            className={cell}
            style={{
              background: isActive ? 'rgb(var(--ds-primary))' : 'transparent',
              color: isActive
                ? 'rgb(var(--ds-primary-foreground))'
                : 'rgb(var(--ds-foreground))',
              border: isActive
                ? '1px solid rgb(var(--ds-primary))'
                : '1px solid rgb(var(--ds-border))',
              fontWeight: isActive
                ? 'var(--ds-weight-semibold, 600)'
                : 'var(--ds-weight-normal, 400)',
            }}
          >
            {p}
          </button>
        );
      })}
      <span
        className={cell}
        style={{ color: 'rgb(var(--ds-muted-foreground))' }}
      >
        …
      </span>
      <button
        type="button"
        onClick={() => setPage((p) => p + 1)}
        className={cell}
        style={{
          color: 'rgb(var(--ds-muted-foreground))',
          border: '1px solid rgb(var(--ds-border))',
        }}
      >
        ›
      </button>
    </div>
  );
}

function RibbonCard() {
  return (
    <section
      className="relative overflow-hidden rounded-[var(--ds-radius-sm,0.25rem)] p-[var(--ds-space-4,1rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        border: '1px solid rgb(var(--ds-border))',
      }}
    >
      <div
        className="absolute right-[-2.75rem] top-[0.9rem] w-[9rem] py-[var(--ds-space-0_5,0.125rem)] text-center"
        style={{
          transform: 'rotate(45deg)',
          background: 'rgb(var(--ds-primary))',
          color: 'rgb(var(--ds-primary-foreground))',
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          fontWeight: 'var(--ds-weight-semibold, 600)',
        }}
      >
        New
      </div>
      <div
        style={{
          fontSize: 'var(--ds-text-base, 1rem)',
          fontWeight: 'var(--ds-weight-semibold, 600)',
        }}
      >
        Pro Plan
      </div>
      <p
        className="mt-[var(--ds-space-1,0.25rem)]"
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        Unlimited projects and priority support.
      </p>
      <div
        className="my-[var(--ds-space-4,1rem)] h-px"
        style={{ background: 'rgb(var(--ds-border))' }}
      />
      <ResultPage />
    </section>
  );
}

function ResultPage() {
  return (
    <div className="flex flex-col items-center gap-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-4,1rem)] text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
        style={{
          background: 'rgb(var(--ds-accent))',
          color: 'rgb(var(--ds-accent-foreground))',
          fontSize: 'var(--ds-text-2xl, 1.5rem)',
        }}
      >
        ✓
      </div>
      <div
        style={{
          fontSize: 'var(--ds-text-lg, 1.125rem)',
          fontWeight: 'var(--ds-weight-semibold, 600)',
        }}
      >
        Successfully purchased
      </div>
      <p
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        Your order has been processed and a receipt was emailed to you.
      </p>
      <div className="flex gap-[var(--ds-space-2,0.5rem)]">
        <AButton type="primary">Go to console</AButton>
        <AButton type="default">View order</AButton>
      </div>
    </div>
  );
}

function SelectDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(SELECT_OPTIONS[0]);
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
          {SELECT_OPTIONS.map((opt) => {
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
