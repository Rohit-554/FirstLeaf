---
name: 🏷️ Add filter contributors by badges
about: Add filter buttons to show only contributors with specific badge types
title: "Add badge filter feature for contributors"
labels: ["good first issue", "enhancement", "feature", "ui/ux"]
assignees: ''
---

## Description
Add filter buttons that allow users to filter contributors by their badge types. Users can click on badge type buttons to see only contributors who have that specific badge (e.g., show only "Core Team" members or "First" contributors).

## Proposed Feature
Add a row of badge filter buttons below the search/sort controls. Each button represents a badge type. Clicking a button filters the contributors list to show only those with that badge.

**Good first issue** - Great for learning about filtering, array methods, and interactive UI! 🏷️

## Current Behavior
- All contributors are shown at once
- Only search and sort options available
- No way to filter by badge type
- Badges are visible but not interactive

## Expected Behavior
- Badge filter buttons appear below controls
- Each badge type has its own filter button
- Clicking a badge filter shows only contributors with that badge
- Active filter button is highlighted
- "All" button shows all contributors (clear filter)
- Filter works with search (both active at once)
- Filter respects current sort order

## Requirements

### Filter Buttons
Badge types to include as filters:
- **All** (default - shows everyone)
- **🥇 First** - First contributor
- **⭐ Core Team** - Core team members
- **🏆 Top Contributor** - Top contributors
- **🤝 Helper** - Helpers
- **🌱 Early Adopter** - Early adopters
- **🎯 Milestone** - Milestone contributors

### Visual Design
- Filter buttons should look like chips/pills
- Active filter button should be highlighted (brighter color)
- Use same colors as actual badges
- Buttons should have hover effects
- Mobile-friendly (wrap to multiple rows if needed)

### Functionality
- Click badge filter to show only those contributors
- Click "All" or click active filter again to clear
- Filter works alongside search (AND operation)
- Filter respects current sort
- Shows count of filtered contributors
- If no contributors match filter + search, show friendly message

## Testing Checklist
- [ ] Badge filter buttons appear below controls
- [ ] All badge types are represented
- [ ] Clicking filter shows correct contributors
- [ ] Active filter button is visually highlighted
- [ ] "All" button clears filter
- [ ] Clicking active filter again deactivates it
- [ ] Filter + search work together correctly
- [ ] Contributor count updates when filtering
- [ ] Empty state message shows if no matches
- [ ] Filter respects current sort order
- [ ] Buttons wrap nicely on mobile
- [ ] Hover effects work properly

## Expected Final Output

### When implemented:
1. User sees badge filter buttons below search/sort
2. User clicks "🥇 First" badge filter
3. Only contributors with "First" badge are shown
4. Button is highlighted to show it's active
5. Count shows "2 contributors (filtered)"
6. User can then search within filtered results
7. User clicks "All" or the same filter again
8. All contributors are shown again
9. Filter is cleared, button no longer highlighted

### Example Layout:
```
┌──────────────────────────────────────────────────┐
│ Search: [____________]  Sort: [Newest ▼]         │
│                                                   │
│ Filter by badge:                                 │
│ [All] [🥇 First] [⭐ Core Team] [🏆 Top] [🤝 Helper] │
│ [🌱 Early] [🎯 Milestone]                        │
└──────────────────────────────────────────────────┘

Total: 15 contributors (3 with "Core Team" badge)
```

### Example Filter Button States:
```
Inactive: [🥇 First]  (subtle background)
Active:   [🥇 First]  (bright background, bold)
Hover:    [🥇 First]  (slightly brighter)
```

## Design Tips
- Use the same color scheme as the badges themselves
- Make active state very obvious
- Add subtle transitions for smooth interactions
- Consider adding a small counter badge showing how many have each type
- Group related badges together if many badge types exist

## Benefits
- Easier to find contributors with specific roles
- Better discovery of core team members
- Useful for highlighting first contributors
- More interactive and engaging UI
- Helps users explore the community

## Implementation Hints
- Get unique badge types from contributors data
- Filter function: `contributors.filter(c => c.badges?.includes(selectedBadge))`
- Combine with search filter using AND logic
- Update contributor count after filtering
- Clear filter when switching to "All"

## Additional Features (Optional)
- Add count to each filter button showing total
  - Example: `[🥇 First (5)]`
- Allow multiple badge filters at once (OR operation)
  - Example: Show "First" OR "Core Team"
- Add "Clear all filters" button if multiple filters active

---
**Good first issue** - Perfect for learning about filtering, state management, and interactive UI! 🎨
