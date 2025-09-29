## Designer Overview: What Is *Trade Warz*?

**⚠️ Prototype Status:** This design is in active development and requires extensive playtesting for balance. Leaders must be rigorously tested to prevent overpowered abilities (avoiding "Skullclamp scenarios"). Recommended: blind Leader selection and win rate tracking during testing.

### Elevator Pitch

*Trade Warz* is a lightning-fast, tongue-in-cheek board game where 2-6 players (sweet-spot 4) become exaggerated world leaders locked in a meme-driven trade war. In under an hour you'll slam down exports, unleash surprise tactics, and weaponize social-media Policies to amass **50 GDP** or finish on top after five frantic rounds.

### Core Concepts

* **Satirical Geopolitics** — vintage propaganda art collides with modern Twitter snark; every card winks at real-world tariffs, subsidies, and Late-Stage Capitalist absurdity
* **Meme Energy** — signature leader cards like "Freedom Corn" or "Great Firewall" mix genuine strategy with laugh-out-loud table moments  
* **High-Octane Trade Floor** — simultaneous phases, blind GDP bids, and a ticking 3-minute Trade timer keep adrenaline (and trash-talk) high
* **Persistent Economy** — trade routes and influence accumulate throughout the game, creating an escalating economic engine

*Note: Visual art style is still under development - see `art_styles.md` for current directions being explored.*

### Designer Goals

| Pillar | Implementation |
|--------|----------------|
| **Quick to teach, quick to finish** | Color-coded CMYK upkeep system, one-page player aid, 5-round cap, real pennies/nickels for GDP tracking |
| **Big swings without feel-bads** | Reverse-GDP dispute resolution, leader-specific catch-up Policies, and guaranteed Export availability prevent runaway leaders |
| **Replay through asymmetry** | Each Leader has unique 8-card deck with signature abilities; global decks use 40/40/20 rarity split for fresh combinations |
| **Physical fun** | Blind-bid coins, timer mechanics, and persistent trade routes create tactile engagement |

---

## 🎯 Victory Conditions

**Instant Win (Economic Boom):** First player to reach **50 GDP** wins immediately — skip the rest of the round.

**Timed Win (Global Close):** If no player hits 50 GDP by the end of **Round 5**, highest GDP wins.

**Tiebreaker:** Most Trade Partners influenced (then most active trade routes, then most GDP in hand).

---

## 📊 Core Economy Rules

### Trade Routes & Persistence
**IMPORTANT: Once established, trade routes remain active for the entire game unless explicitly removed by card effects.**

- **Establishing Routes:** During Trade Phase, place Export cards on Trade Partner slots and pay GDP costs
- **Route Persistence:** Successfully established routes stay on the board generating income every round
- **Route Protection:** Routes can only be removed by specific Tactic or Policy effects that explicitly say "destroy" or "remove" 
- **Route Stacking:** Each Trade Partner slot holds ONE Export card - no stacking allowed
- **Income Generation:** Active routes generate GDP every Income Phase based on: Export Value + Trading Partner Bonus + Any Multipliers

### Influence System
**Influence with Trade Partners accumulates throughout the game and never decreases unless explicitly removed by card effects.**

- **Gaining Influence:** Each active route generates influence equal to the Export card's influence value each round
- **Influence Uses:** Accumulated influence helps win disputes (+1 dispute power per influence with that specific partner)
- **Influence Tracking:** Use small cubes or tokens on the Trade Partner cards to track each player's influence
- **Influence is Permanent:** Unlike GDP which is spent, influence accumulates and persists

### GDP Economy
- **Starting GDP:** Each player begins with 10 GDP
- **GDP is Currency:** Used for bidding in disputes, paying for cards, and tracking victory
- **Income Sources:** Trade routes (60-70%), Policies (20-25%), Tactics (10-15%)  
- **Spending GDP:** Paid when establishing routes (after disputes), during blind bids, and for certain card costs

*Board reminder:* a small CMYK ring printed near the round timer reads **C → M → Y → K**.

### 3 Draw Phase

* Each player draws up to their leader's hand size limit.
* **USA**: Draw up to 8 cards
* **China**: Draw up to 7 cards  
* **Russia**: Draw up to 6 cards
* The hand size is printed large on each Leader tile and shown enlarged in the rulebook.

### 4 Policy Phase

