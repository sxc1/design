import { useState } from 'react';
import { useTokenStore } from '@/store/tokenStore';
import { SHADE_STEPS, type ShadeStep } from '@/types/tokens';
import { isValidColor, toHexSafe } from '@/lib/colorScale';
import { Button } from '@/components/ui/Button';
import { Field, HexInput, TextInput } from '@/components/ui/Field';

export function PrimitiveColorPanel() {
  const palettes = useTokenStore((s) => s.palettes);
  const addPalette = useTokenStore((s) => s.addPalette);

  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#22c55e');

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
                className="w-28"
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
          <PaletteCard key={p.id} paletteId={p.id} />
        ))}
        {palettes.length === 0 ? (
          <p className="text-sm text-app-muted">No palettes yet — add one above.</p>
        ) : null}
      </div>
    </div>
  );
}

function PaletteCard({ paletteId }: { paletteId: string }) {
  const palette = useTokenStore((s) => s.palettes.find((p) => p.id === paletteId));
  const renamePalette = useTokenStore((s) => s.renamePalette);
  const setPaletteBaseColor = useTokenStore((s) => s.setPaletteBaseColor);
  const removePalette = useTokenStore((s) => s.removePalette);
  const setShadeOverride = useTokenStore((s) => s.setShadeOverride);
  const resetPaletteOverrides = useTokenStore((s) => s.resetPaletteOverrides);

  if (!palette) return null;

  const baseInvalid = !isValidColor(palette.baseColor);

  return (
    <section className="rounded-lg border border-app-border bg-app-surface p-4">
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
                onChange={(e) => setPaletteBaseColor(palette.id, e.target.value)}
              />
            </div>
            <HexInput
              value={palette.baseColor}
              onChange={(value) => setPaletteBaseColor(palette.id, value)}
              invalid={baseInvalid}
              className="w-28"
            />
          </div>
        </Field>
        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => resetPaletteOverrides(palette.id)}>
            Reset overrides
          </Button>
          <Button size="sm" variant="danger" onClick={() => removePalette(palette.id)}>
            Remove
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
              className="flex-1 rounded bg-app-accent text-white text-[10px] py-0.5"
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
              className="flex-1 rounded border border-app-border text-app-fg text-[10px] py-0.5"
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
