import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useTokenStore } from '@/store/tokenStore';
import { MAX_DATA_COLORS } from '@/types/tokens';

/* Two series, both derived from the brand color so they recolor with the
   palette: Mobile is the solid primary, Desktop a lighter translucent tint. */
const C_DESKTOP = 'rgb(var(--ds-primary) / 0.45)';
const C_MOBILE = 'rgb(var(--ds-primary))';

/* ─────────────── Area chart: 90 daily points (Apr 1 – Jun 29) ─────────────── */

const AREA_DAYS = 90;
const AREA_W = 920;
const AREA_H = 260;
const AREA_TOP_PAD = 22; // headroom so peaks don't touch the top edge

// Deterministic hash → stable spiky daily data (no Math.random, so it never
// reshuffles between renders).
function noise(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const AREA_DATA = Array.from({ length: AREA_DAYS }, (_, i) => {
  const wave = 150 + 70 * Math.sin(i / 7) + 40 * Math.sin(i / 2.7 + 1);
  const desktop = Math.max(40, wave * 0.55 + noise(i) * 230);
  const mobile = Math.max(30, wave * 0.4 + noise(i + 57) * 150);
  return { desktop, mobile };
});

// One date label per day, for the hover tooltip (Apr 1 … Jun 29).
const AREA_DATE_LABELS = (() => {
  const months: [string, number][] = [
    ['Apr', 30],
    ['May', 31],
    ['Jun', 30],
  ];
  const out: string[] = [];
  for (const [name, len] of months) {
    for (let day = 1; day <= len; day++) out.push(`${name} ${day}`);
  }
  return out.slice(0, AREA_DAYS);
})();

const AREA_MAX = Math.max(...AREA_DATA.map((d) => d.desktop + d.mobile));
const areaX = (i: number) => (i / (AREA_DAYS - 1)) * AREA_W;
const areaY = (v: number) => AREA_H - (v / AREA_MAX) * (AREA_H - AREA_TOP_PAD);

// Catmull-Rom → cubic Bézier, for a smooth (natural-looking) line.
function smoothLine(pts: [number, number][]): string {
  if (pts.length === 0) return '';
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d;
}

// Desktop is stacked on top of Mobile, so the top edge is the running total.
const topPts: [number, number][] = AREA_DATA.map((d, i) => [
  areaX(i),
  areaY(d.desktop + d.mobile),
]);
const mobPts: [number, number][] = AREA_DATA.map((d, i) => [areaX(i), areaY(d.mobile)]);
const topLine = smoothLine(topPts);
const mobLine = smoothLine(mobPts);
const desktopArea = `${topLine} L ${AREA_W} ${AREA_H} L 0 ${AREA_H} Z`;
const mobileArea = `${mobLine} L ${AREA_W} ${AREA_H} L 0 ${AREA_H} Z`;

const AREA_TICKS = [
  'Apr 1',
  'Apr 12',
  'Apr 23',
  'May 4',
  'May 15',
  'May 26',
  'Jun 6',
  'Jun 17',
  'Jun 29',
];

/* ─────────────── Bar chart: shadcn sample data ─────────────── */

const BAR_DATA = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
];
const BAR_MAX = Math.max(...BAR_DATA.map((d) => d.desktop + d.mobile));
const BAR_PLOT_H = 220;

/* ─────────── Line chart: one line per qualitative data color ─────────── */

const LINE_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const LINE_POINTS = LINE_MONTHS.length;
const LINE_W = 920;
const LINE_H = 260; // must match the rendered svg height for px overlays to line up
const LINE_TOP_PAD = 22;
const LINE_BOT_PAD = 14;

// One deterministic series per possible data color (max 8). Each gets a
// distinct phase/offset so the lines stay visually separable.
const LINE_SERIES: number[][] = Array.from({ length: MAX_DATA_COLORS }, (_, s) =>
  Array.from({ length: LINE_POINTS }, (_, i) => {
    const wave = 150 + 70 * Math.sin(i / 1.7 + s * 1.3) + 35 * Math.sin(i / 1.1 + s);
    return Math.max(25, wave + (noise(i * 3 + s * 71) - 0.5) * 90);
  }),
);

const lineX = (i: number) => (i / (LINE_POINTS - 1)) * LINE_W;
const lineY = (v: number, max: number) =>
  LINE_H - LINE_BOT_PAD - (v / max) * (LINE_H - LINE_TOP_PAD - LINE_BOT_PAD);

// The nth data color, falling back to a muted tone if that slot is unassigned.
const dataColor = (n: number) => `rgb(var(--ds-data-${n}, var(--ds-muted-foreground)))`;

/* ─────────────────────────── Screen ─────────────────────────── */

