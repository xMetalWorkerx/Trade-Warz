// Trade Warz Card Printer Configuration
// Card geometry for poker-sized cards (2.5" × 3.5") in 6-up layout on US Letter

// ============================================================================
// CARD DIMENSIONS (Poker size: 2.5" × 3.5")
// ============================================================================

export const CARD_MM = { 
  width: 63.5,  // 2.5 inches
  height: 88.9  // 3.5 inches
};

export const BLEED_MM = 3;  // outer bleed guide (visible, removable)
export const SAFE_MM = 5;   // inner safe zone (keep text/important elements here)

// ============================================================================
// SHEET LAYOUT (6-up: 2 cols × 3 rows on US Letter)
// ============================================================================

export const SHEET = {
  unit: "in" as const,
  pageSize: { 
    width: 8.5,   // US Letter width
    height: 11    // US Letter height
  },
  margin: { 
    top: 0.375,   // Tighter margins based on manufacturer template
    right: 0.375, 
    bottom: 0.375, 
    left: 0.375 
  },
  cols: 2,
  rows: 3,
  gutter: { 
    x: 0.375,  // horizontal spacing between cards
    y: 0.375   // vertical spacing between cards (reduced to prevent clipping)
  }
};

// Optional micro-nudges for duplex alignment (applied to the WHOLE page)
// Use small values like ±0.02 after your first test print
export const NUDGE = {
  fronts: { x: 0, y: 0 },
  backs: { x: 0, y: 0 }
};

// ============================================================================
// CONVERSION HELPERS
// ============================================================================

const MM_PER_IN = 25.4;
export const toIn = (mm: number) => mm / MM_PER_IN;
export const toMm = (inches: number) => inches * MM_PER_IN;

export const CARD_IN = {
  width: toIn(CARD_MM.width),
  height: toIn(CARD_MM.height),
  bleed: toIn(BLEED_MM),
  safe: toIn(SAFE_MM),
  // When rotated 90° clockwise, dimensions swap for layout
  layoutWidth: toIn(CARD_MM.height),   // 3.5" (card height becomes layout width)
  layoutHeight: toIn(CARD_MM.width)    // 2.5" (card width becomes layout height)
};

// ============================================================================
// CARD TYPE CONFIGURATIONS
// ============================================================================

export const CARD_TYPES = {
  export: { 
    color: '#2563eb',    // Blue
    back: 'E', 
    label: 'Export',
    bgLight: '#eff6ff'   // Light blue background
  },
  policy: { 
    color: '#16a34a',    // Green
    back: 'P', 
    label: 'Policy',
    bgLight: '#f0fdf4'   // Light green background
  },
  tactic: { 
    color: '#dc2626',    // Red
    back: 'T', 
    label: 'Tactic',
    bgLight: '#fef2f2'   // Light red background
  },
  event: { 
    color: '#9333ea',    // Purple
    back: 'V',           // V for eVent (E is taken by Export)
    label: 'Event',
    bgLight: '#faf5ff'   // Light purple background
  },
  leader: { 
    color: '#ca8a04',    // Gold
    back: 'L', 
    label: 'Leader',
    bgLight: '#fefce8'   // Light gold background
  }
} as const;

export type CardType = keyof typeof CARD_TYPES;

// ============================================================================
// RARITY CONFIGURATIONS
// ============================================================================

export const RARITIES = {
  common: { 
    symbol: '●',        // Filled circle
    label: 'Common',
    color: '#6b7280'    // Gray
  },
  uncommon: { 
    symbol: '◆',        // Diamond
    label: 'Uncommon',
    color: '#9ca3af'    // Silver
  },
  rare: { 
    symbol: '★',        // Star
    label: 'Rare',
    color: '#fbbf24'    // Gold
  }
} as const;

export type Rarity = keyof typeof RARITIES;

// ============================================================================
// OUTPUT PATHS
// ============================================================================

export const OUTPUT = {
  // Base directory
  baseDir: "dist",
  
  // Per-type output structure
  getTypeDir: (type: string) => `dist/${type}`,
  
  // File paths
  getFrontsPdf: (type: string) => `dist/${type}/fronts.pdf`,
  getBacksPdf: (type: string) => `dist/${type}/backs.pdf`,
  getFrontsHtml: (type: string) => `dist/${type}/fronts.html`,
  getBacksHtml: (type: string) => `dist/${type}/backs.html`,
  getPreviewHtml: (type: string) => `dist/${type}/preview.html`,
};

