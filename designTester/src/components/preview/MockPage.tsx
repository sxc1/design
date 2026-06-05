import { ComponentShowcase } from './ComponentShowcase';

export function MockPage() {
  return (
    <div className="min-h-full">
      <div className="flex">
        <Sidebar />
        <main className="min-h-[600px] flex-1">
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
              Dashboard
            </h1>
            <p
              style={{
                fontSize: 'var(--ds-text-sm, 0.875rem)',
                color: 'rgb(var(--ds-muted-foreground))',
              }}
            >
              Live preview of your design tokens.
            </p>
          </header>
          <ComponentShowcase />
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  const items = ['Overview', 'Analytics', 'Customers', 'Billing', 'Settings'];
  return (
    <aside
      className="hidden md:flex w-56 flex-col gap-[var(--ds-space-1,0.25rem)] border-r p-[var(--ds-space-4,1rem)]"
      style={{
        borderColor: 'rgb(var(--ds-border))',
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
      }}
    >
      {items.map((item, idx) => (
        <button
          key={item}
          type="button"
          className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-left text-[length:var(--ds-text-sm,0.875rem)]"
          style={
            idx === 0
              ? {
                  background: 'rgb(var(--ds-accent))',
                  color: 'rgb(var(--ds-accent-foreground))',
                  fontWeight: 'var(--ds-weight-semibold, 600)',
                }
              : { color: 'rgb(var(--ds-muted-foreground))' }
          }
        >
          {item}
        </button>
      ))}
    </aside>
  );
}