export function ChartsShowcase() {
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
          Charts
        </h1>
        <p
          style={{
            fontSize: 'var(--ds-text-sm, 0.875rem)',
            color: 'rgb(var(--ds-muted-foreground))',
          }}
        >
          Composable, theme-aware charts in the shadcn idiom — driven by the same
          tokens as everything else.{' '}
          <a
            href="https://ui.shadcn.com/charts"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgb(var(--ds-primary))', textDecoration: 'underline' }}
          >
            Learn more
          </a>
        </p>
      </header>

      <div
        className="flex flex-col gap-[var(--ds-space-6,1.5rem)]"
        style={{ padding: 'var(--ds-space-6, 1.5rem)' }}
      >
        <ChartCard
          title="Line Chart - Multiple"
          description="Qualitative data palette — one line per --data color"
        >
          <LineChartBody />
        </ChartCard>

        <ChartCard
          title="Area Chart - Interactive"
          description="Showing total visitors for the last 3 months"
          divided
        >
          <AreaChartBody />
        </ChartCard>

        <ChartCard title="Bar Chart - Stacked + Legend" description="January - June 2024">
          <BarChartBody />
        </ChartCard>
      </div>
    </div>
  );
}

/* ─────────────────────────── Card chrome ─────────────────────────── */

function ChartCard({
  title,
  description,
  divided,
  children,
}: {
  title: string;
  description?: string;
  divided?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className="rounded-[var(--ds-radius-lg,0.5rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        border: '1px solid rgb(var(--ds-border))',
        boxShadow: 'var(--ds-elev-raised)',
      }}
    >
      <div
        className="flex flex-col gap-[var(--ds-space-4,1rem)]"
        style={{ padding: 'var(--ds-space-5, 1.25rem)' }}
      >
        <div className="flex flex-col gap-[var(--ds-space-1,0.25rem)]">
          <h3
            style={{
              fontSize: 'var(--ds-text-base, 1rem)',
              fontWeight: 'var(--ds-weight-semibold, 600)',
            }}
          >
            {title}
          </h3>
          {description ? (
            <p
              style={{
                fontSize: 'var(--ds-text-sm, 0.875rem)',
                color: 'rgb(var(--ds-muted-foreground))',
              }}
            >
              {description}
            </p>
          ) : null}
        </div>

        {divided ? (
          <div
            className="h-px"
            style={{
              background: 'rgb(var(--ds-border))',
              marginLeft: 'calc(-1 * var(--ds-space-5, 1.25rem))',
              marginRight: 'calc(-1 * var(--ds-space-5, 1.25rem))',
            }}
          />
        ) : null}

        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────── Area chart ─────────────────────────── */

function AreaChartBody() {
  const [hover, setHover] = useState<{ i: number; width: number } | null>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const i = Math.round(frac * (AREA_DAYS - 1));
    setHover({ i, width: rect.width });
  }

  const point = hover ? AREA_DATA[hover.i] : null;
  const cx = hover ? (hover.i / (AREA_DAYS - 1)) * hover.width : 0;
  const yTop = point ? areaY(point.desktop + point.mobile) : 0;
  const yMob = point ? areaY(point.mobile) : 0;

  return (
    <div>
      <div className="relative" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <svg
          viewBox={`0 0 ${AREA_W} ${AREA_H}`}
          preserveAspectRatio="none"
          className="h-[260px] w-full"
          role="img"
          aria-label="Stacked area chart of desktop and mobile visitors"
        >
          <defs>
            <linearGradient id="dsAreaDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(var(--ds-primary))" stopOpacity="0.4" />
              <stop offset="95%" stopColor="rgb(var(--ds-primary))" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="dsAreaMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(var(--ds-primary))" stopOpacity="0.8" />
              <stop offset="95%" stopColor="rgb(var(--ds-primary))" stopOpacity="0.1" />
            </linearGradient>
            <clipPath id="dsAreaClip">
              <rect x="0" y="0" width={AREA_W} height={AREA_H} />
            </clipPath>
          </defs>

          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1="0"
              x2={AREA_W}
              y1={AREA_H * f}
              y2={AREA_H * f}
              stroke="rgb(var(--ds-border))"
              strokeWidth="1"
              opacity="0.6"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <g clipPath="url(#dsAreaClip)">
            <path d={desktopArea} fill="url(#dsAreaDesktop)" />
            <path d={mobileArea} fill="url(#dsAreaMobile)" />
            <path
              d={topLine}
              fill="none"
              stroke="rgb(var(--ds-primary))"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={mobLine}
              fill="none"
              stroke="rgb(var(--ds-primary))"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        {hover && point ? (
          <>
            <div
              className="pointer-events-none absolute bottom-0 top-0 w-px"
              style={{ left: `${cx}px`, background: 'rgb(var(--ds-foreground))', opacity: 0.18 }}
            />
            <HoverDot x={cx} y={yTop} />
            <HoverDot x={cx} y={yMob} />
            <TooltipBox x={cx} y={yTop} width={hover.width}>
              <TooltipCard
                label={AREA_DATE_LABELS[hover.i]}
                items={[
                  { name: 'Desktop', value: Math.round(point.desktop), color: C_DESKTOP },
                  { name: 'Mobile', value: Math.round(point.mobile), color: C_MOBILE },
                ]}
              />
            </TooltipBox>
          </>
        ) : null}
      </div>

      <div
        className="mt-[var(--ds-space-2,0.5rem)] flex justify-between"
        style={{
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        {AREA_TICKS.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      <Legend className="mt-[var(--ds-space-4,1rem)]" />
    </div>
  );
}

function HoverDot({
  x,
  y,
  color = 'rgb(var(--ds-primary))',
}: {
  x: number;
  y: number;
  color?: string;
}) {
  return (
    <span
      className="pointer-events-none absolute h-2.5 w-2.5 rounded-[var(--ds-radius-full,9999px)]"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
        background: color,
        border: '2px solid rgb(var(--ds-card))',
      }}
    />
  );
}

