# Trade Warz Board Printer - Implementation Tasks

## Project Overview

Build a board and reference card printing system for Trade Warz prototype components:
- **Leader Boards**: 8" × 6" portrait (3 leaders)
- **Trading Partner Boards**: 8" × 6" landscape (15 partners)
- **Reference Cards**: 2.5" × 3.5" poker size (5-6 cards)
- **Player Aid Cards**: 2.5" × 3.5" poker size (3-4 cards)

**Layout**: 2-up printing (two 8"×6" boards per US Letter sheet)

---

## Phase 1: Project Setup ⏳

### Folder Structure
- [ ] Create `prototype/decks/board-printer/` directory
- [ ] Create `src/` subdirectory
- [ ] Create `src/templates/` subdirectory
- [ ] Create `src/styles/` subdirectory
- [ ] Create `data/` subdirectory for JSON files
- [ ] Create `dist/` subdirectory for output

### Configuration Files
- [ ] Create `package.json` with dependencies and scripts
- [ ] Create `tsconfig.json` for TypeScript configuration
- [ ] Create `.gitignore` for node_modules and dist

### Dependencies
- [ ] Install TypeScript, tsx, handlebars, playwright
- [ ] Run `npm install`
- [ ] Run `npm run install:pw` for Playwright browser

### Initial Documentation
- [ ] Create `README.md` with project overview
- [ ] Create `PROGRESS.md` for tracking progress
- [ ] Create `DESIGN_DECISIONS.md` documenting layout choices

---

## Phase 2: Configuration & Core Logic ⏳

### Config File (`src/config.ts`)
- [ ] Define board dimensions (8" × 6")
- [ ] Configure 2-up sheet layout (2 boards per US Letter)
- [ ] Define board orientations (portrait vs landscape)
- [ ] Set up bleed and safe zones
- [ ] Define margin and gutter settings
- [ ] Create board type definitions:
  - [ ] Leader board type
  - [ ] Trading partner board type
- [ ] Define market sizes (Large/Medium/Small)
- [ ] Define route slot counts (3/4/5)
- [ ] Configure output paths
- [ ] Add utility functions for conversions

### Data Structures
- [ ] Define Leader interface (name, GDP, hand size, slots, abilities)
- [ ] Define TradingPartner interface (name, market size, slots, influence bonuses, suzerainty)
- [ ] Define ReferenceCard interface
- [ ] Define PlayerAid interface

---

## Phase 3: Data Conversion ⏳

### Leader Data Extraction
- [ ] Create markdown parser for leader specs
- [ ] Extract USA leader data from `prototype/leader_specs.md`
- [ ] Extract China leader data
- [ ] Extract Russia leader data
- [ ] Generate `data/leaders.json` with:
  - [ ] Leader name and country
  - [ ] Starting GDP
  - [ ] Hand size
  - [ ] Export slots (all set to 5 for trade route tracker)
  - [ ] Unique abilities (detailed text)
  - [ ] Thematic description
  - [ ] Card code (e.g., "USA-001")

### Trading Partner Data Extraction
- [ ] Create markdown parser for trading partner specs
- [ ] Extract all 15 trading partners from `design_docs/trading_partner_cards.md`
- [ ] For each partner, extract:
  - [ ] Name and tagline
  - [ ] Market size (Large/Medium/Small)
  - [ ] Route slot count (3/4/5)
  - [ ] Influence bonuses (3 levels with thresholds)
  - [ ] Suzerainty ability
  - [ ] Economic identity/flavor text
  - [ ] Card code (e.g., "HEL-001")
  - [ ] Set indicator ("Core")
  - [ ] Rarity (if applicable)
- [ ] Generate `data/trading-partners.json`

### Reference Card Data
- [ ] Create reference card content for:
  - [ ] Turn order summary
  - [ ] CMYK timing order
  - [ ] Dispute resolution steps
  - [ ] Card type colors
  - [ ] Influence trading rules
- [ ] Generate `data/reference-cards.json`

### Player Aid Data
- [ ] Create player aid content for:
  - [ ] USA quick reference
  - [ ] China quick reference
  - [ ] Russia quick reference
  - [ ] Generic game flow aid
- [ ] Generate `data/player-aids.json`

### Converter Implementation
- [ ] Implement `src/converter.ts` with:
  - [ ] Markdown parsing functions
  - [ ] Data validation
  - [ ] JSON file generation
  - [ ] Error handling
