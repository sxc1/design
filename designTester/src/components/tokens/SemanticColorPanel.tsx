import { useEffect, useMemo, useRef, useState } from 'react';
import {
  resolveSemanticColor,
  useTokenStore,
} from '@/store/tokenStore';
import {
  SEMANTIC_GROUP_LABELS,
  SEMANTIC_ROLES,
  type SemanticRoleDescriptor,
} from '@/constants/semanticRoles';
import {
  MAX_DATA_COLORS,
  MIN_DATA_COLORS,
  type PreviewMode,
  type PrimitivePalette,
  type SemanticReference,
  type SemanticRoleId,
  type ShadeRef,
} from '@/types/tokens';
import { paletteShadeEntries } from '@/lib/colorScale';
import { contrastRatio, gradeContrast } from '@/lib/contrastCheck';

export function SemanticColorPanel() {
  const previewMode = useTokenStore((s) => s.previewMode);

  const grouped = useMemo(() => {
    const map = new Map<SemanticRoleDescriptor['group'], SemanticRoleDescriptor[]>();
    for (const role of SEMANTIC_ROLES) {
      if (!map.has(role.group)) map.set(role.group, []);
      map.get(role.group)!.push(role);
    }
    return map;
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-app-border bg-app-surface p-3">
        <div className="text-sm font-semibold text-app-fg">
          Editing <span className="capitalize">{previewMode}</span> mode
        </div>
        <div className="text-xs text-app-muted">
          Set semantic colors independently for light and dark mode. Switch
          modes from the header.
        </div>
      </div>

      {Array.from(grouped.entries()).map(([group, roles]) => (
        <section
          key={group}
          className="rounded-lg border border-app-border bg-app-surface p-4"
        >
          <h3 className="mb-3 text-sm font-semibold text-app-fg">
            {SEMANTIC_GROUP_LABELS[group]}
          </h3>
          <div className="flex flex-col gap-3">
            {roles.map((role) => (
              <SemanticRow key={role.id} role={role} mode={previewMode} />
            ))}
          </div>
        </section>
      ))}

      <DataColorSection mode={previewMode} />
    </div>
  );
}

function DataColorSection({ mode }: { mode: PreviewMode }) {
  const data = useTokenStore((s) => s.data[mode]);
  const addDataColor = useTokenStore((s) => s.addDataColor);
  const removeDataColor = useTokenStore((s) => s.removeDataColor);
  const count = data.length;

  return (
    <section className="rounded-lg border border-app-border bg-app-surface p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-app-fg">Data</h3>
          <p className="text-xs text-app-muted">Preview in Showcases → Charts</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={removeDataColor}
            disabled={count <= MIN_DATA_COLORS}
            aria-label="Remove last data color"
            title={
              count <= MIN_DATA_COLORS
                ? `Minimum ${MIN_DATA_COLORS} colors`
                : 'Remove last data color'
            }
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-app-border bg-app-surface text-app-muted shadow-sm transition hover:bg-app-bg hover:text-app-fg disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span aria-hidden className="text-sm leading-none">
              −
            </span>
          </button>
          <span className="w-6 text-center text-xs font-medium tabular-nums text-app-muted">
            {count}
          </span>
          <button
            type="button"
            onClick={addDataColor}
            disabled={count >= MAX_DATA_COLORS}
            aria-label="Add data color"
            title={
              count >= MAX_DATA_COLORS
                ? `Maximum ${MAX_DATA_COLORS} colors`
                : 'Add data color'
            }
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-app-border bg-app-surface text-app-muted shadow-sm transition hover:bg-app-bg hover:text-app-fg disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span aria-hidden className="text-sm leading-none">
              +
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {data.map((reference, index) => (
          <DataColorRow
            key={index}
            index={index}
            mode={mode}
            reference={reference}
          />
        ))}
      </div>
    </section>
  );
}

function DataColorRow({
  index,
  mode,
  reference,
}: {
  index: number;
  mode: PreviewMode;
  reference: SemanticReference | null;
}) {
  const palettes = useTokenStore((s) => s.palettes);
  const setDataColor = useTokenStore((s) => s.setDataColor);

  const [expanded, setExpanded] = useState(false);

  const resolved = resolveSemanticColor(reference ?? undefined, palettes);
  const selectedPalette = palettes.find((p) => p.id === reference?.paletteId);
  const canExpand = Boolean(selectedPalette);
  const shadeRef = useDismiss<HTMLDivElement>(expanded, () =>
    setExpanded(false),
  );

  return (
    <div ref={shadeRef} className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="h-9 w-9 shrink-0 rounded-md border border-app-border shadow-sm"
          style={{ background: resolved ?? 'transparent' }}
        />
        <div className="min-w-[150px] flex-1">
          <div className="text-sm font-medium text-app-fg">Series {index + 1}</div>
        </div>

        <PaletteSelect
          value={reference?.paletteId ?? ''}
          onChange={(paletteId) => {
            if (paletteId === '') {
              setDataColor(mode, index, null);
              setExpanded(false);
              return;
            }
            const shade = reference?.shade ?? 500;
            setDataColor(mode, index, { paletteId, shade });
          }}
          palettes={palettes}
        />
        <ShadeScaleToggle
          value={reference?.shade ?? 500}
          expanded={expanded}
          disabled={!canExpand}
          onToggle={() => setExpanded((v) => !v)}
        />
      </div>

      {expanded && selectedPalette ? (
        <PaletteShadeStrip
          palette={selectedPalette}
          activeShade={reference?.shade}
          onPick={(shade) =>
            setDataColor(mode, index, {
              paletteId: selectedPalette.id,
              shade,
            })
          }
        />
      ) : null}
    </div>
  );
}

function SemanticRow({
  role,
  mode,
}: {
  role: SemanticRoleDescriptor;
  mode: PreviewMode;
}) {
  const palettes = useTokenStore((s) => s.palettes);
  const reference = useTokenStore((s) => s.semantic[mode][role.id]);
  const setSemantic = useTokenStore((s) => s.setSemantic);
  const clearSemantic = useTokenStore((s) => s.clearSemantic);

  const [expanded, setExpanded] = useState(false);

  const resolved = resolveSemanticColor(reference, palettes);

  const pairedReference = useTokenStore((s) =>
    role.pairedWith ? s.semantic[mode][role.pairedWith] : undefined,
  );
  const pairedColor = resolveSemanticColor(pairedReference, palettes);

  const ratio =
    resolved && pairedColor ? contrastRatio(resolved, pairedColor) : null;
  const grade = role.pairedWith ? gradeContrast(ratio) : null;

  const selectedPalette = palettes.find((p) => p.id === reference?.paletteId);
  const canExpand = Boolean(selectedPalette);
  const shadeRef = useDismiss<HTMLDivElement>(expanded, () =>
    setExpanded(false),
  );

  return (
    <div ref={shadeRef} className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="h-9 w-9 shrink-0 rounded-md border border-app-border shadow-sm"
          style={{ background: resolved ?? 'transparent' }}
        />
        <div className="min-w-[150px] flex-1">
          <div className="text-sm font-medium text-app-fg">{role.label}</div>
          <div className="text-xs text-app-muted">{role.description}</div>
        </div>

        <PaletteSelect
          value={reference?.paletteId ?? ''}
          onChange={(paletteId) => {
            if (paletteId === '') {
              clearSemantic(mode, role.id);
              setExpanded(false);
              return;
            }
            const shade = reference?.shade ?? 500;
            setSemantic(mode, role.id, { paletteId, shade });
          }}
          palettes={palettes}
        />
        <ShadeScaleToggle
          value={reference?.shade ?? 500}
          expanded={expanded}
          disabled={!canExpand}
          onToggle={() => setExpanded((v) => !v)}
        />
        {grade ? <ContrastBadge ratio={ratio} grade={grade} /> : null}
      </div>

      {expanded && selectedPalette ? (
        <PaletteShadeStrip
          palette={selectedPalette}
          activeShade={reference?.shade}
          onPick={(shade) =>
            setSemantic(mode, role.id, {
              paletteId: selectedPalette.id,
              shade,
            })
          }
        />
      ) : null}
    </div>
  );
}

// Dismiss the open shade strip on Escape or a click/tap outside the row,
// giving it lightweight modal-style behavior. The latest onDismiss is read
// from a ref so the listeners only re-subscribe when `enabled` flips, and the
// toggle button (inside the ref) keeps its own open/close handling without a
// double-fire from the outside-click listener.
function useDismiss<T extends HTMLElement>(
  enabled: boolean,
  onDismiss: () => void,
) {
  const ref = useRef<T>(null);
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    if (!enabled) return;
    const handlePointer = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onDismissRef.current();
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismissRef.current();
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [enabled]);

  return ref;
}