/* ─────────────────────────── Bar chart ─────────────────────────── */

function BarChartBody() {
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState<{ x: number; width: number }>({ x: 0, width: 0 });

  const activeData = active !== null ? BAR_DATA[active] : null;
  const barTopY = activeData
    ? BAR_PLOT_H * (1 - (activeData.desktop + activeData.mobile) / BAR_MAX)
    : 0;

  return (
    <div>
      <div
        className="relative"
        style={{ height: `${BAR_PLOT_H}px` }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos({ x: e.clientX - r.left, width: r.width });
        }}
        onMouseLeave={() => setActive(null)}
      >
        {/* gridlines */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-px w-full"
              style={{ background: 'rgb(var(--ds-border))', opacity: 0.5 }}
            />
          ))}
        </div>

        {/* bars */}
        <div className="absolute inset-0 flex items-end justify-center gap-[var(--ds-space-6,1.5rem)]">
          {BAR_DATA.map((d, i) => {
            const mobilePct = (d.mobile / BAR_MAX) * 100;
            const desktopPct = (d.desktop / BAR_MAX) * 100;
            return (
              <div
                key={d.month}
                className="flex h-full w-14 flex-col justify-end rounded-[var(--ds-radius-sm,0.25rem)] transition-colors"
                style={{
                  background: active === i ? 'rgb(var(--ds-muted) / 0.5)' : 'transparent',
                }}
                onMouseEnter={() => setActive(i)}
              >
                <div
                  className="rounded-t-[var(--ds-radius-sm,0.25rem)]"
                  style={{ height: `${mobilePct}%`, background: C_MOBILE }}
                />
                <div style={{ height: `${desktopPct}%`, background: C_DESKTOP }} />
              </div>
            );
          })}
        </div>

        {activeData ? (
          <TooltipBox x={pos.x} y={barTopY} width={pos.width}>
            <TooltipCard
              label={activeData.month}
              items={[
                { name: 'Desktop', value: activeData.desktop, color: C_DESKTOP },
                { name: 'Mobile', value: activeData.mobile, color: C_MOBILE },
              ]}
            />
          </TooltipBox>
        ) : null}
      </div>

      <div className="mt-[var(--ds-space-2,0.5rem)] flex justify-center gap-[var(--ds-space-6,1.5rem)]">
        {BAR_DATA.map((d) => (
          <span
            key={d.month}
            className="w-14 text-center"
            style={{
              fontSize: 'var(--ds-text-xs, 0.75rem)',
              color: 'rgb(var(--ds-muted-foreground))',
            }}
          >
            {d.month}
          </span>
        ))}
      </div>

      <Legend className="mt-[var(--ds-space-4,1rem)]" />
    </div>
  );
}

/* ─────────────────────────── Line chart ─────────────────────────── */

