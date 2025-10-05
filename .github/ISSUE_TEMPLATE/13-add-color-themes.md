---
name: 🎨 Add custom color themes
about: Create alternative color themes that users can select
title: "Add alternative color themes/palettes"
labels: ["good first issue", "enhancement", "ui/ux", "design"]
assignees: ''
---

## Description
Create additional color theme options beyond the current dark theme, allowing users to choose from different color palettes that match their preferences while maintaining the FirstLeaf aesthetic.

## Proposed Feature
Add 2-3 alternative color themes such as:
- Ocean Blue theme
- Forest Green theme  
- Sunset Orange theme
- Purple Galaxy theme

Users can switch between themes using a theme selector in the header.

## Current Behavior
- Only one color scheme exists (cyan/teal dark theme)
- No ability to change colors
- Some users might prefer different color palettes

## Expected Behavior
- Multiple pre-designed color themes available
- Theme selector in the header
- Selected theme persists in localStorage
- Smooth transitions between themes
- All themes maintain good readability and accessibility

## Implementation Details

### 1. CSS Changes (assets/styles.css)

Define alternative color themes using CSS custom properties:

```css
/* Existing default theme */
:root {
  --bg: #0b1020;
  --panel: #121a35;
  --text: #e7ecff;
  --muted: #a7b3d0;
  --accent: #6be2ff;
  --accent-2: #7df9d4;
  --danger: #ff6b6b;
}

/* Ocean Blue Theme */
[data-theme="ocean"] {
  --bg: #0a1929;
  --panel: #132f4c;
  --text: #e3f2fd;
  --muted: #90caf9;
  --accent: #42a5f5;
  --accent-2: #29b6f6;
  --danger: #ef5350;
}

/* Forest Green Theme */
[data-theme="forest"] {
  --bg: #1b2a1a;
  --panel: #2d3e2c;
  --text: #e8f5e9;
  --muted: #81c784;
  --accent: #66bb6a;
  --accent-2: #4caf50;
  --danger: #ef5350;
}

/* Sunset Orange Theme */
[data-theme="sunset"] {
  --bg: #2a1810;
  --panel: #3d2618;
  --text: #fff3e0;
  --muted: #ffb74d;
  --accent: #ff9800;
  --accent-2: #fb8c00;
  --danger: #f44336;
}

/* Purple Galaxy Theme */
[data-theme="galaxy"] {
  --bg: #1a0f2e;
  --panel: #2d1b4e;
  --text: #ede7f6;
  --muted: #b39ddb;
  --accent: #9575cd;
  --accent-2: #7e57c2;
  --danger: #ec407a;
}

/* Add smooth transitions */
:root,
[data-theme] {
  transition: background-color 0.3s ease, color 0.3s ease;
}

body {
  transition: background 0.5s ease;
}

.card,
.btn,
#searchInput,
.sort-select {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
```

### 2. HTML Changes (index.html)

Add a theme selector dropdown in the header (around line 36):

```html
<nav class="actions">
  <select id="themeSelect" class="theme-select" aria-label="Select color theme">
    <option value="default">Cyan Theme</option>
    <option value="ocean">Ocean Blue</option>
    <option value="forest">Forest Green</option>
    <option value="sunset">Sunset Orange</option>
    <option value="galaxy">Purple Galaxy</option>
  </select>
  <a class="btn" id="repoLink" target="_blank" rel="noopener"
    >View Repo</a
  >
  <a class="btn primary" id="howToContribute" href="#contribute"
    >How to contribute</a
  >
</nav>
```

### 3. Style the Theme Selector

```css
.theme-select {
  padding: 0.6rem 1rem;
  background: var(--panel);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-select:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.02);
}

.theme-select:focus {
  outline: none;
  border-color: var(--accent);
}

@media (max-width: 720px) {
  .theme-select {
    width: 100%;
  }
}
```

### 4. JavaScript Changes (assets/app.js)

Add theme switching functionality:

```javascript
function initThemeSelector() {
  const themeSelect = document.getElementById('themeSelect');
  if (!themeSelect) return;

  // Load saved theme or use default
  const savedTheme = localStorage.getItem('colorTheme') || 'default';
  applyTheme(savedTheme);
  themeSelect.value = savedTheme;

  // Listen for theme changes
  themeSelect.addEventListener('change', (e) => {
    const theme = e.target.value;
    applyTheme(theme);
    localStorage.setItem('colorTheme', theme);
  });
}

function applyTheme(theme) {
  const html = document.documentElement;
  
  if (theme === 'default') {
    html.removeAttribute('data-theme');
  } else {
    html.setAttribute('data-theme', theme);
  }
}

// Update boot function
function boot() {
  fetchContributors();
  initThemeSelector();
}
```

