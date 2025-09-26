## Designer Overview: What Is *Tariff Warz*?

**⚠️ Prototype Status:** This design is in active development and requires extensive playtesting for balance. Leaders must be rigorously tested to prevent overpowered abilities (avoiding "Skullclamp scenarios"). Recommended: blind Leader selection and win rate tracking during testing.

### Elevator Pitch

*Tariff Warz* is a lightning‑fast, tongue‑in‑cheek board‑and‑card game where 2–6 players (sweet‑spot 4) become exaggerated world leaders locked in a meme‑driven trade skirmish.  In under an hour you'll slam down exports, unleash surprise tactics, and weaponize social‑media Policies to amass **50 GDP** or finish on top after five frantic rounds.

### Themes & Vibes

* **Satirical Geopolitics** – vintage propaganda art collides with modern Twitter snark; every card is a wink at real‑world tariffs, subsidies, and Late‑Stage Capitalist absurdity.
* **Meme Energy** – signature leader cards like "Freedom Corn" or "Great Firewall" mix genuine strategy with laugh‑out‑loud table moments.
* **High‑Octane Trade Floor** – simultaneous phases, blind GDP bids, and a ticking 3‑minute Trade timer keep adrenaline (and trash‑talk) high.

*Note: Visual art style is still under development - see `art_styles.md` for current directions being explored.*

### Designer Goals

| Pillar                              | Implementation                                                                                                                                                   |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Quick to teach, quick to finish** | Color‑coded CMYK upkeep strip, one‑page player aid, 5‑round cap, real pennies/nickels for GDP.                                                                   |
| **Big swings without feel‑bads**    | Reverse‑GDP tie breaks, leader‑specific catch‑up Policies, and guaranteed Export availability prevent runaway leaders.                                           |
| **Replay through asymmetry**        | Each Leader packs an 8–12‑card Leader Deck including at least one signature Export & Tactic; shared decks use a 48/32/20 rarity split for fresh combos every session. |
| **Physical fun**                    | Blind‑bid coins, timer mechanics, and hands‑on components create tactile engagement.                                                                              |

### Win Condition

Hit **50 GDP** for an instant Economic Boom *or* top the GDP chart after Round 5 (tiebreak: most Trade Partners).  Games average 45–60 minutes.

### What Makes It Pop?

1. **One‑deck teach, three‑deck depth** – players draw from any pile (Exports, Tactics, Leader Decks), fueling micro‑decisions without bogging the pace.
2. **Every card a story** – rare "bomb" Tactics explode into table‑wide headlines, while commons keep economies humming.  Expect \~2 jaw‑droppers per player.
3. **Catch‑up baked in** – poorest player resolves disputes first; reverse-GDP order prevents runaway leaders.

Whether you're a policy wonk or just here for the memes, *Tariff Warz* delivers a compact, comedic blast of economic brinkmanship that's easy to set up, wicked to master, and impossible to play just once.

---

## Turn Structure & Timing

*(Quick‑play framework for ******************************Tariff Warz******************************, June 2025 draft)*

### Round Overview

1. **Event Flip** – resolve text, leave globals in play. *(\~15 s)*
2. **Upkeep** – resolve effects in **C → M → Y → K** order (see below).
3. **Draw** – each player draws up to their leader's hand size limit.
4. **Policy** – each player may play **1** Policy card (face‑down ➜ 3‑2‑1 flip).
5. **Trade Phase** – **start the 3‑minute Trade timer** when the first Export is placed.
6. **Income** – collect GDP, slide cube on Leader GDP track.
7. **Cleanup** – reset timer for next round.

---

### 1 Event Phase

* Flip the top **Event** card before anything else each round.
* Immediate effects resolve now; ongoing global effects stay face‑up near the clock.

### 2 Upkeep Phase

Resolve effects in the mnemonic CMYK order shown below. Each card shows one corner symbol; sweep your own effects in sequence:

| Order | Symbol | Color Cue                              | "Easter‑Egg" Name         | Resolves                       |
| ----- | ------ | -------------------------------------- | ------------------------- | ------------------------------ |
| **C** | 🟡     | Cyan ring / Yellow fill                | **Canary** (global tweet) | **Global** effects             |
| **M** | 🟢     | Magenta ring / Mint‑green fill         | **Mint** (personal stash) | **Personal** effects           |
| **Y** | 🔵     | Yellow ring / Ice‑blue fill            | **Yeti** (pesky foe)      | **Opponent‑targeting** effects |
| **K** | ⚫      | Thin Key‑black ring / Dark‑purple fill | **Kraken** (trading seas) | **Trading‑Partner** effects    |

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