- [ ] Test converter on all source files
- [ ] Verify JSON output quality

---

## Phase 4: Leader Board Template ⏳

### Template Structure (`src/templates/leader-board.hbs`)
- [ ] Create base board structure (8" × 6" portrait)
- [ ] Add bleed and safe zone guides

### Header Section
- [ ] Leader name (large, bold)
- [ ] Country/region indicator
- [ ] Portrait placeholder box (top-right, ~2" × 2")

### Stats Section
- [ ] Starting GDP indicator with icon
- [ ] Hand size indicator with icon
- [ ] Export slots indicator (show "5 routes")

### Unique Ability Section
- [ ] Ability title
- [ ] Ability description (clear, readable text)
- [ ] Icon or thematic decoration

### Trade Route Tracker
- [ ] 5 numbered slots (horizontal row)
- [ ] Slot numbers: 1, 2, 3, 4, 5
- [ ] Box or circle for each slot
- [ ] Label: "ACTIVE TRADE ROUTES"
- [ ] Visual connection to export concept

### Optional Elements
- [ ] CMYK timing reminder strip (bottom edge)
- [ ] Thematic background imagery/patterns
- [ ] Border styling with leader color theme

### Footer Section
- [ ] Card code (e.g., "USA-001")
- [ ] Set indicator ("Core")
- [ ] Game logo/branding

---

## Phase 5: Trading Partner Board Template ⏳

### Template Structure (`src/templates/trading-partner.hbs`)
- [ ] Create base board structure (8" × 6" landscape)
- [ ] Add bleed and safe zone guides

### Header Section
- [ ] Partner name (large, bold, e.g., "HELVETIA")
- [ ] Tagline/subtitle (e.g., "Banking Capital")
- [ ] Suzerainty box (top-right, ~1.5" × 1.5") for flag/image placeholder