* Each player may play **one** Policy card face‑down, then reveal simultaneously on a 3‑2‑1 count.
* **Tie resolution:** if timing or effects conflict, the **poorest player** (lowest current GDP) decides the order or wins any direct contest.
* Certain Policies may impose additional GDP costs; resolve these immediately after reveal.

### 5 Trade Phase (timed)

**Placement** – Players may place Export cards **at any time** during the 3‑minute Trade timer, sliding them face‑down onto open Trade Partner slots. GDP costs are paid when routes are established (after disputes are resolved).

* **No rearranging:** Once an Export card has been flipped face‑up (after all players reveal), it is locked in that slot for the remainder of the round and may not be moved.
* You can keep adding Exports throughout the timer so long as slots remain and you can afford the GDP.

**Influence Trading** – During the Trade timer, players may buy and sell influence with trading partners:

* **Sales**: Sell 1+ influence with a trading partner for GDP
* **Purchases**: Buy influence with a trading partner for GDP
* **Negotiation**: Players negotiate prices; all trades are voluntary
* **Immediate Effect**: Influence changes take effect immediately
* **Public Information**: All influence levels are visible to all players
* **Pricing**: Market-driven; typical rate 1 influence = 2-3 GDP (varies by situation)

**Dispute Resolution** – After the timer ends, resolve contested slots in **Reverse‑GDP order**:

*Expected Volume: Most rounds have 0-4 disputes total (players typically play 1-3 Exports each), keeping resolution quick and manageable.*

1. The **poorest player** (lowest current GDP) chooses **one** contested route they're involved in and resolves it (Influence + blind bid; loser takes the card back to hand).

2. Next‑poorest player chooses a contested route they're in, and so on.

3. Continue cycling until every dispute is settled. Because each conflict involves at least two players, all fights clear in at most ⌈#contests / 2⌉ turns

4. **Start** the 3‑minute sand‑timer / phone timer **when the first Export card is placed**.

* **Steps:**

  * Choose an open Trade Partner slot; slide Export cards in **face‑down**.
  * Flip all chosen cards.
  * Resolve each contested slot: highest **Printed Influence + blind GDP bid** wins. *Players hide GDP coins in fist, reveal; pay what you bid (1 GDP = 1 Influence).*
  * Losing Export cards return to hand (hand‑size cap self‑balances).

- Players may play **any number of Export cards** during this phase, limited only by open Trade Partner slots and available GDP for bids.

- **30‑second warning:** ding or colored sand‑timer flip.

* At the buzzer, immediately advance to Income.

### 6 Income Phase

* Untimed. Each player totals GDP from routes, Policies, Events, etc.
* **GDP Sources**: Trade routes (60-70%), Policies (20-25%), Tactics (10-15%)
* **Trade Route Formula**: Export Value + Trading Partner Bonus + Route Multipliers
* **Influence Accumulation**: Each player gains influence with trading partners equal to influence from active routes
* Slide a cube on the Leader's GDP track for quick tabletop auditing.
* *See `design_docs/gdp_economy.md` for detailed economic framework*
* *See `design_docs/influence_accumulation.md` for influence accumulation mechanics*
* *See `design_docs/trading_partners.md` for trading partner roster and abilities*

### 7 Cleanup Phase

* Reset the Trade timer.
* No hand size management needed - each leader maintains their own hand size limit.

---

## 🔄 Round Structure

### Round Overview (Approximately 10 minutes per round)
1. **Event Flip** (~15 seconds) - Reveal and resolve global event
2. **Upkeep** - Resolve all persistent effects in **C → M → Y → K** order
3. **Draw** - Each player draws up to their leader's hand size limit
4. **Policy** - Play policies face-down, reveal simultaneously 
5. **Trade Phase** - **3-minute timer** for Export placement and dispute resolution
6. **Income** - Collect GDP from all active routes and effects
7. **Cleanup** - Reset timer, check for victory

---

### Phase 1: Event
- Flip the top Event card from the Event deck
- Immediate effects resolve now
- Ongoing effects stay visible near the timer for the round
- Events affect ALL players equally

### Phase 2: Upkeep (CMYK System)
Resolve ALL persistent effects from Policies, Routes, and Events in this specific order:

