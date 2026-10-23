# DSA Path

A browser-based interview preparation workspace with 18 foundation phases, 252 practice questions, 33 reusable algorithm patterns, 14 mastery lessons, six original interview labs, and eight pattern-recognition drills.

## Run locally

Requires Node.js 20 or newer. No third-party runtime packages or installation step are needed.

```sh
git clone https://github.com/builtbyankit/dsa-path.git
cd dsa-path
npm start
```

Open http://127.0.0.1:4173. Stop the server with Ctrl+C. The bundled server is a local development preview, not a production server.

## Features

- Foundation learning path with theory, practice ladders, and checkpoints.
- Searchable question bank with phase, pattern, priority, and progress filters.
- Pattern atlas with recognition cues, invariants, templates, examples, pitfalls, and follow-ups.
- Progressive lab hints, solution reasoning, proofs, and edge cases.
- Preparation schedules, mock timer, readiness scorecard, and practice history.
- Browser-local notes, confidence ratings, and progress with JSON export/import.
- Downloadable Markdown guides and an interactive two-pointer walkthrough.

Progress is stored in browser localStorage under `dsa-path-v1`. It is specific to the browser and origin: local development, GitHub hosting, and the existing Site do not share progress automatically. Use Review & notes → Export/Import to transfer it. No user progress or credentials are included in this repository.

## Edit and validate

```sh
npm run build
npm test
```

`prepare.cjs` regenerates `dist/data.js` and the downloadable guides from the curriculum sources. It does not bundle the frontend. Edit the HTML, CSS, and JavaScript in `dist/` directly; these are the frontend source files and deployable assets.

| Path | Purpose |
|---|---|
| `content/DSA-Preparation-Guide.md` | Foundation curriculum |
| `mastery.md` | Advanced lessons and training plan |
| `patterns.cjs` | Pattern descriptions, templates, and practice mappings |
| `labs.cjs` | Original interview exercises |
| `dist/app.js` | Navigation, question bank, and browser-local progress |
| `dist/mastery.js` | Mastery lessons, labs, and scorecards |
| `dist/patterns.js` | Pattern views, recognition drills, and walkthrough |
| `dist/minimal.css` | Active minimal responsive styling |
| `check.cjs` | Route-rendering, content, filtering, and progress checks |

The checks use a small mocked DOM and do not replace visual or end-to-end browser tests. Visual browser verification was not completed in the creation environment. After UI changes, check desktop/mobile layouts, keyboard navigation, saving/reloading notes, export/import, and the timer in a real browser.

## Hosting

Deploy the contents of `dist/` to a static host. Navigation uses URL hashes, so server-side route rewrites are unnecessary. The app needs no backend. The interface uses system fonts; practice/resource links open external services. Hosting identity and credentials for the existing private Site are intentionally excluded.

## Scope and references

This is independent preparation material, not an official Google or AlgoMaster product and not a hiring guarantee. Pattern-based organization was inspired by AlgoMaster; explanations, drills, and practice mappings were authored for this app. References are linked within the lessons. Practice titles and IDs point learners to LeetCode; external access requirements may change. Full third-party problem statements and editorials are not included.

For demanding interviews, measure unseen problem-solving, correctness reasoning, testing, and adaptation—not completion count alone. System design and behavioral preparation remain separate workstreams.

