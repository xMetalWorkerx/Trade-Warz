# Card Layout Calibration Guide

## ✅ What's Been Changed

Cards are now **rotated 90° clockwise** for portrait printing layout. This is the standard approach for playing card sheets.

## 📐 Current Layout

### Card Dimensions (after rotation)
- **Card size**: 2.5" × 3.5" (portrait)
- **Layout space**: 3.5" × 2.5" (rotated 90° clockwise)
- **Grid**: 2 columns × 3 rows = 6 cards per sheet

### Current Spacing
```
Page: 8.5" × 11" (US Letter)
Margins: 0.5" all sides
Card slots: 3.5" wide × 2.5" tall (rotated)
Horizontal gutter: 0.5" between columns
Vertical gutter: 0.6" between rows
```

### Layout Math
**Width**: (2 × 3.5") + 0.5" + 0.5" + 0.5" = 8.5" ✓  
**Height**: (3 × 2.5") + 0.5" + 0.5" + (2 × 0.6") = 9.7" ✓

## 🔍 How to Calibrate

### Step 1: Print Test Sheet
```bash
npm run build:exports  # Generates 3 sheets of export cards
```

Open `dist/exports/preview.html` in your browser to see the layout before printing.

### Step 2: Print on Plain Paper First
Print `dist/exports/fronts.pdf` on regular paper to test alignment before using expensive cardstock.

### Step 3: Compare with Manufacturer Template
Check your test print against the manufacturer's template (the Word file you provided):

1. **Margins**: Measure from page edge to first card edge
2. **Card spacing**: Measure between cards (gutters)
3. **Overall alignment**: Do cards line up with template?

### Step 4: Adjust Settings
Edit `src/config.ts` to match manufacturer specs:

```typescript
export const SHEET = {
  unit: "in" as const,
  pageSize: { 
    width: 8.5,   // US Letter width
    height: 11    // US Letter height
  },
  margin: { 
    top: 0.5,     // ← Adjust these
    right: 0.5,   // ← Adjust these
    bottom: 0.5,  // ← Adjust these
    left: 0.5     // ← Adjust these
  },
  cols: 2,
  rows: 3,
  gutter: { 
    x: 0.5,       // ← Horizontal spacing
    y: 0.6        // ← Vertical spacing
  }
};
```

### Step 5: Fine-tune Nudge
If duplex printing, use NUDGE for micro-adjustments:

```typescript
export const NUDGE = {
  fronts: { x: 0, y: 0 },      // ← Adjust by ±0.01-0.05"
  backs: { x: 0, y: 0 }        // ← Adjust by ±0.01-0.05"
};
```

### Step 6: Regenerate & Test
```bash
npm run build:all  # Regenerate all cards with new settings
```

## 📏 Measuring Tips

### Using a Ruler
1. Print test sheet on plain paper
2. Measure from page edge to card edge = **margin**
3. Measure from one card edge to next card edge = **card + gutter**
4. Calculate: `gutter = measured distance - card dimension`

### Using the Template
1. Place printed test sheet over manufacturer template
2. Hold up to light
3. Note where alignment is off
4. Adjust margins/gutters accordingly

## 🎯 Common Adjustments

### Cards too far left/right
→ Adjust `margin.left` or `margin.right`

### Cards too high/low
→ Adjust `margin.top` or `margin.bottom`

### Cards too close together horizontally
→ Increase `gutter.x`

### Cards too close together vertically
→ Increase `gutter.y`

### Cards too far apart
→ Decrease gutters

### Everything shifted slightly
→ Use `NUDGE` for small adjustments (±0.02")

## 🔄 Iteration Process

1. Make one small adjustment at a time
2. Regenerate: `npm run build:exports`
3. Print test on plain paper
4. Measure & compare
5. Repeat until perfect
6. Document final values

## 📝 Manufacturer Template Info

Your Word template file: `6up_playing_cards_portrait.docx`

To extract exact measurements from it:
1. Open in Word
2. Click on a card placeholder
3. Right-click → "Format Object" or "Properties"
4. Note exact position and dimensions
5. Use those values in `config.ts`

## ⚙️ Current Status

- ✅ **Rotation**: Cards rotated 90° clockwise
- ✅ **Dimensions**: 2.5" × 3.5" portrait cards
- ⏳ **Spacing**: Using estimated values - needs calibration
- ⏳ **Nudge**: Set to zero - adjust after test print

## 🎯 Goal

Perfect alignment where:
- Cards line up exactly with template
- Clean cutting lines
- No overlap when cut
- Minimal waste on edges

## 💡 Pro Tips

1. **Test on plain paper first** - Save your cardstock!
2. **Measure twice, print once** - Double-check before big print run
3. **Keep notes** - Document what works for your printer
4. **Printer drift** - Different printers may need different settings
5. **Batch consistency** - Use same printer for all cards

## 📞 If You Get Stuck

Common issues and solutions:

**Issue**: Cards cut into each other  
**Solution**: Increase gutters

**Issue**: White borders after cutting  
**Solution**: Decrease margins slightly

**Issue**: Cards don't align with template  
**Solution**: Compare measurements exactly, adjust margins

**Issue**: Everything looks good but slightly off  
**Solution**: Use NUDGE for micro-adjustments

---

## 🚀 Quick Start

1. `npm run build:exports` - Generate test cards
2. Print `dist/exports/fronts.pdf` on plain paper
3. Compare with manufacturer template
4. Adjust `src/config.ts` margins/gutters
5. Regenerate and test again
6. When perfect, print on cardstock!

---

*Last Updated: 2025-10-13*  
*Status: Rotation implemented, calibration needed*

