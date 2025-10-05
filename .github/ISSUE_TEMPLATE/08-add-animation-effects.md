---
name: ✨ Add animation effects to contributor cards
about: Add subtle hover and loading animations to enhance user experience
title: "Add animation effects to contributor cards"
labels: ["good first issue", "enhancement", "ui/ux"]
assignees: ''
---

## Description
Add smooth animations to contributor cards to make the interface more engaging and polished. Include hover effects, fade-in animations when cards load, and smooth transitions.

## Proposed Feature
Implement the following animations:
- Fade-in animation when cards first load
- Smooth hover effect with slight elevation
- Stagger effect (cards appear one by one)
- Optional: Subtle pulse animation on the "NEW" badge

## Current Behavior
- Cards appear instantly without animation
- Basic hover effect exists but could be enhanced
- No visual feedback for loading

## Expected Behavior
- Cards fade in smoothly when the page loads
- Cards animate in with a stagger effect (one after another)
- Enhanced hover effects with smooth transitions
- Professional, subtle animations that don't distract

## Implementation Details

### 1. CSS Changes (assets/styles.css)

Add these animations and update the card styles:

```css
/* Fade-in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse animation for badges */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Update existing .cards > a styles */
.cards > a {
  text-decoration: none;
  color: inherit;
  display: block;
  opacity: 0; /* Start hidden for animation */
  animation: fadeInUp 0.5s ease forwards;
}

/* Add stagger delay using nth-child */
.cards > a:nth-child(1) { animation-delay: 0.05s; }
.cards > a:nth-child(2) { animation-delay: 0.1s; }
.cards > a:nth-child(3) { animation-delay: 0.15s; }
.cards > a:nth-child(4) { animation-delay: 0.2s; }
.cards > a:nth-child(5) { animation-delay: 0.25s; }
.cards > a:nth-child(6) { animation-delay: 0.3s; }
.cards > a:nth-child(7) { animation-delay: 0.35s; }
.cards > a:nth-child(8) { animation-delay: 0.4s; }
.cards > a:nth-child(9) { animation-delay: 0.45s; }
.cards > a:nth-child(10) { animation-delay: 0.5s; }

/* For cards beyond 10, use a base delay */
.cards > a:nth-child(n+11) { animation-delay: 0.5s; }

/* Enhanced card hover effect */
.cards > a {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cards > a:hover {
  transform: translateY(-4px);
}

.cards > a:hover .card {
  box-shadow: 0 8px 24px rgba(107, 226, 255, 0.15);
  border-color: rgba(107, 226, 255, 0.3);
}

/* Smooth transitions for card elements */
.card {
  transition: all 0.3s ease;
}

.card img {
  transition: transform 0.3s ease;
}

.cards > a:hover .card img {
  transform: scale(1.05);
}

/* If you have a NEW badge, add pulse animation */
.new-badge {
  animation: pulse 2s ease-in-out infinite;
}

/* Smooth color transitions */
.card .name,
.card .username,
.card .meta {
  transition: color 0.2s ease;
}

/* Loading animation for the initial state */
.loading {
  animation: pulse 1.5s ease-in-out infinite;
}
```

### 2. Alternative: More Subtle Approach

If the stagger effect seems too much, use this simpler version:

```css
/* Simple fade-in for all cards */
.cards > a {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

/* Small delay so they don't all pop at once */
.cards > a {
  animation-delay: calc(var(--card-index) * 0.03s);
}
```

Then in JavaScript (assets/app.js), add this when creating cards:

```javascript
// When creating the <a> element (around line 58)
const a = document.createElement("a");
a.style.setProperty('--card-index', people.indexOf(p));
```

### 3. Add a "Scale on Load" Effect

For an alternative effect, cards can scale up:

```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.cards > a {
  animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: calc(var(--card-index) * 0.05s);
}
```

### 4. Enhance Avatar Animation

Make avatars have a subtle rotate effect on hover:

```css
.card img {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.cards > a:hover .card img {
  transform: scale(1.05) rotate(2deg);
  filter: brightness(1.1);
}
```

## Steps to Implement

1. Fork this repository
2. Create a new branch: `git checkout -b feature/card-animations`
3. Add the animation CSS to `assets/styles.css`
4. Choose which animation approach you prefer (stagger, simple fade, or scale)
5. Optionally add the JavaScript for dynamic delays
6. Test locally:
   - Open `index.html` in your browser
   - Verify cards animate in smoothly
   - Test hover effects
   - Check that animations aren't too distracting
7. Test with different numbers of contributors
8. Commit your changes: `git commit -m "Add animation effects to contributor cards"`
9. Push to your fork: `git push origin feature/card-animations`
10. Open a Pull Request

## Testing Checklist

- [ ] Cards fade/animate in smoothly when page loads
- [ ] Hover effects work and are smooth
- [ ] Animations don't cause layout shifts
- [ ] Performance is good even with many cards
- [ ] Animations work on mobile devices
- [ ] No console errors
- [ ] Reduced motion preference is respected (bonus!)

## Accessibility Tip (Bonus!)

Respect users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .cards > a {
    animation: none;
    opacity: 1;
  }
  
  .cards > a:hover {
    transform: none;
  }
  
  .card img,
  .card,
  .new-badge {
    animation: none;
    transition: none;
  }
}
```

## Performance Tip

For many contributors, you might want to limit the stagger effect:

```css
/* Only stagger the first 20 cards */
.cards > a:nth-child(-n+20) {
  animation-delay: calc(0.05s * var(--card-index));
}

.cards > a:nth-child(n+21) {
  animation-delay: 0.5s; /* All others appear together after a short delay */
}
```

## Design Tips

- Keep animations subtle - they should enhance, not distract
- Use `ease` or `cubic-bezier` timing functions for natural motion
- Test on slower devices to ensure smooth performance
- Consider adding a "fade-in" for the entire grid container first

---
**Good first issue** - Perfect for learning CSS animations and transitions! ✨
