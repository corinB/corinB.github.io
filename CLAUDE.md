# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server (http://localhost:5173) — Agentation overlay enabled
npm run build    # Production build → dist/
npm run preview  # Serve dist/ for local verification
```

There are no tests, lint, or typecheck scripts. The `dist/` output is what gets pushed to the `[username].github.io` repository for deployment.

## Architecture

### Data-driven rendering
All visible copy lives in `src/data/{profile,projects,skills}.js`. Components in `src/components/` are thin renderers — to change wording, edit the data file, not the component. `App.jsx` imports the three data modules once and passes them down as props.

### Agentation is dev-only
`App.jsx:14-18` gates `agentation` behind `import.meta.env.DEV` with `React.lazy`, then renders it inside `<Suspense>` only when truthy. This keeps the dev-only feedback overlay out of the production bundle. **Do not import `agentation` at the top level** — it would ship to prod and bloat the bundle. The agentation MCP server runs on port 4747 in dev and lets the user click UI elements in the browser to send annotations that arrive in the next Claude turn.

### Theme system
`useTheme` (`src/hooks/useTheme.js`) writes `document.documentElement.dataset.theme = 'light' | 'dark'` and persists to `localStorage['portfolio-theme']`, with `prefers-color-scheme` as the initial fallback. CSS in `src/styles/tokens.css` switches variables via `[data-theme="dark"]`. Components never read theme directly — they only read CSS variables.

### Project modal: Problem–Solution–Result
`ProjectDetail.jsx` renders `project.troubleshooting` as three labeled blocks (`.ps-problem`, `.ps-solution`, `.ps-result`). The shape is `{ problem, solution, result }`; if `troubleshooting` is absent the section is skipped. CSS labels live in `src/styles/globals.css`.

### Vite base path
`vite.config.js` uses `base: '/'`, which is correct for a **user page** (`username.github.io`). If this ever moves to a **project page** (`username.github.io/repo`), `base` must change to `'/repo/'` or asset URLs will break.

## Placeholders and content tone

Fields the user must fill before deployment use the literal marker `[채워주세요: ...]` in `src/data/profile.js` and `src/data/projects.js` (GitHub username, project periods, role specifics, demo URLs, measurement values). `App.jsx:22-24` detects this marker on `profile.name` to fall back to the brand string `"Portfolio"`.

**Critical content rule** — when editing copy or filling placeholders:
- **Never invent measurement values.** `troubleshooting.result` fields stay as `[실제 측정값 채워주세요: ...]` until the user provides real numbers. Example metrics like "5,000 TPS" or "p95 320ms→45ms" must not be inserted as placeholders, because they would ship verbatim if the user forgot to update them.
- **No exaggerated wording.** Use experience-framed verbs (참여 · 구현 · 기여 · 다룬다), not authority-framed ones (주도 · 리딩 · 설계 책임). Avoid 최고 / 전문가 / 대규모.
- The site copy is Korean; tagline, introduction, and strengths are tuned for an entry-level (신입) backend role and should stay in that register.
