# Board Printer - Design Decisions

## Overview

This document records the key design decisions made during the development of the Trade Warz board printer system.

---

## Board Specifications

### Board Dimensions
**Decision**: 8" × 6" boards for both leaders and trading partners

**Rationale**:
- Large enough for comfortable gameplay and readability
- Fits in 2-up layout on US Letter paper (8.5" × 11")
- Professional appearance without excessive size
- Can be printed on standard home/office equipment

### Orientations
**Decision**: 
- Leader boards: Portrait (6" wide × 8" tall)
- Trading partner boards: Landscape (8" wide × 6" tall)

**Rationale**:
- Portrait fits leader information flow (name → stats → abilities → tracker)
- Landscape accommodates trading partner layout (name → influence track → effects → route slots)
- Both orientations work in same 2-up printing system

---

## Influence Tracking System

### Single Track Design
**Decision**: One influence track per trading partner (0-9), all players use same track

**Alternatives Considered**:
- 6 separate tracks (one per player color)
- Larger track (0-20 continuous)
- No track (use separate components)

**Rationale**:
- Simpler, cleaner board design
- Easier to print and produce
- Stacking coins for 10+ creates interesting visual feedback
- Players already have colored GDP coins to use as markers
- Reduces board clutter

### Track Range (0-9)
**Decision**: 10 boxes numbered 0-9 with stacking for 10+

**Rationale**:
- Most influence bonuses trigger at 3, 6, 9 (all within range)
- Stacking mechanic adds tactile satisfaction
- Keeps board size manageable
- Matches GDP economy scale (most players won't exceed 20 influence often)

---

## Route Slot Integration

### Placement on Trading Partner Boards
**Decision**: Route slots integrated into trading partner boards (not leader boards)

**Rationale**:
- Matches game flow (exports go TO trading partners)
- Central board location promotes player interaction
- Leader boards stay focused on player-specific information
- Creates clear spatial relationship (export → trading partner)

### Adaptive Slot Display
**Decision**: One template with 5 slots, hide/disable unused slots for smaller markets

**Alternatives Considered**:
- Separate templates for 3/4/5-slot variants
- Only show active slots (remove disabled ones)
- Physical slot strips separate from board

**Rationale**:
- Easier to maintain (one template)
- Visual consistency across all trading partners
- Shows market size at a glance
- Simpler manufacturing if printed professionally

### Slot Counts by Market Size
- Large markets: 5 slots
- Medium markets: 4 slots (5th grayed out)
- Small markets: 3 slots (4th-5th grayed out)

---

## Leader Board Features

### Trade Route Tracker
**Decision**: 5 slots for all leaders (uniform)

**Alternatives Considered**:
- Variable slots matching leader asymmetry (USA=4, China=4, Russia=3)
- No tracker (use separate components)
- Larger tracker (6-8 slots for expansion)

**Rationale**:
- Uniform design simplifies production
- 5 slots provides flexibility for future expansion
- Easier for players to track active routes
- Differentiates from export card slot concept (conceptual vs physical)

### Portrait Placeholder
**Decision**: 2" × 2" box for leader image/portrait

**Rationale**:
- Large enough for recognizable artwork
- Doesn't dominate the board
- Square format is versatile for different art styles
- Easy to produce as placeholder or final art

### Ability Display
**Decision**: Text-based abilities with name + description format

**Alternatives Considered**:
- Icon-only abilities
- Condensed keyword abilities
- Full rules text

**Rationale**:
- Clearest for prototype testing
- Easy to iterate and update
- No iconography design needed yet
- Players can understand without rulebook

---

## Layout & Printing

### 2-Up Layout
**Decision**: 2 boards per US Letter sheet (2 columns × 1 row)

**Alternatives Considered**:
- 4-up (2×2) with smaller boards
- 1-up (one board per sheet)
- Legal size paper (8.5" × 14")

**Rationale**:
- Maximizes board size while fitting standard paper
- Efficient use of material (minimal waste)
- Works with home printers
- Easy to cut and align

### Paper Stock
**Recommendation**: 80-110lb cardstock, matte finish

**Rationale**:
- Heavy enough for durability
- Not so thick it can't be cut easily
- Matte reduces glare during play
- Widely available at print shops

### Bleed & Safe Zones
- Bleed zone: 0.12" (3mm) - removable cutting guides
- Safe zone: 0.24" (6mm) - keep important content here

---

## Reference Cards & Player Aids

### Card Size
**Decision**: Standard poker size (2.5" × 3.5")

**Rationale**:
- Matches existing card printer system
- Familiar size for board gamers
- Easy to hold and reference during play
- Can be sleeved with standard card sleeves

### Content Structure
**Decision**: Simple text-based layouts with clear hierarchy

**Rationale**:
- Quick to read during gameplay
- Easy to update based on playtesting
- Works well at poker card size
- Professional appearance without complex graphics

---

## Color Coding

### Market Size Colors
- Large: Gold (#d97706)
- Medium: Silver (#6b7280)
- Small: Bronze (#92400e)

**Rationale**:
- Intuitive hierarchy (gold > silver > bronze)
- High contrast for visibility
- Distinct from card type colors (blue/green/red/purple)
- Works in grayscale

### Leader Themes
- USA: Blue/red/white (patriotic)
- China: Red/gold (national colors)
- Russia: Red/blue/white (tricolor)

**Rationale**:
- Thematically appropriate
- Visually distinct from each other
- Recognizable without being stereotypical
- Works for prototype (can be refined later)

---

## Technical Decisions

### Template System
**Decision**: Handlebars templates with inline CSS

**Rationale**:
- Flexible and powerful templating
- Can reuse templates across different data
- Easy to preview in browser before PDF generation
- CSS inlining ensures PDF renders correctly

### PDF Generation
**Decision**: Playwright with Chromium for PDF rendering

**Rationale**:
- Accurate HTML→PDF conversion
- Handles complex CSS (flexbox, grid, gradients)
- Consistent output across platforms
- Same technology as card printer

### Data Format
**Decision**: JSON intermediate format from markdown source

**Rationale**:
- Markdown is easy to edit (game design files)
- JSON is easy to parse (generation scripts)
- Clear separation of concerns
- Version control friendly

---

## Future Considerations

### Extensibility
- Template system supports additional leaders easily
- Trading partner template can accommodate more partners
- Card printer can generate reference/aid cards if needed
- 2-up layout works for any 8"×6" board design

### Production Path
- Current system optimized for prototype
- Same templates can be used for print shop specs
- Bleed/safe zones follow industry standards
- Easy to add color calibration profiles later

### Playtesting Adaptations
- Easy to update abilities and bonuses
- Can quickly regenerate boards after changes
- Preview HTML allows quick visual checks
- JSON format supports data-driven balance changes

---

## Lessons Learned

1. **Start Simple**: Basic layouts work better for prototypes than complex designs
2. **Reuse Patterns**: Card printer architecture translated well to boards
3. **Test Early**: Generated first boards quickly to validate approach
4. **Flexible Templates**: One template with conditionals > multiple specialized templates
5. **Print Optimization**: Safe zones and bleed guides are essential for good cuts

---

*Last Updated: 2025-10-14*
*Status: Prototype System Complete*
*Next: Playtesting and iteration based on feedback*