| Order | Symbol | Color Code | Memory Aid | Effect Type |
|-------|---------|------------|------------|-------------|
| **C** | 🟦 | Cyan ring/Yellow fill | **Canary** (global tweet) | **Global** effects |
| **M** | 🟪 | Magenta ring/Mint fill | **Mint** (personal stash) | **Personal** effects |
| **Y** | 🟡 | Yellow ring/Ice-blue fill | **Yeti** (pesky foe) | **Opponent-targeting** effects |
| **K** | ⬛ | Black ring/Purple fill | **Kraken** (trading seas) | **Trading Partner** effects |

*Board reminder: CMYK strip printed near the timer shows resolution order*

### Phase 3: Draw
Players simultaneously draw up to their leader's hand size limit from ANY combination of available decks:

- **USA:** Draw up to 8 cards total
- **China:** Draw up to 7 cards total  
- **Russia:** Draw up to 6 cards total
- **Draw Sources:** Your Leader Deck (if not empty), Global Export Deck, Global Tactic Deck, Global Policy Deck
- **Strategic Choice:** Consider your current needs - Exports for routes, Tactics for disruption, Policies for engine-building

### Phase 4: Policy
- Each player selects **ONE** Policy card (Leader or Global) and places it face-down
- Count "3-2-1-POLICY!" and flip simultaneously  
- **Conflict Resolution:** Poorest player (lowest GDP) decides order of simultaneous effects
- Policies with ongoing effects replace any previous Policy in your Policy slot
- Pay any GDP costs immediately

### Phase 5: Trade Phase (TIMED - 3 MINUTES)

#### Starting the Phase
- **Timer starts when the FIRST Export card is placed by any player**
- All players act simultaneously during the timer
- 30-second warning at 2:30 mark

#### Route Slot Limitations
- Each trading partner has limited route slots (3-5 based on market size)
- Once all slots are filled, no new routes can be established there
- Established routes occupy slots until destroyed
- Players cannot target occupied slots with new Export cards
- Special rare cards may affect existing routes (see card descriptions)

#### Placing Exports
- Place Export cards **face-down** on any open Trade Partner slot
- **Check slot availability before placing** - cannot target filled slots
- You may place multiple Exports during the timer
- No limit on number of Exports played (except available slots and GDP)
- **No takebacks:** Once placed, cards cannot be moved
- GDP costs are paid AFTER dispute resolution
  
  Physical placement: If using slot strips, slide the short edge of your Export under the Trading Partner’s strip at the chosen numbered slot, leaving the title/influence visible. Keep both cards tucked during disputes; winner remains tucked, loser returns to hand.

#### Dispute Resolution (After Timer)
When multiple players claim the same Trade Partner slot:

1. **Resolution Order:** Start with poorest player (lowest GDP), then ascending GDP order
2. **Choosing Disputes:** When it's your turn, choose ONE disputed slot you're involved in
3. **Dispute Power Calculation:**
   - Base: Export card's printed Influence value
   - Plus: Your accumulated influence with that specific Trade Partner
   - Plus: Blind GDP bid (hidden in fist, revealed simultaneously)
4. **Resolution:**
   - Highest total wins the slot and pays their GDP bid
   - Loser retrieves their Export card to hand (no GDP cost)
   - Ties broken by poorest player (or poorest player wins if involved)
5. **Continue:** Next player in GDP order chooses a dispute until all are resolved

#### After Disputes
- Winners pay GDP costs printed on their Export cards
- Established routes are now **permanent** until explicitly removed
- Routes immediately begin generating influence with their Trade Partners

### Phase 6: Income

**Calculate GDP from all sources:**
1. **Trade Routes:** Each active route generates (Export Value + Trading Partner Bonus + Multipliers)
2. **Policy Effects:** Add any GDP from your active Policy
3. **Event Effects:** Add any GDP from the current round's Event
4. **Special Abilities:** Add any GDP from Leader abilities or Tactics

**Update Tracking:**
- Slide cube on Leader GDP track
- Gain influence with Trade Partners (1 per active route unless modified)
- Check for 50 GDP instant victory

### Phase 7: Cleanup
- Reset trade timer to 3 minutes
- Discard the round's Event card
- Pass first player marker clockwise (optional)
- Announce current GDP leader and closest competitors

---

## 🎴 Card Types & Deck Architecture

### Four Distinct Decks

| Deck | Cards | Card Back | Contains | Draw Limit |
|------|-------|-----------|----------|------------|
| **Leader Deck** | 8 per leader | Leader-specific | 3 Exports, 3 Policies, 2 Tactics | When empty, cannot draw from it |
| **Global Export** | 15 (prototype) | Blue | Trade goods for routes | Unlimited |
| **Global Tactic** | 15 (prototype) | Red | Instant effects & disruption | Unlimited |
| **Global Policy** | 15 (prototype) | Green | Economic engines & rules | Unlimited |

