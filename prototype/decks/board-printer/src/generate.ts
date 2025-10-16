// Trade Warz Board Generator
// Generates printable PDFs from board data

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Handlebars from "handlebars";
import type {
  LeaderData,
  TradingPartnerData,
  ReferenceCardData,
  PlayerAidData,
  DeckSpecKey
} from "./config.js";
import {
  BOARD_IN,
  BOARD_TYPES,
  MARKET_SIZES,
  SHEET,
  SHEET_BASE,
  SHEET_LAYOUTS,
  OUTPUT,
  DATA_PATHS,
  DECK_SPECS,
  calculateSheets,
  calculateEmptySlots,
  getMarketSizeConfig
} from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// UTILITIES
// ============================================================================

function readFile(relativePath: string): string {
  const fullPath = path.join(__dirname, relativePath);
  return fs.readFileSync(fullPath, "utf-8");
}

function writeFile(relativePath: string, content: string): void {
  const fullPath = path.join(__dirname, relativePath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content, "utf-8");
}

function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

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

Handlebars.registerHelper('or', function(...args) {
  // args is [arg1, arg2, ..., options]
  const options = args[args.length - 1];
  return args.slice(0, -1).some(arg => !!arg);
});

Handlebars.registerHelper('isArray', function(value) {
  return Array.isArray(value);
});

// ============================================================================
// BOARD RENDERING
// ============================================================================

// Card dimensions for poker-sized cards
const CARD_IN = {
  width: 2.5,
  height: 3.5,
  safe: 0.2
};

function renderLeaderBoard(leader: LeaderData, leaderTemplate: HandlebarsTemplateDelegate): string {
  const boardHtml = leaderTemplate({
    ...leader,
    safeZone: BOARD_IN.safe
  });
  return `<div style="--safe-zone:${BOARD_IN.safe}in;">${boardHtml}</div>`;
}

function renderTradingPartnerBoard(
  partner: TradingPartnerData,
  partnerTemplate: HandlebarsTemplateDelegate
): string {
  const marketSizeConfig = getMarketSizeConfig(partner.marketSize);
  
  // Generate influence boxes (0-9)
  const influenceBoxes = Array.from({ length: 10 }, (_, i) => i);
  
  // Generate route slots array with disabled flag
  const routeSlotArray = Array.from({ length: 5 }, (_, i) => {
    const slotNumber = i + 1;
    return {
      number: slotNumber,
      disabled: slotNumber > partner.routeSlots
    };
  }).map(slot => ({
    ...slot,
    toString() { return slot.number.toString(); }
  }));
  
  const boardHtml = partnerTemplate({
    ...partner,
    marketSizeLabel: marketSizeConfig.label,
    influenceBoxes,
    routeSlotArray,
    safeZone: BOARD_IN.safe
  });
  
  return `<div style="--safe-zone:${BOARD_IN.safe}in;">${boardHtml}</div>`;
}

function renderReferenceCard(card: ReferenceCardData, cardTemplate: HandlebarsTemplateDelegate): string {
  const cardHtml = cardTemplate({
    ...card,
    safeZone: CARD_IN.safe
  });
  return `<div style="--safe-zone:${CARD_IN.safe}in;">${cardHtml}</div>`;
}

function renderPlayerAid(aid: PlayerAidData, cardTemplate: HandlebarsTemplateDelegate): string {
  const cardHtml = cardTemplate({
    ...aid,
    safeZone: CARD_IN.safe
  });
  return `<div style="--safe-zone:${CARD_IN.safe}in;">${cardHtml}</div>`;
}

// ============================================================================
// SHEET COMPILATION
// ============================================================================

interface SheetData {
  deckName: string;
  totalBoards: number;
  pageCount: number;
  boardsPerSheet: number;
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
  boardW: number;
  boardH: number;
  gutterX: number;
  gutterY: number;
  pages: (string | null)[][];
}

