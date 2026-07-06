import { useEffect, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { TabNav, type TabId } from './TabNav';
import { PrimitiveColorPanel } from '@/components/tokens/PrimitiveColorPanel';
import { SemanticColorPanel } from '@/components/tokens/SemanticColorPanel';
import { TypographyPanel } from '@/components/tokens/TypographyPanel';
import { SpacingPanel } from '@/components/tokens/SpacingPanel';
import { PreviewWrapper } from '@/components/preview/PreviewWrapper';
import { PreviewNav } from '@/components/preview/PreviewNav';
import { getScreen } from '@/components/preview/screens/registry';
import { Button } from '@/components/ui/Button';
import { ModeToggle } from '@/components/preview/ModeToggle';
import { useTokenStore } from '@/store/tokenStore';
import { exportTailwindV4 } from '@/lib/exportTailwindV4';

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabId>('primitive');
  const clearAll = useTokenStore((s) => s.clearAll);
  const loadBasicPreset = useTokenStore((s) => s.loadBasicPreset);
  const loadSxc1Preset = useTokenStore((s) => s.loadSxc1Preset);
  // Disabled due to finalization of the sxc1 theme.
  // const loadExpPreset = useTokenStore((s) => s.loadExpPreset);
  const importFromCss = useTokenStore((s) => s.importFromCss);
  const previewScreen = useTokenStore((s) => s.previewScreen);
  const ActiveScreen = getScreen(previewScreen).component;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!importStatus) return;
    const t = window.setTimeout(() => setImportStatus(null), 5000);
    return () => window.clearTimeout(t);
  }, [importStatus]);

  async function handleImportFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const css = await file.text();
    const summary = importFromCss(css);
    if (!summary) {
      setImportStatus('No design tokens found in that CSS file.');
      return;
    }
    const parts: string[] = [];
    if (summary.hasPrimitives) {
      parts.push(`${summary.paletteCount} palette${summary.paletteCount === 1 ? '' : 's'}`);
    }
    if (summary.hasSemantics) {
      parts.push(`${summary.lightRoleCount} light / ${summary.darkRoleCount} dark roles`);
    }
    if (summary.synthesizedCount > 0) {
      parts.push(`${summary.synthesizedCount} synthesized`);
    }
    setImportStatus(`Imported ${parts.join(', ')}.`);
  }

  function handleExport() {
    const state = useTokenStore.getState();
    const { css } = exportTailwindV4(state);
    saveAs(
      new Blob([css], { type: 'text/css;charset=utf-8' }),
      'tokens.css',
    );
  }

  return (
    <div className="grid h-full grid-rows-[auto_1fr] bg-app-bg text-app-fg">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-app-border bg-app-surface px-4 py-2.5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarCollapsed((v) => !v)}
            aria-label={sidebarCollapsed ? 'Expand token editor' : 'Collapse token editor'}
            aria-expanded={!sidebarCollapsed}
            title={sidebarCollapsed ? 'Expand token editor' : 'Collapse token editor'}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-app-accent text-white transition-opacity hover:opacity-85 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 focus-visible:ring-offset-app-surface"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 transition-transform duration-300 ${
                sidebarCollapsed ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <div>
            <h1 className="text-sm font-semibold leading-tight">
              Design Token Selector
            </h1>
            <p className="text-xs leading-tight text-app-muted">
              Build a Tailwind v4 token set with a live preview.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <ModeToggle />
        </div>
        <div className="flex items-center justify-end gap-2">
          {importStatus ? (
            <span className="text-xs text-app-muted" role="status">
              {importStatus}
            </span>
          ) : null}
          <div className="flex items-center gap-2 rounded-lg border border-app-border bg-app-bg px-2.5 py-1.5">
            <span className="text-xs font-medium text-app-muted">Theme</span>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear
            </Button>
            <Button variant="ghost" size="sm" onClick={loadBasicPreset}>
              Basic
            </Button>
            {/* Disabled due to finalization of the sxc1 theme.
            <Button variant="ghost" size="sm" onClick={loadExpPreset}>
              Exp
            </Button>
            */}
            <Button variant="ghost" size="sm" onClick={loadSxc1Preset}>
              sxc1
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".css,text/css"
            className="hidden"
            onChange={handleImportFile}
          />
          <Button
            variant="secondary"
            size="md"
            onClick={() => fileInputRef.current?.click()}
          >
            Import CSS
          </Button>
          <Button variant="primary" size="md" onClick={handleExport}>
            Export Tailwind CSS
          </Button>
        </div>
      </header>

      <div className="flex min-h-0">
        <aside
          className={`min-h-0 shrink-0 overflow-hidden border-app-border bg-app-bg transition-[width] duration-300 ease-in-out ${
            sidebarCollapsed ? 'w-0 border-r-0' : 'w-[max(420px,42%)] border-r'
          }`}
        >
          <div className="flex h-full w-full min-w-[420px] flex-col">
            <TabNav active={activeTab} onChange={setActiveTab} />
            <div className="min-h-0 flex-1 overflow-auto p-4">
              {activeTab === 'primitive' ? <PrimitiveColorPanel /> : null}
              {activeTab === 'semantic' ? <SemanticColorPanel /> : null}
              {activeTab === 'typography' ? <TypographyPanel /> : null}
              {activeTab === 'spacing' ? <SpacingPanel /> : null}
            </div>
          </div>
        </aside>

        <section className="min-h-0 min-w-0 flex-1">
          <PreviewWrapper>
            <PreviewNav />
            <ActiveScreen />
          </PreviewWrapper>
        </section>
      </div>
    </div>
  );
}
