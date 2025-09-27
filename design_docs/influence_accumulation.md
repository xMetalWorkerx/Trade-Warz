# Influence Accumulation Mechanic

## Overview

This document defines the influence system for Trade Warz, inspired by Civilization's city-state mechanics. Players accumulate influence with specific trading partners, creating territorial control and scaling benefits.

## Core Concept

**Trading Partner Influence**: Each trading partner tracks influence separately for each player. Influence accumulates from trade routes and can be modified by cards. Players receive scaling benefits based on their influence level with each trading partner, plus bonuses for having the most influence (suzerainty).

---

## Implementation

### Trading Partner Cards with Influence Tracks
**Mechanism**: Each trading partner card has influence tracks for each player
- **Pros**: Visual clarity, easy to read, thematic fit
- **Cons**: Requires trading partner cards with influence tracks
- **Implementation**: Each trading partner card has 4-6 influence tracks (one per player), use cubes to track influence levels

### Influence Tracking
- **Range**: 0-10 influence per trading partner per player
- **Visual**: Colored cubes on influence tracks
- **Updates**: Move cubes when influence changes

---

## Influence Accumulation Rules

### Basic Accumulation
1. **End of Round**: After Income phase, each player gains influence with trading partners equal to influence from active routes
2. **Per Trading Partner**: Influence is tracked separately for each trading partner
3. **Persistent**: Influence remains with trading partners until modified by cards or route destruction
4. **Never Decreases Naturally**: Influence never decreases naturally - only specific card effects can reduce it
5. **Trade Routes Generate Influence**: Trade routes generate influence every round they remain active

### Influence Sources
- **Trade Routes**: Gain influence equal to route's influence value each round
- **Policy Cards**: Some policies may grant influence with specific trading partners
- **Tactic Cards**: Some tactics may increase/decrease influence with trading partners
- **Route Destruction**: Losing a route reduces influence with that trading partner
- **Influence Trading**: Players may buy/sell influence with other players during Trade Phase

---

## Influence Trading System

### Core Mechanics
**Influence Trading**: Players may buy and sell influence with trading partners during the Trade Phase, creating a secondary economy where influence becomes a tradeable commodity.

### Trading Rules
- **Timing**: During the 3-minute Trade Phase, alongside route placement
- **Currency**: GDP (primary game currency)
- **Method**: Direct player-to-player transactions
- **Minimum Trade**: 1 influence point
- **Maximum Trade**: All influence with a trading partner

### Trading Process
1. **Negotiation**: Players negotiate prices during Trade Phase
2. **Agreement**: Both players must agree to the trade
3. **Payment**: Immediate GDP transfer
4. **Effect**: Influence changes take effect immediately

### Pricing Guidelines
- **Base Rate**: 1 influence = 2-3 GDP (roughly)
- **Suzerainty Premium**: Influence that grants/denies suzerainty is worth more
- **Market Forces**: Supply and demand determine actual prices
- **Situational Value**: Influence value varies based on current game state

### Strategic Scenarios

**Excess Influence Sale**
- Player has 7 influence with India, but only needs 5 for next benefit tier
- Can sell 2 influence to another player for GDP
- Other player gets closer to suzerainty, seller gets cash for other investments

**Suzerainty Competition**
- Player A has 6 influence with Japan, Player B has 5 influence
- Player B offers Player C GDP to buy their 3 influence with Japan
- Player B becomes suzerain, gains tactical cost reduction

**Influence Consolidation**
- Player has scattered influence across multiple trading partners
- Sells influence with less valuable partners to buy influence with focus partner
- Concentrates power for maximum benefit

### Benefits of Influence Trading
- **Economic Depth**: Creates secondary economy beyond route income
- **Strategic Options**: Players can specialize or diversify influence
- **Player Interaction**: More negotiation and deal-making
- **Catch-up Mechanics**: Weaker players can sell excess influence for cash

---

## Influence Benefits System

### Scaling Benefits (Based on Influence Level)
**Each trading partner has unique influence thresholds and bonuses - see trading_partners.md for specific details.**

**General Pattern:**
- **Small Markets**: Thresholds at 2, 4, 6 influence
- **Medium Markets**: Thresholds at 3, 5, 7 influence  
- **Large Markets**: Thresholds at 3, 6, 9 influence

**Influence persists even after routes are destroyed** - this creates "influence banking" where players establish routes for influence even if they might be destroyed later.

