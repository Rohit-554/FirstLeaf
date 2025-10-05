---
name: 📊 Add contributor statistics display
about: Display total contributors and latest contributor info
title: "Add contributor statistics to the page"
labels: ["good first issue", "enhancement", "feature", "ui/ux"]
assignees: ''
---

## Description
Add a statistics section that displays useful information about contributors, such as the total count and the most recent contributor.

## Proposed Feature
Add a statistics bar or section that shows:
- Total number of contributors
- Latest contributor (most recently added)

## Current Behavior
- Only total count is shown next to the "Contributors" heading
- No highlight for the newest contributor

## Expected Behavior
- A dedicated statistics section or enhanced display
- Highlight the most recent contributor with a special badge or styling
- Show when they were added

## Implementation Details

### Option 1: Add a banner above the contributor grid

**HTML Changes (index.html)**

Add this after the search container (around line 59):

```html
<div class="stats-banner">
  <div class="stat-item">
    <span class="stat-label">Total Contributors</span>
    <span class="stat-value" id="totalCount">0</span>
  </div>
  <div class="stat-item">
    <span class="stat-label">Latest Contributor</span>
    <span class="stat-value" id="latestContributor">-</span>
  </div>
</div>
```

**CSS Changes (assets/styles.css)**

Add these styles:

```css
.stats-banner {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(107, 226, 255, 0.1),
    rgba(125, 249, 212, 0.1)
  );
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-label {
  color: var(--muted);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  color: var(--accent-2);
  font-size: 1.5rem;
  font-weight: 800;
}

@media (max-width: 720px) {
  .stats-banner {
    flex-direction: column;
    gap: 1rem;
  }
}
```

**JavaScript Changes (assets/app.js)**

Update the code after sorting (around line 52):

```javascript
// After sorting the people array, add:
const latestPerson = people[0]; // First person after sorting by addedAt

// Update stats
const totalCountEl = document.getElementById('totalCount');
const latestContributorEl = document.getElementById('latestContributor');

if (totalCountEl) {
  totalCountEl.textContent = people.length;
}

if (latestContributorEl && latestPerson) {
  latestContributorEl.textContent = latestPerson.name || latestPerson.username || 'Unknown';
}
```

### Option 2: Add a "NEW" badge to the latest contributor card

**CSS Changes (assets/styles.css)**

```css
.new-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: var(--bg);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card {
  position: relative; /* Add this to existing .card styles */
}
```

**JavaScript Changes (assets/app.js)**

In the loop that creates cards (around line 67), add after creating the card element:

```javascript
const card = document.createElement("div");
card.className = "card";
card.role = "listitem";

// Add NEW badge to the first contributor (latest)
if (people.indexOf(p) === 0) {
  const badge = document.createElement("span");
  badge.className = "new-badge";
  badge.textContent = "NEW";
  card.appendChild(badge);
}
```

## Steps to Implement

1. Fork this repository
2. Create a new branch: `git checkout -b feature/contributor-stats`
3. Choose **either** Option 1 (stats banner) or Option 2 (NEW badge) or implement both!
4. Make the HTML, CSS, and JavaScript changes as described
5. Test locally by opening `index.html` in your browser
6. Verify:
   - Statistics display correctly
   - The latest contributor is highlighted appropriately
   - The design matches the existing theme
   - Mobile responsiveness works
7. Commit your changes: `git commit -m "Add contributor statistics display"`
8. Push to your fork: `git push origin feature/contributor-stats`
9. Open a Pull Request

## Testing Checklist

- [ ] Statistics show correct values
- [ ] Latest contributor is properly highlighted
- [ ] Design matches the existing dark theme aesthetic
- [ ] Layout is responsive on mobile devices
- [ ] No console errors appear
- [ ] All existing functionality still works

## Design Tips

- Keep the design consistent with the current dark theme
- Use existing CSS variables for colors
- Ensure text is readable and has good contrast
- Test with different numbers of contributors

---
**Good first issue** - Great for learning DOM manipulation and data visualization! 📊
