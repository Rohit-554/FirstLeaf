---
name: ⭐ Add random contributor spotlight
about: Add a featured random contributor section that changes on each page load or button click
title: "Add random contributor spotlight feature"
labels: ["good first issue", "enhancement", "feature", "ui/ux"]
assignees: ''
---

## Description
Add a "Contributor Spotlight" section at the top of the page that randomly highlights one contributor. This gives every contributor a chance to be featured and makes the page more dynamic and interesting.

## Proposed Feature
Add a special spotlight card/section that shows one randomly selected contributor. Include a "Show Another" button to randomly select a different contributor without reloading the page.

**Good first issue** - Great for learning about random selection, featured content, and dynamic UI! ⭐

## Current Behavior
- All contributors shown equally in a grid
- No featured or highlighted contributor
- Static page on each load
- No way to discover random contributors

## Expected Behavior
- Spotlight section appears at top of contributors section
- One random contributor is featured with a special design
- "Show Another" button picks a new random contributor
- Spotlight updates without page reload
- Different contributor shown on each page load
- Spotlight contributor also appears in main grid

## Requirements

### Spotlight Section Location
- Placed above the main contributors grid
- After the stats banner, before the contributor cards
- Full width of the container
- Eye-catching design that stands out

### Spotlight Card Design
A larger, special card that includes:
- **Large avatar** (200px+, larger than regular cards)
- **"⭐ Contributor Spotlight" badge/header**
- **Name** in large, bold text
- **Username** (@username)
- **Full message** with more space
- **All badges** displayed prominently
- **GitHub button** to view profile
- **Fun fact**: "Joined on [date]" or "Contributor #X"
- **"Show Another" button** to randomize

### Functionality
- Random contributor selected on page load
- "Show Another" button picks different random contributor
- Smooth transition/animation when changing spotlight
- Don't show same contributor twice in a row
- Works with search/filter (picks from visible contributors)

### Visual Style
- More prominent than regular cards
- Special gradient or glow effect
- Maybe a spotlight icon or emoji: ⭐ 🌟 💫
- Confetti or sparkle animation (optional)
- Distinct from regular cards but consistent with theme

## Testing Checklist
- [ ] Spotlight section appears at correct position
- [ ] Random contributor selected on page load
- [ ] "Show Another" button works correctly
- [ ] Different contributor shown each click
- [ ] Same contributor not shown twice in a row
- [ ] Smooth transition when changing
- [ ] All contributor data displays correctly
- [ ] GitHub link works
- [ ] Responsive on mobile devices
- [ ] Respects current filters/search
- [ ] Works with empty search results
- [ ] Styling matches site theme

## Expected Final Output

### When implemented:
1. User loads page
2. Spotlight section appears at top with random contributor
3. Special card shows Ada Lovelace with larger avatar and "⭐ Contributor Spotlight"
4. User reads: "Ada Lovelace - @ada - 'Hello, world!' - Joined Sep 30, 2025"
5. User clicks "🎲 Show Another" button
6. Card smoothly transitions to show different random contributor (Grace Hopper)
7. User can click button again for another random contributor
8. User can click "View on GitHub" to see profile

### Example Spotlight Layout:
```
┌────────────────────────────────────────────────┐
│         ⭐ CONTRIBUTOR SPOTLIGHT ⭐            │
├────────────────────────────────────────────────┤
│                                                │
│          ┌──────────────┐                     │
│          │              │                      │
│          │   AVATAR     │                      │
│          │   (large)    │                      │
│          │              │                      │
│          └──────────────┘                      │
│                                                │
│          Ada Lovelace                          │
│          @ada                                  │
│                                                │
│          🥇 First  ⭐ Core Team               │
│                                                │
│   "Hello, world! I'm excited to contribute    │
│    to this amazing project and help others!"  │
│                                                │
│   📅 Joined on September 30, 2025             │
│                                                │
│   [🔗 View on GitHub] [🎲 Show Another]      │
│                                                │
└────────────────────────────────────────────────┘
```

## Design Tips
- Make it significantly larger than regular cards
- Add a subtle glow or shadow effect
- Use gradient background for spotlight header
- Add smooth fade transition when changing
- Consider pulse animation on first load
- Keep "Show Another" button playful and fun
- Test with different message lengths

## Benefits
- Every contributor gets a chance to be featured
- Makes the page more dynamic and interesting
- Encourages users to explore different contributors
- Fun, random element adds engagement
- Helps highlight contributors who might be missed
- Creates a welcoming, inclusive feeling

## Implementation Hints
- Select random index: `Math.floor(Math.random() * contributors.length)`
- Store last shown contributor to avoid repeats
- Use CSS transitions for smooth changes
- Fade out old, fade in new contributor
- Copy contributor data to spotlight section
- Update spotlight when filters change

## Additional Features (Optional)
- Daily spotlight: Same contributor for all users that day
- "Pin" button to keep current spotlight
- Share button: "Share this contributor on Twitter"
- Add fun stats: "Random pick #42"
- Confetti animation when showing new contributor
- "Meet all contributors" button to cycle through all

## Fun Variations
- Call it "Rising Star" instead of "Spotlight"
- Add themed titles: "Today's Hero", "Featured Friend"
- Seasonal themes: "🎃 Spooky Spotlight" for October
- Add contributor's country flag if available

---
**Good first issue** - Perfect for learning about randomization and featured content! 🌟