### Influence Track Section
- [ ] Label: "INFLUENCE"
- [ ] Single horizontal track
- [ ] 10 numbered boxes (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
- [ ] Boxes sized for stacking GDP coins
- [ ] Visual style: clear boxes with numbers
- [ ] Note: "Stack coins for 10+" (optional)

### Trade Effects Section
- [ ] Section header: "TRADE EFFECTS / ABILITIES"
- [ ] Bullet list of 3 influence threshold bonuses:
  - [ ] Threshold level (e.g., "3 influence")
  - [ ] Bonus effect description
  - [ ] Icon or decoration per bonus
- [ ] Suzerainty ability (distinct styling):
  - [ ] Crown icon or "👑" marker
  - [ ] Ability description
  - [ ] Highlight/special background

### Route Slots Section
- [ ] Label: "Place Export Cards adjacent below"
- [ ] Visual indicator showing 5 route slots
- [ ] Slot numbers: Route 1, Route 2, Route 3, Route 4, Route 5
- [ ] Dashed lines or boxes for card placement
- [ ] Tuck-under visual guide (lip indicator)
- [ ] Adaptive: Show/hide slots based on market size:
  - [ ] Large market: 5 slots visible
  - [ ] Medium market: 4 slots visible, 5th grayed/hidden
  - [ ] Small market: 3 slots visible, 4th-5th grayed/hidden

### Market Size Indicator
- [ ] Badge or icon showing market size
- [ ] Color coding:
  - [ ] Large: Gold badge
  - [ ] Medium: Silver badge
  - [ ] Small: Bronze badge
- [ ] Text label: "Large Market" / "Medium Market" / "Small Market"

### Footer Section
- [ ] Card code (e.g., "HEL-001")
- [ ] Set indicator (e.g., "Core")
- [ ] Rarity indicator (e.g., "Uncommon")
- [ ] Game logo/branding

---

## Phase 6: Reference Card Templates ⏳

### Turn Order Reference (`src/templates/reference-turn-order.hbs`)
- [ ] Standard poker card size (2.5" × 3.5")
- [ ] Title: "TURN ORDER"
- [ ] Numbered list of 7 phases:
  1. Event
  2. Upkeep (CMYK)
  3. Draw
  4. Policy
  5. Trade (3 min)
  6. Income
  7. Cleanup
- [ ] Brief description per phase
- [ ] Icons for each phase

### CMYK Timing Reference
- [ ] Title: "UPKEEP TIMING (CMYK)"
- [ ] Four sections:
  - [ ] C (Cyan) = Global effects
  - [ ] M (Magenta) = Personal effects
  - [ ] Y (Yellow) = Opponent effects
  - [ ] K (Black) = Trading Partner effects
- [ ] Order indicator: C → M → Y → K
- [ ] Example for each

### Dispute Resolution Reference
- [ ] Title: "DISPUTE RESOLUTION"
- [ ] Step-by-step process:
  1. Identify contested slots
  2. Resolve in reverse-GDP order
  3. Both players bid GDP secretly
  4. Calculate: Influence + GDP bid
  5. Winner pays bid, loser returns card
- [ ] Visual diagram if space allows

### Card Type Colors Reference
- [ ] Title: "CARD TYPES"
- [ ] Color-coded list:
  - [ ] Blue = Export (trade routes)
  - [ ] Green = Policy (ongoing effects)
  - [ ] Red = Tactic (instant actions)
  - [ ] Purple = Event (global effects)
  - [ ] Gold = Leader (signature cards)
- [ ] Color swatches with icons

### Influence Trading Reference
- [ ] Title: "INFLUENCE TRADING"
- [ ] Rules summary:
  - [ ] Timing: During 3-minute Trade Phase
  - [ ] Currency: GDP
  - [ ] Process: Both players must agree
  - [ ] Effect: Immediate transfer
  - [ ] Typical rate: 1 influence = 2-3 GDP
- [ ] Examples

---

## Phase 7: Player Aid Card Templates ⏳

### Leader-Specific Aids
- [ ] Create template: `src/templates/player-aid-leader.hbs`
- [ ] Include for each leader:
  - [ ] Leader name and flag
  - [ ] Starting GDP (large)
  - [ ] Hand size (large)
  - [ ] Export slots / trade routes (5)
  - [ ] Unique abilities (full text)
  - [ ] Strategic tips (1-2 sentences)
- [ ] Generate 3 aids (USA, China, Russia)

### Generic Game Flow Aid
- [ ] Create template: `src/templates/player-aid-gameflow.hbs`
- [ ] Include:
  - [ ] Quick turn order
  - [ ] Win conditions (50 GDP or highest after 5 rounds)
  - [ ] Action options per phase
  - [ ] Common questions/edge cases
  - [ ] Timer reminder (3 minutes)

---

## Phase 8: Styling & Design ⏳

### Common Styles (`src/styles/common.css`)
- [ ] Base board styling (borders, backgrounds)
- [ ] Typography system (fonts, sizes, hierarchy)
- [ ] Bleed and safe zone guide styles
- [ ] Print optimization (@page, colors)
- [ ] Common layout utilities (flexbox, grid)

### Leader Board Styles (`src/styles/leader-board.css`)
- [ ] Portrait orientation styling
- [ ] Leader-specific color themes:
  - [ ] USA theme (red/white/blue accents)
  - [ ] China theme (red/gold accents)
  - [ ] Russia theme (red/white accents)
- [ ] Portrait placeholder styling
- [ ] Ability section styling
- [ ] Trade route tracker styling
- [ ] Background patterns/textures

### Trading Partner Styles (`src/styles/trading-partner.css`)
- [ ] Landscape orientation styling
- [ ] Market size color coding:
  - [ ] Large market (gold accents)
  - [ ] Medium market (silver accents)
  - [ ] Small market (bronze accents)
- [ ] Influence track styling (boxes, numbers)
- [ ] Trade effects list styling
- [ ] Route slots visual styling
- [ ] Suzerainty box styling
- [ ] Footer styling

### Card Styles (Reference & Player Aids)
- [ ] Reuse `card-printer` common styles
- [ ] Create reference-specific styling
- [ ] Create player-aid-specific styling
- [ ] Ensure poker card size compliance

---

## Phase 9: Generator Script ⏳

### Main Generator (`src/generate.ts`)
- [ ] Import dependencies (playwright, handlebars, fs)
- [ ] Load configuration
- [ ] Implement file I/O utilities
- [ ] Implement template compilation
- [ ] Implement Handlebars helpers

### Board Rendering Functions
- [ ] `renderLeaderBoard(leader)` - render single leader board
- [ ] `renderTradingPartnerBoard(partner)` - render single partner board
- [ ] `renderReferenceCard(reference)` - render reference card
- [ ] `renderPlayerAid(aid)` - render player aid card

### Sheet Compilation Functions
- [ ] `compileBoards(boards, deckName, orientation)` - arrange boards in 2-up layout
- [ ] Handle portrait orientation (leader boards)
- [ ] Handle landscape orientation (trading partner boards)
- [ ] Add page breaks between sheets
- [ ] Inject CSS inline for PDF rendering

### PDF Generation
- [ ] Implement `renderPdf(html, outputPath)` using Playwright
- [ ] Configure PDF settings (page size, margins, background)
- [ ] Handle print optimization

### CLI Interface
- [ ] Support command-line targets:
  - [ ] `all` - generate all boards and cards
  - [ ] `leaders` - generate leader boards only
  - [ ] `partners` - generate trading partner boards only
  - [ ] `reference` - generate reference cards only
  - [ ] `aids` - generate player aids only
- [ ] Display generation progress
- [ ] Report summary statistics

### Output Generation
- [ ] Generate HTML files for preview
- [ ] Generate PDF files for printing
- [ ] Create organized output directory structure:
  ```
  dist/
  ├── leaders/
  │   ├── fronts.pdf
  │   ├── fronts.html
  │   └── preview.html
  ├── trading-partners/
  │   ├── fronts.pdf
  │   ├── fronts.html
  │   └── preview.html
  ├── reference-cards/
  │   ├── fronts.pdf
  │   ├── backs.pdf
  │   └── preview.html
  └── player-aids/
      ├── fronts.pdf
      ├── backs.pdf
      └── preview.html
  ```

---

## Phase 10: Testing & Validation ⏳

### Data Validation
- [ ] Verify all 3 leaders converted correctly
- [ ] Verify all 15 trading partners converted correctly
- [ ] Check for missing or malformed data
- [ ] Validate influence thresholds and bonuses

### Template Testing
- [ ] Generate test leader boards
- [ ] Generate test trading partner boards
- [ ] Generate test reference cards
- [ ] Generate test player aids
- [ ] Review HTML preview files

### Layout Testing
- [ ] Verify 2-up layout spacing
- [ ] Check board dimensions (8" × 6")
- [ ] Verify portrait/landscape orientations
- [ ] Test margin and gutter settings
- [ ] Check bleed and safe zones

### Print Testing
- [ ] Print test sheet on plain paper
- [ ] Measure physical dimensions
- [ ] Verify text readability
- [ ] Check color accuracy
- [ ] Test with actual components (coins, cards)

### Cross-Platform Testing
- [ ] Test PDF generation on different systems
- [ ] Verify browser compatibility (preview HTML)
- [ ] Check print output quality

---

## Phase 11: Documentation ⏳

### Project Documentation
- [ ] Update `README.md` with:
  - [ ] Project overview
  - [ ] Feature list
  - [ ] Quick start guide
  - [ ] Build commands
  - [ ] Output structure
- [ ] Update `PROGRESS.md` with completion status
- [ ] Document design decisions in `DESIGN_DECISIONS.md`

### User Guides
- [ ] Create printing guide
- [ ] Create calibration guide
- [ ] Create assembly instructions (if needed)
- [ ] Create troubleshooting guide

### Repository Documentation Updates
- [ ] Update `prototype/prototype_components.md`:
  - [ ] Clarify slot strip placement (on trading partner boards)
  - [ ] Update leader board specifications
  - [ ] Update dimensions and materials
- [ ] Update `design_docs/component_specifications.md`:
  - [ ] Finalize 8" × 6" board dimensions
  - [ ] Update leader board specs
  - [ ] Update trading partner board specs
- [ ] Update `design_docs/trading_partner_cards.md`:
  - [ ] Reflect new board layout (not cards)
  - [ ] Update influence track system (single track, 0-9)
  - [ ] Document stacking coin system
- [ ] Update `leader_card.md`:
  - [ ] Clarify trade route tracker (5 slots for all leaders)
  - [ ] Distinguish from export card slots (conceptual)
  - [ ] Update layout specifications
- [ ] Create `prototype/decks/board-printer/DESIGN_DECISIONS.md`:
  - [ ] Document size choices (8" × 6")
  - [ ] Document influence track system
  - [ ] Document route slot integration
  - [ ] Document layout decisions

### API Documentation
- [ ] Document config.ts interfaces
- [ ] Document converter functions
- [ ] Document generator functions
- [ ] Add JSDoc comments to all functions

---

## Phase 12: Polish & Optimization ⏳

### Visual Polish
- [ ] Enhance typography (font choices, hierarchy)
- [ ] Improve color schemes
- [ ] Add thematic artwork/patterns
- [ ] Refine spacing and alignment
- [ ] Add visual polish to all elements

### Code Quality
- [ ] Add TypeScript strict mode checks
- [ ] Add error handling and validation
- [ ] Refactor duplicated code
- [ ] Add code comments
- [ ] Format code consistently

### Performance
- [ ] Optimize PDF generation speed
- [ ] Reduce output file sizes
- [ ] Minimize dependencies
- [ ] Optimize template compilation

### Accessibility
- [ ] Ensure high contrast text
- [ ] Use readable font sizes
- [ ] Add color-blind friendly elements
- [ ] Test with accessibility tools

---

## Phase 13: Final Deliverables ⏳

### Output Files
- [ ] Generate final leader board PDFs (2 sheets, 3 boards + 1 blank)
- [ ] Generate final trading partner PDFs (8 sheets, 15 boards + 1 blank)
- [ ] Generate final reference card PDFs (1 sheet, 5-6 cards)
- [ ] Generate final player aid PDFs (1 sheet, 3-4 cards)

### Package Scripts
- [ ] `npm run convert` - Convert markdown to JSON
- [ ] `npm run build:all` - Generate all components
- [ ] `npm run build:leaders` - Generate leader boards
- [ ] `npm run build:partners` - Generate trading partner boards
- [ ] `npm run build:reference` - Generate reference cards
- [ ] `npm run build:aids` - Generate player aids
- [ ] `npm run preview` - Open preview HTML files

### Distribution
- [ ] Create printing checklist
- [ ] Create assembly instructions
- [ ] Create component inventory list
- [ ] Package for playtesting

---

## Success Criteria ✓

### Functional Requirements
- [ ] All 3 leader boards generate correctly
- [ ] All 15 trading partner boards generate correctly
- [ ] All reference cards generate correctly
- [ ] All player aids generate correctly
- [ ] PDFs are print-ready at correct dimensions
- [ ] HTML previews work in all major browsers

### Quality Requirements
- [ ] Boards are visually professional
- [ ] Text is readable from normal game distance
- [ ] Colors are print-accurate
- [ ] Layout is consistent and polished
- [ ] Components are playtesting-ready

### Documentation Requirements
- [ ] README is complete and helpful
- [ ] All repository docs are updated
- [ ] Design decisions are documented
- [ ] Printing guide is clear and actionable

---

## Future Enhancements (Post-MVP)

### Additional Features
- [ ] Back designs for boards (optional)
- [ ] Alternative art styles
- [ ] Color-blind mode
- [ ] Additional leader boards (EU, Saudi Arabia, Brazil)
- [ ] Additional trading partners
- [ ] Expansion set support

### Tools & Automation
- [ ] Automated dimension validation
- [ ] Batch processing improvements
- [ ] Template hot-reloading for development
- [ ] Visual diff tools for changes

### Production Features
- [ ] Print shop specifications export
- [ ] Bleed marks and crop marks
- [ ] Color calibration profiles
- [ ] Professional finishing guides

---

## Notes & Decisions Log

### Key Decisions Made
1. **Board Size**: 8" × 6" for both leaders and trading partners
2. **Orientation**: Portrait for leaders, landscape for trading partners
3. **Influence Track**: Single track (0-9), stacking coins for 10+
4. **Trade Route Tracker**: 5 slots for all leaders (uniform)
5. **Route Slots**: Integrated into trading partner boards (not leader boards)
6. **Layout**: 2-up printing (two boards per US Letter sheet)
7. **Template Strategy**: One template with 5 slots, hide/gray unused slots

### Open Questions
- [ ] Final artwork/imagery for portraits and backgrounds
- [ ] Specific color palettes per leader
- [ ] Exact font choices
- [ ] Icon designs for various elements

### Dependencies
- Requires completed `card-printer` system for reference card generation
- Requires finalized leader abilities and trading partner bonuses
- Requires playtesting to validate layout decisions

---

## Estimated Completion

**Total Tasks**: ~200+
**Current Progress**: 0%
**Estimated Time**: 6-8 hours of focused work

### Phase Breakdown
- Phase 1-2: 1 hour (setup & config)
- Phase 3: 1.5 hours (data conversion)
- Phase 4-5: 2 hours (board templates)
- Phase 6-7: 1 hour (card templates)
- Phase 8: 1 hour (styling)
- Phase 9: 1.5 hours (generator)
- Phase 10-13: 2 hours (testing, docs, polish)

---

*Last Updated: 2025-10-14*
*Status: Ready to Begin*
*Priority: High - Critical for Playtesting*

