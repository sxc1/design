import { useState } from 'react';

const TABS = ['Grid', 'Form', 'Status'];

const GRID_ROWS = [
  { id: 1, product: 'Chai', category: 'Beverages', price: '$18.00', units: 39 },
  { id: 2, product: 'Chang', category: 'Beverages', price: '$19.00', units: 17 },
  { id: 3, product: 'Aniseed Syrup', category: 'Condiments', price: '$10.00', units: 13 },
  { id: 4, product: 'Chef Anton’s', category: 'Condiments', price: '$22.00', units: 53 },
];

export function KendoShowcase() {
  const [tab, setTab] = useState(0);
  return (
    <div className="min-h-full" style={{ padding: 'var(--ds-space-6, 1.5rem)' }}>
      <header className="mb-[var(--ds-space-5,1.25rem)]">
        <h1
          style={{
            fontSize: 'var(--ds-text-xl, 1.25rem)',
            fontWeight: 'var(--ds-weight-bold, 700)',
          }}
        >
          KendoReact
        </h1>
        <p
          style={{
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          Free components: TabStrip, Grid, Buttons, Inputs, Notification, ProgressBar.
        </p>
      </header>

      {/* TabStrip */}
      <div
        className="overflow-hidden rounded-[var(--ds-radius-md,0.375rem)]"
        style={{ border: '1px solid rgb(var(--ds-border))' }}
      >
        <div
          className="flex"
          style={{
            background: 'rgb(var(--ds-muted))',
            borderBottom: '1px solid rgb(var(--ds-border))',
          }}
        >
          {TABS.map((label, i) => {
            const on = i === tab;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setTab(i)}
                className="px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] transition"
                style={{
                  background: on ? 'rgb(var(--ds-card))' : 'transparent',
                  color: on
                    ? 'rgb(var(--ds-foreground))'
                    : 'rgb(var(--ds-muted-foreground))',
                  fontWeight: on
                    ? 'var(--ds-weight-semibold, 600)'
                    : 'var(--ds-weight-normal, 400)',
                  borderBottom: on
                    ? '2px solid rgb(var(--ds-primary))'
                    : '2px solid transparent',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div style={{ background: 'rgb(var(--ds-card))', color: 'rgb(var(--ds-card-foreground))' }}>
          {tab === 0 ? <KendoGrid /> : null}
          {tab === 1 ? <KendoForm /> : null}
          {tab === 2 ? <KendoStatus /> : null}
        </div>
      </div>
    </div>
  );
}

function KendoGrid() {
  return (
    <div>
      {/* Grid toolbar */}
      <div
        className="flex items-center gap-[var(--ds-space-2,0.5rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
        style={{ borderBottom: '1px solid rgb(var(--ds-border))' }}
      >
        <KButton look="solid">Add new</KButton>
        <KButton look="outline">Export</KButton>
        <input
          placeholder="Search…"
          className="ml-auto rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)] outline-none"
          style={{
            background: 'rgb(var(--ds-background))',
            color: 'rgb(var(--ds-foreground))',
            border: '1px solid rgb(var(--ds-input))',
          }}
        />
      </div>
      <table className="w-full" style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}>
        <thead>
          <tr
            style={{
              background: 'rgb(var(--ds-muted))',
              color: 'rgb(var(--ds-muted-foreground))',
            }}
          >
            <KTh>Product</KTh>
            <KTh>Category</KTh>
            <KTh align="right">Price</KTh>
            <KTh align="right">Units</KTh>
          </tr>
        </thead>
        <tbody>
          {GRID_ROWS.map((r, i) => (
            <tr
              key={r.id}
              style={{
                borderTop: '1px solid rgb(var(--ds-border))',
                background:
                  i % 2 === 1 ? 'rgb(var(--ds-muted))' : 'rgb(var(--ds-card))',
              }}
            >
              <KTd>{r.product}</KTd>
              <KTd>{r.category}</KTd>
              <KTd align="right">{r.price}</KTd>
              <KTd align="right">{r.units}</KTd>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pager */}
      <div
        className="flex items-center gap-[var(--ds-space-2,0.5rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
        style={{
          borderTop: '1px solid rgb(var(--ds-border))',
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        <KButton look="outline">‹</KButton>
        <KButton look="solid">1</KButton>
        <KButton look="outline">2</KButton>
        <KButton look="outline">›</KButton>
        <span className="ml-auto">1 – 4 of 24 items</span>
      </div>
    </div>
  );
}

function KendoForm() {
  return (
    <div className="flex flex-col gap-[var(--ds-space-4,1rem)] p-[var(--ds-space-5,1.25rem)]">
      <KField label="Full name" value="Ava Thompson" />
      <label className="flex flex-col gap-[var(--ds-space-1,0.25rem)]">
        <span
          style={{
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            fontWeight: 'var(--ds-weight-medium, 500)',
          }}
        >
          Country
        </span>
        <div
          className="flex items-center justify-between rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
          style={{
            background: 'rgb(var(--ds-background))',
            color: 'rgb(var(--ds-foreground))',
            border: '1px solid rgb(var(--ds-input))',
            fontSize: 'var(--ds-text-sm, 0.875rem)',
          }}
        >
          <span>United States</span>
          <span aria-hidden style={{ color: 'rgb(var(--ds-muted-foreground))' }}>
            ▾
          </span>
        </div>
      </label>
      <div className="flex gap-[var(--ds-space-2,0.5rem)]">
        <KButton look="solid">Submit</KButton>
        <KButton look="flat">Clear</KButton>
      </div>
    </div>
  );
}

function KendoStatus() {
  return (
    <div className="flex flex-col gap-[var(--ds-space-4,1rem)] p-[var(--ds-space-5,1.25rem)]">
      {/* Notification */}
      <div
        className="flex items-center gap-[var(--ds-space-2,0.5rem)] rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
        style={{
          background: 'rgb(var(--ds-accent))',
          color: 'rgb(var(--ds-accent-foreground))',
          fontSize: 'var(--ds-text-sm, 0.875rem)',
        }}
      >
        <span aria-hidden>✓</span> Your changes were saved successfully.
      </div>
      <div
        className="flex items-center gap-[var(--ds-space-2,0.5rem)] rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
        style={{
          background: 'rgb(var(--ds-destructive))',
          color: 'rgb(var(--ds-destructive-foreground))',
          fontSize: 'var(--ds-text-sm, 0.875rem)',
        }}
      >
        <span aria-hidden>!</span> Connection lost. Retrying…
      </div>

      {/* ProgressBar */}
      <div>
        <div
          className="mb-[var(--ds-space-1,0.25rem)]"
          style={{
            fontSize: 'var(--ds-text-xs, 0.75rem)',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          Uploading… 72%
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-[var(--ds-radius-full,9999px)]"
          style={{ background: 'rgb(var(--ds-muted))' }}
        >
          <div
            className="h-full"
            style={{ width: '72%', background: 'rgb(var(--ds-primary))' }}
          />
        </div>
      </div>
    </div>
  );
}

function KButton({
  look,
  children,
}: {
  look: 'solid' | 'outline' | 'flat';
  children: React.ReactNode;
}) {
  const style =
    look === 'solid'
      ? {
          background: 'rgb(var(--ds-primary))',
          color: 'rgb(var(--ds-primary-foreground))',
          border: '1px solid rgb(var(--ds-primary))',
        }
      : look === 'outline'
        ? {
            background: 'rgb(var(--ds-background))',
            color: 'rgb(var(--ds-foreground))',
            border: '1px solid rgb(var(--ds-input))',
          }
        : {
            background: 'transparent',
            color: 'rgb(var(--ds-primary))',
            border: '1px solid transparent',
          };
  return (
    <button
      type="button"
      className="rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium transition hover:opacity-90"
      style={style}
    >
      {children}
    </button>
  );
}

function KField({ label, value }: { label: string; value: string }) {
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
        defaultValue={value}
        className="rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] outline-none"
        style={{
          background: 'rgb(var(--ds-background))',
          color: 'rgb(var(--ds-foreground))',
          border: '1px solid rgb(var(--ds-input))',
        }}
      />
    </label>
  );
}

function KTh({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <th
      className="px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
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

function KTd({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <td
      className="px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
      style={{ textAlign: align }}
    >
      {children}
    </td>
  );
}
