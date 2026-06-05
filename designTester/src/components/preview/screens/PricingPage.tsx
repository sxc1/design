import { useState } from 'react';

interface Tier {
  name: string;
  monthly: number;
  annual: number;
  blurb: string;
  features: string[];
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    name: 'Starter',
    monthly: 0,
    annual: 0,
    blurb: 'For individuals getting started.',
    features: ['1 project', 'Community support', '1 GB storage'],
  },
  {
    name: 'Pro',
    monthly: 24,
    annual: 19,
    blurb: 'For growing teams that ship often.',
    features: ['Unlimited projects', 'Priority support', '100 GB storage', 'SSO'],
    featured: true,
  },
  {
    name: 'Enterprise',
    monthly: 79,
    annual: 64,
    blurb: 'Advanced controls and security.',
    features: ['Everything in Pro', 'Audit logs', 'SLA & SSO', 'Dedicated manager'],
  },
];

export function PricingPage() {
  const [annual, setAnnual] = useState(true);
  return (
    <div className="min-h-full" style={{ padding: 'var(--ds-space-12, 3rem) var(--ds-space-6, 1.5rem)' }}>
      <div className="text-center">
        <h1
          style={{
            fontSize: 'var(--ds-text-4xl, 2.25rem)',
            fontWeight: 'var(--ds-weight-bold, 700)',
          }}
        >
          Simple, transparent pricing
        </h1>
        <p
          className="mx-auto mt-[var(--ds-space-3,0.75rem)] max-w-xl"
          style={{
            fontSize: 'var(--ds-text-lg, 1.125rem)',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          Start free, upgrade as you grow. No hidden fees.
        </p>

        {/* Billing toggle */}
        <div
          className="mx-auto mt-[var(--ds-space-6,1.5rem)] inline-flex items-center gap-1 rounded-[var(--ds-radius-full,9999px)] p-1"
          style={{ background: 'rgb(var(--ds-muted))' }}
        >
          {(['Monthly', 'Annual'] as const).map((label, i) => {
            const on = (i === 1) === annual;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setAnnual(i === 1)}
                className="rounded-[var(--ds-radius-full,9999px)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-1,0.25rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium transition"
                style={
                  on
                    ? {
                        background: 'rgb(var(--ds-background))',
                        color: 'rgb(var(--ds-foreground))',
                        boxShadow: 'var(--ds-shadow-sm)',
                      }
                    : { color: 'rgb(var(--ds-muted-foreground))' }
                }
              >
                {label}
                {label === 'Annual' ? ' · save 20%' : ''}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-[var(--ds-space-10,2.5rem)] grid max-w-4xl grid-cols-1 gap-[var(--ds-space-5,1.25rem)] md:grid-cols-3">
        {TIERS.map((tier) => {
          const price = annual ? tier.annual : tier.monthly;
          return (
            <div
              key={tier.name}
              className="flex flex-col rounded-[var(--ds-radius-xl,0.75rem)] p-[var(--ds-space-6,1.5rem)]"
              style={
                tier.featured
                  ? {
                      background: 'rgb(var(--ds-card))',
                      color: 'rgb(var(--ds-card-foreground))',
                      border: '2px solid rgb(var(--ds-primary))',
                      boxShadow: 'var(--ds-shadow-lg)',
                    }
                  : {
                      background: 'rgb(var(--ds-card))',
                      color: 'rgb(var(--ds-card-foreground))',
                      border: '1px solid rgb(var(--ds-border))',
                    }
              }
            >
              <div className="flex items-center justify-between">
                <h3
                  style={{
                    fontSize: 'var(--ds-text-lg, 1.125rem)',
                    fontWeight: 'var(--ds-weight-semibold, 600)',
                  }}
                >
                  {tier.name}
                </h3>
                {tier.featured ? (
                  <span
                    className="rounded-[var(--ds-radius-full,9999px)] px-[var(--ds-space-2,0.5rem)] py-[var(--ds-space-0\\.5,0.125rem)]"
                    style={{
                      fontSize: 'var(--ds-text-xs, 0.75rem)',
                      fontWeight: 'var(--ds-weight-semibold, 600)',
                      background: 'rgb(var(--ds-primary))',
                      color: 'rgb(var(--ds-primary-foreground))',
                    }}
                  >
                    Popular
                  </span>
                ) : null}
              </div>
              <p
                className="mt-[var(--ds-space-1,0.25rem)]"
                style={{
                  fontSize: 'var(--ds-text-sm, 0.875rem)',
                  color: 'rgb(var(--ds-muted-foreground))',
                }}
              >
                {tier.blurb}
              </p>
              <div className="mt-[var(--ds-space-4,1rem)] flex items-end gap-1">
                <span
                  style={{
                    fontSize: 'var(--ds-text-4xl, 2.25rem)',
                    fontWeight: 'var(--ds-weight-bold, 700)',
                  }}
                >
                  ${price}
                </span>
                <span
                  className="mb-1"
                  style={{
                    fontSize: 'var(--ds-text-sm, 0.875rem)',
                    color: 'rgb(var(--ds-muted-foreground))',
                  }}
                >
                  /mo
                </span>
              </div>

              <ul className="mt-[var(--ds-space-5,1.25rem)] flex flex-1 flex-col gap-[var(--ds-space-2,0.5rem)]">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-[var(--ds-space-2,0.5rem)]"
                    style={{ fontSize: 'var(--ds-text-sm, 0.875rem)' }}
                  >
                    <span style={{ color: 'rgb(var(--ds-primary))' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="mt-[var(--ds-space-6,1.5rem)] rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium transition hover:opacity-90"
                style={
                  tier.featured
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
                {tier.monthly === 0 ? 'Get started' : 'Start free trial'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
