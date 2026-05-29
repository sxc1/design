import { useState } from 'react';
import { useTokenStore } from '@/store/tokenStore';
import { Button } from '@/components/ui/Button';
import { Field, TextInput } from '@/components/ui/Field';

export function TypographyPanel() {
  const typography = useTokenStore((s) => s.typography);
  const setTypographyFamily = useTokenStore((s) => s.setTypographyFamily);
  const setFontSize = useTokenStore((s) => s.setFontSize);
  const removeFontSize = useTokenStore((s) => s.removeFontSize);
  const addFontSize = useTokenStore((s) => s.addFontSize);
  const setFontWeight = useTokenStore((s) => s.setFontWeight);
  const setLineHeight = useTokenStore((s) => s.setLineHeight);

  const [newSizeKey, setNewSizeKey] = useState('');
  const [newSizeValue, setNewSizeValue] = useState('1rem');

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-lg border border-app-border bg-app-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-app-fg">Font families</h3>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Sans">
            <TextInput
              value={typography.fontFamilySans}
              onChange={(e) => setTypographyFamily('fontFamilySans', e.target.value)}
            />
          </Field>
          <Field label="Serif">
            <TextInput
              value={typography.fontFamilySerif}
              onChange={(e) => setTypographyFamily('fontFamilySerif', e.target.value)}
            />
          </Field>
          <Field label="Mono">
            <TextInput
              value={typography.fontFamilyMono}
              onChange={(e) => setTypographyFamily('fontFamilyMono', e.target.value)}
            />
          </Field>
        </div>
      </section>

      <section className="rounded-lg border border-app-border bg-app-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-app-fg">Font size scale</h3>
        <div className="flex flex-col gap-2">
          {Object.entries(typography.fontSizeScale).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-xs font-mono text-app-muted">
                {key}
              </span>
              <TextInput
                value={value}
                onChange={(e) => setFontSize(key, e.target.value)}
                className="w-32"
              />
              <span
                className="ml-auto truncate text-app-fg"
                style={{ fontSize: value }}
                title={value}
              >
                The quick brown fox
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFontSize(key)}
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
              value={newSizeKey}
              placeholder="e.g. 5xl"
              onChange={(e) => setNewSizeKey(e.target.value)}
              className="w-24"
            />
          </Field>
          <Field label="Value">
            <TextInput
              value={newSizeValue}
              onChange={(e) => setNewSizeValue(e.target.value)}
              className="w-28"
            />
          </Field>
          <Button
            variant="primary"
            disabled={!newSizeKey.trim()}
            onClick={() => {
              addFontSize(newSizeKey.trim(), newSizeValue);
              setNewSizeKey('');
            }}
          >
            Add size
          </Button>
        </div>
      </section>

      <section className="rounded-lg border border-app-border bg-app-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-app-fg">Font weights</h3>
        <div className="flex flex-col gap-2">
          {Object.entries(typography.fontWeightScale).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="w-20 shrink-0 text-xs font-mono text-app-muted">
                {key}
              </span>
              <TextInput
                type="number"
                value={value}
                min={100}
                max={900}
                step={50}
                onChange={(e) => setFontWeight(key, Number(e.target.value))}
                className="w-24"
              />
              <span
                className="ml-auto text-app-fg"
                style={{ fontWeight: value }}
              >
                Aa Bb Cc · {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-app-border bg-app-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-app-fg">Line heights</h3>
        <div className="flex flex-col gap-2">
          {Object.entries(typography.lineHeightScale).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="w-20 shrink-0 text-xs font-mono text-app-muted">
                {key}
              </span>
              <TextInput
                value={value}
                onChange={(e) => setLineHeight(key, e.target.value)}
                className="w-24"
              />
              <span className="ml-auto text-xs text-app-muted">{value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