// Combined shade value + show/hide scale control. Displays the current shade
// and toggles the PaletteShadeStrip, which is itself the shade picker — so the
// strip replaces a separate shade dropdown.
function ShadeScaleToggle({
  value,
  expanded,
  disabled,
  onToggle,
}: {
  value: ShadeRef;
  expanded: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={expanded ? 'Hide shade scale' : 'Choose shade'}
      title={
        disabled
          ? 'Assign a palette first'
          : expanded
            ? 'Hide shade scale'
            : 'Choose shade'
      }
      className="inline-flex min-w-[72px] shrink-0 items-center justify-between gap-1.5 rounded-md border border-app-border bg-app-surface px-2 py-1 text-sm text-app-fg shadow-sm transition hover:bg-app-bg disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="tabular-nums">{value}</span>
      <span
        aria-hidden
        className={[
          'inline-block text-xs leading-none text-app-muted transition-transform duration-150',
          expanded ? 'rotate-180' : '',
        ].join(' ')}
      >
        ▾
      </span>
    </button>
  );
}

function PaletteShadeStrip({
  palette,
  activeShade,
  onPick,
}: {
  palette: PrimitivePalette;
  activeShade: ShadeRef | undefined;
  onPick: (shade: ShadeRef) => void;
}) {
  const entries = paletteShadeEntries(palette);

  // Step the active shade with ←/→ while the strip is open. The latest values
  // are read from a ref so the document listener subscribes once per open
  // (the strip only mounts while expanded). Form controls keep their native
  // arrow behavior. Movement clamps at the ends — no wraparound.
  const navRef = useRef({ entries, activeShade, onPick });
  navRef.current = { entries, activeShade, onPick };
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
      const { entries, activeShade, onPick } = navRef.current;
      if (entries.length === 0) return;
      const dir = event.key === 'ArrowRight' ? 1 : -1;
      const idx = entries.findIndex((e) => e.shade === activeShade);
      const start = idx === -1 ? (dir === 1 ? -1 : entries.length) : idx;
      const next = Math.min(Math.max(start + dir, 0), entries.length - 1);
      if (next === idx) return;
      event.preventDefault();
      onPick(entries[next].shade);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="mt-2 ml-12 rounded-md border border-app-border bg-app-bg p-2">
      <div className="mb-1 text-[11px] font-medium text-app-muted">
        {palette.name} scale — click a shade or use ← → to assign
      </div>
      <div className="grid grid-cols-12 gap-1">
        {entries.map(({ shade, color }) => {
          const isActive = shade === activeShade;
          return (
            <button
              key={shade}
              type="button"
              onClick={() => onPick(shade)}
              title={`${palette.name}.${shade} · ${color}`}
              className={[
                'group flex flex-col items-stretch gap-0.5 rounded-sm transition',
                isActive
                  ? 'ring-2 ring-app-accent ring-offset-1 ring-offset-app-bg'
                  : '',
              ].join(' ')}
            >
              <span
                className="block h-8 w-full rounded-sm border border-app-border shadow-sm"
                style={{ background: color }}
              />
              <span className="text-center text-[10px] font-medium text-app-muted group-hover:text-app-fg">
                {shade}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PaletteSelect({
  value,
  onChange,
  palettes,
}: {
  value: string;
  onChange: (id: string) => void;
  palettes: ReturnType<typeof useTokenStore.getState>['palettes'];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-app-border bg-app-surface px-2 py-1 text-sm text-app-fg"
    >
      <option value="">— unassigned —</option>
      {palettes.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}

function ContrastBadge({
  ratio,
  grade,
}: {
  ratio: number | null;
  grade: ReturnType<typeof gradeContrast>;
}) {
  const tone = {
    AAA: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    AA: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    'AA Large': 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    Fail: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
  }[grade];

  return (
    <span
      className={`shrink-0 rounded-sm px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${tone}`}
      title={
        ratio ? `WCAG contrast: ${grade} · ${ratio.toFixed(2)}:1` : 'No contrast pair'
      }
    >
      {ratio ? ratio.toFixed(1) : '—'}
    </span>
  );
}

// Type guard / casts above use SemanticRoleId implicitly through SemanticRoleDescriptor
export type { SemanticRoleId };