## Game Variants

### Chill Mode (No Timer)
For new players or casual sessions, remove the 3‑minute Trade timer entirely. Players take turns placing Export cards clockwise until everyone passes consecutively. All other rules remain the same. This mode allows new players to learn the mechanics without time pressure before advancing to the full timed experience.

---

## Player‑Aid "Turn Reminder" (print‑ready)

> **Event → Upkeep (C M Y K) → Draw → Policy → Trade (3 min) → Income → Cleanup**
> *Play Tactic cards any time before Trade ends.*

---

### Victory & End‑Game

**Instant Win (Economic Boom):** The moment a player reaches **50 GDP**, they win immediately—skip the rest of the round.

**Timed Win (Global Close):** If no player hits 50 GDP by the end of **Round 5**, the game ends and the player with the **highest GDP** wins.

**Tiebreaker:** If multiple players reach 50+ GDP simultaneously, the highest GDP wins. If still tied, play continues until the tie is broken. For end-of-time ties, victory goes to the tied player who influences the **greatest number of Trade Partners**.

### Deck Architecture & Rarity

**Card Pools**

* **Leader Decks** – one mini‑deck per Leader, 8 cards total (*3 Exports + 3 Policies + 2 Tactics*). Once empty, you can no longer draw from it.
* **Global Export deck** – shared pile, 15 cards for prototype play. Distinct blue card back.
* **Global Tactic deck** – shared pile, 15 cards for prototype play. Distinct red card back.
* **Global Policy deck** – shared pile, 15 cards for prototype play. Distinct green card back.

**Draw Phase Rule**
Each round, a player draws up to their leader's hand size limit and may draw from **any** of the four piles above. (Ignore a Leader Deck if it is empty.)

**Play Limits**

* **Policies:** You may play **1 Policy card per turn** (during the Policy phase).
* **Exports:** You may play **any number of Export cards** during the Trade phase, limited only by open trade slots and your available GDP. GDP costs are paid when routes are established (after disputes are resolved).

**Tactic Timing**
*Tactic cards (lightning‑bolt icon) may be played at any time before the Trade phase ends.*

**Policy Mechanics**
*Policy cards from the Global Policy deck work alongside Leader-specific Policies. During the Policy phase, players may play **1 Policy card total** (either from their hand or from the Global Policy deck). Global Policy cards provide broader economic effects, while Leader Policies offer more specialized abilities.*

**Policy Card Types & Effects:**
* **Economic Policies** - Direct GDP bonuses (+2-4 GDP/round), trade route modifiers (+1 GDP/route), or income multipliers
* **Trade Policies** - Influence bonuses (+1-2 Influence), dispute resolution advantages, or export slot expansions (+1 slot)
* **Disruptive Policies** - Target opponents' trade routes (-2-4 GDP), force policy discards, or impose economic sanctions
* **Defensive Policies** - Protect against tactics, maintain trade routes, or provide catch-up bonuses (+1 GDP/round when behind)

**Policy Resolution Order:**
* Policies resolve simultaneously when revealed, but conflicting effects are resolved by the **poorest player** (lowest GDP)
* Some Policies have ongoing effects that persist until replaced or destroyed
* Policy slots on Leader boards can hold both Leader and Global Policy cards

**Rarity Curve for Export, Tactic, and Policy decks**

| Rarity       | Cards | Total | % of 15‑card deck |
| ------------ | ----- | ----- | ----------------- |
| **Common**   | 6     | 6     | 40 %              |
| **Uncommon** | 6     | 6     | 40 %              |
| **Rare**     | 3     | 3     | 20 %              |

*In a typical 4‑player, 5‑round session (\~20 draws from each shared deck), each player sees on average about 1 rare, 2–3 uncommons, and 2–3 commons.*

**Prototype Play Rates (per player)**

* Exports played: \~4-6
* Tactics played: \~3-5
* Policies played: \~3-4 (mix of Leader and Global Policy cards)
* Export slot limit: 3–4 slots on a Leader board; refilling drives the Export play‑rate.
* Hand size management: Each leader maintains their own hand size (USA: 8, China: 7, Russia: 6)
