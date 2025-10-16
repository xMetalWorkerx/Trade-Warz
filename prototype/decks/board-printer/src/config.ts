// Trade Warz Board Printer Configuration
// Board geometry for 8" × 6" boards in 2-up layout on US Letter

// ============================================================================
// BOARD DIMENSIONS (8" × 6")
// ============================================================================

export const BOARD_MM = {
  width: 152.4,  // 6 inches (landscape becomes width after rotation)
  height: 203.2  // 8 inches (portrait becomes height after rotation)
};

export const BLEED_MM = 3;  // outer bleed guide
export const SAFE_MM = 6;   // inner safe zone (keep important content here)

// ============================================================================
// SHEET LAYOUT (2-up: 2 boards per US Letter)
// ============================================================================

// Base sheet configuration
export const SHEET_BASE = {
  unit: "in" as const,
  pageSize: {
    width: 8.5,   // US Letter width
    height: 11    // US Letter height
  },
  margin: {
    top: 0.25,    // Small margins for print safety
    right: 0.25,
    bottom: 0.25,
    left: 0.25
  }
};

// Sheet layouts for different board types
export const SHEET_LAYOUTS = {
  // Leader boards (portrait 6"×8") - side by side
  leader: {
    cols: 2,       // 2 boards per row
    rows: 1,       // 1 row per sheet
    gutter: {
      x: 0.5,      // horizontal spacing between boards
      y: 0         // no vertical spacing (single row)
    }
  },
  // Trading partner boards (landscape 8"×6") - one per page
  tradingPartner: {
    cols: 1,       // 1 board per column
    rows: 1,       // 1 row per sheet (one board per page)
    gutter: {
      x: 0,        // no horizontal spacing
      y: 0         // no vertical spacing
    }
  }
};

// Default sheet (for backward compatibility)
export const SHEET = {
  ...SHEET_BASE,
  ...SHEET_LAYOUTS.tradingPartner  // Default to trading partner layout
};

// ============================================================================
// CONVERSION HELPERS
// ============================================================================

const MM_PER_IN = 25.4;
export const toIn = (mm: number) => mm / MM_PER_IN;
export const toMm = (inches: number) => inches * MM_PER_IN;

export const BOARD_IN = {
  width: toIn(BOARD_MM.width),   // 6"
  height: toIn(BOARD_MM.height), // 8"
  bleed: toIn(BLEED_MM),
  safe: toIn(SAFE_MM)
};

// ============================================================================
// BOARD TYPE CONFIGURATIONS
// ============================================================================

export const BOARD_TYPES = {
  leader: {
    orientation: 'portrait' as const,
    label: 'Leader Board',
    width: 6,    // portrait: 6" wide
    height: 8,   // portrait: 8" tall
    color: '#1e40af'  // Blue theme
  },
  tradingPartner: {
    orientation: 'landscape' as const,
    label: 'Trading Partner Board',
    width: 8,    // landscape: 8" wide
    height: 5,   // landscape: 5" tall (further reduced)
    color: '#059669'  // Green theme
  }
} as const;

export type BoardType = keyof typeof BOARD_TYPES;

// ============================================================================
// MARKET SIZE CONFIGURATIONS
// ============================================================================

export const MARKET_SIZES = {
  large: {
    label: 'Large Market',
    routeSlots: 5,
    color: '#d97706',      // Gold
    badgeColor: '#fbbf24',
    icon: '★★★'
  },
  medium: {
    label: 'Medium Market',
    routeSlots: 4,
    color: '#6b7280',      // Silver
    badgeColor: '#9ca3af',
    icon: '★★'
  },
  small: {
    label: 'Small Market',
    routeSlots: 3,
    color: '#92400e',      // Bronze
    badgeColor: '#a16207',
    icon: '★'
  }
} as const;

export type MarketSize = keyof typeof MARKET_SIZES;

// ============================================================================
// LEADER THEMES
// ============================================================================

export const LEADER_THEMES = {
  usa: {
    name: 'United States',
    colors: {
      primary: '#1e40af',   // Blue
      secondary: '#dc2626', // Red
      accent: '#ffffff'     // White
    },
    bgPattern: 'stars-stripes'
  },
  china: {
    name: 'China',
    colors: {
      primary: '#dc2626',   // Red
      secondary: '#eab308', // Gold
      accent: '#fef3c7'     // Light gold
    },
    bgPattern: 'red-gold'
  },
  russia: {
    name: 'Russia',
    colors: {
      primary: '#dc2626',   // Red
      secondary: '#1e40af', // Blue
      accent: '#ffffff'     // White
    },
    bgPattern: 'tricolor'
  }
} as const;

export type LeaderCode = keyof typeof LEADER_THEMES;

// ============================================================================
// OUTPUT PATHS
// ============================================================================