function compileBoards(
  boards: string[],
  deckName: string,
  boardWidth: number,
  boardHeight: number,
  sheetTemplate: HandlebarsTemplateDelegate,
  layoutType: 'leader' | 'tradingPartner' = 'tradingPartner'
): string {
  const layout = SHEET_LAYOUTS[layoutType];
  const boardsPerSheet = layout.cols * layout.rows;
  const pageCount = Math.ceil(boards.length / boardsPerSheet);
  
  // Pad to fill sheets
  const paddedBoards: (string | null)[] = [...boards];
  while (paddedBoards.length % boardsPerSheet !== 0) {
    paddedBoards.push(null); // null = empty slot
  }
  
  // Chunk into pages
  const pages = chunk(paddedBoards, boardsPerSheet);
  
  // Load and inline CSS
  const commonCss = readFile("styles/common.css");
  const leaderCss = readFile("styles/leader-board.css");
  const partnerCss = readFile("styles/trading-partner.css");
  const inlinedCss = commonCss + "\n" + leaderCss + "\n" + partnerCss;
  
  const data: SheetData & { inlinedCss: string } = {
    deckName,
    totalBoards: boards.length,
    pageCount,
    boardsPerSheet,
    isPlural: pageCount !== 1,
    pageWidth: SHEET_BASE.pageSize.width,
    pageHeight: SHEET_BASE.pageSize.height,
    unit: SHEET_BASE.unit,
    marginTop: SHEET_BASE.margin.top,
    marginRight: SHEET_BASE.margin.right,
    marginBottom: SHEET_BASE.margin.bottom,
    marginLeft: SHEET_BASE.margin.left,
    cols: layout.cols,
    rows: layout.rows,
    boardW: boardWidth,
    boardH: boardHeight,
    gutterX: layout.gutter.x,
    gutterY: layout.gutter.y,
    inlinedCss,
    pages
  };
  
  return sheetTemplate(data);
}

function compileCards(
  cards: string[],
  deckName: string,
  sheetTemplate: HandlebarsTemplateDelegate
): string {
  // 6-up layout for poker cards (2 cols × 3 rows)
  const cardsPerSheet = 6;
  const pageCount = Math.ceil(cards.length / cardsPerSheet);
  
  // Pad to fill sheets
  const paddedCards: (string | null)[] = [...cards];
  while (paddedCards.length % cardsPerSheet !== 0) {
    paddedCards.push(null);
  }
  
  // Chunk into pages
  const pages = chunk(paddedCards, cardsPerSheet);
  
  // Load and inline CSS
  const commonCss = readFile("styles/common.css");
  const inlinedCss = commonCss;
  
  const data: SheetData & { inlinedCss: string } = {
    deckName,
    totalBoards: cards.length,
    pageCount,
    boardsPerSheet: cardsPerSheet,
    isPlural: pageCount !== 1,
    pageWidth: SHEET.pageSize.width,
    pageHeight: SHEET.pageSize.height,
    unit: SHEET.unit,
    marginTop: 0.5,
    marginRight: 0.25,
    marginBottom: 0.5,
    marginLeft: 0.25,
    cols: 2,
    rows: 3,
    boardW: CARD_IN.width,
    boardH: CARD_IN.height,
    gutterX: 0.5,
    gutterY: 0.6,
    inlinedCss,
    pages
  };
  
  return sheetTemplate(data);
}

// ============================================================================
// PDF GENERATION
// ============================================================================

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
  boardCount: number;
  sheetCount: number;
  emptySlots: number;
  frontsPath: string;
  previewPath: string;
}

async function generateLeaders(): Promise<GenerationResult> {
  console.log('\n📦 Generating Leader Boards...');
  
  // Load data
  const content = readFile(DATA_PATHS.leaders);
  const leaders = JSON.parse(content) as LeaderData[];
  console.log(`   Found ${leaders.length} leaders`);
  
  // Load templates
  const sheetTemplate = compileTemplate("templates/sheet.hbs");
  const leaderTemplate = compileTemplate("templates/leader-board.hbs");
  
  // Render boards
  const boardHtmls = leaders.map(leader => renderLeaderBoard(leader, leaderTemplate));
  
  // Compile into sheets (portrait: 6" × 8")
  const html = compileBoards(boardHtmls, "Leader Boards", 6, 8, sheetTemplate, 'leader');
  
  // Write HTML
  const projectRoot = path.join(__dirname, "..");
  const htmlPath = OUTPUT.getFrontsHtml("leaders");
  const previewPath = OUTPUT.getPreviewHtml("leaders");
  
  writeFile(`../${htmlPath}`, html);
  writeFile(`../${previewPath}`, html);
  
  console.log(`   ✅ HTML generated`);
  
  // Generate PDF
  const pdfPath = OUTPUT.getFrontsPdf("leaders");
  console.log(`   🖨️  Rendering PDF...`);
  await renderPdf(html, path.join(projectRoot, pdfPath));
  
  const sheetCount = calculateSheets(leaders.length);
  const emptySlots = calculateEmptySlots(leaders.length);
  
  console.log(`   ✅ PDF generated`);
  console.log(`   📄 ${sheetCount} sheet(s), ${emptySlots} empty slot(s)`);
  
  return {
    deckName: "Leader Boards",
    boardCount: leaders.length,
    sheetCount,
    emptySlots,
    frontsPath: pdfPath,
    previewPath
  };
}

