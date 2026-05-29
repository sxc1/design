import { useState } from 'react';
import { useTokenStore } from '@/store/tokenStore';
import { Button } from '@/components/ui/Button';
import { Field, NumberInput, TextInput } from '@/components/ui/Field';

export function SpacingPanel() {
  const spacing = useTokenStore((s) => s.spacing);
  const setSpacingBaseUnit = useTokenStore((s) => s.setSpacingBaseUnit);
  const setSpacing = useTokenStore((s) => s.setSpacing);
  const addSpacing = useTokenStore((s) => s.addSpacing);
  const removeSpacing = useTokenStore((s) => s.removeSpacing);

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('1rem');

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-lg border border-app-border bg-app-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-app-fg">Base unit</h3>
        <Field label="Base unit (px)" hint="Reference for scale design. Does not auto-adjust values below.">
          <NumberInput
            value={spacing.baseUnitPx}
            min={1}
            max={16}
            onChange={(e) => setSpacingBaseUnit(Number(e.target.value))}
            className="w-24"
          />
        </Field>
      </section>

      <section className="rounded-lg border border-app-border bg-app-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-app-fg">Spacing scale</h3>
        <div className="flex flex-col gap-2">
          {Object.entries(spacing.scale).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="w-12 shrink-0 text-xs font-mono text-app-muted">
                {key}
              </span>
              <TextInput
                value={value}
                onChange={(e) => setSpacing(key, e.target.value)}
                className="w-24"
              />
              <div className="ml-2 flex-1 rounded bg-app-bg">
                <div
                  className="h-3 rounded bg-app-accent"
                  style={{ width: value }}
                />
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeSpacing(key)}
                title="Remove"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-end gap-2 border-t border-app-border pt-3">
          <Field label="Key">
            <TextInput
              value={newKey}
              placeholder="e.g. 7"
              onChange={(e) => setNewKey(e.target.value)}
              className="w-20"
            />
          </Field>
          <Field label="Value">
            <TextInput
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-28"
            />
          </Field>
          <Button
            variant="primary"
            disabled={!newKey.trim()}
            onClick={() => {
              addSpacing(newKey.trim(), newValue);
              setNewKey('');
            }}
          >
            Add spacing
          </Button>
        </div>
      </section>
    </div>
  );
}
