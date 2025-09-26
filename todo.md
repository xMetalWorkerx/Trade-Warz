# Tariff Warz - Priority Issues to Address

## ✅ Resolved Issues

### 1. Trade Phase - Dispute Resolution Text Corruption
- **Status**: FIXED - Cleaned up duplicate text in mechanics file

### 4. Export Card Placement Timing
- **Resolution**: GDP is paid when the route is established (after disputes are resolved). Bid money either stays as influence points with trading partner OR returns to bank (TBD during testing)

### 5. Upkeep Effect Distribution
- **Resolution**: Targeting ~10 upkeep effects from Policy cards + ~5 from other sources (trading partner suzerainty or Leader cards). Will refine as mechanics develop.

### 6. Trade Partner Slots  
- **Resolution**: 3-5 slots mentioned are for Export cards on player boards. Trading partners are independent nations on the game board, each with their own import slots (also 3-5 range, exact numbers TBD)

### 7. Hand Size Management
- **Resolution**: CONFIRMED - When Leader deck is empty, players simply can't draw from it anymore and must choose other decks. Effects may allow additional draws.

### 8. Tactic Timing Restriction
- **Resolution**: Simplified to "Tactics can be played any time before the Trade round ends"

### 9. Victory Condition Edge Cases
- **Resolution**: Highest GDP wins. If tied at 50+ GDP, play continues until tie is broken.

## ✅ Resolved Issues

### 2. GDP Economy Balance
- **Status**: DESIGNED - Comprehensive framework created in `design_docs/gdp_economy.md`
- **Resolution**: Trade routes provide 60-70% of GDP, policies 20-25%, tactics 10-15%
- **Formula**: Export Value + Trading Partner Bonus + Route Multipliers
- **Next**: Create placeholder cards and test the economic engine

## 💡 Ideas for Future Consideration

### Fast-Pass Token Concept
- **Status**: Seed of a good idea but needs drastic changes
- **Original concept**: Lock your board from targeting if you finish Policy placement early
- **Issue**: Current implementation unclear and potentially not fun
- **Notes**: Could be reworked into something more interesting, but deprioritized for now

**Status**: Core framework is clean and ready for new mechanics development! 