### Rarity Distribution (Global Decks)
- **Common (40%):** 6 cards - Reliable economy builders
- **Uncommon (40%):** 6 cards - Interesting combos and counters  
- **Rare (20%):** 3 cards - Game-changing bombs

*Design Note: In a typical game, each player sees ~2 rares total across all global decks*

### Playing Cards

**Exports:**
- Played during Trade Phase only
- Any number per round (limited by slots and GDP)
- Establish permanent routes when successfully placed

**Tactics:**
- Lightning bolt symbol
- Played ANY TIME before Trade Phase ends
- Resolve immediately when played
- Cannot be responded to (except by other Tactics)

**Policies:**  
- ONE per round during Policy Phase
- Replace previous Policy if you have one active
- Create ongoing effects or immediate GDP boosts
- Some have upkeep effects (resolved in CMYK order)

---

## 👑 Leader Asymmetry

### Leader Differences
Each leader features unique:
- **Hand Size:** Determines draw limit each round
- **Export Slots:** 3-4 slots for Trade Partners on their board
- **Leader Deck:** 8 unique cards with signature strategies
- **Special Ability:** Printed on Leader board (some passive, some activated)

### Current Leaders (Prototype)

**USA (8 card hand)**
- Theme: Military-industrial complex meets social media
- Signature: "Freedom Corn" export, "Tweeto Diplomacy" policy
- Strength: Card advantage and flexibility

**China (7 card hand)**  
- Theme: Manufacturing power with information control
- Signature: "Great Firewall" policy, mass production exports
- Strength: Efficient routes and cost reduction

**Russia (6 card hand)**
- Theme: Resource extraction and chaos agents
- Signature: "Troll Farm" tactic, energy exports
- Strength: Disruption and powerful individual cards

---

## 🎮 Game Variants

### Chill Mode (No Timer)
- Remove the 3-minute timer completely
- Players take turns placing ONE Export clockwise
- Continue until all players pass consecutively  
- All other rules remain the same
- Perfect for learning or casual play

### Quick Start
- Each player begins with 15 GDP instead of 10
- Skip the first Event card
- Reduces game to 4 rounds instead of 5

### Diplomatic Mode
- Can trade cards 1:1 with other players during Trade Phase
- Can make non-binding GDP loan agreements
- Adds negotiation layer for groups that enjoy it

---

## 📋 Quick Reference

### Turn Order Reminder
**Event → Upkeep (CMYK) → Draw → Policy → Trade (3 min) → Income → Cleanup**

### Key Rules to Remember
- ✅ Trade routes are **PERMANENT** once established
- ✅ Influence **ACCUMULATES** and never decreases naturally
- ✅ **Check slot availability before placing Exports**
- ✅ Poorest player wins ties and resolves disputes first
- ✅ Tactics can be played anytime before Trade Phase ends
- ✅ Only ONE Policy per round
- ✅ Draw from ANY deck during Draw Phase
- ✅ 50 GDP = instant win

### Component List
- Leader boards (3-6)
- Trade Partner cards (8-10)
- Card decks: 8 per Leader + 45 Global cards + 15 Events
- GDP tokens (pennies work great!)
- Influence cubes
- 3-minute timer
- GDP tracking cubes for Leader boards

---

## 🎯 Strategy Tips

### For New Players
1. **Establish early routes** - They generate GDP every round
2. **Save GDP for disputes** - Don't spend everything on card costs
3. **Watch opponent's influence** - High influence makes disputes harder
4. **Diversify Trade Partners** - Don't put all routes with one partner
5. **Time your Tactics** - Wait for maximum impact

### Advanced Concepts
- **GDP Curve:** Aim for 8-10 GDP per round to threaten victory by Round 5
- **Influence Investment:** Each influence point is worth ~1 GDP in disputes
- **Card Advantage:** USA's 8-card hand is roughly 15% more options
- **Dispute Mathematics:** Bidding GDP = temporary influence, so overpay for crucial routes
- **Catch-up Mechanics:** When behind, you resolve disputes first AND many Policies favor the underdog

---

*Trade Warz: Where economic theory meets meme magic in 45 minutes of capitalism gone wild!*