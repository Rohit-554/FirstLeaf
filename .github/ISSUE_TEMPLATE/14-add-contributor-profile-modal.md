---
name: 🔍 Add contributor profile modal/popup
about: Add a modal popup to view detailed contributor information when clicking on a card
title: "Add contributor profile modal/popup feature"
labels: ["good first issue", "enhancement", "feature", "ui/ux"]
assignees: ''
---

## Description
Add an interactive modal/popup that displays when users click on a contributor card. This modal will show expanded information about the contributor including their full profile, message, badges, and a larger avatar.

## Proposed Feature
When a user clicks on a contributor card, open a modal popup with:
- Large avatar image
- Full name and username
- GitHub profile link as a prominent button
- Full message (with more space than the card)
- All badges displayed prominently
- "View on GitHub" call-to-action button
- Close button to dismiss the modal

**Good first issue** - Great for learning about modals, event handling, and DOM manipulation! 🔍

## Current Behavior
- Contributor cards link directly to GitHub profiles
- Limited information visible on cards
- No way to see more details without leaving the page

## Expected Behavior
- Clicking a contributor card opens a modal
- Modal displays detailed contributor information
- Modal can be closed by clicking close button, overlay, or pressing ESC
- GitHub profile link is available as a button in the modal
- Clean, accessible modal design

## Requirements

### Visual Design
- Modal should have a semi-transparent dark overlay behind it
- Modal content should be centered on screen
- Modal should be responsive (works on mobile)
- Modal should have smooth fade-in/fade-out animations
- Close button should be easily visible (top-right corner)
- Avatar should be larger than on the card (150px or 200px)

### Functionality
- Click on contributor card to open modal
- Click on overlay/backdrop to close modal
- Press ESC key to close modal
- Click close button (X) to close modal
- Prevent body scrolling when modal is open
- "View on GitHub" button opens profile in new tab

### Accessibility
- Modal should have proper ARIA labels
- Focus should trap inside modal when open
- ESC key closes the modal
- Focus should return to triggering element when closed
- Screen readers should announce modal opening

## Testing Checklist
- [ ] Modal opens when clicking a contributor card
- [ ] Modal displays all contributor information correctly
- [ ] Modal closes when clicking overlay
- [ ] Modal closes when clicking close button
- [ ] Modal closes when pressing ESC key
- [ ] Body scrolling is prevented when modal is open
- [ ] Body scrolling is restored when modal closes
- [ ] Modal is responsive on mobile devices
- [ ] Animations are smooth
- [ ] GitHub button opens profile in new tab
- [ ] Keyboard navigation works properly
- [ ] Screen readers can access all information

## Expected Final Output

### When implemented:
1. User browsing sees contributor cards as normal
2. User clicks on any contributor card
3. Modal appears with fade-in animation
4. Modal shows:
   - Large avatar (150-200px)
   - Name in large text
   - GitHub username (@username)
   - Full message with more space
   - All badges displayed clearly
   - "View on GitHub" prominent button
   - Close X button in top-right
5. User can read full details
6. User clicks "View on GitHub" to open profile in new tab OR closes modal
7. Modal fades out and disappears
8. User can continue browsing contributors

### Example Modal Layout:
```
┌──────────────────────────────────────┐
│                               [X]    │
│       ┌────────────┐                │
│       │            │                 │
│       │  AVATAR    │                 │
│       │            │                 │
│       └────────────┘                 │
│                                      │
│        Ada Lovelace                  │
│        @ada                          │
│                                      │
│    🥇 First  ⭐ Core Team           │
│                                      │
│  "Hello, world! I'm excited to      │
│   contribute to this amazing        │
│   project and help others!"         │
│                                      │
│     [🔗 View on GitHub]             │
│                                      │
└──────────────────────────────────────┘
```

## Design Tips
- Keep the modal clean and not too large
- Use card-like styling similar to contributor cards
- Ensure good contrast for readability
- Add subtle shadow/glow around modal
- Consider adding a subtle blur effect to background
- Test on different screen sizes

## Benefits
- Users can see full contributor information without leaving the page
- Better user experience for browsing contributors
- Showcases messages that might be truncated on cards
- More professional and interactive feel
- Keeps users engaged on the site

---
**Good first issue** - Perfect for learning about modals, event delegation, and accessibility! 🎯
