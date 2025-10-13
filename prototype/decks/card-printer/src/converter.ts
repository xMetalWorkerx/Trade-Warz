// Trade Warz Markdown to JSON Converter
// Converts card definitions from markdown files to JSON

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CardData, CardType, Rarity } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// MARKDOWN PARSING
// ============================================================================

interface ParsedCard extends CardData {
  sourceFile: string;
  lineNumber?: number;
}

/**
 * Parse a markdown file and extract card definitions
 */
function parseMarkdownFile(filePath: string, content: string): ParsedCard[] {
  const cards: ParsedCard[] = [];
  const lines = content.split('\n');
  
  let currentCard: Partial<ParsedCard> | null = null;
  let inSection = false;
  let currentSection = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Detect section headers (e.g., "# 🌐 Global Export Deck")
    if (trimmedLine.startsWith('#') && (
      trimmedLine.includes('Export') || 
      trimmedLine.includes('Policy') || 
      trimmedLine.includes('Tactic') || 
      trimmedLine.includes('Event')
    )) {
      currentSection = trimmedLine;
      inSection = true;
      continue;
    }
    
    // Detect card name (starts with ###)
    if (trimmedLine.startsWith('### ') && inSection) {
      // Save previous card if exists
      if (currentCard && currentCard.name) {
        cards.push(currentCard as ParsedCard);
      }
      
      // Start new card
      const cardName = trimmedLine.replace(/^###\s+/, '').trim();
      currentCard = {
        name: cardName,
        sourceFile: filePath,
        lineNumber: i + 1
      };
      continue;
    }
    
    // Parse card properties
    if (currentCard && trimmedLine.startsWith('**Type**:')) {
      const match = trimmedLine.match(/\*\*Type\*\*:\s*(\w+)/);
      if (match) {
        const type = match[1].toLowerCase();
        currentCard.type = type as CardType;
      }
      
      // Rarity is often on same line
      const rarityMatch = trimmedLine.match(/\*\*Rarity\*\*:\s*(\w+)/);
      if (rarityMatch) {
        currentCard.rarity = rarityMatch[1].toLowerCase() as Rarity;
      }
      
      // Leader is often on same line
      const leaderMatch = trimmedLine.match(/\*\*Leader\*\*:\s*([^|]+)/);
      if (leaderMatch) {
        currentCard.leader = leaderMatch[1].trim();
      }
      continue;
    }
    
    // Parse cost
    if (currentCard && trimmedLine.startsWith('- **Cost**:')) {
      const match = trimmedLine.match(/\*\*Cost\*\*:\s*(\d+)/);
      if (match) {
        currentCard.cost = parseInt(match[1]);
      }
      continue;
    }
    
    // Parse influence
    if (currentCard && trimmedLine.startsWith('- **Influence**:')) {
      const match = trimmedLine.match(/\*\*Influence\*\*:\s*(\d+)/);
      if (match) {
        currentCard.influence = parseInt(match[1]);
      }
      continue;
    }
    
    // Parse revenue
    if (currentCard && trimmedLine.startsWith('- **Revenue**:')) {
      const match = trimmedLine.match(/\*\*Revenue\*\*:\s*(\d+)/);
      if (match) {
        currentCard.revenue = parseInt(match[1]);
      }
      continue;
    }
    
    // Parse effect
    if (currentCard && trimmedLine.startsWith('- **Effect**:')) {
      const effect = trimmedLine.replace(/^- \*\*Effect\*\*:\s*/, '').trim();
      currentCard.effect = effect;
      continue;
    }
    
    // Parse flavor text (italic text in quotes)
    if (currentCard && trimmedLine.startsWith('- **Flavor Text**:')) {
      const flavorMatch = trimmedLine.match(/\*"([^"]+)"\*/);
      if (flavorMatch) {
        currentCard.flavor = flavorMatch[1];
      }
      continue;
    }
    
    // Alternative flavor text format (just italic)
    if (currentCard && trimmedLine.startsWith('- **Flavor**:')) {
      const flavorMatch = trimmedLine.match(/\*"([^"]+)"\*/);
      if (flavorMatch) {
        currentCard.flavor = flavorMatch[1];
      }
      continue;
    }
  }
  
  // Don't forget the last card
  if (currentCard && currentCard.name) {
    cards.push(currentCard as ParsedCard);
  }
  
  return cards;
}

/**
 * Filter cards by type
 */
