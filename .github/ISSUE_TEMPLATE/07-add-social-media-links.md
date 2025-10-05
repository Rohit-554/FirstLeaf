---
name: 🔗 Add social media links to contributor cards
about: Allow contributors to add optional social media links to their profiles
title: "Add social media links support for contributor cards"
labels: ["good first issue", "enhancement", "feature"]
assignees: ''
---

## Description
Extend the contributor data format to support optional social media links (Twitter, LinkedIn, etc.) and display them as icons on contributor cards.

## Proposed Feature
Allow contributors to add optional social media URLs to their profile data, and display clickable icons on their contributor card.

## Current Behavior
- Contributor cards show only name, username, avatar, and message
- No way to link to social media profiles

## Expected Behavior
- Contributors can add optional social media URLs in their NDJSON entry
- Small social media icons appear at the bottom of their card
- Icons link to their social media profiles

## Implementation Details

### 1. Update Data Format

Contributors can add optional social media fields to their NDJSON entry:

```json
{"name":"Ada Lovelace","username":"ada","github":"https://github.com/ada","message":"Hello, world!","twitter":"https://twitter.com/ada","linkedin":"https://linkedin.com/in/ada","website":"https://ada.dev"}
```

### 2. CSS Changes (assets/styles.css)

Add social media icon styles:

```css
.social-links {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--muted);
  transition: all 0.2s ease;
  text-decoration: none;
  font-size: 0.875rem;
}

.social-link:hover {
  background: rgba(107, 226, 255, 0.15);
  color: var(--accent);
  transform: translateY(-2px);
}

.social-link svg {
  width: 16px;
  height: 16px;
}
```

### 3. JavaScript Changes (assets/app.js)

Add this code in the card creation loop, after the `meta` div (around line 99):

```javascript
// After adding the meta section
if (p.message) card.appendChild(meta);

// Add social media links if they exist
const socialLinks = [];
if (p.twitter) socialLinks.push({ url: p.twitter, icon: '𝕏', label: 'Twitter/X' });
if (p.linkedin) socialLinks.push({ url: p.linkedin, icon: '💼', label: 'LinkedIn' });
if (p.website) socialLinks.push({ url: p.website, icon: '🌐', label: 'Website' });

if (socialLinks.length > 0) {
  const socialContainer = document.createElement('div');
  socialContainer.className = 'social-links';
  
  socialLinks.forEach(social => {
    const link = document.createElement('a');
    link.href = social.url;
    link.className = 'social-link';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.title = social.label;
    link.textContent = social.icon;
    link.onclick = (e) => e.stopPropagation(); // Prevent parent link click
    
    socialContainer.appendChild(link);
  });
  
  card.appendChild(socialContainer);
}

a.appendChild(card);
```

### Alternative: Use SVG Icons (More Professional)

For a more polished look, you can use SVG icons instead of emojis:

```javascript
// Helper function to create icon SVGs
function createSocialIcon(type) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  
  let path = '';
  if (type === 'twitter') {
    path = 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z';
  } else if (type === 'linkedin') {
    path = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';
  } else if (type === 'website') {
    path = 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z';
  }
  
  const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathEl.setAttribute('d', path);
  svg.appendChild(pathEl);
  
  return svg;
}

// Then use it:
if (p.twitter) {
  const link = document.createElement('a');
  link.href = p.twitter;
  link.className = 'social-link';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.title = 'Twitter/X';
  link.appendChild(createSocialIcon('twitter'));
  link.onclick = (e) => e.stopPropagation();
  socialContainer.appendChild(link);
}
```

## Steps to Implement

1. Fork this repository
2. Create a new branch: `git checkout -b feature/social-media-links`
3. Add the CSS styles to `assets/styles.css`
4. Add the JavaScript code to `assets/app.js` in the card creation section
5. Test locally:
   - Edit `data/contributors.ndjson` and add social media URLs to one entry
   - Open `index.html` in your browser
   - Verify the social icons appear and link correctly
6. Update the README.md documentation to explain the new optional fields
7. Commit your changes: `git commit -m "Add social media links to contributor cards"`
8. Push to your fork: `git push origin feature/social-media-links`
9. Open a Pull Request

## Testing Checklist

- [ ] Social media icons display correctly when URLs are provided
- [ ] Icons link to the correct URLs
- [ ] Icons open in new tabs
- [ ] Clicking icons doesn't trigger the parent card link
- [ ] Icons have hover effects
- [ ] Design is consistent with the theme
- [ ] Cards without social links still display correctly

## Example NDJSON Entry

```json
{"name":"Jane Doe","username":"janedoe","github":"https://github.com/janedoe","message":"Open source enthusiast!","twitter":"https://twitter.com/janedoe","linkedin":"https://linkedin.com/in/janedoe","website":"https://janedoe.dev","addedAt":"2025-01-15T10:00:00.000Z"}
```

## Additional Notes

- All social media fields are **optional**
- You can choose to use emojis (simpler) or SVG icons (more professional)
- Consider adding support for other platforms (GitHub is already shown, but you could add others)
- Make sure to stop event propagation so clicking social icons doesn't trigger the main profile link

---
**Good first issue** - Perfect for learning about event handling and dynamic content! 🔗
