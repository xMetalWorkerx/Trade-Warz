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

### Influence Sources
- **Trade Routes**: Gain influence equal to route's influence value each round
- **Policy Cards**: Some policies may grant influence with specific trading partners
- **Tactic Cards**: Some tactics may increase/decrease influence with trading partners
- **Route Destruction**: Losing a route reduces influence with that trading partner

---

## Influence Benefits System

### Scaling Benefits (Based on Influence Level)
**0-2 Influence**: No benefits
**3-4 Influence**: +1 GDP per round from this trading partner
**5-6 Influence**: +2 GDP per round from this trading partner
**7-8 Influence**: +3 GDP per round from this trading partner
**9-10 Influence**: +4 GDP per round from this trading partner

### Suzerainty Bonuses (Most Influence)
**Suzerainty**: Player with the most influence with a trading partner gets:
- **Economic Bonus**: +2 GDP per round from this trading partner
- **Dispute Advantage**: +2 Influence in disputes involving this trading partner
- **Special Ability**: Unique benefit based on trading partner type

### Trading Partner Types & Suzerainty Abilities
**Small Markets**: +1 export slot when you have suzerainty
**Medium Markets**: +1 GDP per route to this trading partner when you have suzerainty
**Large Markets**: +1 Influence in all disputes when you have suzerainty

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

### Example Trading Partner: "Emerging Market"
**Player A**: 5 influence (3-4 level: +1 GDP per round)
**Player B**: 7 influence (7-8 level: +3 GDP per round) - **SUZERAINTY**
**Player C**: 2 influence (0-2 level: no benefits)
**Player D**: 4 influence (3-4 level: +1 GDP per round)

**Player B Benefits**:
- +3 GDP per round (scaling benefit)
- +2 GDP per round (suzerainty bonus)
- +1 export slot (small market suzerainty ability)
- +2 Influence in disputes involving this trading partner

### Influence Warfare Example
**Tactic Card**: "Economic Sanctions"
- **Effect**: Target player loses 2 influence with chosen trading partner
- **Strategic Use**: Reduce opponent's influence to steal suzerainty

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
