const STEPS = ['Account', 'Verify', 'Pay', 'Done'];
const CURRENT_STEP = 2;

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
          Dense, enterprise-grade layouts with steps, descriptions, and tables.
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
      className="overflow-hidden rounded-[var(--ds-radius-sm,0.25rem)]"
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
      className="inline-flex items-center rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-0\\.5,0.125rem)]"
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
      bg: 'rgb(var(--ds-secondary))',
      fg: 'rgb(var(--ds-secondary-foreground))',
    },
    Stopped: {
      bg: 'rgb(var(--ds-destructive))',
      fg: 'rgb(var(--ds-destructive-foreground))',
    },
  };
  const c = map[status] ?? map.Running;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-0\\.5,0.125rem)]"
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
