export interface Sxc1PresetEntry {
  name: string;
  baseColor: string;
}

export const SXC1_PRESET: Sxc1PresetEntry[] = [
  { name: 'rainbow-coral', baseColor: '#fa7970' },
  { name: 'rainbow-peach', baseColor: '#faa356' },
  { name: 'rainbow-mint', baseColor: '#7ce38b' },
  { name: 'rainbow-sky', baseColor: '#a2d2fb' },
  { name: 'rainbow-blue', baseColor: '#77bdfb' },
  { name: 'rainbow-lilac', baseColor: '#cea5fb' },

  { name: 'paletteA-1', baseColor: '#f4f7f6' },
  { name: 'paletteA-2', baseColor: '#bc7488' },
  { name: 'paletteA-3', baseColor: '#7ce38b' },
  { name: 'paletteA-4', baseColor: '#b13e53' },
  { name: 'paletteA-5', baseColor: '#261b2a' },

  { name: 'exp-1', baseColor: '#00b5ff' },
  { name: 'exp-2', baseColor: '#ff7079' },
  { name: 'exp-3', baseColor: '#0ca744' },
  { name: 'exp-4', baseColor: '#68edcb' },
  { name: 'exp-5', baseColor: '#61b0ff' },
  { name: 'exp-6', baseColor: '#ff943b' },
  { name: 'exp-7', baseColor: '#00ce94' },
  { name: 'exp-8', baseColor: '#00c0ff' },
  { name: 'exp-9', baseColor: '#005fd0' },
  { name: 'exp-10', baseColor: '#52aaff' },

  { name: 'crimson', baseColor: '#c54848' },
  { name: 'brightBlue', baseColor: '#00b8ff' },

  { name: 'inkBlack', baseColor: '#011627' },
  { name: 'strawberryRed', baseColor: '#f71735' },
  { name: 'turquoise', baseColor: '#41ead4' },
  { name: 'porcelain', baseColor: '#fdfffc' },
  { name: 'amberOrange', baseColor: '#ff9f1c' },
];

// Names used to seed the semantic map after loading the preset.
export const SXC1_SEMANTIC_PICKS = {
  brand: 'brightBlue',
  neutral: 'inkBlack',
  destructive: 'crimson',
} as const;
