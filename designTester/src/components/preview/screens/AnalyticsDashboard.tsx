const STATS = [
  { label: 'Revenue', value: '$48,210', delta: '+12.4%', up: true },
  { label: 'Active users', value: '8,932', delta: '+4.1%', up: true },
  { label: 'Conversion', value: '3.6%', delta: '-0.8%', up: false },
  { label: 'Churn', value: '1.2%', delta: '-0.3%', up: true },
];

const BARS = [42, 58, 35, 70, 64, 88, 76, 95, 62, 80, 90, 100];
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const ACTIVITY = [
  { who: 'Ava Thompson', action: 'Upgraded to Pro', when: '2m ago', amount: '$49' },
  { who: 'Liam Chen', action: 'New signup', when: '14m ago', amount: '—' },
  { who: 'Noah Patel', action: 'Renewed plan', when: '1h ago', amount: '$120' },
  { who: 'Mia Rossi', action: 'Cancelled', when: '3h ago', amount: '—' },
  { who: 'Ethan Park', action: 'Upgraded to Team', when: '5h ago', amount: '$240' },
];

export function AnalyticsDashboard() {
  return (
    <div className="min-h-full">
      <header
        className="flex flex-wrap items-center justify-between gap-[var(--ds-space-3,0.75rem)] border-b px-[var(--ds-space-6,1.5rem)] py-[var(--ds-space-4,1rem)]"
        style={{
          borderColor: 'rgb(var(--ds-border))',
          background: 'rgb(var(--ds-card))',
          color: 'rgb(var(--ds-card-foreground))',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 'var(--ds-text-2xl, 1.5rem)',
              fontWeight: 'var(--ds-weight-bold, 700)',
            }}
          >
            Analytics
          </h1>
          <p
            style={{
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              color: 'rgb(var(--ds-muted-foreground))',
            }}
          >
            Last 30 days · updated just now
          </p>
        </div>
        <div className="flex gap-[var(--ds-space-2,0.5rem)]">
          <PillButton>Export</PillButton>
          <PillButton primary>+ New report</PillButton>
        </div>
      </header>

      <div
        className="flex flex-col gap-[var(--ds-space-6,1.5rem)]"
        style={{ padding: 'var(--ds-space-6, 1.5rem)' }}
      >
        <div className="grid grid-cols-2 gap-[var(--ds-space-4,1rem)] lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-[var(--ds-radius-lg,0.5rem)] p-[var(--ds-space-4,1rem)]"
              style={{
                background: 'rgb(var(--ds-card))',
                color: 'rgb(var(--ds-card-foreground))',
                border: '1px solid rgb(var(--ds-border))',
                boxShadow: 'var(--ds-elev-raised)',
              }}
            >
              <div
                style={{
                  fontSize: 'var(--ds-text-xs, 0.75rem)',
                  color: 'rgb(var(--ds-muted-foreground))',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {s.label}
              </div>
              <div
                className="mt-[var(--ds-space-1,0.25rem)]"
                style={{
                  fontSize: 'var(--ds-text-2xl, 1.5rem)',
                  fontWeight: 'var(--ds-weight-bold, 700)',
                }}
              >
                {s.value}
              </div>
              <div
                className="mt-[var(--ds-space-1,0.25rem)] inline-flex items-center rounded-[var(--ds-radius-full,9999px)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-0\\.5,0.125rem)]"
                style={{
                  fontSize: 'var(--ds-text-xs, 0.75rem)',
                  fontWeight: 'var(--ds-weight-semibold, 600)',
                  background: s.up
                    ? 'rgb(var(--ds-accent))'
                    : 'rgb(var(--ds-destructive))',
                  color: s.up
                    ? 'rgb(var(--ds-accent-foreground))'
                    : 'rgb(var(--ds-destructive-foreground))',
                }}
              >
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-[var(--ds-space-6,1.5rem)] lg:grid-cols-3">
          <ChartCard />
          <DonutCard />
        </div>

        <section
          className="overflow-hidden rounded-[var(--ds-radius-lg,0.5rem)]"
          style={{
            background: 'rgb(var(--ds-card))',
            color: 'rgb(var(--ds-card-foreground))',
            border: '1px solid rgb(var(--ds-border))',
            boxShadow: 'var(--ds-elev-raised)',
          }}
        >
          <div
            className="px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)]"
            style={{
              borderBottom: '1px solid rgb(var(--ds-border))',
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              fontWeight: 'var(--ds-weight-semibold, 600)',
            }}
          >
            Recent activity
          </div>
          <table className="w-full" style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}>
            <thead>
              <tr style={{ color: 'rgb(var(--ds-muted-foreground))' }}>
                <Th>Customer</Th>
                <Th>Event</Th>
                <Th>When</Th>
                <Th align="right">Amount</Th>
              </tr>
            </thead>
            <tbody>
              {ACTIVITY.map((row) => (
                <tr
                  key={row.who}
                  style={{ borderTop: '1px solid rgb(var(--ds-border))' }}
                >
                  <Td>
                    <span style={{ fontWeight: 'var(--ds-weight-medium, 500)' }}>
                      {row.who}
                    </span>
                  </Td>
                  <Td muted>{row.action}</Td>
                  <Td muted>{row.when}</Td>
                  <Td align="right">{row.amount}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

function ChartCard() {
  return (
    <div
      className="rounded-[var(--ds-radius-lg,0.5rem)] p-[var(--ds-space-4,1rem)] lg:col-span-2"
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        border: '1px solid rgb(var(--ds-border))',
        boxShadow: 'var(--ds-elev-raised)',
      }}
    >
      <div
        className="mb-[var(--ds-space-3,0.75rem)]"
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          fontWeight: 'var(--ds-weight-semibold, 600)',
        }}
      >
        Monthly revenue
      </div>
      <div className="flex h-44 items-end gap-[var(--ds-space-2,0.5rem)]">
        {BARS.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-[var(--ds-space-1,0.25rem)]">
            <div
              className="w-full rounded-t-[var(--ds-radius-sm,0.25rem)]"
              style={{
                height: `${h}%`,
                background:
                  i === BARS.length - 1
                    ? 'rgb(var(--ds-primary))'
                    : 'rgb(var(--ds-accent))',
              }}
            />
            <span
              style={{
                fontSize: 'var(--ds-text-xs, 0.75rem)',
                color: 'rgb(var(--ds-muted-foreground))',
              }}
            >
              {MONTHS[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutCard() {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[var(--ds-radius-lg,0.5rem)] p-[var(--ds-space-4,1rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        border: '1px solid rgb(var(--ds-border))',
        boxShadow: 'var(--ds-elev-raised)',
      }}
    >
      <div
        className="mb-[var(--ds-space-3,0.75rem)] self-start"
        style={{
          fontSize: 'var(--ds-text-sm, 0.875rem)',
          fontWeight: 'var(--ds-weight-semibold, 600)',
        }}
      >
        Traffic source
      </div>
      <div
        className="h-32 w-32 rounded-full"
        style={{
          background:
            'conic-gradient(rgb(var(--ds-primary)) 0% 55%, rgb(var(--ds-accent)) 55% 80%, rgb(var(--ds-muted)) 80% 100%)',
        }}
      >
        <div
          className="m-[18px] flex h-[92px] w-[92px] items-center justify-center rounded-full"
          style={{
            background: 'rgb(var(--ds-card))',
            fontSize: 'var(--ds-text-lg, 1.125rem)',
            fontWeight: 'var(--ds-weight-bold, 700)',
          }}
        >
          55%
        </div>
      </div>
      <div
        className="mt-[var(--ds-space-3,0.75rem)] text-center"
        style={{
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        Organic · Referral · Direct
      </div>
    </div>
  );
}

function PillButton({
  children,
  primary,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium transition hover:opacity-90"
      style={
        primary
          ? {
              background: 'rgb(var(--ds-primary))',
              color: 'rgb(var(--ds-primary-foreground))',
            }
          : {
              background: 'transparent',
              color: 'rgb(var(--ds-foreground))',
              border: '1px solid rgb(var(--ds-border))',
            }
      }
    >
      {children}
    </button>
  );
}

function Th({
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
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = 'left',
  muted,
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
  muted?: boolean;
}) {
  return (
    <td
      className="px-[var(--ds-space-4,1rem)] py-[var(--ds-space-3,0.75rem)]"
      style={{
        textAlign: align,
        color: muted ? 'rgb(var(--ds-muted-foreground))' : undefined,
      }}
    >
      {children}
    </td>
  );
}
