import { useCallback, useEffect, useRef, useState } from 'react';
import { useTokenStore } from '@/store/tokenStore';
import { SHADE_STEPS, type ShadeStep } from '@/types/tokens';
import { isValidColor, toHexSafe } from '@/lib/colorScale';
import { Button } from '@/components/ui/Button';
import { Field, HexInput, TextInput } from '@/components/ui/Field';

export function PrimitiveColorPanel() {
  const palettes = useTokenStore((s) => s.palettes);
  const addPalette = useTokenStore((s) => s.addPalette);
  const sortPalettes = useTokenStore((s) => s.sortPalettes);

  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#22c55e');

  // Re-sorting palettes by color is deferred to an explicit "Confirm" click so
  // that editing a base color doesn't reorder the list (and steal focus from
  // the field) mid-edit. The button only appears on a card whose base color has
  // an unconfirmed edit (`dirty`). On confirm we sort, then scroll the confirmed
  // card into view and blink a focus ring around it. `flash` carries the target
  // id plus a nonce so the same card can be re-confirmed and re-blink.
  const cardRefs = useRef(new Map<string, HTMLElement>());
  const [flash, setFlash] = useState<{ id: string; nonce: number } | null>(null);
  const [dirty, setDirty] = useState<Set<string>>(() => new Set());

  const markEdited = useCallback((id: string) => {
    setDirty((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const handleConfirm = useCallback(
    (id: string) => {
      sortPalettes();
      setFlash((prev) => ({ id, nonce: (prev?.nonce ?? 0) + 1 }));
      // A confirm sorts the whole list, so every pending edit is now resolved.
      setDirty((prev) => (prev.size ? new Set() : prev));
    },
    [sortPalettes],
  );

  // After the sort reorders the cards, scroll the confirmed one into view.
  useEffect(() => {
    if (!flash) return;
    cardRefs.current
      .get(flash.id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [flash]);

  const validNew = newName.trim().length > 0 && isValidColor(newColor);

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-lg border border-app-border bg-app-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-app-fg">Add a palette</h3>
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-end">
          <Field label="Name" htmlFor="palette-name">
            <TextInput
              id="palette-name"
              value={newName}
              placeholder="e.g. brand"
              onChange={(e) => setNewName(e.target.value)}
            />
          </Field>
          <Field label="Base color" htmlFor="palette-color">
            <div className="flex gap-2 items-center">
              <div className="h-9 w-9 overflow-hidden rounded-md border border-app-border">
                <input
                  id="palette-color"
                  type="color"
                  value={isValidColor(newColor) ? toHexSafe(newColor) : '#22c55e'}
                  onChange={(e) => setNewColor(e.target.value)}
                />
              </div>
              <HexInput
                value={newColor}
                onChange={setNewColor}
                invalid={!isValidColor(newColor)}
                className="w-24"
              />
            </div>
          </Field>
          <Button
            variant="primary"
            disabled={!validNew}
            onClick={() => {
              addPalette(newName.trim(), newColor);
              setNewName('');
            }}
          >
            Add
          </Button>
        </div>
      </section>

      <div className="flex flex-col gap-4">
        {palettes.map((p) => (
          <PaletteCard
            key={p.id}
            paletteId={p.id}
            dirty={dirty.has(p.id)}
            onEdit={markEdited}
            onConfirm={handleConfirm}
            flashNonce={flash?.id === p.id ? flash.nonce : undefined}
            setCardRef={(el) => {
              if (el) cardRefs.current.set(p.id, el);
              else cardRefs.current.delete(p.id);
            }}
          />
        ))}
        {palettes.length === 0 ? (
          <p className="text-sm text-app-muted">No palettes yet — add one above.</p>
        ) : null}
      </div>
    </div>
  );
}

interface PaletteCardProps {
  paletteId: string;
  dirty: boolean;
  onEdit: (id: string) => void;
  onConfirm: (id: string) => void;
  flashNonce?: number;
  setCardRef: (el: HTMLElement | null) => void;
}

function PaletteCard({
  paletteId,
  dirty,
  onEdit,
  onConfirm,
  flashNonce,
  setCardRef,
}: PaletteCardProps) {
  const palette = useTokenStore((s) => s.palettes.find((p) => p.id === paletteId));
  const renamePalette = useTokenStore((s) => s.renamePalette);
  const setPaletteBaseColor = useTokenStore((s) => s.setPaletteBaseColor);
  const removePalette = useTokenStore((s) => s.removePalette);
  const setShadeOverride = useTokenStore((s) => s.setShadeOverride);
  const resetPaletteOverrides = useTokenStore((s) => s.resetPaletteOverrides);

  // Each confirm bumps `flashNonce`; mirror it into local state and key the ring
  // overlay by it so the element remounts and replays its blink animation.
  const [ring, setRing] = useState<number | null>(null);
  useEffect(() => {
    if (flashNonce !== undefined) setRing(flashNonce);
  }, [flashNonce]);

  if (!palette) return null;

  const baseInvalid = !isValidColor(palette.baseColor);
  const hasOverrides = Object.keys(palette.overrides).length > 0;

  // Editing the base color marks the card dirty so its "Confirm" button appears.
  const handleBaseColorChange = (value: string) => {
    setPaletteBaseColor(palette.id, value);
    onEdit(palette.id);
  };

  return (
    <section
      ref={setCardRef}
      className="relative rounded-lg border border-app-border bg-app-surface p-4"
    >
      {ring !== null ? (
        <span
          key={ring}
          aria-hidden="true"
          onAnimationEnd={() => setRing(null)}
          className="palette-confirm-ring pointer-events-none absolute -inset-px rounded-lg"
        />
      ) : null}
      <div className="mb-3 flex flex-wrap items-end gap-3">
        <Field label="Palette name">
          <TextInput
            value={palette.name}
            onChange={(e) => renamePalette(palette.id, e.target.value)}
            className="w-40"
          />
        </Field>
        <Field label="Base color">
          <div className="flex gap-2 items-center">
            <div className="h-9 w-9 overflow-hidden rounded-md border border-app-border">
              <input
                type="color"
                value={isValidColor(palette.baseColor) ? toHexSafe(palette.baseColor) : '#000000'}
                onChange={(e) => handleBaseColorChange(e.target.value)}
              />
            </div>
            <HexInput
              value={palette.baseColor}
              onChange={handleBaseColorChange}
              invalid={baseInvalid}
              className="w-24"
            />
          </div>
        </Field>
        {dirty ? (
          <Button
            size="md"
            variant="primary"
            onClick={() => onConfirm(palette.id)}
            title="Re-sort palettes by color and jump to this one"
          >
            Confirm
          </Button>
        ) : null}
        <div className="ml-auto flex gap-2">
          {hasOverrides ? (
            <Button size="sm" variant="ghost" onClick={() => resetPaletteOverrides(palette.id)}>
              Reset overrides
            </Button>
          ) : null}
          <Button
            size="sm"
            variant="danger"
            onClick={() => removePalette(palette.id)}
            aria-label="Remove palette"
            title="Remove palette"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-11 gap-1">
        {SHADE_STEPS.map((step) => (
          <ShadeSwatch
            key={step}
            step={step}
            color={palette.scale[step]}
            overridden={palette.overrides[step] != null}
            onChange={(value) => setShadeOverride(palette.id, step, value)}
          />
        ))}
      </div>
    </section>
  );
}

interface ShadeSwatchProps {
  step: ShadeStep;
  color: string;
  overridden: boolean;
  onChange: (value: string | null) => void;
}

function ShadeSwatch({ step, color, overridden, onChange }: ShadeSwatchProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(color);

  return (
    <div className="flex flex-col items-stretch gap-1">
      <button
        type="button"
        onClick={() => {
          setDraft(color);
          setEditing((v) => !v);
        }}
        className="h-12 w-full rounded-md border border-app-border shadow-sm transition hover:scale-[1.03]"
        style={{ background: color }}
        title={`Click to edit ${step}`}
      />
      <div className="text-center text-[10px] font-medium text-app-muted">
        {step}
        {overridden ? <span className="text-app-accent">•</span> : null}
      </div>
      {editing ? (
        <div className="flex flex-col gap-1">
          <HexInput
            value={draft}
            onChange={setDraft}
            invalid={!isValidColor(draft)}
            size="sm"
          />
          <div className="flex gap-1">
            <button
              type="button"
              className="flex-1 rounded-sm bg-app-accent text-white text-[10px] py-0.5"
              onClick={() => {
                if (isValidColor(draft)) {
                  onChange(draft);
                  setEditing(false);
                }
              }}
            >
              Set
            </button>
            <button
              type="button"
              className="flex-1 rounded-sm border border-app-border text-app-fg text-[10px] py-0.5"
              onClick={() => {
                onChange(null);
                setEditing(false);
              }}
            >
              Clear
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
