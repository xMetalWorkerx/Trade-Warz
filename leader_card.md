# Leader Board Design

## Physical Layout

### Leader Board (Player Board)
Each leader gets a substantial board that stays in front of the player (not on the main game board) with:

**Top Section: Export Slots**
- **4-6 numbered export slots** arranged horizontally along the top
- Export cards slide into these slots when trade routes are established
- Numbers correspond to trade route cards

**Bottom Section: Policy Slots** 
- **3-4 policy slots** arranged horizontally along the bottom
- Policy cards slide into these slots when played
- Cards stick out slightly under the board for easy identification and space efficiency

## Trade Route Mechanics

### Trade Route Cards
Each leader receives:
- **One trade route card per possible export slot** (4-6 cards)
- **One extra trade route card** (for flexibility/backup)
- Total: 5-7 trade route cards per leader

### Establishing Trade Routes
When a player wins a trade dispute or places an export unopposed:
1. **Export card** goes into numbered slot on player's leader board
2. **Corresponding trade route card** (matching the slot number) goes onto the Trading Partner's import slot
3. This creates a visual connection between the player's export and its destination

## Design Decisions

### Export Slot Count: Asymmetric (3-4 slots)
- **USA**: 4 export slots (economic powerhouse)
- **China**: 4 export slots (manufacturing advantage)
- **Russia**: 3 export slots (focused energy strategy)
- Small asymmetry creates leader personality without major balance issues
- Affects economic capacity and strategic focus

### Trade Route Card Mechanics
- **Extra trade route card** used for:
  - **Suzerainty bonuses** from trading partners
  - **Bomb policy effects** that grant additional capacity (uncommon and/or rare)
- Trade route cards are **purely visual markers** - no GDP value or effects
- Cards can be reused when exports are removed/destroyed

### Policy Slot Usage
- **Policies are replaceable** - players can overwrite previous policies
- **Policies can be destroyed** by Tactics or Events
- Creates dynamic tactical layer with policy management

## Leader Countries/Regions
The three playable leaders in the prototype represent major economic powers:

1. **USA** - Economic powerhouse with 4 export slots
2. **China** - Manufacturing advantage with 4 export slots  
3. **Russia** - Energy dominance with 3 export slots

*Additional leaders (EU, Saudi Arabia, Brazil) planned for future expansion.*

### Leader Specifications
- **Starting GDP**: USA (8), China (7), Russia (6)
- **Draw Rate**: 2 cards per turn for all leaders
- **Unique Abilities**: Each leader has distinct economic advantages
- **Signature Cards**: 8 cards per leader (3 Exports, 3 Policies, 2 Tactics)

*See `prototype/leader_specs.md` for complete leader specifications.*

## Visual Design Notes
- Cards protruding under the board minimizes board space while maintaining clear organization
- Numbered slots create clear correspondence between export placement and trade route cards
- Large format allows for leader-specific artwork and information

## Implementation Notes
- ✅ Export slot counts updated to reflect prototype (3-4 slots)
- ✅ Suzerainty mechanics defined in trading partner system
- ✅ Policy destruction mechanics integrated into Tactic and Event design
- ✅ Complete leader specifications available in prototype directory