async function generateTradingPartners(): Promise<GenerationResult> {
  console.log('\n📦 Generating Trading Partner Boards...');
  
  // Load data
  const content = readFile(DATA_PATHS.tradingPartners);
  const partners = JSON.parse(content) as TradingPartnerData[];
  console.log(`   Found ${partners.length} trading partners`);
  
  // Load templates
  const sheetTemplate = compileTemplate("templates/sheet.hbs");
  const partnerTemplate = compileTemplate("templates/trading-partner.hbs");
  
  // Render boards
  const boardHtmls = partners.map(partner => 
    renderTradingPartnerBoard(partner, partnerTemplate)
  );
  
  // Compile into sheets (landscape: 8" × 6")
  const html = compileBoards(boardHtmls, "Trading Partner Boards", 8, 6, sheetTemplate, 'tradingPartner');
  
  // Write HTML
  const projectRoot = path.join(__dirname, "..");
  const htmlPath = OUTPUT.getFrontsHtml("trading-partners");
  const previewPath = OUTPUT.getPreviewHtml("trading-partners");
  
  writeFile(`../${htmlPath}`, html);
  writeFile(`../${previewPath}`, html);
  
  console.log(`   ✅ HTML generated`);
  
  // Generate PDF
  const pdfPath = OUTPUT.getFrontsPdf("trading-partners");
  console.log(`   🖨️  Rendering PDF...`);
  await renderPdf(html, path.join(projectRoot, pdfPath));
  
  const sheetCount = calculateSheets(partners.length);
  const emptySlots = calculateEmptySlots(partners.length);
  
  console.log(`   ✅ PDF generated`);
  console.log(`   📄 ${sheetCount} sheet(s), ${emptySlots} empty slot(s)`);
  
  return {
    deckName: "Trading Partner Boards",
    boardCount: partners.length,
    sheetCount,
    emptySlots,
    frontsPath: pdfPath,
    previewPath
  };
}

async function generateReferenceCards(): Promise<GenerationResult> {
  console.log('\n📦 Generating Reference Cards...');
  
  // Load data
  const content = readFile(DATA_PATHS.referenceCards);
  const cards = JSON.parse(content) as ReferenceCardData[];
  console.log(`   Found ${cards.length} reference cards`);
  
  // Load templates
  const sheetTemplate = compileTemplate("templates/sheet.hbs");
  const cardTemplate = compileTemplate("templates/reference-card.hbs");
  
  // Render cards
  const cardHtmls = cards.map(card => renderReferenceCard(card, cardTemplate));
  
  // Compile into sheets (6-up poker layout)
  const html = compileCards(cardHtmls, "Reference Cards", sheetTemplate);
  
  // Write HTML
  const projectRoot = path.join(__dirname, "..");
  const htmlPath = OUTPUT.getFrontsHtml("reference-cards");
  const previewPath = OUTPUT.getPreviewHtml("reference-cards");
  
  writeFile(`../${htmlPath}`, html);
  writeFile(`../${previewPath}`, html);
  
  console.log(`   ✅ HTML generated`);
  
  // Generate PDF
  const pdfPath = OUTPUT.getFrontsPdf("reference-cards");
  console.log(`   🖨️  Rendering PDF...`);
  await renderPdf(html, path.join(projectRoot, pdfPath));
  
  const sheetCount = Math.ceil(cards.length / 6);
  const emptySlots = (sheetCount * 6) - cards.length;
  
  console.log(`   ✅ PDF generated`);
  console.log(`   📄 ${sheetCount} sheet(s), ${emptySlots} empty slot(s)`);
  
  return {
    deckName: "Reference Cards",
    boardCount: cards.length,
    sheetCount,
    emptySlots,
    frontsPath: pdfPath,
    previewPath
  };
}

