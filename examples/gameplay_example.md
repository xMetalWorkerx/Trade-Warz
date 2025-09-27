# Trade Warz - Gameplay Example

*Turn-by-turn example showing persistence mechanics in action*

---

## Game Setup
- **Players**: 4 (USA, China, Russia, EU)
- **Duration**: 5 rounds
- **Focus**: Demonstrating route persistence and influence accumulation

---

## Round 1: Establishing the Foundation

### Event: "Trade War Escalation"
- All Tactics cost -1 GDP (min 0)
- All Exports produce -1 GDP this round

### Upkeep (CMYK Order)
- **C (Global)**: Trade War Escalation effects active
- **M (Personal)**: No personal effects yet
- **Y (Opponent)**: No opponent effects yet
- **K (Trading)**: No trading partner effects yet

### Draw Phase
- **USA**: Draws 8 cards (hand size limit)
- **China**: Draws 7 cards
- **Russia**: Draws 6 cards
- **EU**: Draws 7 cards

### Policy Phase
- **USA**: Plays "Dollar Hegemony" (4 GDP cost)
- **China**: Plays "State Subsidies" (2 GDP cost)
- **Russia**: Plays "Strongman Politics" (2 GDP cost)
- **EU**: Plays "WTO Rules" (2 GDP cost)

### Trade Phase (3-minute timer)
- **USA**: Places "Freedom Corn" on India (3 GDP cost, 2 influence, 2 revenue)
- **China**: Places "Factory of Everything" on Japan (3 GDP cost, 2 influence, 3 revenue)
- **Russia**: Places "Pipeline Empire" on Germany (6 GDP cost, 2 influence, 6 revenue)
- **EU**: Places "Eurozone Cars" on USA (6 GDP cost, 3 influence, 5 revenue)

**Disputes**: None - all placed on different trading partners

### Income Phase
**USA**:
- Freedom Corn: 2 revenue - 1 (Event) = **1 GDP**
- Dollar Hegemony: +1 GDP (policy effect)
- **Total**: 2 GDP, +2 influence with India

**China**:
- Factory of Everything: 3 revenue - 1 (Event) = **2 GDP**
- State Subsidies: No effect yet
- **Total**: 2 GDP, +2 influence with Japan

**Russia**:
- Pipeline Empire: 6 revenue - 1 (Event) = **5 GDP**
- Strongman Politics: No effect yet
- **Total**: 5 GDP, +2 influence with Germany

**EU**:
- Eurozone Cars: 5 revenue - 1 (Event) = **4 GDP**
- WTO Rules: No effect yet
- **Total**: 4 GDP, +3 influence with USA

### Cleanup
- Reset timer
- Discard Trade War Escalation event
- **Current GDP**: Russia (5), EU (4), USA (2), China (2)

---

## Round 2: Building Momentum

### Event: "Globalization Backlash"
- Each player may discard one Export to gain +4 GDP

