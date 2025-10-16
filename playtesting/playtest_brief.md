# Trade Warz Playtest Brief (Prototype v0.3)

_Last updated: 2025-10-16_

## Snapshot
- **Player Count:** 2-6 (sweet spot 4)
- **Playtime:** ~45-60 minutes with the 3-minute Trade timer
- **Win Conditions:** First to 50 GDP or highest GDP after Round 5 (ties: most influenced partners → most routes → GDP in reserve)
- **Current Leaders:** USA (hand 8), China (hand 7), Russia (hand 6)
- **Prototype Scope:** 99-card print set + 15 Trade Partner boards, core rules finalized for testing

## Game Identity
Trade Warz is a satirical, high-velocity economic showdown. Players embody meme-fueled world leaders who slam exports, deploy surprise tactics, and weaponize policies to dominate the global GDP race. The game leans hard into persistent trade engines, escalating influence, and the tension of real-time route grabs with a comedic geopolitical twist.

## Component Checklist (Prototype)
- 3 Leader boards (USA, China, Russia) with GDP tracks and player abilities
- 24 Leader-specific cards (8 per leader: 3 Exports, 3 Policies, 2 Tactics)
- 45 Global cards (15 Exports, 15 Policies, 15 Tactics) + 10 Event cards
- 15 Trade Partner cards with shared 0–9 influence tracks (route slots vary by market size)
- GDP tokens/coins for spending and influence tracking
- Player cubes/markers for GDP tracks
- 3-minute timer and first player marker

_Optional Reference:_ Component specifications and board sketches live in `design_docs/` for deeper review.

## Setup At a Glance
1. Give each player a Leader board, their 8-card Leader deck, 10 GDP, and a GDP marker on their track.
2. Shuffle Global Export, Policy, Tactic, and Event decks separately; reveal the top Event each round.
3. Lay out the 15 Trade Partners (or a curated subset) with GDP tokens at 0 for each player on every influence track.
4. Place the timer and dispute coins within reach. Choose starting player by youngest leader impression (or random).

## Round Flow (CMYK Reminder)
1. **Event** – Flip and resolve the round’s global effect.
2. **Upkeep (CMYK):** Global → Personal → Opponent-targeting → Trade Partner effects.
3. **Draw** – Fill to leader hand limit from any combination of decks.
4. **Policy** – Everyone chooses one Policy, reveal on “3-2-1-POLICY!”, poorest player breaks timing conflicts.
5. **Trade Phase (3 minutes)** – Place Export cards on partner slots; disputes resolved afterward starting with poorest player.
6. **Income** – Collect GDP from active routes, policies, events, and abilities; advance influence by active routes.
7. **Cleanup** – Reset timer, clear Event, rotate first player if desired, announce GDP standings.

## Core Systems to Watch
### Trade Routes & Persistence
- Routes become permanent GDP engines once they survive disputes and have their cost paid.
- Each Trade Partner slot holds exactly one Export; removal only happens if a card explicitly destroys a route.

### Influence & Disputes
- Influence never decays unless a card says so; every active route typically adds +1 influence with its partner each Income phase.
- Dispute Power = Export Influence + stored influence with that partner + hidden GDP bid. Poorest player chooses the order of disputes and wins ties when involved.

### GDP Economy
- Players start at 10 GDP; aim for ~8-10 GDP per round to threaten the 50 GDP threshold by Round 5.
- GDP fuels bids, card costs, and ultimately victory—overspending early can stall your endgame push.

### Deck Architecture & Card Types
- Leader decks provide signature combos but run out; once empty you rely on global decks.
- Global decks follow a 40/40/20 rarity split (common/uncommon/rare) to create swingy but manageable variance.
- **Exports** establish routes, **Tactics** fire instantly before the Trade timer ends, **Policies** are once-per-round engines that replace previous policies.

### Leader Asymmetry
- **USA:** Card advantage and flexibility—thrives on hand size and adaptive responses.
- **China:** Cost reducers and manufacturing efficiency—sets up wide trade webs quickly.
- **Russia:** Disruption specialist—leans on high-impact plays and chaos tactics.

### Trading Partner Economy
- Markets offer 3-5 slots depending on size (Small=3, Medium=4, Large=5). Scarcity forces table tension.
- Influence thresholds unlock thematic bonuses; highest influence earns the suzerainty power (powerful once-per-round perks).
- Route slot economy is tuned so total open slots roughly match desired player routes—expect competition.

### Variants (For Testing Flexibility)
- **Chill Mode:** Remove timer, take turns placing one Export clockwise until everyone passes.
- **Quick Start:** Begin at 15 GDP, skip the first Event, play 4 rounds.
- **Diplomatic Mode:** Allow 1:1 card trades and informal GDP loans during the Trade phase.

## Current Design Highlights
- CMYK upkeep strip clarifies timing and keeps upkeep snappy.
- Persistent routes + accumulating influence create snowball potential balanced by dispute bidding and targeted removal.
- Catch-up levers: poorest player resolves disputes first, breaks ties, and many Policies scale when you trail.
- Humor-first naming keeps the tone light while math stays tight.

## Playtest Priorities
1. **Balance Check:** Track win rates per leader and identify any Export/Policy/Tactic outliers that feel oppressive or weak.
2. **Economy Curve:** Monitor GDP pacing—do players reliably threaten 50 GDP by Round 5? Does the blind bid system feel fair?
3. **Rule Clarity:** Note confusion around CMYK ordering, dispute math, or influence tracking (especially the shared 0–9 tracks with stacking coins at 10+).
4. **Fun Factor:** Capture table moments that land (or flop). Is the timer generating hype or stress? Are policies memorable?
5. **Component Usability:** Watch for fiddly elements (influence tokens sliding, timer visibility, partner layout) that need production tweaks.

## Feedback Prompts for Testers
- Which leader felt strongest/weakest and why?
- Were there moments where you felt locked out of trade routes? How did disputes resolve emotionally?
- Did the 3-minute timer enhance or hinder your enjoyment?
- Which cards caused confusion or needed rereads?
- How satisfied were you with your GDP progression each round?
- What table banter or jokes should be amplified in future art/flavor?

## Open Questions & Next Steps
- Finalize art direction (6 style options remain under consideration).
- Expand leader roster (EU, Saudi Arabia, Brazil) once core trio is balanced.
- Scale global decks beyond 15 cards per type after core mechanics lock.
- Build community/testing network to gather broader data.

Bring this brief to the table alongside the rulebook and prototype decks. Mark it up with notes, highlight pain points, and let the meme-capitalism arms race commence!