export const OUTPUT = {
  baseDir: "dist",
  
  getTypeDir: (type: string) => `dist/${type}`,
  
  getFrontsPdf: (type: string) => `dist/${type}/fronts.pdf`,
  getFrontsHtml: (type: string) => `dist/${type}/fronts.html`,
  getPreviewHtml: (type: string) => `dist/${type}/preview.html`,
};

// ============================================================================
// DATA PATHS
// ============================================================================

export const DATA_PATHS = {
  leaders: "../data/leaders.json",
  tradingPartners: "../data/trading-partners.json",
  referenceCards: "../data/reference-cards.json",
  playerAids: "../data/player-aids.json"
} as const;

// ============================================================================
// DATA INTERFACES
// ============================================================================

export interface LeaderAbility {
  name: string;
  description: string;
}

export interface LeaderData {
  code: string;           // e.g., "USA-001"
  name: string;           // e.g., "United States"
  leaderCode: LeaderCode; // e.g., "usa"
  startingGDP: number;
  handSize: number;
  tradeRouteSlots: number;  // Always 5
  abilities: LeaderAbility[];
  theme?: string;
  set?: string;           // e.g., "Core"
}

export interface InfluenceBonus {
  threshold: number;      // Influence threshold (e.g., 3, 6, 9)
  bonus: string;          // Bonus description
  icon?: string;          // Optional icon
}

export interface Suzerainty {
  name: string;
  description: string;
}

export interface TradingPartnerData {
  code: string;           // e.g., "HEL-001"
  name: string;           // e.g., "Helvetia"
  tagline: string;        // e.g., "Banking Capital"
  marketSize: MarketSize;
  routeSlots: number;     // 3, 4, or 5
  influenceBonuses: InfluenceBonus[];
  suzerainty: Suzerainty;
  economicIdentity?: string;
  set?: string;           // e.g., "Core"
  rarity?: string;        // e.g., "Uncommon"
  flagImage?: string;     // Optional flag/image placeholder
}

export interface ReferenceCardData {
  id: string;
  title: string;
  content: string | string[];
  type: 'reference';
}

export interface PlayerAidData {
  id: string;
  leaderCode?: LeaderCode;
  title: string;
  content: string | Record<string, any>;
  type: 'player-aid';
}

// ============================================================================
// GENERATION OPTIONS
// ============================================================================

export interface GenerationOptions {
  showGuides?: boolean;        // Show bleed/safe zone guides
  boardsPerSheet?: number;      // Default: 2
  includePreview?: boolean;     // Generate HTML preview
}

export const DEFAULT_OPTIONS: GenerationOptions = {
  showGuides: true,
  boardsPerSheet: 2,
  includePreview: true
};

// ============================================================================
// DECK SPECIFICATIONS
// ============================================================================

export const DECK_SPECS = {
  leaders: {
    name: "Leader Boards",
    type: "leader" as BoardType,
    orientation: "portrait" as const,
    expectedBoards: 3,
    expectedSheets: 2   // 3 boards = 2 sheets (2-up)
  },
  tradingPartners: {
    name: "Trading Partner Boards",
    type: "tradingPartner" as BoardType,
    orientation: "landscape" as const,
    expectedBoards: 15,
    expectedSheets: 8   // 15 boards = 8 sheets (2-up)
  },
  referenceCards: {
    name: "Reference Cards",
    type: "reference" as const,
    expectedCards: 6,
    expectedSheets: 1   // 6 cards = 1 sheet (6-up poker layout)
  },
  playerAids: {
    name: "Player Aid Cards",
    type: "player-aid" as const,
    expectedCards: 4,
    expectedSheets: 1   // 4 cards = 1 sheet (6-up poker layout)
  }
} as const;

export type DeckSpecKey = keyof typeof DECK_SPECS;

// ============================================================================
// PRINTING CONFIGURATION
// ============================================================================

export const PRINT_CONFIG = {
  // Total sheets for full prototype
  totalSheets: 12,  // 2 (leaders) + 8 (partners) + 1 (reference) + 1 (aids)
  
  // Board stock specifications
  paperStock: "80-110lb cardstock, matte finish",
  paperSize: "US Letter (8.5\" × 11\")",
  
  // Board dimensions
  boardSize: "8\" × 6\"",
  withBleed: "8.24\" × 6.24\"",
  
  // Print order recommendation
  printOrder: [
    "leaders",
    "tradingPartners",
    "referenceCards",
    "playerAids"
  ]
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function getBoardTypeConfig(type: BoardType) {
  return BOARD_TYPES[type];
}

export function getMarketSizeConfig(size: MarketSize) {
  return MARKET_SIZES[size];
}

export function getLeaderTheme(code: LeaderCode) {
  return LEADER_THEMES[code];
}

export function calculateSheets(boardCount: number, boardsPerSheet: number = 2): number {
  return Math.ceil(boardCount / boardsPerSheet);
}

export function calculateEmptySlots(boardCount: number, boardsPerSheet: number = 2): number {
  const sheets = calculateSheets(boardCount, boardsPerSheet);
  return (sheets * boardsPerSheet) - boardCount;
}

