# Trade Warz Board Printer

8" × 6" board printer for Trade Warz leader boards and trading partner boards. Generates printable PDFs in 2-up layout on US Letter paper.

## Features

- **2-Up Layout**: 2 boards per sheet (8" × 6" each)
- **Leader Boards**: Portrait orientation (3 leaders)
- **Trading Partner Boards**: Landscape orientation (15 partners)
- **Reference Cards**: Poker-sized reference cards (5-6 cards)
- **Player Aid Cards**: Leader-specific quick reference cards (3-4 cards)
- **Print-Ready PDFs**: Generated via Playwright with exact dimensions
- **HTML Preview**: View layouts before printing

## Quick Start

```bash
# Convert markdown data to JSON
npm run convert

# Generate all boards
npm run build:all

# Generate specific types
npm run build:leaders
npm run build:partners
npm run build:reference
npm run build:aids
```

## Project Structure

```
board-printer/
├── src/
│   ├── config.ts           # Board geometry and configuration
│   ├── converter.ts        # Markdown → JSON converter
│   ├── generate.ts         # Main PDF generator
│   ├── templates/          # Handlebars templates
│   │   ├── sheet.hbs       # Page layout (2-up)
│   │   ├── leader-board.hbs
│   │   ├── trading-partner.hbs
│   │   └── reference-*.hbs
│   └── styles/             # CSS styling
│       ├── common.css
│       ├── leader-board.css
│       └── trading-partner.css
├── data/                   # Generated JSON data
└── dist/                   # Generated PDFs and HTML
    ├── leaders/
    ├── trading-partners/
    ├── reference-cards/
    └── player-aids/
```

## Board Types

- **Leader Boards** (Portrait 8" × 6"): Player boards with abilities, trade route tracker
- **Trading Partner Boards** (Landscape 8" × 6"): Central boards with influence track, route slots
- **Reference Cards** (Poker 2.5" × 3.5"): Turn order, CMYK, disputes, etc.
- **Player Aid Cards** (Poker 2.5" × 3.5"): Leader quick references

## Configuration

Edit `src/config.ts` to adjust:
- Board dimensions and bleed
- Sheet margins and gutters
- Board orientations
- Color schemes
- Output paths

## Printing

1. Generate PDFs: `npm run build:all`
2. Print on heavy cardstock (80-110lb)
3. Cut boards along guides
4. Components ready for playtesting!

## Development Status

🚧 **In Progress** - See `board-printer-tasks.md` for detailed task list

## Dependencies

- **handlebars**: Template rendering
- **playwright**: PDF generation via Chromium
- **tsx**: TypeScript runner
- **typescript**: Type checking

## License

MIT

