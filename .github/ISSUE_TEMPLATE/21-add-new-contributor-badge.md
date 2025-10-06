---
name: 🔔 Add notification badge for new contributors
about: Add a notification badge showing number of contributors added in last 24 hours
title: "Add new contributors notification badge"
labels: ["good first issue", "enhancement", "feature", "ui/ux"]
assignees: ''
---

## Description
Add a small notification badge that shows how many new contributors joined in the last 24 hours (or 7 days). This makes the page more dynamic and shows that the project is actively growing.

## Proposed Feature
Add a small "🔔 NEW" badge near the contributor count that shows "X new today" or "X new this week" when hovered or clicked.

**Good first issue** - Great for learning about date comparisons and notifications! 🔔

## Current Behavior
- No indication of recent activity
- Can't tell if new contributors joined recently
- Page feels static
- Hard to see project momentum

## Expected Behavior
- Badge appears if contributors joined in last 24 hours
- Shows count of recent contributors
- Clicking badge filters to show only new contributors
- Badge has subtle animation to draw attention
- Updates based on current date/time

## Requirements

### Badge Display
- Small badge/pill next to total count
- Shows number of new contributors
- Text: "5 new today" or "12 new this week"
- Only shows if count > 0
- Eye-catching but not annoying

### Time Windows
Support different time windows:
- **Last 24 hours**: "X new today"
- **Last 7 days**: "X new this week"
- **Last 30 days**: "X new this month"

Default: Last 7 days (most reasonable)

### Functionality
- Calculate based on `addedAt` field
- Compare with current date/time
- Click badge to filter and show only new contributors
- Click again to clear filter
- Badge has subtle pulse animation

### Visual Design
- Small pill-shaped badge
- Color: bright (green, blue, or accent color)
- Icon: 🔔 or ⚡ or ✨
- Positioned next to contributor count
- Subtle glow or pulse effect

## Testing Checklist
- [ ] Badge shows when new contributors exist
- [ ] Count is accurate (based on time window)
- [ ] Badge hidden when no new contributors
- [ ] Clicking badge filters to new contributors
- [ ] Clicking again clears filter
- [ ] Animation is smooth and subtle
- [ ] Works with different time windows
- [ ] Responsive on mobile
- [ ] Tooltip shows on hover
- [ ] Updates when filters change

## Expected Final Output

### When implemented:
1. User loads page
2. Sees contributor count: "152 contributors"
3. Sees new badge next to it: "🔔 5 new this week"
4. User hovers badge, tooltip shows: "Click to see new contributors"
5. User clicks badge
6. Page filters to show only 5 recent contributors
7. Badge is highlighted to show filter is active
8. User clicks badge again to clear filter
9. All contributors shown again

### Example Display:
```
┌────────────────────────────────────┐
│ Contributors                       │
│ 152 contributors  [🔔 5 new ✨]   │ ← badge
└────────────────────────────────────┘
```

### Example Badge Variants:
```
[🔔 3 new today]      (last 24h)
[✨ 12 new this week]  (last 7d)
[⚡ 25 new this month] (last 30d)
```

### Active Filter State:
```
┌────────────────────────────────────┐
│ Contributors                       │
│ 5 contributors  [🔔 5 new ✓]      │ ← active
│ Showing only new contributors      │
└────────────────────────────────────┘
```

## Design Tips
- Make badge small but noticeable
- Use contrasting color (green/blue)
- Add subtle pulse animation (optional)
- Clear visual feedback when active
- Consider adding confetti when clicked (fun!)

## Benefits
- Shows project is active and growing
- Encourages users to check back
- Creates sense of momentum
- Highlights recent contributors
- Makes page feel more dynamic

## Implementation Hints

### Calculate new contributors:
```javascript
function getNewContributors(contributors, hoursAgo = 168) { // 7 days default
  const cutoffTime = new Date();
  cutoffTime.setHours(cutoffTime.getHours() - hoursAgo);
  
  return contributors.filter(c => {
    if (!c.addedAt) return false;
    const addedDate = new Date(c.addedAt);
    return addedDate >= cutoffTime;
  });
}

const newContributors = getNewContributors(contributors);
const newCount = newContributors.length;
```

### CSS for badge:
```css
.new-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #43e97b, #38f9d7);
  color: #1a202c;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.new-badge:hover {
  transform: scale(1.05);
}

.new-badge.active {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.new-badge {
  animation: pulse 2s ease-in-out infinite;
}
```

### Toggle filter on click:
```javascript
let showingNewOnly = false;

newBadge.addEventListener('click', () => {
  showingNewOnly = !showingNewOnly;
  
  if (showingNewOnly) {
    // Show only new contributors
    contributorElements.forEach(({ element, contributor }) => {
      const isNew = newContributors.includes(contributor);
      element.style.display = isNew ? '' : 'none';
    });
    newBadge.classList.add('active');
  } else {
    // Show all
    contributorElements.forEach(({ element }) => {
      element.style.display = '';
    });
    newBadge.classList.remove('active');
  }
});
```

## Additional Features (Optional)
- Tooltip: "5 contributors joined in the last 7 days"
- Different icons for different time windows
- Animation when count increases
- Sound effect on click (optional, off by default)
- "See all new" button that scrolls to new ones
- History: show previous week's count for comparison

## Time Window Selection (Advanced)
Allow users to choose time window:
```
[🔔 12 new ▼]
  ├─ Last 24 hours (3)
  ├─ Last 7 days (12) ✓
  └─ Last 30 days (25)
```

---
**Good first issue** - Perfect for learning date manipulation and interactive badges! ⏰