### Upkeep (CMYK Order)
- **C (Global)**: Globalization Backlash effects available
- **M (Personal)**: 
  - USA: Dollar Hegemony (+1 GDP)
  - China: State Subsidies (reduce next export cost by 1)
  - Russia: Strongman Politics (ignore first negative event)
  - EU: WTO Rules (exports can't be targeted by tactics)
- **Y (Opponent)**: No opponent effects
- **K (Trading)**: No trading partner effects

### Draw Phase
- All players draw up to hand size limits

### Policy Phase
- **USA**: Plays "Bailout Bill" (2 GDP cost)
- **China**: Plays "Copy-Paste Policy" (3 GDP cost)
- **Russia**: Plays "Energy Leverage" (4 GDP cost)
- **EU**: Plays "Infrastructure Spending" (3 GDP cost)

### Trade Phase (3-minute timer)
- **USA**: Places "Big Tech IPO" on Canada (5 GDP cost, 2 influence, 5 revenue)
- **China**: Places "Rare Earth Metals" on India (4 GDP cost, 2 influence, 4 revenue) - **DISPUTE with USA**
- **Russia**: Places "Vodka Exports" on France (3 GDP cost, 1 influence, 3 revenue)
- **EU**: Places "Luxury Watches" on China (5 GDP cost, 1 influence, 4 revenue)

**Dispute Resolution** (Reverse-GDP order: China first, then USA):
- **China vs USA for India**: 
  - China: 2 influence + 3 GDP bid = 5 total
  - USA: 2 influence + 2 GDP bid = 4 total
  - **China wins**, pays 3 GDP, USA takes Freedom Corn back to hand

### Income Phase
**USA**:
- Big Tech IPO: **5 GDP**
- Dollar Hegemony: +1 GDP
- **Total**: 6 GDP, +2 influence with Canada

**China**:
- Factory of Everything: **3 GDP**
- Rare Earth Metals: **4 GDP**
- State Subsidies: No effect
- **Total**: 7 GDP, +2 influence with Japan, +2 influence with India

**Russia**:
- Pipeline Empire: **6 GDP**
- Vodka Exports: **3 GDP**
- Energy Leverage: No effect yet
- **Total**: 9 GDP, +2 influence with Germany, +1 influence with France

**EU**:
- Eurozone Cars: **5 GDP**
- Luxury Watches: **4 GDP**
- WTO Rules: No effect
- **Total**: 9 GDP, +3 influence with USA, +1 influence with China

### Cleanup
- **Current GDP**: Russia (9), EU (9), China (7), USA (6)
- **Influence Totals**: 
  - India: China (2)
  - Japan: China (2)
  - Germany: Russia (2)
  - France: Russia (1)
  - USA: EU (3)
  - Canada: USA (2)
  - China: EU (1)

---

## Round 3: Strategic Depth

### Event: "Resource Shortage"
- All Exports with printed Revenue 5 produce -1 GDP this round

### Upkeep (CMYK Order)
- **C (Global)**: Resource Shortage effects active
- **M (Personal)**: All personal effects continue
- **Y (Opponent)**: No opponent effects
- **K (Trading)**: No trading partner effects

### Trade Phase
- **USA**: Places "Hollywood Exports" on Mexico (6 GDP cost, 3 influence, 5 revenue)
- **China**: Places "Silk Road 2.0" on Brazil (6 GDP cost, 3 influence, 5 revenue)
- **Russia**: Places "Arms Deals" on India (5 GDP cost, 2 influence, 4 revenue) - **DISPUTE with China**
- **EU**: Places "Shipping Fleet" on Australia (5 GDP cost, 2 influence, 4 revenue)

**Dispute Resolution** (Reverse-GDP order: USA first, then China, then Russia):
- **Russia vs China for India**:
  - Russia: 0 influence + 4 GDP bid = 4 total
  - China: 2 influence + 3 GDP bid = 5 total
  - **China wins**, pays 3 GDP, Russia takes Arms Deals back to hand

### Income Phase
**USA**:
- Big Tech IPO: 5 revenue - 1 (Event) = **4 GDP**
- Hollywood Exports: 5 revenue - 1 (Event) = **4 GDP**
- Dollar Hegemony: +1 GDP
- **Total**: 9 GDP, +2 influence with Canada, +3 influence with Mexico

**China**:
- Factory of Everything: **3 GDP**
- Rare Earth Metals: **4 GDP**
- Silk Road 2.0: 5 revenue - 1 (Event) = **4 GDP**
- **Total**: 11 GDP, +2 influence with Japan, +2 influence with India, +3 influence with Brazil

**Russia**:
- Pipeline Empire: **6 GDP**
- Vodka Exports: **3 GDP**
- Energy Leverage: +1 GDP from EU (forced payment)
- **Total**: 10 GDP, +2 influence with Germany, +1 influence with France

**EU**:
- Eurozone Cars: **5 GDP**
- Luxury Watches: **4 GDP**
- Shipping Fleet: **4 GDP**
- **Total**: 13 GDP, +3 influence with USA, +1 influence with China, +2 influence with Australia

### Cleanup
- **Current GDP**: EU (13), China (11), Russia (10), USA (9)
- **Influence Accumulation**: All players continue building influence with their trading partners

---

## Round 4: Tactical Maneuvers

### Event: "Canal Blockage"
- For each player, the leftmost Export slot produces 0 GDP this round

### Trade Phase
- **USA**: Plays "Trade Sanctions" tactic on China (-2 GDP to China)
- **China**: Plays "Cyber Espionage" tactic on EU (steals a card)
- **Russia**: Plays "Gas Leak" tactic (destroys EU's Eurozone Cars, +2 GDP to Russia)
- **EU**: Places "Construction Craze" on Singapore (4 GDP cost, 2 influence, 4 revenue)

### Income Phase
**USA**:
- Big Tech IPO: **5 GDP** (leftmost slot blocked, but this is second slot)
- Hollywood Exports: **5 GDP**
- Dollar Hegemony: +1 GDP
- **Total**: 11 GDP

**China**:
- Factory of Everything: **3 GDP** (leftmost slot blocked)
- Rare Earth Metals: **4 GDP**
- Silk Road 2.0: **5 GDP**
- **Total**: 12 GDP (minus 2 from Trade Sanctions = 10 GDP)

**Russia**:
- Pipeline Empire: **6 GDP**
- Vodka Exports: **3 GDP**
- Energy Leverage: +1 GDP from EU
- Gas Leak bonus: +2 GDP
- **Total**: 12 GDP

**EU**:
- ~~Eurozone Cars~~: **0 GDP** (destroyed by Gas Leak)
- Luxury Watches: **4 GDP**
- Shipping Fleet: **4 GDP**
- Construction Craze: **4 GDP**
- **Total**: 12 GDP (minus 1 from Energy Leverage = 11 GDP)

### Cleanup
- **Current GDP**: Russia (12), EU (11), USA (11), China (10)
- **Route Destruction**: EU's Eurozone Cars is permanently removed from the game

---

## Round 5: Final Push

### Event: "Central Bank Shock"
- Each player chooses: Gain +4 GDP and discard a random card, OR Lose 2 GDP and draw 2 cards

### Trade Phase
- **USA**: Places "Freedom Burgers" on UK (3 GDP cost, 1 influence, 3 revenue)
- **China**: Places "Tech Outsourcing" on Philippines (2 GDP cost, 1 influence, 2 revenue)
- **Russia**: Places "Black Market Deals" tactic (+2 GDP, draw 1 card)
- **EU**: Places "Spice Trade" on Indonesia (3 GDP cost, 2 influence, 3 revenue)

### Income Phase
**USA**:
- Big Tech IPO: **5 GDP**
- Hollywood Exports: **5 GDP**
- Freedom Burgers: **3 GDP**
- Dollar Hegemony: +1 GDP
- Central Bank Shock: +4 GDP (chose to gain GDP)
- **Total**: 18 GDP
- **Grand Total**: 11 + 18 = **29 GDP**

**China**:
- Factory of Everything: **3 GDP**
- Rare Earth Metals: **4 GDP**
- Silk Road 2.0: **5 GDP**
- Tech Outsourcing: **2 GDP**
- Central Bank Shock: +4 GDP (chose to gain GDP)
- **Total**: 18 GDP
- **Grand Total**: 10 + 18 = **28 GDP**

**Russia**:
- Pipeline Empire: **6 GDP**
- Vodka Exports: **3 GDP**
- Energy Leverage: +1 GDP from EU
- Black Market Deals: +2 GDP
- Central Bank Shock: +4 GDP (chose to gain GDP)
- **Total**: 16 GDP
- **Grand Total**: 12 + 16 = **28 GDP**

**EU**:
- Luxury Watches: **4 GDP**
- Shipping Fleet: **4 GDP**
- Construction Craze: **4 GDP**
- Spice Trade: **3 GDP**
- Central Bank Shock: +4 GDP (chose to gain GDP)
- **Total**: 19 GDP
- **Grand Total**: 11 + 19 = **30 GDP**

### Final Results
- **Winner**: EU with 30 GDP
- **Tiebreaker**: EU has most trading partners influenced (4 vs 3 each for others)

---

## Key Persistence Mechanics Demonstrated

### 1. **Route Persistence**
- Routes established in Round 1 (Freedom Corn, Factory of Everything, Pipeline Empire, Eurozone Cars) continued generating income through Round 5
- Only explicit destruction (Gas Leak tactic) removed a route permanently
- Routes never "expired" or "ended" naturally

### 2. **Influence Accumulation**
- China's influence with India grew from 0 to 2 to 4 over multiple rounds
- EU's influence with USA grew from 0 to 3 and remained there
- Influence never decreased naturally, only through explicit card effects

### 3. **Economic Engine**
- By Round 5, players had 3-4 active routes each, generating 12-16 GDP per round
- The persistent economic engine created escalating income throughout the game
- Early route investment paid dividends in later rounds

### 4. **Strategic Depth**
- Route destruction (Gas Leak) had permanent consequences
- Influence accumulation created territorial control
- The persistent nature of routes and influence created long-term strategic planning

---

*This example demonstrates how the permanence mechanics create a persistent economic engine that escalates throughout the game, rewarding early investment and creating strategic depth.*
