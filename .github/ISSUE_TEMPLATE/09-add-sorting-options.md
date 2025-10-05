---
name: 🔄 Add sorting options for contributors
about: Allow users to sort contributors by different criteria
title: "Add sorting dropdown for contributors list"
labels: ["good first issue", "enhancement", "feature"]
assignees: ''
---

## Description
Add a dropdown menu that allows users to sort the contributors list by different criteria such as name (alphabetically), join date (newest/oldest), or username.

## Proposed Feature
Add a sort dropdown next to the search box that allows users to sort contributors by:
- Newest first (default)
- Oldest first
- Name (A-Z)
- Name (Z-A)

## Current Behavior
- Contributors are always sorted by newest first (addedAt descending), then by name
- No option for users to change the sort order

## Expected Behavior
- A dropdown menu appears next to the search box
- Users can select different sorting options
- The contributor grid updates instantly when sort order changes
- Search functionality continues to work with the new sort order

## Implementation Details

### 1. HTML Changes (index.html)

Add a sort dropdown in the list-header section (around line 51):

```html
<div class="list-header">
  <h2 id="contributors-title">Contributors</h2>
  <span
    id="count"
    class="count"
    aria-live="polite"
    aria-atomic="true"
  ></span>
  <div class="controls-container">
    <div class="search-container">
      <input
        type="text"
        id="searchInput"
        placeholder="Search contributors by name or username..."
        aria-label="Search contributors"
      />
    </div>
    <div class="sort-container">
      <label for="sortSelect" class="sort-label">Sort by:</label>
      <select id="sortSelect" class="sort-select" aria-label="Sort contributors">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
      </select>
    </div>
  </div>
</div>
```

### 2. CSS Changes (assets/styles.css)

Update and add these styles:

```css
/* Update search-container to be part of controls */
.controls-container {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.search-container {
  flex: 1;
  min-width: 250px;
  margin: 0; /* Remove existing margin */
}

.sort-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-label {
  color: var(--muted);
  font-size: 0.9rem;
  white-space: nowrap;
}

.sort-select {
  padding: 0.75rem 1rem;
  background: var(--panel);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.95rem;
  font-family: inherit;
  cursor: pointer;
  min-width: 150px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.sort-select:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.02);
}

.sort-select:focus {
  outline: none;
  border-color: var(--accent);
  background: rgba(255, 255, 255, 0.05);
}

/* Style the dropdown arrow */
.sort-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a7b3d0' d='M6 8L2 4h8z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.5rem;
}

/* Mobile responsiveness */
@media (max-width: 720px) {
  .controls-container {
    flex-direction: column;
  }
  
  .search-container {
    width: 100%;
  }
  
  .sort-container {
    width: 100%;
  }
  
  .sort-select {
    flex: 1;
  }
}
```

### 3. JavaScript Changes (assets/app.js)

Replace the sorting logic and add sort functionality:

```javascript
async function fetchContributors() {
  const elList = document.getElementById("contributors");
  const elCount = document.getElementById("count");
  const elLoading = document.getElementById("loading");
  const elError = document.getElementById("error");
  const sortSelect = document.getElementById("sortSelect");

  // ... existing code for fetching data ...

  const people = lines
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  // Function to sort contributors
  function sortContributors(contributors, sortType) {
    const sorted = [...contributors]; // Create a copy
    
    switch(sortType) {
      case 'newest':
        sorted.sort((a, b) =>
          (b.addedAt || "").localeCompare(a.addedAt || "") ||
          (a.name || "").localeCompare(b.name || "")
        );
        break;
      case 'oldest':
        sorted.sort((a, b) =>
          (a.addedAt || "").localeCompare(b.addedAt || "") ||
          (a.name || "").localeCompare(b.name || "")
        );
        break;
      case 'name-asc':
        sorted.sort((a, b) =>
          (a.name || a.username || "").localeCompare(b.name || b.username || "")
        );
        break;
      case 'name-desc':
        sorted.sort((a, b) =>
          (b.name || b.username || "").localeCompare(a.name || a.username || "")
        );
        break;
    }
    
    return sorted;
  }

  // Function to render contributors
  function renderContributors(contributors) {
    elList.innerHTML = "";
    const contributorElements = [];
    
    for (const p of contributors) {
      // ... existing code to create cards (lines 57-102) ...
      // Keep all the existing card creation code here
      
      contributorElements.push({
        element: a,
        name: (p.name || "").toLowerCase(),
        username: (p.username || "").toLowerCase(),
      });
    }
    
    return contributorElements;
  }

  // Initial sort and render
  let sortedPeople = sortContributors(people, 'newest');
  let contributorElements = renderContributors(sortedPeople);

  // Set up sort change listener
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      const sortType = e.target.value;
      sortedPeople = sortContributors(people, sortType);
      contributorElements = renderContributors(sortedPeople);
      
      // Re-apply search filter if there's a search term
      const searchInput = document.getElementById("searchInput");
      if (searchInput && searchInput.value) {
        const searchTerm = searchInput.value.toLowerCase();
        contributorElements.forEach(({ element, name, username }) => {
          if (name.includes(searchTerm) || username.includes(searchTerm)) {
            element.style.display = "";
          } else {
            element.style.display = "none";
          }
        });
      }
    });
  }

  // Set up search functionality (keep existing search code)
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();

      contributorElements.forEach(({ element, name, username }) => {
        if (name.includes(searchTerm) || username.includes(searchTerm)) {
          element.style.display = "";
        } else {
          element.style.display = "none";
        }
      });
    });
  }

  elCount.textContent = `${people.length} contributor${
    people.length === 1 ? "" : "s"
  }`;
  elLoading.remove();
}
```

## Steps to Implement

1. Fork this repository
2. Create a new branch: `git checkout -b feature/sort-contributors`
3. Add the HTML dropdown in `index.html`
4. Add the CSS styles in `assets/styles.css`
5. Refactor the JavaScript in `assets/app.js` to support sorting
6. Test locally:
   - Try each sort option
   - Verify sorting works correctly
   - Test that search still works after changing sort
   - Check mobile responsiveness
7. Commit your changes: `git commit -m "Add sorting options for contributors"`
8. Push to your fork: `git push origin feature/sort-contributors`
9. Open a Pull Request

## Testing Checklist

- [ ] Dropdown appears next to search box
- [ ] All sort options work correctly
- [ ] "Newest First" sorts by addedAt descending
- [ ] "Oldest First" sorts by addedAt ascending
- [ ] "Name (A-Z)" sorts alphabetically
- [ ] "Name (Z-A)" sorts reverse alphabetically
- [ ] Search functionality still works after sorting
- [ ] Dropdown is styled consistently with the theme
- [ ] Mobile layout works well
- [ ] No console errors

## Bonus Features (Optional)

- Save the selected sort preference to localStorage
- Add a visual indicator for the active sort
- Add more sort options (e.g., by username)

## Tips

- Test with contributors that have and don't have `addedAt` values
- Make sure the refactored code doesn't break existing functionality
- Consider edge cases (empty lists, single contributor, etc.)

---
**Good first issue** - Great for learning about array sorting and DOM manipulation! 🔄
