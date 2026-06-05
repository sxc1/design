const POSTS = [
  { tag: 'Engineering', title: 'How we cut build times by 70%', excerpt: 'A deep dive into caching, parallelism, and the small wins that added up.', author: 'Ava Thompson', read: '6 min' },
  { tag: 'Design', title: 'Designing tokens that scale', excerpt: 'Why a two-layer color system beats hand-picked hex values every time.', author: 'Liam Chen', read: '4 min' },
  { tag: 'Product', title: 'Shipping weekly without burning out', excerpt: 'The rituals and guardrails that keep our release train on track.', author: 'Mia Rossi', read: '5 min' },
  { tag: 'Company', title: 'We raised our Series B', excerpt: 'What it means for our customers and where we go from here.', author: 'Noah Patel', read: '3 min' },
];

export function BlogPage() {
  const [featured, ...rest] = POSTS;
  return (
    <div className="min-h-full">
      {/* Masthead */}
      <header
        className="border-b px-[var(--ds-space-6,1.5rem)] py-[var(--ds-space-6,1.5rem)] text-center"
        style={{ borderColor: 'rgb(var(--ds-border))', background: 'rgb(var(--ds-card))' }}
      >
        <h1
          style={{
            fontFamily: 'var(--ds-font-serif)',
            fontSize: 'var(--ds-text-3xl, 1.875rem)',
            fontWeight: 'var(--ds-weight-bold, 700)',
          }}
        >
          The Acme Journal
        </h1>
        <p
          className="mt-[var(--ds-space-1,0.25rem)]"
          style={{
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          Notes on building, design, and the craft of shipping software.
        </p>
      </header>

      <div
        className="mx-auto max-w-3xl"
        style={{ padding: 'var(--ds-space-8, 2rem) var(--ds-space-6, 1.5rem)' }}
      >
        {/* Featured post */}
        <article className="mb-[var(--ds-space-10,2.5rem)]">
          <div
            className="mb-[var(--ds-space-4,1rem)] flex h-48 items-end rounded-[var(--ds-radius-lg,0.5rem)] p-[var(--ds-space-4,1rem)]"
            style={{
              background:
                'linear-gradient(135deg, rgb(var(--ds-primary)), rgb(var(--ds-accent)))',
            }}
          >
            <span
              className="rounded-[var(--ds-radius-full,9999px)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-1,0.25rem)]"
              style={{
                fontSize: 'var(--ds-text-xs, 0.75rem)',
                fontWeight: 'var(--ds-weight-semibold, 600)',
                background: 'rgb(var(--ds-background))',
                color: 'rgb(var(--ds-foreground))',
              }}
            >
              {featured.tag}
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--ds-font-serif)',
              fontSize: 'var(--ds-text-3xl, 1.875rem)',
              fontWeight: 'var(--ds-weight-bold, 700)',
              lineHeight: 'var(--ds-leading-tight, 1.25)',
            }}
          >
            {featured.title}
          </h2>
          <p
            className="mt-[var(--ds-space-3,0.75rem)]"
            style={{
              fontSize: 'var(--ds-text-lg, 1.125rem)',
              lineHeight: 'var(--ds-leading-relaxed, 1.625)',
              color: 'rgb(var(--ds-foreground))',
            }}
          >
            {featured.excerpt} The token system resolves every color lazily, so a
            single change to a base palette ripples through the entire surface —
            light and dark — without touching a component.
          </p>
          <Byline author={featured.author} read={featured.read} />
        </article>

        <h3
          className="mb-[var(--ds-space-4,1rem)] border-b pb-[var(--ds-space-2,0.5rem)]"
          style={{
            borderColor: 'rgb(var(--ds-border))',
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            fontWeight: 'var(--ds-weight-semibold, 600)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          Latest posts
        </h3>

        <div className="flex flex-col gap-[var(--ds-space-6,1.5rem)]">
          {rest.map((post) => (
            <article
              key={post.title}
              className="flex gap-[var(--ds-space-4,1rem)]"
            >
              <div
                className="hidden h-24 w-32 shrink-0 rounded-[var(--ds-radius-md,0.375rem)] sm:block"
                style={{ background: 'rgb(var(--ds-muted))' }}
              />
              <div>
                <span
                  style={{
                    fontSize: 'var(--ds-text-xs, 0.75rem)',
                    fontWeight: 'var(--ds-weight-semibold, 600)',
                    color: 'rgb(var(--ds-primary))',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {post.tag}
                </span>
                <h4
                  className="mt-[var(--ds-space-1,0.25rem)]"
                  style={{
                    fontFamily: 'var(--ds-font-serif)',
                    fontSize: 'var(--ds-text-xl, 1.25rem)',
                    fontWeight: 'var(--ds-weight-semibold, 600)',
                  }}
                >
                  {post.title}
                </h4>
                <p
                  className="mt-[var(--ds-space-1,0.25rem)]"
                  style={{
                    fontSize: 'var(--ds-text-sm, 0.875rem)',
                    color: 'rgb(var(--ds-muted-foreground))',
                    lineHeight: 'var(--ds-leading-relaxed, 1.625)',
                  }}
                >
                  {post.excerpt}
                </p>
                <Byline author={post.author} read={post.read} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Byline({ author, read }: { author: string; read: string }) {
  return (
    <div className="mt-[var(--ds-space-3,0.75rem)] flex items-center gap-[var(--ds-space-2,0.5rem)]">
      <div
        className="h-7 w-7 rounded-[var(--ds-radius-full,9999px)]"
        style={{ background: 'rgb(var(--ds-accent))' }}
      />
      <span
        style={{
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        {author} · {read} read
      </span>
    </div>
  );
}
