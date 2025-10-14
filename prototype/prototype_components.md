## Prototype Components (Physical)

Concise specs to make the timed Trade Phase fast, readable, and tactile. Focus: slide-under export slots along the edge of each Trading Partner using simple “slot strips.”

### Component Checklist
- Leader boards (3 for prototype: USA, China, Russia) - 8" × 6" portrait
- Trading Partner boards (15 total) - 8" × 6" landscape
  - 3 Large markets (5 route slots)
  - 6 Medium markets (4 route slots)
  - 6 Small markets (3 route slots)
- 99 prototype cards (leader + global + events)
- GDP tokens (coins work) - also used for influence tracking
- 3-minute timer

**Note**: Route slots are integrated into the trading partner boards. No separate slot strips needed.

### Trading Partner Board Layout
**Size**: 8" × 6" landscape boards with integrated route slot indicators

**Design Elements**:
- **Partner Name & Tagline**: Large, clear header
- **Suzerainty Box**: Flag/image placeholder (top-right)
- **Influence Track**: Single track (0-9) for all players
  - Players place GDP coins on numbered boxes
  - Stack coins when reaching 10+ influence
- **Trade Effects Section**: Lists 3 influence threshold bonuses + suzerainty ability
- **Route Slots**: Integrated slot indicators at bottom of board
  - Large markets: 5 slots
  - Medium markets: 4 slots (5th grayed out)
  - Small markets: 3 slots (4th-5th grayed out)
  - Visual indicators show where to place Export cards adjacent to board

**Influence Tracking**:
- All players use the same track on each trading partner board
- Use GDP coins as markers (one color per player not needed)
- Boxes numbered 0-9 with space for stacking
- When a player reaches 10+ influence, stack another coin on top

**Route Slot Usage**:
- Export cards are placed adjacent below the trading partner board
- Slot indicators printed on board show which slots are available
- Visual guides (numbered Route 1-5) help organize card placement

### Leader Board Layout
**Size**: 8" × 6" portrait boards (6" wide × 8" tall)

**Design Elements**:
- **Leader Name & Theme**: Large header with thematic subtitle
- **Portrait Placeholder**: 2" × 2" box for leader artwork
- **Starting Stats**: GDP, hand size, and trade route count
- **Unique Abilities**: Clear text descriptions of 2-3 leader abilities
- **Trade Route Tracker**: 5 numbered slots to track active routes
  - All leaders have 5 slots (uniform across all leaders)
  - Used to mark which of the player's routes are currently active
- **CMYK Reminder Strip**: Quick reference for upkeep order (C → M → Y → K)

**Trade Route Tracker**:
- Shows which of the player's trade routes are active
- Different from the route slots on trading partner boards
- Helps players track their economy at a glance

### Printing Instructions
**Board Printer System**: Located in `prototype/decks/board-printer/`

```bash
# Generate all boards
cd prototype/decks/board-printer
npm run build:all

# Output: dist/leaders/fronts.pdf (2 sheets)
# Output: dist/trading-partners/fronts.pdf (8 sheets)
```

**Print Settings**:
- Paper: US Letter (8.5" × 11")
- Stock: 80-110lb cardstock, matte finish
- Layout: 2-up (2 boards per sheet)
- Scale: 100% (no fit-to-page)
- Total sheets: 10 (2 leaders + 8 trading partners)

### Playtest Questions
- Are the boards the right size for table space?
- Is the influence track system clear and functional?
- Do the route slot indicators help organize Export cards?
- Is the trade route tracker useful for players?
- Are the board dimensions comfortable for gameplay?

Last updated: [Prototype]