function LineChartBody() {
  const count = useTokenStore((s) => s.data.light.length);
  const [hover, setHover] = useState<{ i: number; width: number } | null>(null);

  const visible = useMemo(() => LINE_SERIES.slice(0, count), [count]);
  const max = useMemo(() => Math.max(...visible.flat()), [visible]);
  const paths = useMemo(
    () =>
      visible.map((vals) => smoothLine(vals.map((v, i) => [lineX(i), lineY(v, max)]))),
    [visible, max],
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const i = Math.round(frac * (LINE_POINTS - 1));
    setHover({ i, width: rect.width });
  }

  const cx = hover ? (hover.i / (LINE_POINTS - 1)) * hover.width : 0;
  const tooltipY = hover
    ? Math.min(...visible.map((vals) => lineY(vals[hover.i], max)))
    : 0;

  return (
    <div>
      <div className="relative" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <svg
          viewBox={`0 0 ${LINE_W} ${LINE_H}`}
          preserveAspectRatio="none"
          className="h-[260px] w-full"
          role="img"
          aria-label="Multi-line chart, one line per qualitative data color"
        >
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1="0"
              x2={LINE_W}
              y1={LINE_H * f}
              y2={LINE_H * f}
              stroke="rgb(var(--ds-border))"
              strokeWidth="1"
              opacity="0.6"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {paths.map((d, s) => (
            <path
              key={s}
              d={d}
              fill="none"
              stroke={dataColor(s + 1)}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {hover ? (
          <>
            <div
              className="pointer-events-none absolute bottom-0 top-0 w-px"
              style={{ left: `${cx}px`, background: 'rgb(var(--ds-foreground))', opacity: 0.18 }}
            />
            {visible.map((vals, s) => (
              <HoverDot key={s} x={cx} y={lineY(vals[hover.i], max)} color={dataColor(s + 1)} />
            ))}
            <TooltipBox x={cx} y={tooltipY} width={hover.width}>
              <TooltipCard
                label={LINE_MONTHS[hover.i]}
                items={visible.map((vals, s) => ({
                  name: `Series ${s + 1}`,
                  value: Math.round(vals[hover.i]),
                  color: dataColor(s + 1),
                }))}
              />
            </TooltipBox>
          </>
        ) : null}
      </div>

      <div
        className="mt-[var(--ds-space-2,0.5rem)] flex justify-between"
        style={{
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          color: 'rgb(var(--ds-muted-foreground))',
        }}
      >
        {LINE_MONTHS.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      <DataLegend count={count} className="mt-[var(--ds-space-4,1rem)]" />
    </div>
  );
}

function DataLegend({ count, className }: { count: number; className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-[var(--ds-space-5,1.25rem)] gap-y-[var(--ds-space-2,0.5rem)] ${className ?? ''}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <LegendItem key={i} color={dataColor(i + 1)} label={`Series ${i + 1}`} />
      ))}
    </div>
  );
}

/* ─────────────────────────── Tooltip ─────────────────────────── */

function TooltipBox({
  x,
  y,
  width,
  children,
}: {
  x: number;
  y: number;
  width: number;
  children: ReactNode;
}) {
  // Keep the tooltip from spilling past the chart's left/right edges.
  const cx = Math.max(72, Math.min(x, width - 72));
  return (
    <div
      className="pointer-events-none absolute z-20"
      style={{
        left: `${cx}px`,
        top: `${y}px`,
        transform: 'translate(-50%, calc(-100% - 10px))',
      }}
    >
      {children}
    </div>
  );
}

function TooltipCard({
  label,
  items,
}: {
  label: string;
  items: { name: string; value: number; color: string }[];
}) {
  return (
    <div
      className="rounded-[var(--ds-radius-md,0.375rem)] px-[var(--ds-space-3,0.75rem)] py-[var(--ds-space-2,0.5rem)]"
      style={{
        background: 'rgb(var(--ds-card))',
        color: 'rgb(var(--ds-card-foreground))',
        border: '1px solid rgb(var(--ds-border))',
        boxShadow: 'var(--ds-shadow-lg)',
        minWidth: '9rem',
      }}
    >
      <div
        className="mb-[var(--ds-space-1,0.25rem)]"
        style={{
          fontSize: 'var(--ds-text-xs, 0.75rem)',
          fontWeight: 'var(--ds-weight-medium, 500)',
        }}
      >
        {label}
      </div>
      {items.map((it) => (
        <div
          key={it.name}
          className="flex items-center gap-[var(--ds-space-2,0.5rem)]"
          style={{ fontSize: 'var(--ds-text-xs, 0.75rem)' }}
        >
          <span
            className="h-2 w-2 shrink-0 rounded-[var(--ds-radius-sm,0.25rem)]"
            style={{ background: it.color }}
          />
          <span style={{ color: 'rgb(var(--ds-muted-foreground))' }}>{it.name}</span>
          <span className="ml-auto tabular-nums" style={{ fontWeight: 'var(--ds-weight-semibold, 600)' }}>
            {it.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────── Shared bits ─────────────────────────── */

function Legend({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-[var(--ds-space-5,1.25rem)] ${className ?? ''}`}
    >
      <LegendItem color={C_DESKTOP} label="Desktop" />
      <LegendItem color={C_MOBILE} label="Mobile" />
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span
      className="flex items-center gap-[var(--ds-space-2,0.5rem)]"
      style={{
        fontSize: 'var(--ds-text-xs, 0.75rem)',
        color: 'rgb(var(--ds-muted-foreground))',
      }}
    >
      <span
        className="h-2.5 w-2.5 rounded-[var(--ds-radius-sm,0.25rem)]"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
