import type { ComponentType } from 'react';
import { MockPage } from '@/components/preview/MockPage';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { SettingsAccount } from './SettingsAccount';
import { ShadcnShowcase } from './ShadcnShowcase';
import { MaterialShowcase } from './MaterialShowcase';
import { AntShowcase } from './AntShowcase';
import { ChakraShowcase } from './ChakraShowcase';
import { KendoShowcase } from './KendoShowcase';
import { MarketingPage } from './MarketingPage';
import { PricingPage } from './PricingPage';
import { AuthPage } from './AuthPage';
import { BlogPage } from './BlogPage';

export type PreviewGroupId = 'overviews' | 'showcases' | 'templates';

export interface PreviewScreen {
  id: string;
  label: string;
  group: PreviewGroupId;
  component: ComponentType;
}

export const PREVIEW_GROUPS: { id: PreviewGroupId; label: string }[] = [
  { id: 'overviews', label: 'Overviews' },
  { id: 'showcases', label: 'Showcases' },
  { id: 'templates', label: 'Templates' },
];

export const PREVIEW_SCREENS: PreviewScreen[] = [
  // Overviews
  { id: 'dashboard', label: 'Dashboard', group: 'overviews', component: MockPage },
  { id: 'analytics', label: 'Analytics', group: 'overviews', component: AnalyticsDashboard },
  { id: 'settings', label: 'Settings', group: 'overviews', component: SettingsAccount },
  // Showcases
  { id: 'shadcn', label: 'shadcn/ui', group: 'showcases', component: ShadcnShowcase },
  { id: 'material', label: 'Material UI', group: 'showcases', component: MaterialShowcase },
  { id: 'ant', label: 'Ant Design', group: 'showcases', component: AntShowcase },
  { id: 'chakra', label: 'Chakra UI', group: 'showcases', component: ChakraShowcase },
  { id: 'kendo', label: 'KendoReact', group: 'showcases', component: KendoShowcase },
  // Templates
  { id: 'marketing', label: 'Marketing', group: 'templates', component: MarketingPage },
  { id: 'pricing', label: 'Pricing', group: 'templates', component: PricingPage },
  { id: 'auth', label: 'Sign-in', group: 'templates', component: AuthPage },
  { id: 'blog', label: 'Blog', group: 'templates', component: BlogPage },
];

/** Look up a screen by id, falling back to the first (Dashboard) if unknown. */
export function getScreen(id: string): PreviewScreen {
  return PREVIEW_SCREENS.find((s) => s.id === id) ?? PREVIEW_SCREENS[0];
}

export function screensForGroup(group: PreviewGroupId): PreviewScreen[] {
  return PREVIEW_SCREENS.filter((s) => s.group === group);
}