async function generatePlayerAids(): Promise<GenerationResult> {
  console.log('\n📦 Generating Player Aid Cards...');
  
  // Load data
  const content = readFile(DATA_PATHS.playerAids);
  const aids = JSON.parse(content) as PlayerAidData[];
  console.log(`   Found ${aids.length} player aid cards`);
  
  // Load templates
  const sheetTemplate = compileTemplate("templates/sheet.hbs");
  const cardTemplate = compileTemplate("templates/player-aid.hbs");
  
  // Render cards
  const cardHtmls = aids.map(aid => renderPlayerAid(aid, cardTemplate));
  
  // Compile into sheets (6-up poker layout)
  const html = compileCards(cardHtmls, "Player Aid Cards", sheetTemplate);
  
  // Write HTML
  const projectRoot = path.join(__dirname, "..");
  const htmlPath = OUTPUT.getFrontsHtml("player-aids");
  const previewPath = OUTPUT.getPreviewHtml("player-aids");
  
  writeFile(`../${htmlPath}`, html);
  writeFile(`../${previewPath}`, html);
  
  console.log(`   ✅ HTML generated`);
  
  // Generate PDF
  const pdfPath = OUTPUT.getFrontsPdf("player-aids");
  console.log(`   🖨️  Rendering PDF...`);
  await renderPdf(html, path.join(projectRoot, pdfPath));
  
  const sheetCount = Math.ceil(aids.length / 6);
  const emptySlots = (sheetCount * 6) - aids.length;
  
  console.log(`   ✅ PDF generated`);
  console.log(`   📄 ${sheetCount} sheet(s), ${emptySlots} empty slot(s)`);
  
  return {
    deckName: "Player Aid Cards",
    boardCount: aids.length,
    sheetCount,
    emptySlots,
    frontsPath: pdfPath,
    previewPath
  };
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const target = args[0] || "all";
  
  console.log('🎴 Trade Warz Board Generator');
  console.log(`🎯 Target: ${target}`);
  console.log();
  
  const results: GenerationResult[] = [];
  
  try {
    if (target === "all") {
      results.push(await generateLeaders());
      results.push(await generateTradingPartners());
      results.push(await generateReferenceCards());
      results.push(await generatePlayerAids());
      
    } else if (target === "leaders") {
      results.push(await generateLeaders());
      
    } else if (target === "partners" || target === "trading-partners") {
      results.push(await generateTradingPartners());
      
    } else if (target === "reference") {
      results.push(await generateReferenceCards());
      
    } else if (target === "aids") {
      results.push(await generatePlayerAids());
      
    } else {
      console.error(`❌ Unknown target: ${target}`);
      console.error();
      console.error("Valid targets:");
      console.error("  all             Generate all boards and cards");
      console.error("  leaders         Leader boards only");
      console.error("  partners        Trading partner boards only");
      console.error("  reference       Reference cards only");
      console.error("  aids            Player aid cards only");
      process.exit(1);
    }
    
    // Summary
    if (results.length > 0) {
      console.log();
      console.log("✨ Generation Complete!");
      console.log();
      console.log("📊 Summary:");
      
      const totalBoards = results.reduce((sum, r) => sum + r.boardCount, 0);
      const totalSheets = results.reduce((sum, r) => sum + r.sheetCount, 0);
      
      console.log(`   Total boards: ${totalBoards}`);
      console.log(`   Total sheets: ${totalSheets}`);
      console.log();
      
      results.forEach(r => {
        console.log(`   ${r.deckName}:`);
        console.log(`     Boards: ${r.boardCount}`);
        console.log(`     Sheets: ${r.sheetCount}`);
        console.log(`     Fronts: ${r.frontsPath}`);
        console.log(`     Preview: ${r.previewPath}`);
        console.log();
      });
      
      console.log("🎉 Ready to print!");
      console.log();
      console.log("Next steps:");
      console.log("  1. Check preview HTML files in dist/*/");
      console.log("  2. Print PDFs on heavy cardstock");
      console.log("  3. Cut boards along guides");
      console.log("  4. Playtest! 🎲");
    }
    
  } catch (error) {
    console.error("❌ Error during generation:");
    console.error(error);
    process.exit(1);
  }
}

main();