### Suzerainty Bonuses (Most Influence)
**Suzerainty**: Player with the most influence with a trading partner gets:
- **Special Ability**: Unique benefit based on trading partner (see trading_partners.md for specific abilities)
- **Dispute Advantage**: +2 Influence in disputes involving this trading partner
- **Economic Bonus**: Various bonuses depending on the trading partner

### Trading Partner Types & Suzerainty Abilities
**Each trading partner has a unique suzerainty ability - see trading_partners.md for complete details.**

**Examples:**
- **India**: Copy a Policy card after it's played (once per round)
- **Japan**: Your Tactics cost 1 less GDP
- **Singapore**: Trade 1 card for random draw (once per round)
- **Brazil**: Destroy an opponent's route to gain 3 GDP (once per round)

---

## Strategic Implications

### Territorial Control
- **Influence Investment**: Players must decide which trading partners to focus on
- **Suzerainty Competition**: Multiple players may compete for control of valuable trading partners
- **Defensive Positioning**: High influence provides protection against route destruction

### Economic Strategy
- **Scaling Benefits**: Higher influence provides better economic returns
- **Suzerainty Rewards**: Controlling trading partners provides significant advantages
- **Route Prioritization**: Players may prioritize routes to trading partners they can control

### Tactical Depth
- **Influence Warfare**: Cards may target opponent influence with specific trading partners
- **Suzerainty Disruption**: Tactics may reduce opponent influence to steal suzerainty
- **Route Protection**: High influence may protect against certain destructive effects

---

## Example Implementation

### Influence Accumulation Phase
1. **Calculate**: Each player gains influence with trading partners equal to route influence
2. **Update**: Move cubes on trading partner influence tracks
3. **Check Suzerainty**: Determine who has most influence with each trading partner

### Example Trading Partner: Singapore (Small Market)
**Player A**: 5 influence (4+ level: Banking Hub - Store 1 GDP between rounds)
**Player B**: 7 influence (6+ level: Trade Master - Draw 2, keep 1 when establishing routes) - **SUZERAINTY**
**Player C**: 2 influence (2+ level: Free Port - First Export each round costs 1 less)
**Player D**: 3 influence (2+ level: Free Port - First Export each round costs 1 less)

**Player B Benefits**:
- Trade Master ability (draw 2, keep 1 when establishing routes)
- +2 Influence in disputes involving Singapore
- Suzerainty: Trade 1 card for random draw (once per round)

### Influence Warfare Example
**Tactic Card**: "Economic Sanctions"
- **Effect**: Target player loses 2 influence with chosen trading partner
- **Strategic Use**: Reduce opponent's influence to steal suzerainty

### Route Destruction with Persistent Influence Example
**Round 3**: Player A has 8 influence with Japan, Player B destroys Player A's route to Japan
**Result**: 
- Player A's route is destroyed (loses route income)
- Player A keeps all 8 influence with Japan (influence persists)
- Player A still has "Automation Nation" bonus (draw extra card each turn)
- Player A can re-establish route later and immediately benefit from existing influence

---

## Design Questions

### 1. Influence Tracks
- **Range**: 0-10 influence per trading partner per player
- **Visual**: Colored cubes on influence tracks
- **Updates**: Move cubes when influence changes

### 2. Suzerainty Benefits
- **Economic**: +2 GDP per round from controlled trading partner
- **Dispute**: +2 Influence in disputes involving controlled trading partner
- **Special**: Unique ability based on trading partner type

### 3. Game Balance
- **Scaling**: Benefits scale with influence level (0-10)
- **Competition**: Multiple players compete for suzerainty
- **Warfare**: Cards can target opponent influence

---

## Recommendation

**Trading Partner Cards with Influence Tracks** is the best approach because:

1. **Visual Clarity**: Easy to see influence levels at a glance
2. **Thematic Fit**: Trading partners as "city-states" makes perfect sense
3. **Strategic Depth**: Creates territorial control and competition
4. **Scalable**: Benefits scale naturally with influence investment

### Proposed Implementation
- **Trading Partner Cards**: Each has influence tracks for all players
- **Influence Range**: 0-10 per trading partner per player
- **Scaling Benefits**: 0-2 (none), 3-4 (+1 GDP), 5-6 (+2 GDP), 7-8 (+3 GDP), 9-10 (+4 GDP)
- **Suzerainty**: Most influence gets +2 GDP + special ability + dispute bonus

### Balance Framework
- **Accumulation**: 1-3 influence per route per round
- **Scaling**: Benefits increase with influence investment
- **Competition**: Suzerainty provides significant advantages
- **Warfare**: Cards can disrupt opponent influence

---

*Last Updated: [Current Date]*
*Version: 1.0*
*Status: Under Consideration*