function filterCardsByType(cards: ParsedCard[], type: CardType): ParsedCard[] {
  return cards.filter(card => card.type === type);
}

/**
 * Filter leader cards by leader name
 */
function filterCardsByLeader(cards: ParsedCard[], leaderName: string): ParsedCard[] {
  return cards.filter(card => 
    card.leader && card.leader.toLowerCase().includes(leaderName.toLowerCase())
  );
}

// ============================================================================
// FILE I/O
// ============================================================================

/**
 * Read markdown file
 */
function readMarkdownFile(relativePath: string): string {
  const fullPath = path.join(__dirname, relativePath);
  console.log(`📖 Reading: ${relativePath}`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }
  
  return fs.readFileSync(fullPath, 'utf-8');
}

/**
 * Write JSON file
 */
function writeJsonFile(relativePath: string, data: any): void {
  const fullPath = path.join(__dirname, relativePath);
  const dir = path.dirname(fullPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Clean data (remove sourceFile and lineNumber)
  const cleanData = data.map((card: ParsedCard) => {
    const { sourceFile, lineNumber, ...cleanCard } = card;
    return cleanCard;
  });
  
  fs.writeFileSync(fullPath, JSON.stringify(cleanData, null, 2), 'utf-8');
  console.log(`✅ Wrote: ${relativePath} (${cleanData.length} cards)`);
}

// ============================================================================
// MAIN CONVERSION
// ============================================================================

async function main() {
  console.log(`🔄 Trade Warz Data Converter`);
  console.log(`📝 Converting Markdown → JSON`);
  console.log();
  
  try {
    // Read source files
    const globalDecksContent = readMarkdownFile('../../../global_decks.md');
    const leaderDecksContent = readMarkdownFile('../../../leader_decks.md');
    
    // Parse all cards
    console.log();
    console.log('🔍 Parsing cards...');
    const globalCards = parseMarkdownFile('global_decks.md', globalDecksContent);
    const leaderCards = parseMarkdownFile('leader_decks.md', leaderDecksContent);
    
    console.log(`   Found ${globalCards.length} global cards`);
    console.log(`   Found ${leaderCards.length} leader cards`);
    console.log();
    
    // Separate by type
    console.log('📦 Organizing by deck type...');
    
    // Global decks
    const globalExports = filterCardsByType(globalCards, 'export');
    const globalPolicies = filterCardsByType(globalCards, 'policy');
    const globalTactics = filterCardsByType(globalCards, 'tactic');
    const globalEvents = filterCardsByType(globalCards, 'event');
    
    console.log(`   Global Exports: ${globalExports.length} cards`);
    console.log(`   Global Policies: ${globalPolicies.length} cards`);
    console.log(`   Global Tactics: ${globalTactics.length} cards`);
    console.log(`   Global Events: ${globalEvents.length} cards`);
    
    // Leader decks
    const usaCards = filterCardsByLeader(leaderCards, 'USA');
    const chinaCards = filterCardsByLeader(leaderCards, 'China');
    const russiaCards = filterCardsByLeader(leaderCards, 'Russia');
    
    console.log(`   USA Leader: ${usaCards.length} cards`);
    console.log(`   China Leader: ${chinaCards.length} cards`);
    console.log(`   Russia Leader: ${russiaCards.length} cards`);
    console.log();
    
    // Write JSON files
    console.log('💾 Writing JSON files...');
    writeJsonFile('../data/global-exports.json', globalExports);
    writeJsonFile('../data/global-policies.json', globalPolicies);
    writeJsonFile('../data/global-tactics.json', globalTactics);
    writeJsonFile('../data/global-events.json', globalEvents);
    writeJsonFile('../data/leader-usa.json', usaCards);
    writeJsonFile('../data/leader-china.json', chinaCards);
    writeJsonFile('../data/leader-russia.json', russiaCards);
    
    console.log();
    console.log('✨ Conversion complete!');
    console.log();
    console.log('📊 Summary:');
    console.log(`   Total cards: ${globalCards.length + leaderCards.length}`);
    console.log(`   Global decks: ${globalExports.length + globalPolicies.length + globalTactics.length + globalEvents.length}`);
    console.log(`   Leader decks: ${usaCards.length + chinaCards.length + russiaCards.length}`);
    console.log();
    console.log('Next step: Implement card templates (Phase 3)');
    
  } catch (error) {
    console.error('❌ Error during conversion:');
    console.error(error);
    process.exit(1);
  }
}

main();
