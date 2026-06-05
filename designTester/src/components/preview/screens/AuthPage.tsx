export function AuthPage() {
  return (
    <div className="grid min-h-full grid-cols-1 md:grid-cols-2">
      {/* Branded panel */}
      <div
        className="hidden flex-col justify-between p-[var(--ds-space-10,2.5rem)] md:flex"
        style={{
          background: 'rgb(var(--ds-primary))',
          color: 'rgb(var(--ds-primary-foreground))',
        }}
      >
        <span style={{ fontWeight: 'var(--ds-weight-bold, 700)', fontSize: 'var(--ds-text-lg, 1.125rem)' }}>
          Acme
        </span>
        <div>
          <blockquote
            style={{
              fontSize: 'var(--ds-text-2xl, 1.5rem)',
              lineHeight: 'var(--ds-leading-snug, 1.375)',
              fontFamily: 'var(--ds-font-serif)',
            }}
          >
            “This is the only login screen our users never complain about.”
          </blockquote>
          <p
            className="mt-[var(--ds-space-3,0.75rem)]"
            style={{ fontSize: 'var(--ds-text-sm, 0.875rem)', opacity: 0.85 }}
          >
            Ethan Park · Founder, Drift
          </p>
        </div>
        <span style={{ fontSize: 'var(--ds-text-xs, 0.75rem)', opacity: 0.7 }}>
          © 2026 Acme Inc.
        </span>
      </div>

      {/* Form side */}
      <div
        className="flex items-center justify-center p-[var(--ds-space-8,2rem)]"
        style={{ background: 'rgb(var(--ds-background))' }}
      >
        <div className="w-full max-w-sm">
          <h1
            style={{
              fontSize: 'var(--ds-text-2xl, 1.5rem)',
              fontWeight: 'var(--ds-weight-bold, 700)',
            }}
          >
            Welcome back
          </h1>
          <p
            className="mt-[var(--ds-space-1,0.25rem)]"
            style={{
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              color: 'rgb(var(--ds-muted-foreground))',
            }}
          >
            Sign in to your account to continue.
          </p>

          <div className="mt-[var(--ds-space-6,1.5rem)] flex flex-col gap-[var(--ds-space-4,1rem)]">
            <AuthField label="Email" value="you@example.com" type="email" />
            <div>
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontSize: 'var(--ds-text-sm, 0.875rem)',
                    fontWeight: 'var(--ds-weight-medium, 500)',
                  }}
                >
                  Password
                </span>
                <a
                  href="#"
                  style={{
                    fontSize: 'var(--ds-text-xs, 0.75rem)',
                    color: 'rgb(var(--ds-primary))',
                  }}
                >
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                defaultValue="password"
                className="mt-[var(--ds-space-1,0.25rem)] w-full rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] outline-none"
                style={{
                  background: 'rgb(var(--ds-background))',
                  color: 'rgb(var(--ds-foreground))',
                  border: '1px solid rgb(var(--ds-input))',
                }}
              />
            </div>

            <button
              type="button"
              className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium transition hover:opacity-90"
              style={{
                background: 'rgb(var(--ds-primary))',
                color: 'rgb(var(--ds-primary-foreground))',
              }}
            >
              Sign in
            </button>

            <div className="flex items-center gap-[var(--ds-space-3,0.75rem)]">
              <div className="h-px flex-1" style={{ background: 'rgb(var(--ds-border))' }} />
              <span
                style={{
                  fontSize: 'var(--ds-text-xs, 0.75rem)',
                  color: 'rgb(var(--ds-muted-foreground))',
                }}
              >
                OR
              </span>
              <div className="h-px flex-1" style={{ background: 'rgb(var(--ds-border))' }} />
            </div>

            <button
              type="button"
              className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-4,1rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] font-medium transition hover:opacity-90"
              style={{
                background: 'rgb(var(--ds-secondary))',
                color: 'rgb(var(--ds-secondary-foreground))',
              }}
            >
              Continue with Google
            </button>
          </div>

          <p
            className="mt-[var(--ds-space-6,1.5rem)] text-center"
            style={{
              fontSize: 'var(--ds-text-sm, 0.875rem)',
              color: 'rgb(var(--ds-muted-foreground))',
            }}
          >
            Don’t have an account?{' '}
            <a href="#" style={{ color: 'rgb(var(--ds-primary))', fontWeight: 'var(--ds-weight-medium, 500)' }}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function AuthField({
  label,
  value,
  type,
}: {
  label: string;
  value: string;
  type: string;
}) {
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
        type={type}
        defaultValue={value}
        className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)] text-[length:var(--ds-text-sm,0.875rem)] outline-none"
        style={{
          background: 'rgb(var(--ds-background))',
          color: 'rgb(var(--ds-foreground))',
          border: '1px solid rgb(var(--ds-input))',
        }}
      />
    </label>
  );
}
