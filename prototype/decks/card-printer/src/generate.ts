// Trade Warz Card Generator
// Generates printable PDFs from card data

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Handlebars from "handlebars";
import type { CardData, CardType, DeckSpecKey } from "./config.js";
import {
  CARD_IN,
  CARD_TYPES,
  RARITIES,
  SHEET,
  NUDGE,
  OUTPUT,
  DATA_PATHS,
  DECK_SPECS,
  calculateSheets,
  calculateEmptySlots,
  getCardTypeConfig,
  getRarityConfig
} from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Read file as string
 */
function readFile(relativePath: string): string {
  const fullPath = path.join(__dirname, relativePath);
  return fs.readFileSync(fullPath, "utf-8");
}

/**
 * Write file
 */
function writeFile(relativePath: string, content: string): void {
  const fullPath = path.join(__dirname, relativePath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content, "utf-8");
}

/**
 * Chunk array into groups
 */
function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Compile Handlebars template
 */
function compileTemplate(templatePath: string): HandlebarsTemplateDelegate {
  const content = readFile(templatePath);
  return Handlebars.compile(content);
}

// ============================================================================
// REGISTER HANDLEBARS HELPERS
// ============================================================================

Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

Handlebars.registerHelper('unless', function(conditional, options) {
  if (!conditional) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// ============================================================================
// CARD RENDERING
// ============================================================================

interface EnrichedCardData extends CardData {
  typeColor: string;
  typeBgLight: string;
  typeLabel: string;
  backLetter: string;
  raritySymbol?: string;
  rarityLabel?: string;
  rarityColor?: string;
}

/**
 * Enrich card data with computed values
 */
function enrichCardData(card: CardData): EnrichedCardData {
  const typeConfig = getCardTypeConfig(card.type);
  const rarityConfig = card.rarity ? getRarityConfig(card.rarity) : null;
  
  return {
    ...card,
    typeColor: typeConfig.color,
    typeBgLight: typeConfig.bgLight,
    typeLabel: typeConfig.label,
    backLetter: typeConfig.back,
    raritySymbol: rarityConfig?.symbol,
    rarityLabel: rarityConfig?.label,
    rarityColor: rarityConfig?.color
  };
}

/**
 * Render a single card to HTML
 */
function renderCard(card: CardData, cardTemplate: HandlebarsTemplateDelegate): string {
  const enrichedCard = enrichCardData(card);
  
  // Add safe zone CSS variable
  const cardHtml = cardTemplate(enrichedCard);
  return `<div style="--safe-zone:${CARD_IN.safe}in;">${cardHtml}</div>`;
}

/**
 * Render card back
 */
function renderCardBack(type: CardType, backTemplate: HandlebarsTemplateDelegate): string {
  const typeConfig = getCardTypeConfig(type);
  
  const backHtml = backTemplate({
    backLetter: typeConfig.back,
    typeLabel: typeConfig.label,
    typeColor: typeConfig.color
  });
  
  return `<div style="--safe-zone:${CARD_IN.safe}in;">${backHtml}</div>`;
}

// ============================================================================
// SHEET COMPILATION
// ============================================================================

interface SheetData {
  deckName: string;
  totalCards: number;
  pageCount: number;
  cardsPerSheet: number;
  isPlural: boolean;
  pageWidth: number;
  pageHeight: number;
  unit: string;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  cols: number;
  rows: number;
  cardW: number;
  cardH: number;
  gutterX: number;
  gutterY: number;
  nudgeX: number;
  nudgeY: number;
  styleSheet?: string;
  pages: (string | null)[][];
}

/**
 * Compile cards into sheet HTML with inlined CSS
 */
function compileSheet(
  cards: string[],
  deckName: string,
  cardType: CardType,
  nudgeX: number,
  nudgeY: number,
  sheetTemplate: HandlebarsTemplateDelegate
): string {
  const cardsPerSheet = SHEET.cols * SHEET.rows;
  const pageCount = Math.ceil(cards.length / cardsPerSheet);
  
  // Pad to fill sheets
  const paddedCards: (string | null)[] = [...cards];
  while (paddedCards.length % cardsPerSheet !== 0) {
    paddedCards.push(null); // null = empty slot
  }
  
  // Chunk into pages
  const pages = chunk(paddedCards, cardsPerSheet);
  
  // Load and inline CSS
  const commonCss = readFile("styles/common.css");
  const typeCss = readFile(`styles/${cardType}.css`);
  const backCss = readFile("styles/back.css");
  const inlinedCss = commonCss + "\n" + typeCss + "\n" + backCss;
  
  const data: SheetData & { inlinedCss: string } = {
    deckName,
    totalCards: cards.length,
    pageCount,
    cardsPerSheet,
    isPlural: pageCount !== 1,
    pageWidth: SHEET.pageSize.width,
    pageHeight: SHEET.pageSize.height,
    unit: SHEET.unit,
    marginTop: SHEET.margin.top,
    marginRight: SHEET.margin.right,
    marginBottom: SHEET.margin.bottom,
    marginLeft: SHEET.margin.left,
    cols: SHEET.cols,
    rows: SHEET.rows,
    cardW: CARD_IN.layoutWidth,  // Use layout dimensions (rotated)
    cardH: CARD_IN.layoutHeight,
    gutterX: SHEET.gutter.x,
    gutterY: SHEET.gutter.y,
    nudgeX,
    nudgeY,
    styleSheet: cardType, // e.g., "export" loads export.css
    inlinedCss, // Inline all CSS for PDF rendering
    pages
  };
  
  return sheetTemplate(data);
}

// ============================================================================
// PDF GENERATION
// ============================================================================

/**
 * Render HTML to PDF using Playwright
 */
async function renderPdf(html: string, outputPath: string): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setContent(html, { waitUntil: "load" });
  
  await page.pdf({
    path: outputPath,
    printBackground: true,
    preferCSSPageSize: true
  });
  
  await browser.close();
}

// ============================================================================
// MAIN GENERATION LOGIC
// ============================================================================

interface GenerationResult {
  deckName: string;
  cardType: CardType;
  cardCount: number;
  sheetCount: number;
  emptySlots: number;
  frontsPath: string;
  backsPath: string;
  previewPath: string;
}

/**
 * Generate cards for a specific deck
 */
async function generateDeck(
  deckKey: DeckSpecKey,
  dataPath: string | string[]
): Promise<GenerationResult> {
  const spec = DECK_SPECS[deckKey];
  
  console.log(`\n📦 Generating ${spec.name}...`);
  
  // Load card data
  let allCards: CardData[] = [];
  const paths = Array.isArray(dataPath) ? dataPath : [dataPath];
  
  for (const p of paths) {
    const content = readFile(p);
    const cards = JSON.parse(content) as CardData[];
    allCards = allCards.concat(cards);
  }
  
  console.log(`   Found ${allCards.length} cards`);
  
  // Load templates
  const sheetTemplate = compileTemplate("templates/sheet.hbs");
  const cardTemplate = compileTemplate(`templates/card-${spec.type}.hbs`);
  const backTemplate = compileTemplate("templates/card-back.hbs");
  
  // Render fronts
  const frontCards = allCards.map(card => renderCard(card, cardTemplate));
  const frontsHtml = compileSheet(
    frontCards,
    spec.name,
    spec.type,
    NUDGE.fronts.x,
    NUDGE.fronts.y,
    sheetTemplate
  );
  
  // Render backs
  const sheetCount = calculateSheets(allCards.length);
  const backCards = Array(allCards.length)
    .fill(null)
    .map(() => renderCardBack(spec.type, backTemplate));
  const backsHtml = compileSheet(
    backCards,
    `${spec.name} - Backs`,
    spec.type,
    NUDGE.backs.x,
    NUDGE.backs.y,
    sheetTemplate
  );
  
  // Write HTML files (relative to project root, not src/)
  const projectRoot = path.join(__dirname, "..");
  const frontsHtmlPath = OUTPUT.getFrontsHtml(deckKey);
  const backsHtmlPath = OUTPUT.getBacksHtml(deckKey);
  const previewHtmlPath = OUTPUT.getPreviewHtml(deckKey);
  
  writeFile(`../${frontsHtmlPath}`, frontsHtml);
  writeFile(`../${backsHtmlPath}`, backsHtml);
  writeFile(`../${previewHtmlPath}`, frontsHtml); // Preview is just fronts
  
  console.log(`   ✅ HTML generated`);
  
  // Generate PDFs
  const frontsPdfPath = OUTPUT.getFrontsPdf(deckKey);
  const backsPdfPath = OUTPUT.getBacksPdf(deckKey);
  
  console.log(`   🖨️  Rendering PDFs...`);
  await renderPdf(frontsHtml, path.join(projectRoot, frontsPdfPath));
  await renderPdf(backsHtml, path.join(projectRoot, backsPdfPath));
  
  const emptySlots = calculateEmptySlots(allCards.length);
  
  console.log(`   ✅ PDFs generated`);
  console.log(`   📄 ${sheetCount} sheet(s), ${emptySlots} empty slot(s)`);
  
  return {
    deckName: spec.name,
    cardType: spec.type,
    cardCount: allCards.length,
    sheetCount,
    emptySlots,
    frontsPath: frontsPdfPath,
    backsPath: backsPdfPath,
    previewPath: previewHtmlPath
  };
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const target = args[0] || "all";
  
  console.log(`🎴 Trade Warz Card Generator`);
  console.log(`🎯 Target: ${target}`);
  console.log();
  
  const results: GenerationResult[] = [];
  
  try {
    if (target === "all") {
      // Generate all decks
      results.push(await generateDeck("exports", DATA_PATHS.globalExports));
      results.push(await generateDeck("policies", DATA_PATHS.globalPolicies));
      results.push(await generateDeck("tactics", DATA_PATHS.globalTactics));
      results.push(await generateDeck("events", DATA_PATHS.globalEvents));
      results.push(await generateDeck("leaders", DATA_PATHS.allLeaders));
      
    } else if (target === "exports") {
      results.push(await generateDeck("exports", DATA_PATHS.globalExports));
      
    } else if (target === "policies") {
      results.push(await generateDeck("policies", DATA_PATHS.globalPolicies));
      
    } else if (target === "tactics") {
      results.push(await generateDeck("tactics", DATA_PATHS.globalTactics));
      
    } else if (target === "events") {
      results.push(await generateDeck("events", DATA_PATHS.globalEvents));
      
    } else if (target === "leaders") {
      results.push(await generateDeck("leaders", DATA_PATHS.allLeaders));
      
    } else if (target === "leader-usa") {
      results.push(await generateDeck("leader-usa", DATA_PATHS.leaderUsa));
      
    } else if (target === "leader-china") {
      results.push(await generateDeck("leader-china", DATA_PATHS.leaderChina));
      
    } else if (target === "leader-russia") {
      results.push(await generateDeck("leader-russia", DATA_PATHS.leaderRussia));
      
    } else {
      console.error(`❌ Unknown target: ${target}`);
      console.error();
      console.error("Valid targets:");
      console.error("  all             Generate all cards");
      console.error("  exports         Global exports only");
      console.error("  policies        Global policies only");
      console.error("  tactics         Global tactics only");
      console.error("  events          Global events only");
      console.error("  leaders         All leader decks");
      console.error("  leader-usa      USA leader deck only");
      console.error("  leader-china    China leader deck only");
      console.error("  leader-russia   Russia leader deck only");
      process.exit(1);
    }
    
    // Summary
    console.log();
    console.log("✨ Generation Complete!");
    console.log();
    console.log("📊 Summary:");
    
    const totalCards = results.reduce((sum, r) => sum + r.cardCount, 0);
    const totalSheets = results.reduce((sum, r) => sum + r.sheetCount, 0);
    
    console.log(`   Total cards: ${totalCards}`);
    console.log(`   Total sheets: ${totalSheets} fronts + ${totalSheets} backs = ${totalSheets * 2} pages`);
    console.log();
    
    results.forEach(r => {
      console.log(`   ${r.deckName}:`);
      console.log(`     Cards: ${r.cardCount}`);
      console.log(`     Sheets: ${r.sheetCount}`);
      console.log(`     Fronts: ${r.frontsPath}`);
      console.log(`     Backs: ${r.backsPath}`);
      console.log(`     Preview: ${r.previewPath}`);
      console.log();
    });
    
    console.log("🎉 Ready to print!");
    console.log();
    console.log("Next steps:");
    console.log("  1. Check preview HTML files in dist/*/");
    console.log("  2. Print PDFs on 80lb cardstock");
    console.log("  3. Cut cards along guides");
    console.log("  4. Playtest! 🎲");
    
  } catch (error) {
    console.error("❌ Error during generation:");
    console.error(error);
    process.exit(1);
  }
}

main();
