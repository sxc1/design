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
          A library of polished, data-rich UI components for enterprise React apps.{' '}
          <a
            href="https://www.telerik.com/kendo-react-ui"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgb(var(--ds-primary))', textDecoration: 'underline' }}
          >
            Learn more
          </a>
        </p>
      </header>

      {/* Top page chrome: AppBar + Drawer + Breadcrumb */}
      <Section label="AppBar + Drawer">
        <div className="flex gap-[var(--ds-space-3,0.75rem)]">
          {/* Drawer / side-nav */}
          <div
            className="hidden w-40 shrink-0 flex-col gap-[var(--ds-space-1,0.25rem)] rounded-[var(--ds-radius-md,0.375rem)] p-[var(--ds-space-2,0.5rem)] sm:flex"
            style={{ background: 'rgb(var(--ds-muted))' }}
          >
            {['Dashboard', 'Orders', 'Customers', 'Reports'].map((item, i) => (
              <div
                key={item}
                className="rounded-[var(--ds-radius-sm,0.25rem)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)]"
                style={{
                  background: i === 0 ? 'rgb(var(--ds-primary))' : 'transparent',
                  color:
                    i === 0
                      ? 'rgb(var(--ds-primary-foreground))'
                      : 'rgb(var(--ds-foreground))',
                  fontWeight:
                    i === 0
                      ? 'var(--ds-weight-semibold, 600)'
                      : 'var(--ds-weight-normal, 400)',
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="flex-1">
            {/* AppBar */}
            <div
              className="flex items-center gap-[var(--ds-space-3,0.75rem)] rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)]"
              style={{
                background: 'rgb(var(--ds-primary))',
                color: 'rgb(var(--ds-primary-foreground))',
              }}
            >
              <span aria-hidden style={{ fontSize: 'var(--ds-text-lg, 1.125rem)' }}>
                ☰
              </span>
              <span
                style={{
                  fontSize: 'var(--ds-text-base, 1rem)',
                  fontWeight: 'var(--ds-weight-semibold, 600)',
                }}
              >
                Telerik Admin
              </span>
              <div className="ml-auto flex items-center gap-[var(--ds-space-3,0.75rem)]">
                <span aria-hidden>●</span>
                <KAvatar initials="AT" />
              </div>
            </div>

            {/* Breadcrumb */}
            <nav
              className="mt-[var(--ds-space-2,0.5rem)] flex items-center gap-[var(--ds-space-2,0.5rem)]"
              style={{
                fontSize: 'var(--ds-text-sm, 0.875rem)',
                color: 'rgb(var(--ds-muted-foreground))',
              }}
            >
              <span>Home</span>
              <span aria-hidden>›</span>
              <span>Products</span>
              <span aria-hidden>›</span>
              <span style={{ color: 'rgb(var(--ds-foreground))', fontWeight: 'var(--ds-weight-medium, 500)' }}>
                Beverages
              </span>
            </nav>
          </div>
        </div>
      </Section>

      {/* CORE sections */}
      <Section label="Stepper">
        <KStepper />
      </Section>

      {/* TabStrip */}
      <div
        className="mt-[var(--ds-space-5,1.25rem)] overflow-hidden rounded-[var(--ds-radius-md,0.375rem)]"
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

      <Section label="Cards / TileLayout">
        <KCards />
      </Section>

      <Section label="Inputs+">
        <KInputs />
      </Section>

      {/* Two-component rows */}
      <div className="grid grid-cols-1 gap-[var(--ds-space-5,1.25rem)] md:grid-cols-2">
        <Section label="ColorPicker">
          <KColorPicker />
        </Section>
        <Section label="Loader / Skeleton">
          <KLoaderSkeleton />
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-[var(--ds-space-5,1.25rem)] md:grid-cols-2">
        <Section label="Dialog / Window">
          <KDialog />
        </Section>
        <Section label="ListView">
          <KListView />
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-[var(--ds-space-5,1.25rem)] md:grid-cols-2">
        <Section label="Rating + Badge / Chip">
          <KRatingBadge />
        </Section>
        <Section label="PanelBar">
          <KPanelBar />
        </Section>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-[var(--ds-space-5,1.25rem)] flex flex-col">
      <div
        className="mb-[var(--ds-space-2,0.5rem)]"
        style={{
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          fontWeight: 'var(--ds-weight-semibold, 600)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        {label}
      </div>
      <div
        className="flex-1 rounded-[var(--ds-radius-md,0.375rem)] p-[var(--ds-space-4,1rem)]"
        style={{
          background: 'rgb(var(--ds-card))',
          color: 'rgb(var(--ds-card-foreground))',
          border: '1px solid rgb(var(--ds-border))',
        }}
      >
        {children}
      </div>
    </section>
  );
}

function KStepper() {
  const steps = ['Cart', 'Shipping', 'Payment', 'Review'];
  const current = 1; // 0 done, 1 active
  return (
    <div className="flex items-center">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-[var(--ds-space-1,0.25rem)]">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
                style={{
                  background:
                    done || active ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-muted))',
                  color:
                    done || active
                      ? 'rgb(var(--ds-primary-foreground))'
                      : 'rgb(var(--ds-muted-foreground))',
                  fontSize: 'var(--ds-text-sm, 0.875rem)',
                  fontWeight: 'var(--ds-weight-semibold, 600)',
                  border: active ? '2px solid rgb(var(--ds-primary))' : '2px solid transparent',
                }}
              >
                {done ? '✓' : i + 1}
              </div>
              <span
                style={{
                  fontSize: 'var(--ds-text-xs, 0.75rem)',
                  color: active
                    ? 'rgb(var(--ds-foreground))'
                    : 'rgb(var(--ds-muted-foreground))',
                  fontWeight: active
                    ? 'var(--ds-weight-medium, 500)'
                    : 'var(--ds-weight-normal, 400)',
                }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 ? (
              <div
                className="mx-[var(--ds-space-2,0.5rem)] h-px flex-1 self-start"
                style={{
                  marginTop: '0.875rem',
                  background: done ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-border))',
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

const CARD_DATA = [
  { title: 'Revenue', body: 'Quarterly revenue is up 12% versus the prior period.' },
  { title: 'Orders', body: 'New orders are flowing in at a steady daily rate.' },
  { title: 'Inventory', body: 'Stock levels are healthy across all warehouses.' },
];

function KCards() {
  return (
    <div className="grid grid-cols-1 gap-[var(--ds-space-3,0.75rem)] sm:grid-cols-3">
      {CARD_DATA.map((c) => (
        <div
          key={c.title}
          className="flex flex-col rounded-[var(--ds-radius-md,0.375rem)]"
          style={{
            background: 'rgb(var(--ds-card))',
            border: '1px solid rgb(var(--ds-border))',
            boxShadow: 'var(--ds-shadow-sm)',
          }}
        >
          <div
            className="px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
            style={{
              borderBottom: '1px solid rgb(var(--ds-border))',
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              fontWeight: 'var(--ds-weight-semibold, 600)',
            }}
          >
            {c.title}
          </div>
          <div
            className="flex-1 px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
            style={{
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              color: 'rgb(var(--ds-muted-foreground))',
            }}
          >
            {c.body}
          </div>
          <div className="px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]">
            <KButton look="flat">View details</KButton>
          </div>
        </div>
      ))}
    </div>
  );
}

function KInputs() {
  const [on, setOn] = useState(true);
  const [radio, setRadio] = useState(1);
  const [num, setNum] = useState(3);
  const radios = ['Standard', 'Express', 'Overnight'];
  return (
    <div className="grid grid-cols-1 gap-[var(--ds-space-4,1rem)] sm:grid-cols-2">
      {/* DropDownList */}
      <label className="flex flex-col gap-[var(--ds-space-1,0.25rem)]">
        <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', fontWeight: 'var(--ds-weight-medium, 500)' }}>
          Category
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
          <span>Beverages</span>
          <span aria-hidden style={{ color: 'rgb(var(--ds-muted-foreground))' }}>
            ▾
          </span>
        </div>
      </label>

      {/* Slider */}
      <div className="flex flex-col gap-[var(--ds-space-1,0.25rem)]">
        <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', fontWeight: 'var(--ds-weight-medium, 500)' }}>
          Discount
        </span>
        <div className="flex items-center py-[var(--ds-space-2,0.5rem)]">
          <div
            className="relative h-1 flex-1 rounded-[var(--ds-radius-full,9999px)]"
            style={{ background: 'rgb(var(--ds-muted))' }}
          >
            <div
              className="absolute left-0 top-0 h-full rounded-[var(--ds-radius-full,9999px)]"
              style={{ width: '60%', background: 'rgb(var(--ds-primary))' }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-[var(--ds-radius-full,9999px)]"
              style={{
                left: '60%',
                marginLeft: '-0.5rem',
                background: 'rgb(var(--ds-primary))',
                border: '2px solid rgb(var(--ds-card))',
                boxShadow: 'var(--ds-shadow-sm)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Switch */}
      <div className="flex items-center justify-between">
        <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', fontWeight: 'var(--ds-weight-medium, 500)' }}>
          Notifications
        </span>
        <button
          type="button"
          onClick={() => setOn((v) => !v)}
          className="relative h-5 w-9 rounded-[var(--ds-radius-full,9999px)] transition"
          style={{ background: on ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-muted))' }}
        >
          <span
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-[var(--ds-radius-full,9999px)] transition-all"
            style={{
              left: on ? 'calc(100% - 1.125rem)' : '0.125rem',
              background: 'rgb(var(--ds-card))',
              boxShadow: 'var(--ds-shadow-sm)',
            }}
          />
        </button>
      </div>

      {/* NumericTextBox */}
      <label className="flex flex-col gap-[var(--ds-space-1,0.25rem)]">
        <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', fontWeight: 'var(--ds-weight-medium, 500)' }}>
          Quantity
        </span>
        <div
          className="flex items-center overflow-hidden rounded-[var(--ds-radius-sm,0.25rem)]"
          style={{ border: '1px solid rgb(var(--ds-input))', background: 'rgb(var(--ds-background))' }}
        >
          <span
            className="flex-1 px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
            style={{ color: 'rgb(var(--ds-foreground))', fontSize: 'var(--ds-text-sm, 0.875rem)' }}
          >
            {num}
          </span>
          <div className="flex flex-col" style={{ borderLeft: '1px solid rgb(var(--ds-input))' }}>
            <button
              type="button"
              onClick={() => setNum((n) => n + 1)}
              className="px-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-xs,0.75rem)] leading-none"
              style={{ color: 'rgb(var(--ds-muted-foreground))', borderBottom: '1px solid rgb(var(--ds-input))' }}
            >
              ▴
            </button>
            <button
              type="button"
              onClick={() => setNum((n) => Math.max(0, n - 1))}
              className="px-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-xs,0.75rem)] leading-none"
              style={{ color: 'rgb(var(--ds-muted-foreground))' }}
            >
              ▾
            </button>
          </div>
        </div>
      </label>

      {/* RadioGroup */}
      <div className="flex flex-col gap-[var(--ds-space-2,0.5rem)] sm:col-span-2">
        <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', fontWeight: 'var(--ds-weight-medium, 500)' }}>
          Shipping
        </span>
        <div className="flex gap-[var(--ds-space-4,1rem)]">
          {radios.map((label, i) => {
            const checked = i === radio;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setRadio(i)}
                className="flex items-center gap-[var(--ds-space-2,0.5rem)]"
                style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', color: 'rgb(var(--ds-foreground))' }}
              >
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
                  style={{
                    border: `2px solid ${checked ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-input))'}`,
                  }}
                >
                  {checked ? (
                    <span
                      className="h-2 w-2 rounded-[var(--ds-radius-full,9999px)]"
                      style={{ background: 'rgb(var(--ds-primary))' }}
                    />
                  ) : null}
                </span>
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function KRatingBadge() {
  const [rating, setRating] = useState(3);
  const chips = ['Beverages', 'Condiments', 'Seafood', 'Produce'];
  return (
    <div className="flex flex-col gap-[var(--ds-space-4,1rem)]">
      {/* Rating */}
      <div className="flex items-center gap-[var(--ds-space-1,0.25rem)]">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            className="text-[length:var(--ds-text-lg,1.125rem)] leading-none"
            style={{
              color: n <= rating ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-muted))',
            }}
            aria-label={`${n} stars`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Badge */}
      <div>
        <span className="relative inline-block">
          <KButton look="outline">Inbox</KButton>
          <span
            className="absolute -right-1 -top-1 h-3 w-3 rounded-[var(--ds-radius-full,9999px)]"
            style={{
              background: 'rgb(var(--ds-destructive))',
              border: '2px solid rgb(var(--ds-card))',
            }}
          />
        </span>
      </div>

      {/* ChipList */}
      <div className="flex flex-wrap gap-[var(--ds-space-2,0.5rem)]">
        {chips.map((label, i) => (
          <span
            key={label}
            className="flex items-center gap-[var(--ds-space-1,0.25rem)] rounded-[var(--ds-radius-full,9999px)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)]"
            style={{
              background: i === 0 ? 'rgb(var(--ds-primary))' : 'rgb(var(--ds-muted))',
              color:
                i === 0
                  ? 'rgb(var(--ds-primary-foreground))'
                  : 'rgb(var(--ds-muted-foreground))',
              fontSize: 'var(--ds-text-xs, 0.75rem)',
            }}
          >
            {label}
            <span aria-hidden>✕</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const PANELS = [
  { title: 'Order details', body: 'Items, quantities and pricing for this order.' },
  { title: 'Shipping address', body: '123 Market Street, Suite 400, Portland, OR.' },
  { title: 'Payment method', body: 'Visa ending in 4242, expires 09/27.' },
];

function KPanelBar() {
  const [open, setOpen] = useState(0);
  return (
    <div
      className="overflow-hidden rounded-[var(--ds-radius-sm,0.25rem)]"
      style={{ border: '1px solid rgb(var(--ds-border))' }}
    >
      {PANELS.map((p, i) => {
        const expanded = open === i;
        return (
          <div key={p.title} style={i > 0 ? { borderTop: '1px solid rgb(var(--ds-border))' } : undefined}>
            <button
              type="button"
              onClick={() => setOpen(expanded ? -1 : i)}
              className="flex w-full items-center justify-between px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-left"
              style={{
                background: expanded ? 'rgb(var(--ds-muted))' : 'rgb(var(--ds-card))',
                fontSize: 'var(--ds-text-sm, 0.875rem)',
                fontWeight: 'var(--ds-weight-medium, 500)',
              }}
            >
              {p.title}
              <span aria-hidden style={{ color: 'rgb(var(--ds-muted-foreground))' }}>
                {expanded ? '▾' : '›'}
              </span>
            </button>
            {expanded ? (
              <div
                className="px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
                style={{
                  fontSize: 'var(--ds-text-sm, 0.875rem)',
                  color: 'rgb(var(--ds-muted-foreground))',
                  borderTop: '1px solid rgb(var(--ds-border))',
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

function KDialog() {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-[var(--ds-radius-md,0.375rem)] p-[var(--ds-space-6,1.5rem)]"
      style={{ background: 'rgba(0,0,0,0.45)', minHeight: '14rem' }}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-[var(--ds-radius-md,0.375rem)]"
        style={{
          background: 'rgb(var(--ds-card))',
          color: 'rgb(var(--ds-card-foreground))',
          boxShadow: 'var(--ds-shadow-lg)',
          border: '1px solid rgb(var(--ds-border))',
        }}
      >
        <div
          className="flex items-center justify-between px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)]"
          style={{ borderBottom: '1px solid rgb(var(--ds-border))' }}
        >
          <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', fontWeight: 'var(--ds-weight-semibold, 600)' }}>
            Delete record
          </span>
          <button
            type="button"
            aria-label="Close"
            style={{ color: 'rgb(var(--ds-muted-foreground))' }}
          >
            ✕
          </button>
        </div>
        <div
          className="px-[var(--ds-space-4,1rem)] py-[var(--ds-space-4,1rem)]"
          style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', color: 'rgb(var(--ds-muted-foreground))' }}
        >
          Are you sure you want to delete this record? This action cannot be undone.
        </div>
        <div
          className="flex justify-end gap-[var(--ds-space-2,0.5rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)]"
          style={{ borderTop: '1px solid rgb(var(--ds-border))' }}
        >
          <KButton look="outline">Cancel</KButton>
          <KButton look="solid">Delete</KButton>
        </div>
      </div>
    </div>
  );
}

function KLoaderSkeleton() {
  return (
    <div className="flex flex-col gap-[var(--ds-space-4,1rem)]">
      {/* Loader */}
      <div className="flex items-center gap-[var(--ds-space-2,0.5rem)]">
        {[0, 1, 2].map((n) => (
          <span
            key={n}
            className="h-3 w-3 animate-pulse rounded-[var(--ds-radius-full,9999px)]"
            style={{
              background: 'rgb(var(--ds-primary))',
              animationDelay: `${n * 0.15}s`,
            }}
          />
        ))}
        <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', color: 'rgb(var(--ds-muted-foreground))' }}>
          Loading…
        </span>
      </div>

      {/* Skeleton */}
      <div className="flex flex-col gap-[var(--ds-space-2,0.5rem)]">
        <div
          className="h-3 w-1/3 animate-pulse rounded-[var(--ds-radius-sm,0.25rem)]"
          style={{ background: 'rgb(var(--ds-muted))' }}
        />
        <div
          className="h-3 w-full animate-pulse rounded-[var(--ds-radius-sm,0.25rem)]"
          style={{ background: 'rgb(var(--ds-muted))' }}
        />
        <div
          className="h-3 w-2/3 animate-pulse rounded-[var(--ds-radius-sm,0.25rem)]"
          style={{ background: 'rgb(var(--ds-muted))' }}
        />
      </div>
    </div>
  );
}

const SWATCHES = [
  'var(--ds-primary)',
  'var(--ds-secondary)',
  'var(--ds-accent)',
  'var(--ds-destructive)',
  'var(--ds-muted)',
  'var(--ds-foreground)',
];

function KColorPicker() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex items-center gap-[var(--ds-space-4,1rem)]">
      <div className="grid grid-cols-3 gap-[var(--ds-space-2,0.5rem)]">
        {SWATCHES.map((c, i) => (
          <button
            key={c}
            type="button"
            onClick={() => setSelected(i)}
            className="h-7 w-7 rounded-[var(--ds-radius-sm,0.25rem)]"
            style={{
              background: `rgb(${c})`,
              border:
                i === selected
                  ? '2px solid rgb(var(--ds-foreground))'
                  : '1px solid rgb(var(--ds-border))',
            }}
            aria-label={`Swatch ${i + 1}`}
          />
        ))}
      </div>
      <div className="flex flex-col gap-[var(--ds-space-1,0.25rem)]">
        <span style={{ fontSize: 'var(--ds-text-xs, 0.75rem)', color: 'rgb(var(--ds-muted-foreground))' }}>
          Current
        </span>
        <div
          className="h-12 w-12 rounded-[var(--ds-radius-md,0.375rem)]"
          style={{
            background: `rgb(${SWATCHES[selected]})`,
            border: '1px solid rgb(var(--ds-border))',
          }}
        />
      </div>
    </div>
  );
}

const LIST_ROWS = [
  { initials: 'AT', title: 'Ava Thompson', subtitle: 'Account manager' },
  { initials: 'BL', title: 'Ben Larsen', subtitle: 'Sales engineer' },
  { initials: 'CM', title: 'Carla Mendes', subtitle: 'Support lead' },
];

function KListView() {
  return (
    <div
      className="overflow-hidden rounded-[var(--ds-radius-sm,0.25rem)]"
      style={{ border: '1px solid rgb(var(--ds-border))' }}
    >
      {LIST_ROWS.map((r, i) => (
        <div
          key={r.initials}
          className="flex items-center gap-[var(--ds-space-3,0.75rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
          style={i > 0 ? { borderTop: '1px solid rgb(var(--ds-border))' } : undefined}
        >
          <KAvatar initials={r.initials} />
          <div className="flex flex-col">
            <span style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', fontWeight: 'var(--ds-weight-medium, 500)' }}>
              {r.title}
            </span>
            <span style={{ fontSize: 'var(--ds-text-xs, 0.75rem)', color: 'rgb(var(--ds-muted-foreground))' }}>
              {r.subtitle}
            </span>
          </div>
          <button
            type="button"
            className="ml-auto text-[length:var(--ds-text-lg,1.125rem)] leading-none"
            style={{ color: 'rgb(var(--ds-muted-foreground))' }}
            aria-label="More"
          >
            ⋯
          </button>
        </div>
      ))}
    </div>
  );
}

function KAvatar({ initials }: { initials: string }) {
  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-[var(--ds-radius-full,9999px)]"
      style={{
        background: 'rgb(var(--ds-secondary))',
        color: 'rgb(var(--ds-secondary-foreground))',
        fontSize: 'var(--ds-text-xs, 0.75rem)',
        fontWeight: 'var(--ds-weight-semibold, 600)',
      }}
    >
      {initials}
    </span>
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