// ============================================================================
// DATA PATHS
// ============================================================================

export const DATA_PATHS = {
  // Global decks
  globalExports: "../data/global-exports.json",
  globalPolicies: "../data/global-policies.json",
  globalTactics: "../data/global-tactics.json",
  globalEvents: "../data/global-events.json",
  
  // Leader decks
  leaderUsa: "../data/leader-usa.json",
  leaderChina: "../data/leader-china.json",
  leaderRussia: "../data/leader-russia.json",
  
  // All leaders combined
  allLeaders: [
    "../data/leader-usa.json",
    "../data/leader-china.json",
    "../data/leader-russia.json"
  ]
} as const;

// ============================================================================
// CARD DATA INTERFACE
// ============================================================================

export interface CardData {
  name: string;
  type: CardType;
  rarity?: Rarity;
  leader?: string;
  cost?: number;
  influence?: number;
  revenue?: number;
  effect?: string;
  flavor?: string;
  cmykTiming?: 'C' | 'M' | 'Y' | 'K';
}

// ============================================================================
// GENERATION OPTIONS
// ============================================================================

export interface GenerationOptions {
  showGuides?: boolean;        // Show bleed/safe zone guides
  cardsPerSheet?: number;       // Default: 6
  fillPartialSheets?: boolean;  // Fill empty slots with blanks
  includePreview?: boolean;     // Generate HTML preview
}

export const DEFAULT_OPTIONS: GenerationOptions = {
  showGuides: true,
  cardsPerSheet: 6,
  fillPartialSheets: false,
  includePreview: true
};

// ============================================================================
// DECK SPECIFICATIONS
// ============================================================================

export const DECK_SPECS = {
  exports: {
    name: "Global Exports",
    type: "export" as CardType,
    expectedCards: 15,
    expectedSheets: 3
  },
  policies: {
    name: "Global Policies",
    type: "policy" as CardType,
    expectedCards: 15,
    expectedSheets: 3
  },
  tactics: {
    name: "Global Tactics",
    type: "tactic" as CardType,
    expectedCards: 15,
    expectedSheets: 3
  },
  events: {
    name: "Global Events",
    type: "event" as CardType,
    expectedCards: 10,
    expectedSheets: 2
  },
  leaders: {
    name: "All Leader Decks",
    type: "leader" as CardType,
    expectedCards: 24,
    expectedSheets: 4
  },
  "leader-usa": {
    name: "USA Leader Deck",
    type: "leader" as CardType,
    expectedCards: 8,
    expectedSheets: 2
  },
  "leader-china": {
    name: "China Leader Deck",
    type: "leader" as CardType,
    expectedCards: 8,
    expectedSheets: 2
  },
  "leader-russia": {
    name: "Russia Leader Deck",
    type: "leader" as CardType,
    expectedCards: 8,
    expectedSheets: 2
  }
} as const;

export type DeckSpecKey = keyof typeof DECK_SPECS;

// ============================================================================
// PRINTING CONFIGURATION
// ============================================================================

export const PRINT_CONFIG = {
  // Total expected cards for full game
  totalCards: 79,  // 15+15+15+10+24 = 79 cards
  
  // Total sheets needed for full print
  totalSheets: 14,  // Rounds up from 79/6 = 13.17
  
  // Card stock specifications
  paperStock: "80lb laser gloss cover stock",
  paperSize: "US Letter (8.5\" × 11\")",
  
  // Cutting guide
  cardSize: "2.5\" × 3.5\" (poker size)",
  withBleed: "2.74\" × 3.74\"",
  
  // Print order recommendation
  printOrder: [
    "exports",
    "policies", 
    "tactics",
    "events",
    "leaders"
  ]
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function getCardTypeConfig(type: CardType) {
  return CARD_TYPES[type];
}

export function getRarityConfig(rarity: Rarity) {
  return RARITIES[rarity];
}

export function calculateSheets(cardCount: number, cardsPerSheet: number = 6): number {
  return Math.ceil(cardCount / cardsPerSheet);
}

export function calculateEmptySlots(cardCount: number, cardsPerSheet: number = 6): number {
  const sheets = calculateSheets(cardCount, cardsPerSheet);
  return (sheets * cardsPerSheet) - cardCount;
}

