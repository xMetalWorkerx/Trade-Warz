# Trade Warz

*A satirical board game of economic brinkmanship and meme-driven trade wars*

[![Status](https://img.shields.io/badge/Status-Prototype%20Development-orange)](https://github.com/yourusername/trade-warz)
[![Players](https://img.shields.io/badge/Players-2--6-blue)](https://github.com/yourusername/trade-warz)
[![Duration](https://img.shields.io/badge/Duration-45--60%20minutes-green)](https://github.com/yourusername/trade-warz)
[![Age](https://img.shields.io/badge/Age-13%2B-yellow)](https://github.com/yourusername/trade-warz)

## What Is Trade Warz?

**Trade Warz** is a lightning-fast, tongue-in-cheek board and card game where 2-6 players (sweet-spot 4) become exaggerated world leaders locked in a meme-driven trade skirmish. In under an hour you'll slam down exports, unleash surprise tactics, and weaponize social-media Policies to amass **50 GDP** or finish on top after five frantic rounds.

### Elevator Pitch

*Tariff Warz* is a satirical, fast-paced board and card game where 2-6 players (optimally 4) become exaggerated world leaders locked in a meme-driven economic trade war. Players compete to amass **50 GDP** or achieve the highest GDP after five frantic rounds, all while unleashing satirical policies, trade tactics, and weaponized social media campaigns.

## 🎯 Core Themes & Experience

- **Satirical Geopolitics**: Vintage propaganda art meets modern Twitter snark, with every card winking at real-world tariffs, subsidies, and late-stage capitalist absurdity
- **Meme Energy**: Signature leader cards like "Freedom Corn" or "Great Firewall" mix genuine strategy with laugh-out-loud table moments  
- **High-Octane Trade Floor**: Simultaneous phases, blind GDP bids, and a ticking 3-minute Trade timer keep adrenaline (and trash-talk) high

## 🏆 Win Conditions

- **Instant Win (Economic Boom)**: Reach **50 GDP** immediately and win the game
- **Timed Win (Global Close)**: After 5 rounds, the player with highest GDP wins
- **Tiebreaker**: Most Trade Partners influenced

## 🎮 Game Structure

### Round Sequence (45-60 minutes total)
1. **Event Flip** (~15 seconds) - Resolve global effects
2. **Upkeep** - Resolve effects in **C → M → Y → K** order (see below)
3. **Draw** - Each player draws up to their leader's hand size limit
4. **Policy** - Play 1 Policy card face-down, reveal simultaneously
5. **Trade Phase** - **3-minute timer** for Export placement and disputes
6. **Income** - Collect GDP and track on Leader board
7. **Cleanup** - Reset timer (no hand size management needed)

### Upkeep Phase (CMYK System)
Effects resolve in this specific order:
- **C (Canary)** 🟡 - **Global** effects (cyan ring/yellow fill)
- **M (Mint)** 🟢 - **Personal** effects (magenta ring/mint fill)  
- **Y (Yeti)** 🔵 - **Opponent-targeting** effects (yellow ring/ice-blue fill)
- **K (Kraken)** ⚫ - **Trading Partner** effects (key-black ring/dark-purple fill)

## 🃏 Core Mechanics

### Card Types & Decks

**Four Card Pools:**
- **Leader Decks** (8 cards each) - Personal mini-decks with signature cards
- **Global Export Deck** (15 cards) - Blue-backed trade goods
- **Global Tactic Deck** (15 cards) - Red-backed action cards
- **Global Policy Deck** (15 cards) - Green-backed policy cards

**Rarity Distribution (for Global decks):**
- **Common**: 40% (6 cards)
- **Uncommon**: 40% (6 cards)  
- **Rare**: 20% (3 cards)

### Trade Phase (The Heart of the Game)

**Placement**: Players place Export cards face-down on open Trade Partner slots during the 3-minute timer. No rearranging once revealed. **Once established, trade routes remain active for the entire game.**

**Influence Trading**: During the Trade Phase, players may buy and sell influence with trading partners for GDP, creating a secondary economy and strategic depth.

**Dispute Resolution**: Contested slots resolve in **reverse-GDP order** (poorest player first):
1. Poorest player chooses one contested route they're involved in
2. Resolution: **Printed Influence + blind GDP bid** wins
3. Players hide GDP coins in fist, reveal simultaneously
4. Winner pays their bid, loser takes Export card back to hand
5. Continue cycling until all disputes settled

### Leader Asymmetry

**Three Playable Leaders (Prototype):**
- USA, China, Russia
- **Asymmetric Export Slots**: 3-4 slots per leader for variety
- **Asymmetric Hand Sizes**: USA (8 cards), China (7 cards), Russia (6 cards)
- **Unique Abilities**: Each leader has signature Exports, Tactics, and Policies

## 🎲 Strategic Depth

**Catch-Up Mechanics Built-In:**
- Poorest player resolves disputes first (reverse-GDP order)
- Guaranteed Export availability prevents runaway leaders
- Leader-specific catch-up Policies for struggling players

**Replayability Through Asymmetry:**
- Each leader's unique deck and abilities
- Four shared deck rarity system ensures fresh combos every session
- Expect ~2 "jaw-dropper" rare cards per player per game from each global deck
- Persistent economic engine: trade routes and influence accumulate throughout the game

## 🎨 Game Variants

**Chill Mode**: Remove the 3-minute Trade timer for new players. Players take turns placing Exports clockwise until everyone passes consecutively.

## 📁 Project Structure

```
Trade Warz/
├── README.md                 # This file
├── mechanics_prototype.md    # Core game mechanics and rules
├── leader_card.md           # Leader board design and layout
├── art_styles.md            # Visual design exploration
├── todo.md                  # Development priorities and issues
├── prototype/               # Complete playable prototype
│   ├── prototype_cards.md   # Original 20 cards
│   ├── leader_decks.md      # Leader-specific cards (24 cards)
│   ├── global_decks.md      # Global card pools (55 cards)
│   ├── prototype_setup.md   # Setup and rules guide
│   ├── leader_specs.md      # Leader specifications
│   └── playtest_guide.md    # Playtesting framework
├── design_docs/             # Core design documentation
├── cards/                   # Example card designs
├── leaders/                 # Leader specifications
├── templates/               # Design templates
└── images/                  # Art assets and reference materials
    ├── 1000016926.png
    └── Gu75QaiX0AADJxE.jpg
```

## 📋 Current Development Status

✅ **Prototype Complete**: 99-card prototype is ready for playtesting! The game includes 3 fully-designed leaders with unique abilities, 55 global cards, and complete rules framework. Ready for extensive balance testing and player feedback.

### Key Design Goals

| Pillar | Implementation |
|--------|----------------|
| **Quick to teach, quick to finish** | Color-coded CMYK upkeep strip, one-page player aid, 5-round cap, real pennies/nickels for GDP |
| **Big swings without feel-bads** | Reverse-GDP tie breaks, leader-specific catch-up Policies, and guaranteed Export availability prevent runaway leaders |
| **Replay through asymmetry** | Each Leader packs an 8–12-card Leader Deck including at least one signature Export & Tactic; shared decks use a 48/32/20 rarity split for fresh combos every session |
| **Physical fun** | Blind-bid coins, timer mechanics, and hands-on components create tactile engagement |

### Resolved Issues ✅
- Trade Phase dispute resolution mechanics
- Export card placement timing and GDP costs
- Upkeep effect distribution system
- Hand size management when Leader decks empty
- Tactic timing restrictions
- Victory condition edge cases
- GDP economy framework and balance system

### Completed Development ✅
- ✅ GDP economy framework designed (see `design_docs/gdp_economy.md`)
- ✅ Influence accumulation system designed (see `design_docs/influence_accumulation.md`)
- ✅ Trading partner roster created (see `design_docs/trading_partners.md`)
- ✅ Complete 99-card prototype created (see `prototype/` directory)
- ✅ Leader ability design and testing framework
- ✅ Prototype card creation and testing setup

### Next Development Phase 🔄
- Extensive playtesting and balance testing
- Art style finalization (6 options under consideration)
- Component production planning
- Expansion to 6 leaders (EU, Saudi Arabia, Brazil)
- Full card set expansion (50+ cards per global deck)

## 🎨 Visual Design

The visual identity is still under development with six distinct aesthetic directions being explored:

1. **Corporate Infographic Satire** - Slick business presentation meets absurdist humor
2. **Retro 80s Wall Street** - Wolf of Wall Street meets Miami Vice neon aesthetic  
3. **Medieval Economic Warfare** - Game of Thrones trading houses with modern concepts
4. **Cartoon Economics** - Rick & Morty / South Park style irreverent satire
5. **Minimalist Bauhaus** - German design school meets economic theory
6. **Newspaper/Magazine Collage** - Cut-and-paste ransom note meets financial newspaper

## 🤝 Contributing

This is a board game design project in active development. While not a traditional open-source code project, feedback and playtesting suggestions are welcome!

### How to Help
- Playtest the current prototype and provide feedback
- Suggest balance improvements for Leaders or card effects
- Contribute art style direction feedback
- Report unclear rules or mechanics
- Propose new Leader concepts or card ideas

## 📞 Contact & Links

- **Designer**: [Your Name]
- **Project Status**: Active Prototype Development
- **Target Audience**: Strategy gamers, political satire fans, casual gamers
- **Estimated Release**: TBD (extensive playtesting required)

---

*Trade Warz delivers a compact, comedic blast of economic brinkmanship that's easy to teach, wicked to master, and impossible to play just once. Whether you're a policy wonk or just here for the memes, it offers a unique blend of strategic depth and satirical humor in under an hour.*

## 📄 License

[Add your preferred license here - Creative Commons, All Rights Reserved, etc.]
