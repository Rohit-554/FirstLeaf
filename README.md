# FirstLeaf

A tiny, friendly GitHub Pages site for first-time contributors to make their very first pull request. Add your name and GitHub link to a simple data file, open a PR, and see yourself appear on the live website


```please Note: This repository might not be eligible for hactoberfest 2025, but this is a solid one to get started and give you confidence```

See yourself: https://rohit-554.github.io/FirstLeaf/

## Access Issues and start creating PR
https://github.com/Rohit-554/FirstLeaf/tree/master/.github/ISSUE_TEMPLATE

## What is this?

This repo powers a static site hosted on GitHub Pages. The page reads a newline-delimited JSON (NDJSON) file and renders a grid of contributors. Beginners only need to edit one line to add themselves.

- No frameworks required
- No build step
- Just HTML, CSS, and a little JS

## Contribute in 5 steps

1. Fork this repository to your own GitHub account.
2. Create a new branch for your change, e.g. `add/your-name`.
3. Edit `data/contributors.ndjson` and add a new line following the format below.
4. Commit your change with a helpful message and push the branch.
5. Open a Pull Request. Once merged, your profile will appear on the site.

### The format (NDJSON)

One JSON object per line. Do not remove other lines. Do not add trailing commas. Keep it simple.

Required fields:
- `name`: Your display name
- `username`: Your GitHub username (no `@`)

Optional fields:
- `github`: Full URL to your profile (defaults to `https://github.com/<username>` if omitted)
- `message`: A short message that appears on your card
- `addedAt`: ISO date string (we will add or adjust this during review if you omit it)
- `avatar`: A custom avatar URL (defaults to your GitHub avatar)

Example line to copy and edit (add it as a new line at the end of the file):

```json
{"name":"Ada Lovelace","username":"ada","github":"https://github.com/ada","message":"Hello, world!","addedAt":"2025-09-30T12:00:00.000Z"}
```

Tip: Use an online JSON formatter if you are unsure. Remember, each line must be a valid JSON object.

## Local preview (optional)

You can open `index.html` directly in your browser. Some browsers block `fetch` from `file://` URLs. If that happens, run a tiny web server and open `http://localhost:8080`.

On Windows (PowerShell):

```powershell
# Python 3
python -m http.server 8080
```

Then visit http://localhost:8080 in your browser and click `index.html`.

## GitHub Pages setup

1. Go to Settings → Pages in your fork or the main repo.
2. Set Source to `Deploy from a branch` and pick branch `main` (or `gh-pages` if you prefer).
3. Set folder to `/ (root)` and save.
4. Your site will be available at `https://<your-username>.github.io/sicksticks`.

## Project structure

```
.
├── index.html           # Main page
├── assets/
│   ├── styles.css       # Styling
│   └── app.js           # Fetch and render contributors
├── data/
│   └── contributors.ndjson  # One JSON object per line
├── scripts/
│   ├── validate-contributors.js      # Validates contributors data
│   └── update-readme-contributors.js # Updates README contributors section
└── README.md
```

> **Note:** The contributors section at the bottom of this README is automatically updated by a GitHub Action whenever a PR is merged to the main branch.

## Code of Conduct

Be kind, be patient, and be respectful. This is a beginner-friendly space.

## Maintainers

- You! PRs welcome.

## License

MIT License. See `LICENSE`.

## Thank you - Contributors

Thank you to all the amazing contributors who have helped make this project better! 🎉

