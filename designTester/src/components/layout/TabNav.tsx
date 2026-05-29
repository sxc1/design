export type TabId = 'primitive' | 'semantic' | 'typography' | 'spacing';

export const TABS: { id: TabId; label: string }[] = [
  { id: 'primitive', label: 'Primitive Colors' },
  { id: 'semantic', label: 'Semantic Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
];

interface TabNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export function TabNav({ active, onChange }: TabNavProps) {
  return (
    <div className="flex gap-1 border-b border-app-border px-3">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={[
            'relative px-3 py-2 text-sm font-medium transition',
            active === tab.id
              ? 'text-app-fg'
              : 'text-app-muted hover:text-app-fg',
          ].join(' ')}
        >
          {tab.label}
          {active === tab.id ? (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-app-accent" />
          ) : null}
        </button>
      ))}
    </div>
  );
}