### Alternative: Theme Buttons Instead of Dropdown

For a more visual approach, use theme preview buttons:

```html
<div class="theme-picker">
  <button class="theme-btn" data-theme="default" title="Cyan Theme">
    <span class="theme-preview theme-preview-default"></span>
  </button>
  <button class="theme-btn" data-theme="ocean" title="Ocean Blue">
    <span class="theme-preview theme-preview-ocean"></span>
  </button>
  <button class="theme-btn" data-theme="forest" title="Forest Green">
    <span class="theme-preview theme-preview-forest"></span>
  </button>
  <button class="theme-btn" data-theme="sunset" title="Sunset Orange">
    <span class="theme-preview theme-preview-sunset"></span>
  </button>
  <button class="theme-btn" data-theme="galaxy" title="Purple Galaxy">
    <span class="theme-preview theme-preview-galaxy"></span>
  </button>
</div>
```

```css
.theme-picker {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.theme-btn {
  padding: 0;
  background: none;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  border-color: var(--accent);
  transform: scale(1.1);
}

.theme-btn.active {
  border-color: var(--accent-2);
}

.theme-preview {
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 6px;
}

.theme-preview-default {
  background: linear-gradient(135deg, #6be2ff, #7df9d4);
}

.theme-preview-ocean {
  background: linear-gradient(135deg, #42a5f5, #29b6f6);
}

.theme-preview-forest {
  background: linear-gradient(135deg, #66bb6a, #4caf50);
}

.theme-preview-sunset {
  background: linear-gradient(135deg, #ff9800, #fb8c00);
}

.theme-preview-galaxy {
  background: linear-gradient(135deg, #9575cd, #7e57c2);
}
```

```javascript
function initThemeSelector() {
  const themeButtons = document.querySelectorAll('.theme-btn');
  if (themeButtons.length === 0) return;

  const savedTheme = localStorage.getItem('colorTheme') || 'default';
  applyTheme(savedTheme);

  themeButtons.forEach(btn => {
    const theme = btn.dataset.theme;
    
    // Mark active theme
    if (theme === savedTheme) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
      // Remove active from all buttons
      themeButtons.forEach(b => b.classList.remove('active'));
      
      // Add active to clicked button
      btn.classList.add('active');
      
      // Apply theme
      applyTheme(theme);
      localStorage.setItem('colorTheme', theme);
    });
  });
}
```

## Steps to Implement

1. Fork this repository
2. Create a new branch: `git checkout -b feature/color-themes`
3. Add the theme CSS variables in `assets/styles.css`
4. Add the theme selector (dropdown or buttons) in `index.html`
5. Add the JavaScript theme switching in `assets/app.js`
6. Test each theme:
   - Verify all colors work well together
   - Check readability of all text
   - Ensure good contrast ratios
   - Test on different screen sizes
7. Commit your changes: `git commit -m "Add custom color themes"`
8. Push to your fork: `git push origin feature/color-themes`
9. Open a Pull Request

## Testing Checklist

- [ ] All themes display correctly
- [ ] Theme selection persists after page refresh
- [ ] Smooth transitions between themes
- [ ] All text is readable in all themes
- [ ] Buttons and inputs look good in all themes
- [ ] Cards display nicely in all themes
- [ ] Good contrast ratios (use browser tools to check)
- [ ] Mobile view works with theme selector
- [ ] No console errors

## Accessibility Guidelines

Each theme should maintain:
- **Text contrast ratio**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Interactive elements**: Clear focus indicators
- **Color independence**: Don't rely solely on color to convey information

Use tools like:
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- Firefox Accessibility Inspector

## Design Tips

- Start with one or two themes, then expand
- Test themes with many contributors to see how cards look
- Ensure accent colors are distinct from background
- Keep muted colors actually muted (lower saturation)
- Maintain the same "vibe" across themes

## Theme Naming Ideas

- Tech: "Cyber Blue," "Matrix Green," "Terminal Black"
- Nature: "Ocean Deep," "Forest Night," "Desert Dusk"
- Space: "Galaxy Purple," "Nebula Pink," "Starlight"
- Minimal: "Moonlight," "Midnight," "Twilight"

## Optional Enhancements

- Add a "Random Theme" button
- Create seasonal themes (Halloween, Christmas, etc.)
- Add a custom theme creator
- Preview themes before selecting

---
**Good first issue** - Perfect for learning CSS custom properties and theming! 🎨
