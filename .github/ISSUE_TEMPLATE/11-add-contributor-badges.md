---
name: 🎖️ Add contributor badge/flair system
about: Add special badges to highlight different types of contributors
title: "Add badge/flair system for contributors"
labels: ["good first issue", "enhancement", "feature", "ui/ux"]
assignees: ''
---

## Description
Add a badge/flair system that allows contributors to display special badges on their cards, such as "First Contributor," "Core Team," "Top Contributor," or custom badges for special achievements.

## Proposed Feature
Extend the contributor data format to support optional badges, and display them as small icons or labels on contributor cards.

## Current Behavior
- All contributor cards look the same
- No way to highlight special contributors or achievements
- No visual distinction between different contributor types

## Expected Behavior
- Contributors can add optional badge data to their profile
- Badges display as small, colorful labels on cards
- Different badge types have different colors/styles
- Badges are subtle but noticeable

## Badge Types

Suggested badge categories:
- `first` - First contributor to the project
- `core` - Core team member
- `top` - Top contributor (many PRs)
- `helper` - Helped others with their PRs
- `early` - Joined in the first month
- `milestone` - Contributed at a milestone (100th, 500th contributor, etc.)
- Custom text badges

## Implementation Details

### 1. Update Data Format

Contributors can add an optional `badges` array to their NDJSON entry:

```json
{"name":"Ada Lovelace","username":"ada","github":"https://github.com/ada","message":"Hello, world!","badges":["first","core"],"addedAt":"2025-01-01T12:00:00.000Z"}
```

Or with custom badges:
```json
{"name":"Grace Hopper","username":"grace","badges":[{"type":"custom","text":"Bug Hunter","color":"#ff6b6b"}],"message":"Found 10 bugs!"}
```

### 2. CSS Changes (assets/styles.css)

Add badge styles:

```css
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.5rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1;
}

/* Badge type colors */
.badge-first {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #1a202c;
}

.badge-core {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.badge-top {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
}

.badge-helper {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: #1a202c;
}

.badge-early {
  background: linear-gradient(135deg, #43e97b, #38f9d7);
  color: #1a202c;
}

.badge-milestone {
  background: linear-gradient(135deg, #fa709a, #fee140);
  color: #1a202c;
}

.badge-custom {
  background: rgba(255, 255, 255, 0.15);
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Add icon support */
.badge::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
}

.badge-first::before {
  content: "🥇";
  width: auto;
}

.badge-core::before {
  content: "⭐";
  width: auto;
}

.badge-top::before {
  content: "🏆";
  width: auto;
}

.badge-helper::before {
  content: "🤝";
  width: auto;
}

.badge-early::before {
  content: "🌱";
  width: auto;
}

.badge-milestone::before {
  content: "🎯";
  width: auto;
}
```

### 3. JavaScript Changes (assets/app.js)

Add badge rendering in the card creation loop (around line 97):

```javascript
// After adding the meta section
if (p.message) card.appendChild(meta);

// Add badges if they exist
if (p.badges && Array.isArray(p.badges) && p.badges.length > 0) {
  const badgesContainer = document.createElement('div');
  badgesContainer.className = 'badges';
  
  p.badges.forEach(badge => {
    const badgeEl = document.createElement('span');
    
    // Handle both string badges and object badges
    if (typeof badge === 'string') {
      badgeEl.className = `badge badge-${badge}`;
      badgeEl.textContent = badge.charAt(0).toUpperCase() + badge.slice(1);
    } else if (typeof badge === 'object') {
      badgeEl.className = 'badge badge-custom';
      badgeEl.textContent = badge.text || 'Badge';
      if (badge.color) {
        badgeEl.style.background = badge.color;
        badgeEl.style.color = getContrastColor(badge.color);
      }
    }
    
    badgesContainer.appendChild(badgeEl);
  });
  
  card.appendChild(badgesContainer);
}

a.appendChild(card);
```

### 4. Helper Function for Custom Colors

Add this helper function to calculate contrast color:

```javascript
// Add this function before the fetchContributors function
function getContrastColor(hexColor) {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white based on luminance
  return luminance > 0.5 ? '#1a202c' : '#ffffff';
}
```

### Alternative: Simpler Badge Implementation

For a simpler approach, just support predefined badge types:

```javascript
const badgeIcons = {
  first: { icon: '🥇', label: 'First', color: '#ffd700' },
  core: { icon: '⭐', label: 'Core Team', color: '#667eea' },
  top: { icon: '🏆', label: 'Top Contributor', color: '#f5576c' },
  helper: { icon: '🤝', label: 'Helper', color: '#00f2fe' },
  early: { icon: '🌱', label: 'Early Adopter', color: '#43e97b' },
  milestone: { icon: '🎯', label: 'Milestone', color: '#fa709a' }
};

if (p.badges && Array.isArray(p.badges)) {
  const badgesContainer = document.createElement('div');
  badgesContainer.className = 'badges';
  
  p.badges.forEach(badgeType => {
    const badgeInfo = badgeIcons[badgeType];
    if (badgeInfo) {
      const badgeEl = document.createElement('span');
      badgeEl.className = `badge badge-${badgeType}`;
      badgeEl.textContent = `${badgeInfo.icon} ${badgeInfo.label}`;
      badgeEl.title = badgeInfo.label;
      badgesContainer.appendChild(badgeEl);
    }
  });
  
  if (badgesContainer.children.length > 0) {
    card.appendChild(badgesContainer);
  }
}
```

## Steps to Implement

1. Fork this repository
2. Create a new branch: `git checkout -b feature/contributor-badges`
3. Add the badge CSS styles to `assets/styles.css`
4. Add the badge rendering JavaScript to `assets/app.js`
5. Test locally:
   - Edit `data/contributors.ndjson` and add badges to a few entries
   - Try different badge types
   - Test custom badges if implementing that option
   - Verify styling looks good
6. Update documentation (README.md or CONTRIBUTING.md) to explain the badge system
7. Commit your changes: `git commit -m "Add contributor badge/flair system"`
8. Push to your fork: `git push origin feature/contributor-badges`
9. Open a Pull Request

## Testing Checklist

- [ ] Badges display correctly on cards
- [ ] Different badge types have distinct colors
- [ ] Badges don't overflow on mobile
- [ ] Multiple badges on one card display nicely
- [ ] Cards without badges still look good
- [ ] Badge colors are accessible (good contrast)
- [ ] Icons (emojis) display on all browsers

## Example NDJSON Entries

**Basic badges:**
```json
{"name":"First Contributor","username":"pioneer","badges":["first"],"message":"I was here first!"}
{"name":"Core Team","username":"maintainer","badges":["core","helper"],"message":"Happy to help!"}
{"name":"Top Contributor","username":"superstar","badges":["top","early","milestone"],"message":"Love contributing!"}
```

**Custom badges:**
```json
{"name":"Custom Badge","username":"creative","badges":[{"type":"custom","text":"Designer","color":"#ff6b9d"}],"message":"I design things!"}
```

## Design Tips

- Keep badges small and subtle
- Use gradients for a modern look
- Ensure badges don't overwhelm the card content
- Test with multiple badges on one card
- Consider limiting to 3-4 badges max per card

## Future Enhancements

- Add badge hover effects with descriptions
- Allow badges to be clickable to filter contributors
- Add achievement badges based on contribution count
- Create a badge legend/key section

---
**Good first issue** - Perfect for learning about data structures and visual design! 🎖️
