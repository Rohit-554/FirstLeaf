---
name: 📊 Add contributor statistics page
about: Add a separate statistics page showing interesting data about all contributors
title: "Add contributor statistics/analytics page"
labels: ["good first issue", "enhancement", "feature", "analytics"]
assignees: ''
---

## Description
Create a new "Stats" page that shows interesting statistics and visualizations about the contributors, such as most common names, badge distribution, join trends, and more.

## Proposed Feature
Add a "📊 Stats" button in the navigation that links to a new `stats.html` page showing contributor analytics and fun facts.

**Good first issue** - Great for learning about data analysis and visualization! 📊

## Current Behavior
- Only basic stats shown (total count, latest contributor)
- No way to see aggregate data
- No insights about contributor demographics
- Missing fun facts and trivia

## Expected Behavior
- "Stats" link in navigation
- Separate stats page with visualizations
- Multiple stat cards showing different metrics
- Interactive charts (optional)
- Fun facts and trivia section
- Responsive design

## Requirements

### Stats to Display

**Basic Stats:**
- Total contributors
- Total countries (if country data available)
- Average join rate (per week/month)
- Newest contributor
- First contributor (earliest join date)

**Badge Statistics:**
- Badge distribution (pie chart or bars)
- Most common badges
- Contributors with most badges
- Percentage with each badge type

**Name Statistics:**
- Most common first names
- Longest name
- Shortest name
- Most common username patterns

**Growth Statistics:**
- Contributors per month (bar chart)
- Growth trend (up/down/steady)
- Busiest month
- Slowest month

**Fun Facts:**
- "Did you know?" trivia
- Example: "42% of contributors have the 'early' badge"
- Example: "Most contributors joined in October 2025"

### Page Structure
```
┌─────────────────────────────────────┐
│  FirstLeaf - Statistics             │
│  [Back to Contributors]             │
├─────────────────────────────────────┤
│                                     │
│  📊 Contributor Statistics          │
│                                     │
│  ┌───────┐ ┌───────┐ ┌───────┐    │
│  │ Total │ │Newest │ │ First │    │
│  │  150  │ │ John  │ │ Alice │    │
│  └───────┘ └───────┘ └───────┘    │
│                                     │
│  🏷️ Badge Distribution             │
│  ▓▓▓▓▓▓▓ Core Team (35%)           │
│  ▓▓▓▓ Early Adopter (20%)          │
│  ▓▓▓ First (15%)                   │
│                                     │
│  📈 Growth Over Time                │
│  [Bar chart showing joins/month]   │
│                                     │
│  🎯 Fun Facts                       │
│  • Most popular name: John (5)     │
│  • Longest message: 142 chars      │
│  • Average badges per person: 1.8  │
│                                     │
└─────────────────────────────────────┘
```

## Testing Checklist
- [ ] Stats page loads correctly
- [ ] Link from main page works
- [ ] All statistics calculate correctly
- [ ] Charts/visualizations display properly
- [ ] Mobile responsive
- [ ] Back button works
- [ ] Handles edge cases (no contributors, etc.)
- [ ] Page matches main site styling
- [ ] Fast loading time
- [ ] No console errors

## Expected Final Output

### When implemented:
1. User on main page sees "📊 Stats" link in nav
2. User clicks "Stats"
3. New page opens showing contributor statistics
4. User sees overview cards with key numbers
5. User scrolls to see badge distribution chart
6. User sees growth chart over time
7. User reads fun facts section
8. User clicks "Back to Contributors" to return

### Example Stats Display:

**Overview Cards:**
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Total        │ │ This Month   │ │ This Week    │
│    152       │ │     12       │ │      3       │
│ Contributors │ │ New Members  │ │ New Members  │
└──────────────┘ └──────────────┘ └──────────────┘
```

**Badge Distribution:**
```
🏷️ Badge Distribution

⭐ Core Team      ▓▓▓▓▓▓▓▓▓▓▓▓ 35 (23%)
🥇 First         ▓▓▓▓▓▓▓ 20 (13%)
🌱 Early Adopter ▓▓▓▓▓ 15 (10%)
🏆 Top           ▓▓▓ 8 (5%)
🤝 Helper        ▓▓ 5 (3%)
```

**Fun Facts:**
```
🎯 Fun Facts & Trivia

• The first contributor was Alice, who joined on Sep 30, 2025
• October 2025 was our busiest month with 42 new contributors
• The most common first name is "John" (appears 5 times)
• 42% of contributors have at least one badge
• The longest message is 142 characters long
• Average of 8 new contributors per week
• We gained 152 contributors in just 3 months! 🎉
```

## Design Tips
- Use cards for each stat section
- Add icons for visual interest
- Use progress bars for percentages
- Color-code different stat types
- Keep it simple and readable
- Add hover effects for interactivity

## Benefits
- Insights into project growth
- Fun and engaging for community
- Useful for maintainers
- Shows project health
- Encourages participation

## Implementation Hints

### Calculate statistics:
```javascript
// Total with badge
const coreTeamCount = contributors.filter(c => 
  c.badges?.includes('core')
).length;

// Most common name
const nameFreq = {};
contributors.forEach(c => {
  const firstName = c.name.split(' ')[0];
  nameFreq[firstName] = (nameFreq[firstName] || 0) + 1;
});

// Growth by month
const byMonth = {};
contributors.forEach(c => {
  const month = c.addedAt.slice(0, 7); // "2025-10"
  byMonth[month] = (byMonth[month] || 0) + 1;
});
```

### Simple bar chart CSS:
```css
.stat-bar {
  height: 20px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 4px;
  transition: width 0.3s ease;
}
```

## Additional Features (Optional)
- Export stats as PDF or image
- Compare stats to last month
- Leaderboard: most badges, longest tenure
- Interactive charts with Chart.js or D3.js
- Auto-refresh stats every minute
- Share stats on social media

---
**Good first issue** - Perfect for learning data analysis and visualization! 📈
