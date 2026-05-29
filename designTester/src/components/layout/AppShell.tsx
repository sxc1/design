import { useState } from 'react';
import { saveAs } from 'file-saver';
import { TabNav, type TabId } from './TabNav';
import { PrimitiveColorPanel } from '@/components/tokens/PrimitiveColorPanel';
import { SemanticColorPanel } from '@/components/tokens/SemanticColorPanel';
import { TypographyPanel } from '@/components/tokens/TypographyPanel';
import { SpacingPanel } from '@/components/tokens/SpacingPanel';
import { PreviewWrapper } from '@/components/preview/PreviewWrapper';
import { MockPage } from '@/components/preview/MockPage';
import { Button } from '@/components/ui/Button';
import { ModeToggle } from '@/components/preview/ModeToggle';
import { useTokenStore } from '@/store/tokenStore';
import { exportTailwindV3 } from '@/lib/exportTailwindV3';

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabId>('primitive');
  const resetAll = useTokenStore((s) => s.resetAll);
  const loadSxc1Preset = useTokenStore((s) => s.loadSxc1Preset);

  function handleExport() {
    const state = useTokenStore.getState();
    const { config, css } = exportTailwindV3(state);
    saveAs(
      new Blob([config], { type: 'application/javascript;charset=utf-8' }),
      'tailwind.config.js',
    );
    saveAs(
      new Blob([css], { type: 'text/css;charset=utf-8' }),
      'tokens.css',
    );
  }

  return (
    <div className="grid h-full grid-rows-[auto_1fr] bg-app-bg text-app-fg">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-app-border bg-app-surface px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md bg-app-accent" />
          <div>
            <h1 className="text-sm font-semibold leading-tight">
              Design Token Selector
            </h1>
            <p className="text-xs leading-tight text-app-muted">
              Build a Tailwind v3 token set with a live preview.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <ModeToggle />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={resetAll}>
            Reset
          </Button>
          <Button variant="ghost" size="sm" onClick={loadSxc1Preset}>
            sxc1
          </Button>
          <Button variant="primary" size="md" onClick={handleExport}>
            Export Tailwind Config
          </Button>
        </div>
      </header>

      <div className="grid min-h-0 grid-cols-[minmax(420px,1fr)_minmax(0,1.4fr)]">
        <aside className="flex min-h-0 flex-col border-r border-app-border bg-app-bg">
          <TabNav active={activeTab} onChange={setActiveTab} />
          <div className="min-h-0 flex-1 overflow-auto p-4">
            {activeTab === 'primitive' ? <PrimitiveColorPanel /> : null}
            {activeTab === 'semantic' ? <SemanticColorPanel /> : null}
            {activeTab === 'typography' ? <TypographyPanel /> : null}
            {activeTab === 'spacing' ? <SpacingPanel /> : null}
          </div>
        </aside>

        <section className="min-h-0">
          <PreviewWrapper>
            <MockPage />
          </PreviewWrapper>
        </section>
      </div>
    </div>
  );
}
