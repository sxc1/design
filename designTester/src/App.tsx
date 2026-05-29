import { useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useTokenStore } from '@/store/tokenStore';

export default function App() {
  const previewMode = useTokenStore((s) => s.previewMode);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', previewMode === 'dark');
  }, [previewMode]);

  return <AppShell />;
}
