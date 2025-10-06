---
name: 📅 Add contribution timeline view
about: Add a timeline/calendar view showing when contributors joined over time
title: "Add contribution timeline/calendar view feature"
labels: ["good first issue", "enhancement", "feature", "visualization"]
assignees: ''
---

## Description
Add an interactive timeline/calendar visualization that shows when contributors joined the project over time. This creates a visual representation of the project's growth and makes it easy to see contribution patterns.

## Proposed Feature
Add a "Timeline View" toggle button that switches between the grid view and a timeline view. The timeline shows contributors grouped by the date they joined (by month or week).

**Good first issue** - Great for learning about data visualization, date manipulation, and alternative views! 📅

## Current Behavior
- Contributors shown only in grid view
- No way to visualize contribution timeline
- Join dates are visible but not prominent
- Hard to see project growth over time

## Expected Behavior
- Toggle button switches between "Grid" and "Timeline" views
- Timeline view groups contributors by join date
- Each time period shows how many joined
- Clicking on a time period expands to show those contributors
- Visual representation of project growth
- Smooth transition between views

## Requirements

### View Toggle
- Button to switch between "Grid View" and "Timeline View"
- Located near the sort/search controls
- Icons: 🔲 Grid / 📅 Timeline
- Default: Grid view

### Timeline Structure
Group contributors by time period:
- **Option 1: By Month** - "September 2025", "October 2025"
- **Option 2: By Week** - "Week of Oct 1-7", "Week of Oct 8-14"
- **Option 3: By Day** (if many contributors) - "Oct 5, 2025"

### Visual Design
Timeline should show:
- Time period as header (e.g., "October 2025")
- Count of contributors in that period
- Collapsed by default with expand/collapse button
- When expanded, show contributor cards in that period
- Visual bar showing relative size of each period

### Functionality
- Timeline sorted chronologically (newest first or oldest first)
- Can expand/collapse each time period
- Search still works in timeline view
- Badge filter still works in timeline view
- "Expand All" / "Collapse All" buttons
- Smooth animations when expanding/collapsing

## Testing Checklist
- [ ] Toggle button switches between views
- [ ] Timeline groups contributors correctly
- [ ] Time periods are labeled clearly
- [ ] Expand/collapse works for each period
- [ ] Contributor count is accurate for each period
- [ ] Search works in timeline view
- [ ] Badge filters work in timeline view
- [ ] Sort order affects timeline display
- [ ] "Expand All" button works
- [ ] "Collapse All" button works
- [ ] Smooth transitions between states
- [ ] Mobile responsive design

## Expected Final Output

### When implemented:
1. User clicks "📅 Timeline" toggle button
2. View switches from grid to timeline
3. Timeline shows months/periods with contributor counts:
   ```
   📅 October 2025 (8 contributors) [−]
   ├─ [contributor cards shown...]
   
   📅 September 2025 (7 contributors) [+]
   └─ [collapsed]
   ```
4. User clicks expand on "September 2025"
5. Cards for those 7 contributors slide into view
6. User can search/filter while in timeline view
7. User clicks "🔲 Grid" to return to normal view
8. View smoothly transitions back to grid

### Example Timeline Layout:
```
┌─────────────────────────────────────────────┐
│ View: [🔲 Grid] [📅 Timeline ✓]            │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ 📅 October 2025           (12)      [−] │ │
│ ├─────────────────────────────────────────┤ │
│ │  [card] [card] [card] [card]           │ │
│ │  [card] [card] [card] [card]           │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ 📅 September 2025          (8)      [+] │ │
│ └─────────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

### Example Period Header:
```
┌──────────────────────────────────────┐
│ 📅 October 2025                      │
│ 12 contributors joined this month    │
│ ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░ (60%)            │
│                               [−]    │
└──────────────────────────────────────┘
```

## Design Tips
- Use accordion-style expand/collapse
- Add visual bars showing relative contribution volume
- Smooth CSS transitions for expanding/collapsing
- Consider adding "first contributor" badge to earliest period
- Add helpful empty states if period has no contributors
- Make time period headers sticky when scrolling (optional)

## Benefits
- Visualize project growth over time
- Easy to see when most contributors joined
- Interesting historical view of the project
- Educational for understanding open source growth patterns
- More engaging than just a list

## Implementation Hints
- Parse `addedAt` dates and group by month/week
- Use JavaScript `Date` object for date manipulation
- Sort periods chronologically
- Store expand/collapse state for each period
- Use CSS transitions for smooth animations
- Calculate percentage for visual bars

## Additional Features (Optional)
- Add statistics: "Peak month: October 2025"
- Show running total: "Total: 20 contributors"
- Add visual graph/chart of growth
- Show milestones: "🎉 100th contributor!"
- Add "This Week/Month/Year" quick filters

---
**Good first issue** - Perfect for learning about date manipulation and data visualization! 📊
