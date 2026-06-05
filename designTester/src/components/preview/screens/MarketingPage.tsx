const FEATURES = [
  { icon: '⚡', title: 'Lightning fast', body: 'Ship in minutes with zero-config deploys and instant previews.' },
  { icon: '🔒', title: 'Secure by default', body: 'SOC 2 compliant with SSO, audit logs, and encryption at rest.' },
  { icon: '📈', title: 'Scales with you', body: 'From side project to enterprise — pay only for what you use.' },
  { icon: '🧩', title: 'Integrations', body: 'Connect the tools you already use with a click.' },
];

const FAQS = [
  { q: 'Can I cancel anytime?', a: 'Yes — plans are month-to-month and you can cancel with one click.' },
  { q: 'Is there a free trial?', a: 'All paid plans include a 14-day free trial, no card required.' },
  { q: 'Do you offer discounts?', a: 'We offer 20% off annual billing and special pricing for startups.' },
];

export function MarketingPage() {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <section
        className="px-[var(--ds-space-6,1.5rem)] py-[var(--ds-space-16,4rem)] text-center"
        style={{ background: 'rgb(var(--ds-background))' }}
      >
        <span
          className="inline-flex items-center rounded-[var(--ds-radius-full,9999px)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)]"
          style={{
            fontSize: 'var(--ds-text-xs, 0.75rem)',
            fontWeight: 'var(--ds-weight-semibold, 600)',
            background: 'rgb(var(--ds-accent))',
            color: 'rgb(var(--ds-accent-foreground))',
          }}
        >
          New · v2.0 is here
        </span>
        <h1
          className="mx-auto mt-[var(--ds-space-5,1.25rem)] max-w-2xl"
          style={{
            fontSize: 'var(--ds-text-4xl, 2.25rem)',
            fontWeight: 'var(--ds-weight-bold, 700)',
            lineHeight: 'var(--ds-leading-tight, 1.25)',
          }}
        >
          The fastest way to build your next product
        </h1>
        <p
          className="mx-auto mt-[var(--ds-space-4,1rem)] max-w-xl"
          style={{
            fontSize: 'var(--ds-text-lg, 1.125rem)',
            color: 'rgb(var(--ds-muted-foreground))',
            lineHeight: 'var(--ds-leading-relaxed, 1.625)',
          }}
        >
          A complete platform to design, build, and scale — so your team can
          focus on shipping, not plumbing.
        </p>
        <div className="mt-[var(--ds-space-6,1.5rem)] flex justify-center gap-[var(--ds-space-3,0.75rem)]">
          <CTA primary>Get started free</CTA>
          <CTA>Book a demo</CTA>
        </div>
      </section>

      {/* Features */}
      <section
        className="px-[var(--ds-space-6,1.5rem)] py-[var(--ds-space-12,3rem)]"
        style={{ background: 'rgb(var(--ds-card))' }}
      >
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-[var(--ds-space-6,1.5rem)] sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-[var(--ds-radius-lg,0.5rem)] p-[var(--ds-space-5,1.25rem)]"
              style={{
                background: 'rgb(var(--ds-background))',
                border: '1px solid rgb(var(--ds-border))',
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[var(--ds-radius-md,0.375rem)] text-xl"
                style={{
                  background: 'rgb(var(--ds-accent))',
                  color: 'rgb(var(--ds-accent-foreground))',
                }}
              >
                {f.icon}
              </div>
              <h3
                className="mt-[var(--ds-space-3,0.75rem)]"
                style={{
                  fontSize: 'var(--ds-text-lg, 1.125rem)',
                  fontWeight: 'var(--ds-weight-semibold, 600)',
                }}
              >
                {f.title}
              </h3>
              <p
                className="mt-[var(--ds-space-1,0.25rem)]"
                style={{
                  fontSize: 'var(--ds-text-sm, 0.875rem)',
                  color: 'rgb(var(--ds-muted-foreground))',
                  lineHeight: 'var(--ds-leading-relaxed, 1.625)',
                }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-[var(--ds-space-6,1.5rem)] py-[var(--ds-space-12,3rem)]">
        <figure
          className="mx-auto max-w-2xl rounded-[var(--ds-radius-xl,0.75rem)] p-[var(--ds-space-8,2rem)] text-center"
          style={{
            background: 'rgb(var(--ds-primary))',
            color: 'rgb(var(--ds-primary-foreground))',
          }}
        >
          <blockquote
            style={{
              fontSize: 'var(--ds-text-xl, 1.25rem)',
              lineHeight: 'var(--ds-leading-snug, 1.375)',
              fontFamily: 'var(--ds-font-serif)',
            }}
          >
            “We cut our launch time in half. It’s the first tool the whole team
            actually agreed on.”
          </blockquote>
          <figcaption
            className="mt-[var(--ds-space-4,1rem)]"
            style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', opacity: 0.9 }}
          >
            Mia Rossi · Head of Product, Northwind
          </figcaption>
        </figure>
      </section>

      {/* FAQ */}
      <section
        className="px-[var(--ds-space-6,1.5rem)] py-[var(--ds-space-12,3rem)]"
        style={{ background: 'rgb(var(--ds-card))' }}
      >
        <h2
          className="mb-[var(--ds-space-6,1.5rem)] text-center"
          style={{
            fontSize: 'var(--ds-text-2xl, 1.5rem)',
            fontWeight: 'var(--ds-weight-bold, 700)',
          }}
        >
          Frequently asked questions
        </h2>
        <div className="mx-auto flex max-w-2xl flex-col gap-[var(--ds-space-3,0.75rem)]">
          {FAQS.map((item) => (
            <div
              key={item.q}
              className="rounded-[var(--ds-radius-md,0.375rem)] p-[var(--ds-space-4,1rem)]"
              style={{
                background: 'rgb(var(--ds-background))',
                border: '1px solid rgb(var(--ds-border))',
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{
                  fontSize: 'var(--ds-text-base, 1rem)',
                  fontWeight: 'var(--ds-weight-semibold, 600)',
                }}
              >
                {item.q}
                <span style={{ color: 'rgb(var(--ds-muted-foreground))' }}>+</span>
              </div>
              <p
                className="mt-[var(--ds-space-2,0.5rem)]"
                style={{
                  fontSize: 'var(--ds-text-sm, 0.875rem)',
                  color: 'rgb(var(--ds-muted-foreground))',
                }}
              >
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer
      className="px-[var(--ds-space-6,1.5rem)] py-[var(--ds-space-8,2rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        borderTop: '1px solid rgb(var(--ds-border))',
        color: 'rgb(var(--ds-muted-foreground))',
        fontSize: 'var(--ds-text-sm, 0.875rem)',
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-[var(--ds-space-3,0.75rem)]">
        <span style={{ fontWeight: 'var(--ds-weight-bold, 700)', color: 'rgb(var(--ds-foreground))' }}>
          Acme
        </span>
        <span>© 2026 Acme Inc. All rights reserved.</span>
      </div>
    </footer>
  );
}

function CTA({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <button
      type="button"
      className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium transition hover:opacity-90"
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
