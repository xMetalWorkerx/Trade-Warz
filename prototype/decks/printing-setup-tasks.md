# Trade Warz Card Printing Setup - Task List

**Goal**: Create a 6-up card printing system for Trade Warz prototype using 80lb laser gloss cover stock (US Letter, 6 cards per sheet).

**Strategy**: Single-sided printing with letter codes on backs (E=Export, P=Policy, T=Tactic, V=Event, L=Leader)

---

## Phase 1: Project Setup

### Task 1.1: Create Card Printing Folder Structure
```
prototype/decks/
├─ card-printer/           # Node project for rendering cards
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ src/
│  │  ├─ config.ts         # 6-up layout config
│  │  ├─ generate.ts       # Main generator
│  │  ├─ converter.ts      # MD → JSON converter
│  │  ├─ templates/
│  │  │  ├─ sheet.hbs      # Page layout
│  │  │  ├─ card-export.hbs    # Export card design
│  │  │  ├─ card-policy.hbs    # Policy card design
│  │  │  ├─ card-tactic.hbs    # Tactic card design
│  │  │  ├─ card-event.hbs     # Event card design
│  │  │  ├─ card-leader.hbs    # Leader card design
│  │  │  └─ card-back.hbs      # Card back with letter
│  │  └─ styles/
│  │     ├─ common.css     # Shared card styles
│  │     ├─ export.css     # Export-specific styles
│  │     ├─ policy.css     # Policy-specific styles
│  │     ├─ tactic.css     # Tactic-specific styles
│  │     ├─ event.css      # Event-specific styles
│  │     └─ leader.css     # Leader-specific styles
│  └─ dist/                # Generated PDFs and HTML
├─ data/                   # JSON data files
│  ├─ leader-usa.json
│  ├─ leader-china.json
│  ├─ leader-russia.json
│  ├─ global-exports.json
│  ├─ global-policies.json
│  ├─ global-tactics.json
│  └─ global-events.json
└─ print-batches.md        # Printing order and instructions
```

**Acceptance**: Folder structure created, empty files in place

---

### Task 1.2: Initialize Node Project
Create minimal `package.json` with dependencies:
- `handlebars` - templating
- `playwright` - PDF rendering
- `tsx` - TypeScript runner
- `typescript` - type checking

**Commands**:
```bash
cd prototype/decks/card-printer
npm init -y
npm install handlebars
npm install --save-dev playwright tsx typescript @types/node
npx playwright install --with-deps chromium
```

**Acceptance**: `node_modules/` exists, `package-lock.json` created

---

## Phase 2: Configuration & Core Logic

### Task 2.1: Create config.ts
Define card geometry for poker-sized cards (2.5" × 3.5") in 6-up layout:
- 2 columns × 3 rows on US Letter (8.5" × 11")
- Adjust margins and gutters for clean cuts
- Add bleed (3mm) and safe zone (5mm) settings
- Include NUDGE values for duplex alignment (start at 0)

**Key differences from ChatGPT version**:
- Add card type color scheme constants (blue=export, green=policy, red=tactic, purple=event, gold=leader)
- Add rarity gem/icon mappings (common=circle, uncommon=diamond, rare=star)
- Add output paths for each card type batch

**Acceptance**: Measurements align with 80lb cover stock specs

---

### Task 2.2: Create Card Type Configs
Add to `config.ts`:
```typescript
export const CARD_TYPES = {
  export: { color: '#2563eb', back: 'E', label: 'Export' },
  policy: { color: '#16a34a', back: 'P', label: 'Policy' },
  tactic: { color: '#dc2626', back: 'T', label: 'Tactic' },
  event: { color: '#9333ea', back: 'V', label: 'Event' },
  leader: { color: '#ca8a04', back: 'L', label: 'Leader' }
};

export const RARITIES = {
  common: { symbol: '●', label: 'Common' },
  uncommon: { symbol: '◆', label: 'Uncommon' },
  rare: { symbol: '★', label: 'Rare' }
};
```

