---
name: 🎨 Add contributor avatar customization
about: Allow contributors to add custom color borders or frames to their avatars
title: "Add avatar border customization feature"
labels: ["good first issue", "enhancement", "feature", "ui/ux"]
assignees: ''
---

## Description
Allow contributors to personalize their avatar by adding an optional custom colored border or frame. This makes profiles more unique and fun without requiring design skills.

## Proposed Feature
Add an optional `avatarBorder` field to contributor data that applies a colorful border around their avatar image.

**Good first issue** - Great for learning about CSS styling and personalization! 🎨

## Current Behavior
- All avatars look the same (just the image)
- No way to personalize avatar appearance
- All contributor cards have uniform styling

## Expected Behavior
- Contributors can add `avatarBorder` to their data
- Border color can be any valid CSS color
- Border appears around avatar in contributor card
- Border has optional animation effect (glow, pulse, rainbow)
- No border if field is omitted (default)

## Requirements

### Data Format
Add optional field to NDJSON:
```json
{"name":"Ada Lovelace","username":"ada","avatarBorder":"#ff6b9d","message":"Hello!"}
```

Or with border style:
```json
{"name":"Grace Hopper","username":"grace","avatarBorder":{"color":"#00f2fe","style":"glow"},"message":"Hi!"}
```

### Supported Border Styles
- **Solid** (default): Simple colored border
- **Gradient**: Gradient border (requires 2 colors)
- **Glow**: Border with glow effect
- **Pulse**: Animated pulsing border
- **Rainbow**: Animated rainbow gradient (no color needed)
- **Double**: Double border effect

### Visual Examples
- Solid border: Simple 4px colored border
- Gradient: Gradient from color1 to color2
- Glow: Border with soft shadow in same color
- Pulse: Border that pulses/breathes
- Rainbow: Animated rainbow gradient
- Double: Thin inner border + thicker outer border

## Testing Checklist
- [ ] Border appears when `avatarBorder` field present
- [ ] Color is applied correctly
- [ ] No border when field is omitted
- [ ] Different styles work as expected
- [ ] Animations are smooth (not distracting)
- [ ] Works on all avatar sizes
- [ ] Mobile responsive
- [ ] Doesn't break card layout
- [ ] Accessible (doesn't reduce contrast)

## Expected Final Output

### When implemented:
1. Contributor adds `avatarBorder` field to their data
2. Their card loads with customized avatar border
3. Border color/style matches what they specified
4. Other contributors without the field have default avatars
5. Visual variety makes the page more interesting

### Example Borders:

**Solid Border:**
```
┌────────────────┐
│ ╔══════════╗  │  ← solid pink border
│ ║          ║  │
│ ║  AVATAR  ║  │
│ ║          ║  │
│ ╚══════════╝  │
│  Ada Lovelace │
└────────────────┘
```

**Glow Effect:**
```
┌────────────────┐
│   ●═══════●    │  ← border with glow
│  ║         ║   │
│  ║ AVATAR  ║   │
│  ║         ║   │
│   ●═══════●    │
│ Grace Hopper   │
└────────────────┘
```

**Rainbow (Animated):**
```
┌────────────────┐
│ 🌈═══════🌈   │  ← animated rainbow
│ ║         ║   │
│ ║ AVATAR  ║   │
│ ║         ║   │
│ 🌈═══════🌈   │
│  John Doe     │
└────────────────┘
```

## Design Tips
- Keep borders subtle (3-5px width)
- Ensure borders don't clash with theme colors
- Animation should be gentle, not distracting
- Test on both light and dark themes
- Provide examples in documentation

## Benefits
- Contributors can express personality
- Makes profiles more unique and memorable
- Fun way to stand out
- Easy to implement, big visual impact
- No design skills required

## Implementation Hints

### CSS for borders:
```css
.card img.border-solid {
  border: 4px solid var(--border-color);
}

.card img.border-glow {
  border: 4px solid var(--border-color);
  box-shadow: 0 0 20px var(--border-color);
}

.card img.border-pulse {
  border: 4px solid var(--border-color);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 10px var(--border-color); }
  50% { box-shadow: 0 0 30px var(--border-color); }
}

.card img.border-rainbow {
  border: 4px solid;
  border-image: linear-gradient(45deg, red, orange, yellow, green, blue, purple) 1;
  animation: rainbow 3s linear infinite;
}
```

### JavaScript to apply borders:
```javascript
if (p.avatarBorder) {
  const border = typeof p.avatarBorder === 'string' 
    ? { color: p.avatarBorder, style: 'solid' }
    : p.avatarBorder;
  
  img.style.setProperty('--border-color', border.color);
  img.classList.add(`border-${border.style || 'solid'}`);
}
```

## Additional Features (Optional)
- Preset border themes: "Ocean", "Sunset", "Forest"
- Border width customization (thin/medium/thick)
- Rounded corner customization
- Seasonal borders: snowflakes in winter, leaves in fall
- Achievement borders: special frames for milestones

---
**Good first issue** - Perfect for learning CSS borders and animations! 🖼️
