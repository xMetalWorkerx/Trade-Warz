# Board Printer System - Overview

## What We're Building

A complete printing system for Trade Warz prototype boards and aids, complementing the existing card printer.

### Components

1. **Leader Boards** (8" × 6" portrait)
   - 3 boards: USA, China, Russia
   - Portrait placeholder, abilities, trade route tracker
   - 2 boards per sheet = 2 sheets total

2. **Trading Partner Boards** (8" × 6" landscape)
   - 15 boards: India, Japan, Brazil, Mexico, Turkey, etc.
   - Influence track (0-9), route slots, abilities
   - 2 boards per sheet = 8 sheets total

3. **Reference Cards** (2.5" × 3.5" poker size)
   - 5-6 cards covering turn order, CMYK, disputes, etc.
   - 6-up layout = 1 sheet

4. **Player Aid Cards** (2.5" × 3.5" poker size)
   - 3-4 cards (leader quick refs + generic aid)
   - 6-up layout = 1 sheet

**Total Print Output**: 12 sheets

---

## Key Design Decisions

### Influence Tracking System
- **Single track per trading partner** (not 6 separate tracks)
- **0-9 numbered boxes** with space for GDP coins
- **Stacking mechanic**: When you reach 10, stack another coin on 0
- **Simpler, cleaner** than 6 tracks per board

### Route Slot System
- **Integrated into trading partner boards** (bottom edge)
- **Export cards tuck under** the board edge
- **Adaptive slots**: 5 max, hide unused for smaller markets
  - Large: 5 slots visible
  - Medium: 4 slots visible, 5th hidden
  - Small: 3 slots visible, 4th-5th hidden

### Leader Board Features
- **Trade route tracker**: 5 slots for all leaders (uniform)
  - Tracks which of their routes are active
  - Different from trading partner route slots
- **Portrait placeholder**: 2" × 2" box for leader image
- **Thematic background**: Space for patterns/textures

---

## System Architecture

```
prototype/decks/
├── card-printer/          (existing)
│   └── ...
└── board-printer/         (new)
    ├── src/
    │   ├── config.ts      (8×6 board dimensions, 2-up layout)
    │   ├── converter.ts   (markdown → JSON)
    │   ├── generate.ts    (HTML → PDF via Playwright)
    │   ├── templates/     (Handlebars templates)
    │   │   ├── sheet.hbs              (2-up page layout)
    │   │   ├── leader-board.hbs       (8×6 portrait)
    │   │   ├── trading-partner.hbs    (8×6 landscape)
    │   │   ├── reference-*.hbs        (poker cards)
    │   │   └── player-aid-*.hbs       (poker cards)
    │   └── styles/        (CSS)
    │       ├── common.css
    │       ├── leader-board.css
    │       └── trading-partner.css
    ├── data/              (JSON data)
    │   ├── leaders.json
    │   ├── trading-partners.json
    │   ├── reference-cards.json
    │   └── player-aids.json
    └── dist/              (generated PDFs)
        ├── leaders/
        ├── trading-partners/
        ├── reference-cards/
        └── player-aids/
```

---

## Workflow

### 1. Data Conversion
```bash
npm run convert
```
Reads markdown files → generates JSON data files

**Sources:**
- `prototype/leader_specs.md` → `data/leaders.json`
- `design_docs/trading_partner_cards.md` → `data/trading-partners.json`

### 2. Board Generation
```bash
npm run build:all          # Everything
npm run build:leaders      # Just leader boards
npm run build:partners     # Just trading partners
npm run build:reference    # Just reference cards
npm run build:aids         # Just player aids
```

**Output:**
- `dist/leaders/fronts.pdf` (2 sheets)
- `dist/trading-partners/fronts.pdf` (8 sheets)
- `dist/reference-cards/fronts.pdf` (1 sheet)
- `dist/player-aids/fronts.pdf` (1 sheet)

### 3. Preview & Print
- Open `dist/*/preview.html` in browser to view layout
- Print PDFs on cardstock or heavy paper
- Cut along guides
- Playtest!

---

## Layout Specifications

### 2-Up Board Layout (US Letter)
```
┌─────────────────────────────┐
│  8.5" × 11" US Letter       │
│                              │
│  ┌────────┐    ┌────────┐  │
│  │ Board  │    │ Board  │  │
│  │  #1    │    │  #2    │  │
│  │ 8"×6"  │    │ 8"×6"  │  │
│  └────────┘    └────────┘  │
│                              │
└─────────────────────────────┘
```

