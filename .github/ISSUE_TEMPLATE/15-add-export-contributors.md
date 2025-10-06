---
name: 📥 Add export contributors feature
about: Add ability to export the contributors list to CSV or JSON format
title: "Add export contributors to CSV/JSON feature"
labels: ["good first issue", "enhancement", "feature"]
assignees: ''
---

## Description
Add a feature that allows users to export the entire contributors list to CSV or JSON format. This is useful for contributors who want to keep a local copy, create reports, or use the data for other purposes.

## Proposed Feature
Add an "Export" button in the controls area that opens a small menu with two options:
- Export as CSV
- Export as JSON

When clicked, downloads a file with all contributor data in the selected format.

**Good first issue** - Great for learning about data formatting, file downloads, and JavaScript Blob API! 📥

## Current Behavior
- Contributors list is only viewable on the website
- No way to download or export the data
- Data is only in NDJSON format in the repository

## Expected Behavior
- Export button appears in the controls area (near search/sort)
- Clicking export button shows options (CSV or JSON)
- Selecting CSV downloads `contributors.csv` file
- Selecting JSON downloads `contributors.json` file
- Downloaded files contain all contributor data
- File is automatically downloaded to user's device

## Requirements

### Export Button UI
- Button should be styled like other buttons
- Icon: 📥 or download icon
- Text: "Export"
- Located in controls container near search/sort

### CSV Format
File should include these columns:
- Name
- Username
- GitHub URL
- Message
- Badges (comma-separated if multiple)
- Added Date

Example CSV:
```csv
Name,Username,GitHub,Message,Badges,AddedAt
"Ada Lovelace","ada","https://github.com/ada","Hello, world!","first,core","2025-09-30T12:00:00.000Z"
"Grace Hopper","grace","https://github.com/grace","Learning to code!","early","2025-10-01T10:00:00.000Z"
```

### JSON Format
File should be a properly formatted JSON array:
```json
[
  {
    "name": "Ada Lovelace",
    "username": "ada",
    "github": "https://github.com/ada",
    "message": "Hello, world!",
    "badges": ["first", "core"],
    "addedAt": "2025-09-30T12:00:00.000Z"
  },
  {
    "name": "Grace Hopper",
    "username": "grace",
    "github": "https://github.com/grace",
    "message": "Learning to code!",
    "badges": ["early"],
    "addedAt": "2025-10-01T10:00:00.000Z"
  }
]
```

### Functionality
- Export respects current search/filter (only exports visible contributors)
- Export respects current sort order
- File is downloaded with timestamp: `contributors_2025-10-05.csv`
- Works on all modern browsers
- No server-side processing needed

## Testing Checklist
- [ ] Export button appears in controls area
- [ ] Clicking export shows CSV/JSON options
- [ ] CSV export downloads properly formatted file
- [ ] JSON export downloads properly formatted file
- [ ] CSV file opens correctly in Excel/Sheets
- [ ] JSON file is valid JSON format
- [ ] Exported data matches what's displayed on page
- [ ] Export respects current filters/search
- [ ] Export respects current sort order
- [ ] Filename includes date
- [ ] Works on Chrome, Firefox, Safari, Edge
- [ ] Works on mobile devices

## Expected Final Output

### When implemented:
1. User views contributors list
2. User optionally filters or searches contributors
3. User clicks "Export" button in controls area
4. Small menu appears with two options:
   - 📄 Export as CSV
   - 📋 Export as JSON
5. User selects preferred format
6. Browser automatically downloads file:
   - `contributors_2025-10-05.csv` OR
   - `contributors_2025-10-05.json`
7. User can open file and see all contributor data in chosen format

### Example Button Placement:
```
┌─────────────────────────────────────────────┐
│ Search: [________________]  Sort: [Newest]  │
│                              [📥 Export]     │
└─────────────────────────────────────────────┘
```

### Example Export Menu:
```
       ┌──────────────────┐
       │ 📄 Export as CSV │
       │ 📋 Export as JSON│
       └──────────────────┘
```

## Design Tips
- Keep the export button subtle but discoverable
- Use icons to make options clear
- Add tooltips for better UX
- Consider adding a success message after export
- Handle edge cases (empty search results, etc.)

## Benefits
- Users can backup the contributors list
- Data can be used for analysis or reports
- Useful for project maintainers
- Increases data portability
- Professional feature for open source projects

## Implementation Hints
- Use JavaScript Blob API to create files
- Use `URL.createObjectURL()` for download
- Clean up blob URLs after download with `URL.revokeObjectURL()`
- Use current date for filename
- Convert badges array to string for CSV

---
**Good first issue** - Perfect for learning about data formats and browser file downloads! 💾
