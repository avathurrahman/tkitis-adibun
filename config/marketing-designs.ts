export const marketingDesignPresets = [
  {
    id: "default",
    label: "Default",
    family: "baseline",
    mode: "light",
    description: "Baseline KilatKoding look with soft depth and modern SaaS polish.",
  },
  {
    id: "monochrome",
    label: "Monochrome",
    family: "editorial",
    mode: "light",
    description: "Sharp editorial contrast with serif typography and bold black-and-white structure.",
  },
  {
    id: "newsprint",
    label: "Newsprint",
    family: "editorial",
    mode: "light",
    description: "Warm paper tones, print-style rules, and a newsroom-inspired editorial rhythm.",
  },
  {
    id: "luxury",
    label: "Luxury",
    family: "editorial",
    mode: "light",
    description: "Refined serif drama with soft champagne accents and premium spacing.",
  },
  {
    id: "academia",
    label: "Academia",
    family: "editorial",
    mode: "light",
    description: "Scholarly parchment tones with classical serif typography and archival framing.",
  },
  {
    id: "saas",
    label: "SaaS",
    family: "product",
    mode: "light",
    description: "Bright product marketing style with airy gradients and approachable cards.",
  },
  {
    id: "professional",
    label: "Professional",
    family: "product",
    mode: "light",
    description: "Calm, credible presentation with restrained color and balanced spacing.",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    family: "structured",
    mode: "light",
    description: "Operational, structured, and more formal with tighter rhythms and stronger framing.",
  },
  {
    id: "neo-brutalism",
    label: "Neo Brutalism",
    family: "expressive",
    mode: "light",
    description: "Chunky borders, offset shadows, and loud surfaces with playful confidence.",
  },
  {
    id: "bauhaus",
    label: "Bauhaus",
    family: "expressive",
    mode: "light",
    description: "Geometric color blocking with bold typography and graphic primary-shape energy.",
  },
  {
    id: "web3",
    label: "Web3",
    family: "immersive",
    mode: "dark",
    description: "Dark immersive gradients, luminous accents, and glassy surfaces.",
  },
  {
    id: "terminal",
    label: "Terminal",
    family: "immersive",
    mode: "dark",
    description: "Command-line visuals with phosphor green accents, scanlines, and monospace UI chrome.",
  },
] as const;

export type MarketingDesignPreset = (typeof marketingDesignPresets)[number];
export type MarketingDesignId = MarketingDesignPreset["id"];

export const defaultMarketingDesignId: MarketingDesignId = "default";

export function isMarketingDesignId(value: string): value is MarketingDesignId {
  return marketingDesignPresets.some((preset) => preset.id === value);
}

export function getMarketingDesignPreset(
  id: MarketingDesignId,
): MarketingDesignPreset {
  return (
    marketingDesignPresets.find((preset) => preset.id === id) ??
    marketingDesignPresets[0]
  );
}
