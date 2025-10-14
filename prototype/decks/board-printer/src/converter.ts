// Trade Warz Board Data Converter
// Converts markdown files to JSON data for boards and cards

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type {
  LeaderData,
  LeaderAbility,
  TradingPartnerData,
  InfluenceBonus,
  Suzerainty,
  ReferenceCardData,
  PlayerAidData,
  MarketSize,
  LeaderCode
} from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// LEADER DATA PARSING
// ============================================================================

function parseLeaderSpecs(content: string): LeaderData[] {
  const leaders: LeaderData[] = [];
  const sections = content.split(/^##\s+/m).filter(s => s.trim());
  
  for (const section of sections) {
    const lines = section.split('\n');
    const headerMatch = lines[0].match(/^(.+?)\s*-\s*(.+)$/);
    
    if (!headerMatch) continue;
    
    const countryName = headerMatch[1].trim();
    const tagline = headerMatch[2].trim();
    
    // Determine leader code
    let leaderCode: LeaderCode;
    let code: string;
    
    if (countryName.includes('USA')) {
      leaderCode = 'usa';
      code = 'USA-001';
    } else if (countryName.includes('China')) {
      leaderCode = 'china';
      code = 'CHN-001';
    } else if (countryName.includes('Russia')) {
      leaderCode = 'russia';
      code = 'RUS-001';
    } else {
      continue; // Skip unknown leaders
    }
    
    // Extract data
    let startingGDP = 0;
    let handSize = 0;
    const abilities: LeaderAbility[] = [];
    let theme = '';
    
    for (const line of lines) {
      const gdpMatch = line.match(/\*\*Starting GDP\*\*:\s*(\d+)/);
      if (gdpMatch) {
        startingGDP = parseInt(gdpMatch[1]);
      }
      
      const handMatch = line.match(/\*\*Hand Size\*\*:\s*(\d+)/);
      if (handMatch) {
        handSize = parseInt(handMatch[1]);
      }
      
      const themeMatch = line.match(/\*\*Theme\*\*:\s*(.+)/);
      if (themeMatch) {
        theme = themeMatch[1].trim();
      }
      
      // Extract abilities from Unique Abilities section
      const abilityMatch = line.match(/^-\s+\*\*(.+?)\*\*:\s*(.+)$/);
      if (abilityMatch && line.trim().startsWith('-')) {
        abilities.push({
          name: abilityMatch[1].trim(),
          description: abilityMatch[2].trim()
        });
      }
    }
    
    if (startingGDP > 0 && handSize > 0) {
      leaders.push({
        code,
        name: countryName,
        leaderCode,
        startingGDP,
        handSize,
        tradeRouteSlots: 5,  // All leaders have 5 trade route slots
        abilities,
        theme,
        set: 'Core'
      });
    }
  }
  
  return leaders;
}

// ============================================================================
// TRADING PARTNER DATA PARSING
// ============================================================================

function parseTradingPartners(content: string): TradingPartnerData[] {
  const partners: TradingPartnerData[] = [];
  const sections = content.split(/^####\s+/m).filter(s => s.trim());
  
  for (const section of sections) {
    const lines = section.split('\n');
    const headerMatch = lines[0].match(/^(.+?)\s*[–-]\s*"(.+)"$/);
    
    if (!headerMatch) continue;
    
    const name = headerMatch[1].trim();
    const tagline = headerMatch[2].trim();
    
    // Extract market size and route slots
    let marketSize: MarketSize = 'medium';
    let routeSlots = 4;
    let cardColor = '';
    
    for (const line of lines) {
      const sizeMatch = line.match(/\*\*Card Color\*\*:\s*(Gold|Silver|Bronze)/i);
      if (sizeMatch) {
        cardColor = sizeMatch[1].toLowerCase();
        if (cardColor === 'gold') {
          marketSize = 'large';
          routeSlots = 5;
        } else if (cardColor === 'silver') {
          marketSize = 'medium';
          routeSlots = 4;
        } else if (cardColor === 'bronze') {
          marketSize = 'small';
          routeSlots = 3;
        }
      }
      
      const slotsMatch = line.match(/\*\*Route Slots\*\*:\s*[●◆★]+\s*\((\d+)\s+slot/i);
      if (slotsMatch) {
        routeSlots = parseInt(slotsMatch[1]);
      }
    }
    
    // Extract influence bonuses
    const influenceBonuses: InfluenceBonus[] = [];
    let inInfluenceSection = false;
    
    for (const line of lines) {
      if (line.includes('**Influence Bonuses**')) {
        inInfluenceSection = true;
        continue;
      }
      
      if (inInfluenceSection && line.includes('**Suzerainty**')) {
        break;
      }
      
      if (inInfluenceSection) {
        const bonusMatch = line.match(/^\s*-\s+(\d+)\s+(.+)$/);
        if (bonusMatch) {
          const threshold = parseInt(bonusMatch[1]);
          const bonus = bonusMatch[2].trim();
          influenceBonuses.push({ threshold, bonus });
        }
      }
    }
    
    // Extract suzerainty
    let suzerainty: Suzerainty = { name: '', description: '' };
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('**Suzerainty**')) {
        const suzMatch = lines[i].match(/\*\*Suzerainty\*\*:\s*👑\s*(.+)$/);
        if (suzMatch) {
          suzerainty = {
            name: 'Suzerainty Bonus',
            description: suzMatch[1].trim()
          };
        }
      }
    }
    
    // Generate code
    const code = name.substring(0, 3).toUpperCase() + '-001';
    
    if (name && tagline && influenceBonuses.length > 0) {
      partners.push({
        code,
        name,
        tagline,
        marketSize,
        routeSlots,
        influenceBonuses,
        suzerainty,
        set: 'Core',
        rarity: 'Common'
      });
    }
  }
  
  return partners;
}

// ============================================================================
// REFERENCE CARD DATA
// ============================================================================

function generateReferenceCards(): ReferenceCardData[] {
  return [
    {
      id: 'ref-turn-order',
      title: 'TURN ORDER',
      content: [
        '1. EVENT - Draw and resolve Event card',
        '2. UPKEEP - Resolve CMYK effects',
        '3. DRAW - Draw to hand size',
        '4. POLICY - Play 1 Policy (optional)',
        '5. TRADE - 3-minute timed phase',
        '6. INCOME - Collect GDP from routes',
        '7. CLEANUP - Reset for next round'
      ],
      type: 'reference'
    },
    {
      id: 'ref-cmyk',
      title: 'CMYK TIMING',
      content: [
        'C (Cyan) = Global effects',
        'M (Magenta) = Personal effects',
        'Y (Yellow) = Opponent effects',
        'K (Black) = Trading Partner effects',
        '',
        'Resolve in order: C → M → Y → K'
      ],
      type: 'reference'
    },
    {
      id: 'ref-disputes',
      title: 'DISPUTE RESOLUTION',
      content: [
        '1. Identify all contested route slots',
        '2. Resolve in reverse-GDP order (poorest first)',
        '3. Both players bid GDP secretly',
        '4. Calculate: Influence + GDP bid',
        '5. Highest total wins',
        '6. Winner pays bid, loser returns card to hand'
      ],
      type: 'reference'
    },
    {
      id: 'ref-card-types',
      title: 'CARD TYPES',
      content: [
        'BLUE = Export (trade routes)',
        'GREEN = Policy (ongoing effects)',
        'RED = Tactic (instant actions)',
        'PURPLE = Event (global effects)',
        'GOLD = Leader (signature cards)'
      ],
      type: 'reference'
    },
    {
      id: 'ref-influence',
      title: 'INFLUENCE TRADING',
      content: [
        'TIMING: During 3-minute Trade Phase',
        'CURRENCY: GDP',
        'PROCESS: Both players must agree',
        'EFFECT: Immediate influence transfer',
        'TYPICAL RATE: 1 influence = 2-3 GDP'
      ],
      type: 'reference'
    }
  ];
}

// ============================================================================
// PLAYER AID DATA
// ============================================================================

function generatePlayerAids(leaders: LeaderData[]): PlayerAidData[] {
  const aids: PlayerAidData[] = [];
  
  // Leader-specific aids
  for (const leader of leaders) {
    aids.push({
      id: `aid-${leader.leaderCode}`,
      leaderCode: leader.leaderCode,
      title: leader.name,
      content: {
        startingGDP: leader.startingGDP,
        handSize: leader.handSize,
        tradeRoutes: leader.tradeRouteSlots,
        abilities: leader.abilities
      },
      type: 'player-aid'
    });
  }
  
  // Generic game flow aid
  aids.push({
    id: 'aid-gameflow',
    title: 'GAME FLOW',
    content: [
      'WIN CONDITIONS:',
      '• Reach 50 GDP instantly',
      '• Highest GDP after 5 rounds',
      '',
      'TRADE PHASE (3 minutes):',
      '• Place Exports on Trading Partners',
      '• Trade influence for GDP',
      '• Play Tactics',
      '',
      'DISPUTES:',
      '• Poorest player chooses first',
      '• Influence + GDP bid = total',
      '• Winner pays bid, loser returns card'
    ],
    type: 'player-aid'
  });
  
  return aids;
}

// ============================================================================
// FILE I/O
// ============================================================================

function readFile(relativePath: string): string {
  const fullPath = path.join(__dirname, relativePath);
  console.log(`📖 Reading: ${relativePath}`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }
  
  return fs.readFileSync(fullPath, 'utf-8');
}

function writeJsonFile(relativePath: string, data: any, label: string): void {
  const fullPath = path.join(__dirname, relativePath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Wrote: ${relativePath} (${data.length} ${label})`);
}

// ============================================================================
// MAIN CONVERSION
// ============================================================================

async function main() {
  console.log('🔄 Trade Warz Board Data Converter');
  console.log('📝 Converting Markdown → JSON');
  console.log();
  
  try {
    // Read source files
    const leaderSpecsContent = readFile('../../../leader_specs.md');
    const tradingPartnerContent = readFile('../../../../design_docs/trading_partner_cards.md');
    
    console.log();
    console.log('🔍 Parsing data...');
    
    // Parse leaders
    const leaders = parseLeaderSpecs(leaderSpecsContent);
    console.log(`   Found ${leaders.length} leaders`);
    
    // Parse trading partners
    const tradingPartners = parseTradingPartners(tradingPartnerContent);
    console.log(`   Found ${tradingPartners.length} trading partners`);
    
    // Generate reference cards
    const referenceCards = generateReferenceCards();
    console.log(`   Generated ${referenceCards.length} reference cards`);
    
    // Generate player aids
    const playerAids = generatePlayerAids(leaders);
    console.log(`   Generated ${playerAids.length} player aid cards`);
    
    console.log();
    console.log('💾 Writing JSON files...');
    
    // Write JSON files
    writeJsonFile('../data/leaders.json', leaders, 'leaders');
    writeJsonFile('../data/trading-partners.json', tradingPartners, 'partners');
    writeJsonFile('../data/reference-cards.json', referenceCards, 'reference cards');
    writeJsonFile('../data/player-aids.json', playerAids, 'player aids');
    
    console.log();
    console.log('✨ Conversion complete!');
    console.log();
    console.log('📊 Summary:');
    console.log(`   Leaders: ${leaders.length}`);
    console.log(`   Trading Partners: ${tradingPartners.length}`);
    console.log(`   Reference Cards: ${referenceCards.length}`);
    console.log(`   Player Aids: ${playerAids.length}`);
    console.log();
    console.log('Next step: Build templates and generate PDFs');
    
  } catch (error) {
    console.error('❌ Error during conversion:');
    console.error(error);
    process.exit(1);
  }
}

main();

