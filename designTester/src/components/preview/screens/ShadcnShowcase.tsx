import { ComponentShowcase } from '@/components/preview/ComponentShowcase';

export function ShadcnShowcase() {
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
          shadcn/ui
        </h1>
        <p
          style={{
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          Subtle borders, muted surfaces, restrained radius — the shadcn idiom.
        </p>
      </header>
      <ComponentShowcase />
    </div>
  );
}
