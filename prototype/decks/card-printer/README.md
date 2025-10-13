# Trade Warz Card Printer

6-up poker card printer for Trade Warz board game prototype. Generates printable PDFs on US Letter 80lb laser gloss cover stock.

## Features

- **6-up Layout**: 2 columns × 3 rows per sheet (poker-sized cards: 2.5" × 3.5")
- **Type-Specific Templates**: Unique designs for Export, Policy, Tactic, Event, and Leader cards
- **Color-Coded Backs**: Simple letter codes (E/P/T/V/L) for easy identification
- **Batch Processing**: Generate PDFs by card type or all at once
- **Preview HTML**: View layout before printing
- **Calibration Support**: Adjust margins and gutters for your printer

## Quick Start

```bash
# Install dependencies
npm install
npm run install:pw

# Convert markdown data to JSON
npm run convert

# Generate all cards
npm run build:all

# Generate specific deck types
npm run build:exports
npm run build:policies
npm run build:leaders
```

## Project Structure

```
card-printer/
├── src/
│   ├── config.ts           # Card geometry and configuration
│   ├── converter.ts        # Markdown → JSON converter
│   ├── generate.ts         # Main PDF generator
│   ├── templates/          # Handlebars templates
│   │   ├── sheet.hbs       # Page layout
│   │   ├── card-export.hbs # Export card design
│   │   ├── card-policy.hbs # Policy card design
│   │   ├── card-tactic.hbs # Tactic card design
│   │   ├── card-event.hbs  # Event card design
│   │   ├── card-leader.hbs # Leader card design
│   │   └── card-back.hbs   # Card backs
│   └── styles/             # CSS styling
│       ├── common.css      # Shared styles
│       └── [type].css      # Type-specific styles
└── dist/                   # Generated PDFs and HTML
    ├── exports/
    ├── policies/
    └── ...
```

## Card Types

- **Export** (Blue) - Trade goods that establish routes
- **Policy** (Green) - Economic engines and persistent effects  
- **Tactic** (Red) - Instant actions and disruption
- **Event** (Purple) - Global effects affecting all players
- **Leader** (Gold) - Leader-specific signature cards

## Configuration

Edit `src/config.ts` to adjust:
- Card dimensions and bleed
- Sheet margins and gutters
- Nudge offsets for duplex alignment
- Card type colors
- Output paths

## Printing

1. Generate PDFs: `npm run build:all`
2. Print fronts on 80lb laser gloss cover stock
3. Print backs (track orientation!)
4. Cut cards along guides
5. Optional: Sleeve in standard poker-sized sleeves

## Development Status

✅ **Phase 1**: Project Setup - COMPLETE  
⏳ **Phase 2**: Configuration & Core Logic - IN PROGRESS  
⏳ **Phase 3**: Card Templates - PENDING  
⏳ **Phase 4**: Styling - PENDING  
⏳ **Phase 5**: Generator Script - PENDING  

See `../printing-setup-tasks.md` for detailed roadmap.

## Dependencies

- **handlebars**: Template rendering
- **playwright**: PDF generation via Chromium
- **tsx**: TypeScript runner
- **typescript**: Type checking

## License

MIT

