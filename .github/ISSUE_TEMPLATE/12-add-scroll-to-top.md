---
name: ⬆️ Add "Scroll to Top" button
about: Add a floating button that appears when scrolling down to quickly return to top
title: "Add scroll to top button"
labels: ["good first issue", "enhancement", "ui/ux"]
assignees: ''
---

## Description
Add a floating "Scroll to Top" button that appears when the user scrolls down the page, making it easy to quickly return to the top of the contributor list.

## Proposed Feature
A circular button with an up arrow icon that:
- Appears when user scrolls down past a certain point
- Smoothly scrolls back to the top when clicked
- Fades in/out with smooth transitions
- Is positioned in the bottom-right corner
- Works on both desktop and mobile

## Current Behavior
- No way to quickly scroll back to top
- Users must manually scroll back up
- On pages with many contributors, this can be tedious

## Expected Behavior
- Button appears after scrolling down ~400px
- Button fades in smoothly
- Clicking button smoothly scrolls to top
- Button fades out when at the top of the page
- Button is accessible and keyboard-friendly

## Implementation Details

### 1. HTML Changes (index.html)

Add the button before the closing `</body>` tag (around line 95):

```html
    <script src="./assets/app.js" type="module"></script>
    
    <button id="scrollToTop" class="scroll-to-top" aria-label="Scroll to top" title="Back to top">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  </body>
</html>
```

### 2. CSS Changes (assets/styles.css)

Add these styles at the end of the file:

```css
/* Scroll to Top Button */
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: var(--bg);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transform: translateY(100px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(107, 226, 255, 0.3);
  z-index: 1000;
}

.scroll-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.scroll-to-top:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 6px 20px rgba(107, 226, 255, 0.4);
}

.scroll-to-top:active {
  transform: translateY(-2px) scale(1.02);
}

.scroll-to-top:focus {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.scroll-to-top svg {
  width: 24px;
  height: 24px;
}

/* Mobile adjustments */
@media (max-width: 720px) {
  .scroll-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 45px;
    height: 45px;
  }
  
  .scroll-to-top svg {
    width: 20px;
    height: 20px;
  }
}

/* Respect safe areas on iOS */
@media (max-width: 720px) {
  .scroll-to-top {
    bottom: calc(1.5rem + env(safe-area-inset-bottom));
    right: calc(1.5rem + env(safe-area-inset-right));
  }
}

/* Animation for button pulse (optional) */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(107, 226, 255, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(107, 226, 255, 0.5);
  }
}

.scroll-to-top.visible {
  animation: pulse-glow 2s ease-in-out infinite;
}

.scroll-to-top:hover {
  animation: none; /* Stop pulse on hover */
}
```

### 3. JavaScript Changes (assets/app.js)

Add this function to handle the scroll-to-top functionality:

```javascript
function initScrollToTop() {
  const scrollButton = document.getElementById('scrollToTop');
  if (!scrollButton) return;

  // Show/hide button based on scroll position
  function toggleScrollButton() {
    const scrollThreshold = 400; // Show after scrolling 400px
    
    if (window.pageYOffset > scrollThreshold) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  }

  // Scroll to top when button is clicked
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Event listeners
  window.addEventListener('scroll', toggleScrollButton);
  scrollButton.addEventListener('click', scrollToTop);

  // Keyboard support
  scrollButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  });

  // Initial check
  toggleScrollButton();
}

// Update the boot function
function boot() {
  fetchContributors();
  initScrollToTop();
}
```

### Alternative: Throttle Scroll Event for Better Performance

For better performance with many scroll events:

```javascript
function initScrollToTop() {
  const scrollButton = document.getElementById('scrollToTop');
  if (!scrollButton) return;

  let isScrolling;

  function toggleScrollButton() {
    const scrollThreshold = 400;
    
    if (window.pageYOffset > scrollThreshold) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Throttled scroll handler
  window.addEventListener('scroll', () => {
    // Clear timeout if it exists
    window.clearTimeout(isScrolling);
    
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(toggleScrollButton, 50);
  });

  scrollButton.addEventListener('click', scrollToTop);

  toggleScrollButton();
}
```

### Alternative: Using Intersection Observer (Modern Approach)

```javascript
function initScrollToTop() {
  const scrollButton = document.getElementById('scrollToTop');
  if (!scrollButton) return;

  // Create a sentinel element at the top
  const sentinel = document.createElement('div');
  sentinel.style.position = 'absolute';
  sentinel.style.top = '400px';
  sentinel.style.height = '1px';
  document.body.insertBefore(sentinel, document.body.firstChild);

  // Observe when we scroll past the sentinel
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        scrollButton.classList.remove('visible');
      } else {
        scrollButton.classList.add('visible');
      }
    },
    { threshold: 0 }
  );

  observer.observe(sentinel);

  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
```

## Steps to Implement

1. Fork this repository
2. Create a new branch: `git checkout -b feature/scroll-to-top`
3. Add the HTML button in `index.html`
4. Add the CSS styles in `assets/styles.css`
5. Add the JavaScript functionality in `assets/app.js`
6. Test locally:
   - Scroll down the page
   - Verify button appears after scrolling ~400px
   - Click the button and verify smooth scroll to top
   - Test on mobile devices/emulation
   - Test keyboard navigation (Tab to button, Enter to activate)
7. Commit your changes: `git commit -m "Add scroll to top button"`
8. Push to your fork: `git push origin feature/scroll-to-top`
9. Open a Pull Request

## Testing Checklist

- [ ] Button appears after scrolling down
- [ ] Button hides when near the top
- [ ] Clicking button smoothly scrolls to top
- [ ] Button fade in/out transitions work smoothly
- [ ] Button is positioned correctly on desktop
- [ ] Button is positioned correctly on mobile
- [ ] Button doesn't cover important content
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Focus outline is visible
- [ ] Button works on iOS (safe area respected)
- [ ] No console errors

## Accessibility Considerations

- Button has proper `aria-label`
- Button has visible focus indicator
- Button is keyboard accessible
- Button has a descriptive `title` attribute
- Button color contrast meets WCAG standards

## Design Tips

- Keep the button subtle but noticeable
- Use the existing color scheme (accent colors)
- Add smooth animations for a polished feel
- Ensure the button doesn't interfere with other content
- Test with different scroll speeds

## Browser Support

- Smooth scroll behavior works in modern browsers
- For older browsers, add a fallback:

```javascript
function scrollToTop() {
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    // Fallback for older browsers
    window.scrollTo(0, 0);
  }
}
```

## Optional Enhancements

- Add a progress indicator (show scroll percentage)
- Add haptic feedback on mobile
- Animate the arrow on hover
- Add a tooltip

---
**Good first issue** - Perfect for learning scroll events and smooth scrolling! ⬆️