**Acceptance**: Type-safe card configuration available

---

### Task 2.3: Create Data Converter Script
Build `converter.ts` to parse existing `.md` files into JSON:
- Read from `../global_decks.md` and `../leader_decks.md`
- Parse markdown card definitions
- Extract: name, type, rarity, leader, cost, influence, revenue, effect, flavor
- Output separate JSON files per deck type
- Handle edge cases (missing fields, special formatting)

**Input**: `prototype/global_decks.md`, `prototype/leader_decks.md`
**Output**: `prototype/decks/data/*.json`

**Acceptance**: Running converter produces valid JSON for all 7 deck types

---

## Phase 3: Card Templates

### Task 3.1: Create Base Card Template Structure
Create `templates/sheet.hbs` (page layout):
- Define @page size and margins
- Create grid layout (2×3)
- Apply nudge offsets
- Add crop marks (optional, removable)

**Keep from ChatGPT version**: Grid structure, page setup
**Modify**: Add page break classes for batch printing

---

### Task 3.2: Create Export Card Template
`templates/card-export.hbs`:
```handlebars
<div class="card card-export">
  <div class="card-border" style="border-color: {{typeColor}}">
    <div class="card-header">
      <h2 class="card-name">{{name}}</h2>
      <span class="rarity">{{raritySymbol}}</span>
    </div>
    
    <div class="card-stats">
      <div class="stat-box">
        <span class="stat-label">Cost</span>
        <span class="stat-value">{{cost}} GDP</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Influence</span>
        <span class="stat-value">{{influence}}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Revenue</span>
        <span class="stat-value">{{revenue}}/round</span>
      </div>
    </div>
    
    <div class="card-effect">
      <h3>Effect</h3>
      <p>{{effect}}</p>
    </div>
    
    {{#if flavor}}
    <div class="card-flavor">
      <em>"{{flavor}}"</em>
    </div>
    {{/if}}
    
    <div class="card-footer">
      <span class="leader-tag">{{leader}}</span>
      <span class="type-tag">Export</span>
    </div>
  </div>
  <div class="bleed-guide"></div>
  <div class="safe-guide"></div>
</div>
```

**Acceptance**: Export cards display all relevant stats clearly

---

### Task 3.3: Create Policy Card Template
`templates/card-policy.hbs`:
- Remove: influence, revenue stats
- Keep: cost, effect, flavor
- Emphasize ongoing/persistent effect text
- Add CMYK timing indicator if relevant

**Key difference**: Policies don't have revenue, focus on effect description

---

### Task 3.4: Create Tactic Card Template
`templates/card-tactic.hbs`:
- Similar to Policy but with lightning bolt icon
- Emphasize instant/timing keywords
- May have no cost (some tactics are free)

**Key difference**: Instant effect emphasis, action-oriented layout

---

### Task 3.5: Create Event Card Template
`templates/card-event.hbs`:
- NO cost field (events are free/automatic)
- Large effect text area (events have complex effects)
- "GLOBAL EVENT" banner at top
- Different visual treatment (more dramatic)

**Key difference**: No player ownership, affects all players

---

### Task 3.6: Create Leader Card Template
`templates/card-leader.hbs`:
- Special layout for signature cards
- Include leader flag/icon
- Show if it's from leader mini-deck
- May need different size/orientation?

**Question for user**: Are leader cards same size as other cards, or separate boards?

---

### Task 3.7: Create Card Back Template
`templates/card-back.hbs`:
Simple back with large letter:
```handlebars
<div class="card card-back" style="background-color: {{typeColor}}">
  <div class="back-content">
    <div class="back-letter">{{backLetter}}</div>
    <div class="back-label">{{typeLabel}}</div>
    <div class="game-title">TRADE WARZ</div>
  </div>
  <div class="bleed-guide"></div>
</div>
```

**Design**: Clean, readable letter (E/P/T/V/L) centered, game title at bottom

---

## Phase 4: Styling

