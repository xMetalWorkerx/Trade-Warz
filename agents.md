# AI Assistant Guidelines for Trade Warz

## Welcome to Trade Warz Development!

This document provides guidelines for AI assistants working on the Trade Warz board game project. Whether you're helping with game mechanics, card design, documentation, or playtesting analysis, these guidelines will help you contribute effectively.

## 🎯 Project Context

**Trade Warz** is a satirical board game where 2-6 players become world leaders in a meme-driven economic trade war. Players compete to reach 50 GDP or achieve the highest GDP after 5 rounds through strategic trade, policy cards, and tactical maneuvers.

### Key Characteristics:
- **Fast-paced**: 45-60 minute games with 3-minute timed trade phases
- **Satirical**: Humorous take on real-world economics and geopolitics
- **Asymmetric**: Each leader has unique abilities and signature cards
- **Balanced**: Built-in catch-up mechanics prevent runaway leaders
- **Persistent Economy**: Trade routes and influence are permanent, creating an escalating economic engine

## 🤖 How to Help Effectively

### 1. Understand the Game Design Context
- This is **board game design**, not software development
- Focus on **player experience**, **game balance**, and **thematic consistency**
- Consider **physical components** and **table presence**
- Think about **teachability** and **replayability**

### 2. Maintain the Satirical Tone
- Keep the humor and meme energy alive
- Reference real-world economics with a wink
- Balance strategy with comedy
- Examples: "Freedom Corn," "Great Firewall," "the eww" (EU)

### 3. Consider Game Balance
- **Avoid "Skullclamp scenarios"** - overpowered cards that break the game
- Think about **catch-up mechanics** for trailing players
- Consider **win rate distribution** across different leaders
- Balance **risk vs reward** in all mechanics

### 4. Follow Established Patterns
- **CMYK Upkeep System**: C (Global) → M (Personal) → Y (Opponent) → K (Trading Partner)
- **Rarity Distribution**: 48% Common, 32% Uncommon, 20% Rare
- **Leader Asymmetry**: Each leader has 8-12 card mini-deck with signature cards
- **Dispute Resolution**: Reverse-GDP order (poorest player first)
- **Route Persistence**: Trade routes remain active for the entire game unless explicitly destroyed
- **Influence Accumulation**: Influence never decreases naturally, only through card effects

### 5. Trading Partner Design
- **Each partner has LIMITED route slots** (3-5 based on market size)
- **No GDP base bonuses** - all GDP comes from Export cards and influence bonuses
- **Unique influence thresholds per partner** - see trading_partners.md for specifics
- **Influence persists after route destruction** - creates "influence banking"
- **Slot scarcity creates competition** - total slots should roughly equal desired routes
- **Market size affects slots**: Large=5, Medium=4, Small=3

## 📋 Common Tasks & How to Approach Them

### Card Design
When creating new cards:
1. **Follow the established rarity system**
2. **Consider the CMYK timing** (when does this effect trigger?)
3. **Balance the power level** (is this too strong/weak?)
4. **Maintain thematic consistency** (does this fit the satirical tone?)
5. **Think about player interaction** (does this create interesting decisions?)
6. **Remember permanence rules** (Export cards create permanent routes, influence accumulates)

**Template for new cards:**
```markdown
## [Card Name]
**Type**: [Export/Tactic/Policy] | **Rarity**: [Common/Uncommon/Rare]
**Cost**: [GDP cost if applicable]
**Effect**: [Clear, concise description]
**Flavor Text**: [Optional satirical commentary]
**Design Notes**: [Why this card exists, balance considerations]
```

### Mechanics Refinement
When suggesting rule changes:
1. **Explain the problem** you're solving
2. **Propose a specific solution** with clear language
3. **Consider edge cases** and how they're handled
4. **Think about teachability** - will new players understand this?
5. **Maintain game flow** - does this slow down or speed up play?

### Documentation Improvement
When improving documentation:
1. **Use clear, concise language** - avoid jargon when possible
2. **Provide examples** for complex mechanics
3. **Include edge cases** and how they're resolved
4. **Maintain consistency** with existing terminology
5. **Consider the target audience** (casual to serious strategy gamers)

### Playtesting Analysis
When interpreting feedback:
1. **Look for patterns** in player complaints
2. **Consider the player count** (2-6 players, optimal 4)
3. **Think about skill level** (new vs experienced players)
4. **Identify balance issues** (which leaders/cards are too strong/weak?)
5. **Suggest specific improvements** rather than vague changes

## 🎨 Art & Visual Design

The visual style is still under development. When discussing art:
- **Consider the 6 art style options** outlined in `art_styles.md`
- **Think about production costs** and feasibility
- **Maintain thematic consistency** with the satirical tone
- **Consider international appeal** and cultural sensitivity
- **Focus on readability** and table presence

## 🧪 Testing & Balance

### Playtesting Priorities
1. **Leader balance** - ensure no single leader dominates
2. **Card power levels** - avoid game-breaking combinations
3. **Game length** - maintain 45-60 minute target
4. **Teachability** - can new players learn quickly?
5. **Replayability** - does each game feel different?

### Balance Testing Approach
- **Blind leader selection** during testing
- **Track win rates** by leader and player count
- **Test edge cases** and unusual situations
- **Consider player feedback** on fun factor
- **Iterate quickly** on problematic elements

## 📁 File Organization

### When Creating New Files:
- **Use descriptive names** (e.g., `leader_usa_abilities.md`)
- **Group related content** logically
- **Follow markdown conventions** for consistency
- **Include clear headers** and structure
- **Cross-reference** related files when helpful

### Documentation Standards:
- **Start with context** - what is this document about?
- **Use clear headings** to organize information
- **Include examples** for complex concepts
- **End with next steps** or open questions
- **Keep it scannable** with bullet points and tables

## 🚀 Development Workflow

### When Making Changes:
1. **Read existing documentation** first
2. **Understand the current state** of the mechanic/component
3. **Propose specific changes** with clear reasoning
4. **Consider downstream effects** on other game elements
5. **Document your decisions** for future reference

### Communication Style:
- **Be specific** rather than vague
- **Explain your reasoning** behind suggestions
- **Ask clarifying questions** when uncertain
- **Provide alternatives** when possible
- **Focus on the player experience**

## 🎯 Success Metrics

A successful contribution to Trade Warz should:
- **Improve player experience** (more fun, clearer rules, better balance)
- **Maintain thematic consistency** (satirical tone, economic theme)
- **Support the core design goals** (quick to teach, replayable, balanced)
- **Consider practical constraints** (production costs, component limits)
- **Enhance the overall vision** of the game

## 📞 Getting Help

If you're unsure about something:
1. **Check existing documentation** first
2. **Ask specific questions** about unclear elements
3. **Propose multiple options** when uncertain
4. **Focus on the player experience** as your north star
5. **Remember this is a collaborative creative process**

---

*Remember: The goal is to create a fun, balanced, and memorable board game that captures the absurdity of modern economic warfare while providing engaging strategic gameplay. Every suggestion should serve that vision.*
