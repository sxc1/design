import type { SemanticRoleId } from '@/types/tokens';

export interface SemanticRoleDescriptor {
  id: SemanticRoleId;
  label: string;
  description: string;
  pairedWith?: SemanticRoleId;
  group: 'surface' | 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive' | 'utility';
}

export const SEMANTIC_ROLES: SemanticRoleDescriptor[] = [
  {
    id: 'background',
    label: 'Background',
    description: 'The base app background color.',
    pairedWith: 'foreground',
    group: 'surface',
  },
  {
    id: 'foreground',
    label: 'Foreground',
    description: 'Default text on the background.',
    pairedWith: 'background',
    group: 'surface',
  },
  {
    id: 'card',
    label: 'Card',
    description: 'Surface for cards and panels.',
    pairedWith: 'card-foreground',
    group: 'surface',
  },
  {
    id: 'card-foreground',
    label: 'Card Foreground',
    description: 'Text on card surfaces.',
    pairedWith: 'card',
    group: 'surface',
  },
  {
    id: 'primary',
    label: 'Primary',
    description: 'Primary brand action color.',
    pairedWith: 'primary-foreground',
    group: 'primary',
  },
  {
    id: 'primary-foreground',
    label: 'Primary Foreground',
    description: 'Text on primary surfaces.',
    pairedWith: 'primary',
    group: 'primary',
  },
  {
    id: 'secondary',
    label: 'Secondary',
    description: 'Secondary action / chip surface.',
    pairedWith: 'secondary-foreground',
    group: 'secondary',
  },
  {
    id: 'secondary-foreground',
    label: 'Secondary Foreground',
    description: 'Text on secondary surfaces.',
    pairedWith: 'secondary',
    group: 'secondary',
  },
  {
    id: 'muted',
    label: 'Muted',
    description: 'Low-emphasis backgrounds.',
    pairedWith: 'muted-foreground',
    group: 'muted',
  },
  {
    id: 'muted-foreground',
    label: 'Muted Foreground',
    description: 'Low-emphasis text.',
    pairedWith: 'muted',
    group: 'muted',
  },
  {
    id: 'accent',
    label: 'Accent',
    description: 'Hover/focus accent surface.',
    pairedWith: 'accent-foreground',
    group: 'accent',
  },
  {
    id: 'accent-foreground',
    label: 'Accent Foreground',
    description: 'Text on accent surfaces.',
    pairedWith: 'accent',
    group: 'accent',
  },
  {
    id: 'destructive',
    label: 'Destructive',
    description: 'Danger / error surface.',
    pairedWith: 'destructive-foreground',
    group: 'destructive',
  },
  {
    id: 'destructive-foreground',
    label: 'Destructive Foreground',
    description: 'Text on destructive surfaces.',
    pairedWith: 'destructive',
    group: 'destructive',
  },
  {
    id: 'border',
    label: 'Border',
    description: 'Standard border color.',
    group: 'utility',
  },
  {
    id: 'input',
    label: 'Input',
    description: 'Input border / outline.',
    group: 'utility',
  },
  {
    id: 'ring',
    label: 'Ring',
    description: 'Focus ring color.',
    group: 'utility',
  },
];

export const SEMANTIC_GROUP_LABELS: Record<SemanticRoleDescriptor['group'], string> = {
  surface: 'Surface',
  primary: 'Primary',
  secondary: 'Secondary',
  muted: 'Muted',
  accent: 'Accent',
  destructive: 'Destructive',
  utility: 'Utility',
};