<table>
  <tr>
    <td align="center"><a href="https://github.com/Rohit-554"><img src="https://avatars.githubusercontent.com/Rohit-554" width="80px;" alt="Rohit"/></a></td>
    <td align="center"><a href="https://github.com/Rohit-554"><img src="https://avatars.githubusercontent.com/Jadu-554" width="80px;" alt="Jadu"/></a></td>
    <td align="center"><a href="https://github.com/Simonmatharesh"><img src="https://avatars.githubusercontent.com/Simonmatharesh" width="80px;" alt="Simon"/></a></td>
    <td align="center"><a href="https://github.com/anshukaushik4700/"><img src="https://avatars.githubusercontent.com/anshukaushik4700" width="80px;" alt="Anshu"/></a></td>
    <td align="center"><a href="https://github.com/Shwetank-Maurya/"><img src="https://avatars.githubusercontent.com/Shwetank-Maurya" width="80px;" alt="Shwetank Maurya"/></a></td>
    <td align="center"><a href="https://github.com/AdyHACK"><img src="https://avatars.githubusercontent.com/AdyHACK" width="80px;" alt="Aditya"/></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Rohit-554"><sub><b>Rohit</b></sub></a></td>
    <td align="center"><a href="https://github.com/Rohit-554"><sub><b>Jadu</b></sub></a></td>
    <td align="center"><a href="https://github.com/Simonmatharesh"><sub><b>Simon</b></sub></a></td>
    <td align="center"><a href="https://github.com/anshukaushik4700/"><sub><b>Anshu</b></sub></a></td>
    <td align="center"><a href="https://github.com/Shwetank-Maurya/"><sub><b>Shwetank Maurya</b></sub></a></td>
    <td align="center"><a href="https://github.com/AdyHACK"><sub><b>Aditya</b></sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/anup2702"><img src="https://avatars.githubusercontent.com/anup2702" width="80px;" alt="Anup"/></a></td>
    <td align="center"><a href="https://github.com/jatinagg1"><img src="https://avatars.githubusercontent.com/jatinagg1" width="80px;" alt="Jatin"/></a></td>
    <td align="center"><a href="https://github.com/sarthakjalan05"><img src="https://avatars.githubusercontent.com/sarthakjalan05" width="80px;" alt="Sarthak"/></a></td>
    <td align="center"><a href="https://github.com/MRIEnan"><img src="https://avatars.githubusercontent.com/MRIEnan" width="80px;" alt="Mainur"/></a></td>
    <td align="center"><a href="https://github.com/ritwik1709"><img src="https://avatars.githubusercontent.com/ritwikt17" width="80px;" alt="Ritwik"/></a></td>
    <td align="center"><a href="https://github.com/Steady3099"><img src="https://avatars.githubusercontent.com/Steady3099" width="80px;" alt="Dheeraj Saini"/></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/anup2702"><sub><b>Anup</b></sub></a></td>
    <td align="center"><a href="https://github.com/jatinagg1"><sub><b>Jatin</b></sub></a></td>
    <td align="center"><a href="https://github.com/sarthakjalan05"><sub><b>Sarthak</b></sub></a></td>
    <td align="center"><a href="https://github.com/MRIEnan"><sub><b>Mainur</b></sub></a></td>
    <td align="center"><a href="https://github.com/ritwik1709"><sub><b>Ritwik</b></sub></a></td>
    <td align="center"><a href="https://github.com/Steady3099"><sub><b>Dheeraj Saini</b></sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Kishan8548"><img src="https://avatars.githubusercontent.com/Kishan8548" width="80px;" alt="Kishan Garhwal"/></a></td>
    <td align="center"><a href="https://github.com/DivyanshRajSoni"><img src="https://avatars.githubusercontent.com/DivyanshRajSoni" width="80px;" alt="Divyansh Raj Soni"/></a></td>
    <td align="center"><a href="https://github.com/ada"><img src="https://avatars.githubusercontent.com/ada" width="80px;" alt="Ada Lovelace"/></a></td>
    <td align="center"><a href="https://github.com/grace"><img src="https://avatars.githubusercontent.com/grace" width="80px;" alt="Grace Hopper"/></a></td>
    <td align="center"><a href="https://github.com/atharvnikam38"><img src="https://avatars.githubusercontent.com/atharvnikam38" width="80px;" alt="Atharv Nikam"/></a></td>
    <td align="center"><a href="https://github.com/ZalaNidhish"><img src="https://avatars.githubusercontent.com/ZalaNidhish" width="80px;" alt="Nidhish Zala"/></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Kishan8548"><sub><b>Kishan Garhwal</b></sub></a></td>
    <td align="center"><a href="https://github.com/DivyanshRajSoni"><sub><b>Divyansh Raj Soni</b></sub></a></td>
    <td align="center"><a href="https://github.com/ada"><sub><b>Ada Lovelace</b></sub></a></td>
    <td align="center"><a href="https://github.com/grace"><sub><b>Grace Hopper</b></sub></a></td>
    <td align="center"><a href="https://github.com/atharvnikam38"><sub><b>Atharv Nikam</b></sub></a></td>
    <td align="center"><a href="https://github.com/ZalaNidhish"><sub><b>Nidhish Zala</b></sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Sanskar-Agrawal01"><img src="https://avatars.githubusercontent.com/Sanskar-Agrawal01" width="80px;" alt="Sanskar Agrawal"/></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Sanskar-Agrawal01"><sub><b>Sanskar Agrawal</b></sub></a></td>
  </tr>
</table>