**Margins**: 0.25" all sides
**Gutter**: 0.5" between boards

### Leader Board Layout (Portrait)
```
┌─────────────────┐
│   LEADER NAME   │
│  ┌───┐          │  ← Portrait box (2×2")
│  │IMG│  Stats   │
│  └───┘          │
│                 │
│ Unique Ability  │
│ (Full text)     │
│                 │
│ Trade Routes    │
│ [1][2][3][4][5] │  ← 5-slot tracker
│                 │
│  CMYK reminder  │
└─────────────────┘
```

### Trading Partner Layout (Landscape)
```
┌────────────────────────────────────┐
│  PARTNER NAME        [Flag/Image]  │
│                                     │
│  INFLUENCE  [0][1][2][3][4][5][6][7][8][9]
│                                     │
│  TRADE EFFECTS / ABILITIES          │
│  • Bonus at 3 influence             │
│  • Bonus at 6 influence             │
│  • Bonus at 9 influence             │
│  👑 Suzerainty: Special ability     │
│                                     │
│  Place Export Cards adjacent below  │
│  Route 1  Route 2  Route 3  ...    │
└────────────────────────────────────┘
```

---

## Data Structure Examples

### Leader JSON
```json
{
  "name": "United States",
  "code": "USA-001",
  "startingGDP": 8,
  "handSize": 8,
  "tradeRouteSlots": 5,
  "abilities": [
    {
      "name": "Economic Engine",
      "description": "+1 GDP per active trade route"
    },
    {
      "name": "Dispute Advantage",
      "description": "+1 Influence in disputes involving trade routes"
    }
  ],
  "theme": "Freedom, capitalism, economic dominance"
}
```

### Trading Partner JSON
```json
{
  "name": "Helvetia",
  "tagline": "Banking Capital",
  "code": "HEL-001",
  "set": "Core",
  "rarity": "Uncommon",
  "marketSize": "Small",
  "routeSlots": 3,
  "influenceBonuses": [
    {
      "threshold": 2,
      "bonus": "First Export costs 1 less"
    },
    {
      "threshold": 4,
      "bonus": "Store 1 GDP between rounds"
    },
    {
      "threshold": 6,
      "bonus": "Draw 2, keep 1 when establishing routes"
    }
  ],
  "suzerainty": {
    "name": "Swiss Banking",
    "description": "Trade 1 card for random (1/round)"
  }
}
```

---

## Printing Guide

### Materials Needed
- **Heavy cardstock** (80-110lb, matte finish recommended)
- **Color printer** (inkjet or laser)
- **Paper cutter** or scissors
- **Ruler** for alignment checks

### Print Settings
- **Paper size**: US Letter (8.5" × 11")
- **Print quality**: High/Best
- **Color mode**: Full color
- **Margins**: None (borderless) or minimal
- **Scaling**: 100% (no fit-to-page)

### Cutting Guide
1. Print on cardstock
2. Let ink dry fully (5-10 minutes)
3. Cut along outer dashed guides
4. Verify dimensions with ruler
5. Optional: Round corners for professional finish

### Assembly
- No assembly needed for boards (flat components)
- Stack by type for organization
- Store flat to prevent warping

---

## Testing Checklist

### Before Printing
- [ ] Preview HTML looks correct
- [ ] All data present and accurate
- [ ] Text is readable at intended size
- [ ] Layout fits on page properly

### After Test Print
- [ ] Boards measure 8" × 6" correctly
- [ ] Text is legible from 2-3 feet away
- [ ] Colors match expectations
- [ ] Influence track boxes fit coins
- [ ] Route slots align with card edges
- [ ] No clipping or cutoff elements

### During Playtesting
- [ ] Boards are functional for gameplay
- [ ] Information is clear and accessible
- [ ] Layout supports intended mechanics
- [ ] No confusion from visual design
- [ ] Components integrate well with cards

---

## Next Steps

1. **Review the task file**: `board-printer-tasks.md` (~200 tasks)
2. **Confirm approach**: Any changes needed before starting?
3. **Begin Phase 1**: Project setup and configuration
4. **Proceed through phases**: Follow task list systematically
5. **Test iteratively**: Generate and review output frequently

---

## Questions? Issues?

- Check `board-printer-tasks.md` for detailed implementation steps
- Reference `card-printer/` for similar patterns and code
- Review design docs for component specifications
- Test early and often with cheap paper before cardstock

---

*Created: 2025-10-14*
*Status: Planning Complete, Ready to Build*
*Estimated Time: 6-8 hours*