### Task 4.1: Create Common Styles
`styles/common.css`:
- Card dimensions and positioning
- Bleed and safe zone guides (dashed lines, removable)
- Typography base (fonts, sizes, weights)
- Border and padding standards
- Print-friendly colors (not too light/dark)

**Important**: Use system fonts for prototype (no web font loading issues)

---

### Task 4.2: Create Type-Specific Styles
Create separate CSS files for each card type:
- `export.css` - Blue accents, stat boxes
- `policy.css` - Green accents, effect-focused
- `tactic.css` - Red accents, urgent/action styling
- `event.css` - Purple accents, dramatic layout
- `leader.css` - Gold accents, special treatment

**Color palette**:
- Export: Blue (#2563eb)
- Policy: Green (#16a34a)
- Tactic: Red (#dc2626)
- Event: Purple (#9333ea)
- Leader: Gold (#ca8a04)

---

### Task 4.3: Add Rarity Indicators
Style rarity symbols:
- Common (●): Basic circle, gray
- Uncommon (◆): Diamond, silver/metallic
- Rare (★): Star, gold

Position in top-right corner, subtle but visible

---

### Task 4.4: Print Optimization
Add print-specific CSS:
- `@media print` rules
- Remove guides option via class toggle
- Ensure backgrounds print (webkit print-color-adjust)
- Page break controls
- Color calibration for laser printer

**Test**: Print single sheet, check alignment and colors

---

## Phase 5: Generator Script

### Task 5.1: Create Main Generator
`generate.ts`:
```typescript
// Main flow:
// 1. Load JSON data for specified card type(s)
// 2. Select appropriate template based on card type
// 3. Compile cards with Handlebars
// 4. Arrange in 6-up sheets
// 5. Generate HTML preview
// 6. Render PDF via Playwright
// 7. Generate matching backs PDF
```

**CLI Interface**:
```bash
npm run build -- exports          # Just global exports
npm run build -- leader-usa       # Just USA leader deck
npm run build -- all             # Everything
npm run build -- exports policies # Multiple types
```

---

### Task 5.2: Implement Batch Processing
Support generating multiple PDFs:
- `trade-warz-exports-fronts.pdf` (15 cards = 3 sheets)
- `trade-warz-exports-backs.pdf` (3 sheets of "E" backs)
- `trade-warz-policies-fronts.pdf` (15 cards = 3 sheets)
- `trade-warz-policies-backs.pdf` (3 sheets of "P" backs)
- etc.

**Organize output**:
```
dist/
├─ exports/
│  ├─ fronts.pdf
│  ├─ backs.pdf
│  └─ preview.html
├─ policies/
│  ├─ fronts.pdf
│  ├─ backs.pdf
│  └─ preview.html
└─ ... (one folder per card type)
```

---

### Task 5.3: Add Sheet Filling Logic
Handle partial sheets:
- If deck has 15 cards (3 sheets exactly), perfect
- If deck has 10 cards (2 sheets - 12 slots, 2 empty):
  - Option A: Leave empty slots
  - Option B: Add blank cards
  - Option C: Repeat last card to fill

**Decision needed**: What to do with partial sheets?

---

### Task 5.4: Add Preview Generation
Generate HTML preview files:
- Show actual layout before printing
- Add navigation between sheets
- Include print button
- Display card count and sheet count
- Show which slots are empty

**Benefit**: Verify layout before wasting cardstock

---

## Phase 6: Data Preparation

### Task 6.1: Convert Global Export Deck
Run converter on `global_decks.md`:
- Extract 15 export cards
- Verify all fields populated
- Output to `data/global-exports.json`
- Validate JSON schema

**Expected output**: 15 cards, 3 sheets needed

---

### Task 6.2: Convert Global Policy Deck
Extract 15 policy cards from markdown:
- Handle varied effect text lengths
- Some have CMYK timing, some don't
- Cost varies widely

**Expected output**: 15 cards, 3 sheets needed

---

### Task 6.3: Convert Global Tactic Deck
Extract 15 tactic cards:
- Some have no cost
- Instant effects
- Varied targets (opponent, self, all, etc.)

**Expected output**: 15 cards, 3 sheets needed

---

### Task 6.4: Convert Global Event Deck
Extract 10 event cards:
- No costs
- No leaders
- Complex multi-part effects

**Expected output**: 10 cards, 2 sheets needed

---

### Task 6.5: Convert Leader Decks
Extract 3 leader decks (USA, China, Russia):
- 8 cards each = 24 total
- Mix of exports, policies, tactics
- Note which leader owns each card

**Expected output**: 24 cards, 4 sheets needed

**Option**: Print all leaders mixed, or separate by leader?

---

## Phase 7: Testing & Calibration

### Task 7.1: Print Test Sheet
Print first test sheet with:
- 1 export card
- 1 policy card
- 1 tactic card
- 1 event card
- 1 leader card
- 1 card back

**Verify**:
- Cards align to 2.5" × 3.5" when cut
- Colors print correctly on 80lb gloss
- Text is readable
- Bleed extends properly
- Safe zone respected

---

### Task 7.2: Adjust Margins & Gutters
Based on test print:
- Measure actual card positions
- Adjust `SHEET.margin` values in `config.ts`
- Adjust `SHEET.gutter` spacing
- Reprint and verify

**Iterate**: May need 2-3 test prints to perfect

---

### Task 7.3: Calibrate Colors
Check color output:
- Are blues too dark?
- Are reds too bright?
- Is text contrast sufficient?
- Do rarities show clearly?

**Adjust**: Modify CSS color values, reprint section

---

### Task 7.4: Test Guide Removal
Print sheet with guides disabled:
- Comment out `.bleed-guide` and `.safe-guide` in CSS
- Verify layout still correct
- Confirm cutting will be easy

**Final**: Keep guides for first full print, remove for production

---

## Phase 8: Full Production

### Task 8.1: Generate All Card PDFs
Run generator for all card types:
```bash
npm run build -- all
```

Expected output:
- Global Exports: 3 sheets (15 cards)
- Global Policies: 3 sheets (15 cards)
- Global Tactics: 3 sheets (15 cards)
- Global Events: 2 sheets (10 cards)
- USA Leader: 2 sheets (8 cards)
- China Leader: 2 sheets (8 cards)
- Russia Leader: 2 sheets (8 cards)

**Total**: 18 sheets = 18 fronts + 18 backs

---

### Task 8.2: Create Print Batches Document
Document printing order in `print-batches.md`:
```markdown
# Trade Warz Prototype - Print Order

## Batch 1: Global Exports (Blue)
- Fronts: exports/fronts.pdf (3 sheets)
- Backs: exports/backs.pdf (3 sheets, letter E)
- Total cards: 15

## Batch 2: Global Policies (Green)
...
```

Include:
- Print order (group by type)
- Card counts
- Sheet counts
- Back letter for each batch
- Cutting instructions

---

### Task 8.3: Print & Cut First Prototype
Physical production:
1. Print all fronts PDFs
2. Print all backs PDFs (track sheet orientation!)
3. Cut cards using paper cutter or ruler + knife
4. Sleeve cards (optional but recommended)
5. Organize by deck type

**Supplies needed**:
- 80lb laser gloss cover stock (18+ sheets)
- Paper cutter or cutting mat + ruler + X-Acto knife
- Card sleeves (optional, standard poker size)
- Deck boxes or rubber bands for organization

---

### Task 8.4: Playtest Readability
Use printed cards in actual game:
- Can players read cards at arm's length?
- Do colors distinguish card types clearly?
- Is important info (cost, effect) easy to find?
- Do card backs work for quick identification?

**Iterate**: Adjust font sizes, layout, colors as needed

---

## Phase 9: Refinement

### Task 9.1: Add Trading Partner Cards
Trading partners need cards too:
- 15 trading partner cards
- Different info: route slots, influence thresholds, bonuses
- May need landscape orientation?
- Or larger size?

**Decision needed**: What format for trading partner cards?

---

### Task 9.2: Add Leader Boards
If leader boards are cards (not separate components):
- Create leader board template
- Include: starting GDP, hand size, export slots, special ability
- Probably need larger format

**Decision needed**: Are leader boards printed cards or separate?

---

### Task 9.3: Create Quick Reference Cards
Optional: Print player aid cards:
- CMYK phase order
- Round structure
- Dispute resolution steps
- Victory conditions

**Size**: Could be poker-sized or larger

---

### Task 9.4: Optimize for Future Prints
Document lessons learned:
- Final margin/gutter values
- Color adjustments needed
- Font size recommendations
- Any template improvements

Save as `print-optimization-notes.md`

---

## Phase 10: Distribution

### Task 10.1: Create Print Package
Bundle everything for easy reprinting:
```
trade-warz-print-package/
├─ README.md (instructions)
├─ pdfs/ (all generated PDFs)
├─ data/ (JSON data files)
├─ card-printer/ (complete generator)
└─ print-batches.md
```

Zip and version: `trade-warz-v1.0-print-files.zip`

---

### Task 10.2: Document Costs
Track prototype costs:
- Cardstock: $X per sheet
- Ink/toner: estimate
- Sleeves: $X per 100
- Time: hours spent
- Total cost per deck

Compare to print-on-demand services (PrinterStudio, MakePlayingCards, etc.)

---

### Task 10.3: Consider Print Services
Research alternatives:
- Local print shop for card stock printing
- Online services (PrinterStudio, DriveThruCards)
- Cost comparison for 10, 50, 100 deck runs

**When to switch**: If making >5 prototypes, print service may be cheaper

---

## Key Decisions Needed

1. **Partial sheet handling**: Leave empty or fill with blanks?
2. **Leader deck organization**: Print mixed or separate by leader?
3. **Trading partner format**: Same as cards or different?
4. **Leader boards**: Printed cards or separate components?
5. **Guide removal timing**: First print or wait until calibrated?
6. **Sleeve strategy**: Sleeve all cards or just test deck?

---

## Major Adjustments from ChatGPT Prompt

### ✅ Kept:
- 6-up layout (2×3 grid)
- Playwright + Handlebars tech stack
- Basic folder structure
- PDF generation approach
- Nudge mechanism for alignment

### 🔧 Changed:
- **Multiple card templates** instead of one generic template (each card type has unique layout)
- **Separate styling** per card type (not just one styles.css)
- **Batch processing** for different card types (not just one data file)
- **Card back variations** with letter codes (E/P/T/V/L)
- **Data conversion** from existing markdown (not manual JSON creation)
- **Type-specific colors** and rarity indicators
- **Board game focus** with game-specific terminology
- **Print batch organization** for efficient physical production

### ➕ Added:
- Data converter for markdown → JSON
- Type-specific templates (5 front templates + 1 back template)
- Batch processing CLI
- Print calibration workflow
- Card counting and sheet calculation
- Preview HTML generation
- Production documentation
- Cost tracking

---

## Estimated Timeline

- **Phase 1-2** (Setup): 1-2 hours
- **Phase 3** (Templates): 2-3 hours
- **Phase 4** (Styling): 2-3 hours  
- **Phase 5** (Generator): 2-3 hours
- **Phase 6** (Data): 1-2 hours
- **Phase 7** (Testing): 2-3 hours (iterative)
- **Phase 8** (Production): 2-3 hours
- **Phase 9-10** (Refinement): Optional, as needed

**Total**: 12-19 hours for complete print-ready system

---

## Next Steps

1. Review this task file
2. Make any necessary adjustments
3. Decide on key questions above
4. Begin Phase 1: Project Setup
5. Iterate on test prints until satisfied
6. Print full prototype
7. Playtest with physical cards!

---

*Last Updated: 2025-10-13*
*Status: Ready for implementation*

