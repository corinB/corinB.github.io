# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server (http://localhost:5173) — Agentation overlay enabled
npm run build    # Production build → dist/
npm run preview  # Serve dist/ for local verification
```

There are no tests, lint, or typecheck scripts. Since `npm run build` is the only correctness check available, run it before declaring any source change "done" (글로벌 가이드라인 #8의 대체 절차).

`package-lock.json`은 커밋된다. CI는 `npm ci`로 돌아가므로, lockfile을 건드린 PR은 로컬에서도 `npm ci`로 재현 확인 후 푸시한다.

Deploy is automated by `.github/workflows/deploy.yml` — every push to `main` (or a manual `workflow_dispatch`) runs `npm ci && npm run build` and publishes `dist/` to GitHub Pages via `actions/deploy-pages`. There is no separate `[username].github.io` repo to push to; this repo *is* the user page.

`gsap` is listed in `package.json` but is not imported anywhere in `src/`. Treat it as a leftover dep — don't reach for it without first checking whether the user wants it removed.

## Architecture

### Data-driven rendering
All visible copy lives in `src/data/{profile,projects}.js` (`skills.js` was removed). Components in `src/components/` are thin renderers — to change wording, edit the data file, not the component. `App.jsx` imports the two data modules and passes them down as props.

`About.jsx` renders a single introduction paragraph from `profile.introduction` plus three meta rows (학력 / 부트캠프 / 활동) from their respective `profile.*` fields. No hard-coded `aboutItems` array — edits go directly in `profile.js`.

### Agentation is dev-only
`App.jsx:13-17` gates `agentation` behind `import.meta.env.DEV` with `React.lazy`; the `<Suspense>` render block is at `App.jsx:51-55`. This keeps the dev-only feedback overlay out of the production bundle. **Do not import `agentation` at the top level** — it would ship to prod and bloat the bundle. The agentation MCP server runs on port 4747 in dev and lets the user click UI elements in the browser to send annotations that arrive in the next Codex turn.

### Theme system
`useTheme` (`src/hooks/useTheme.js`) writes `document.documentElement.dataset.theme = 'light' | 'dark'` and persists to `localStorage['portfolio-theme']`, with `prefers-color-scheme` as the initial fallback. CSS in `src/styles/tokens.css` switches variables via `[data-theme="dark"]`. Components never read theme directly — they only read CSS variables.

**Exception:** `ProjectDetail.jsx:7` reads `document.documentElement.dataset.theme` directly to choose mermaid's theme (`'dark'` vs `'neutral'`) when rendering diagrams, since mermaid initializes from a JS option, not CSS. `MermaidDiagram` is defined inline inside `ProjectDetail.jsx` rather than as its own file.

### Project modal: Problem–Solution–Result
`ProjectDetail.jsx` renders `project.troubleshooting` as three labeled blocks (`.ps-problem`, `.ps-solution`, `.ps-result`). The shape is `{ problem, solution, result }`; if `troubleshooting` is absent the section is skipped. CSS labels live in `src/styles/globals.css`.

### Section IDs
Active sections are `top`, `about`, `projects`, `contact`. If you rename or add a section, keep the `<section id>` consistent with any in-page navigation anchors in `Nav.jsx`.

### Vite base path
`vite.config.js` uses `base: '/'`, which is correct for a **user page** (`username.github.io`). If this ever moves to a **project page** (`username.github.io/repo`), `base` must change to `'/repo/'` or asset URLs will break.

### Animations
framer-motion is the only animation library actually in use. The site-wide pattern is simple `opacity + y(20px)` fadeIn (`whileInView` for scroll-triggered reveals, `initial`/`animate` for on-mount). The top scroll progress bar in `App.jsx` uses `useScroll` → `useSpring` with `{ stiffness: 100, damping: 30, restDelta: 0.001 }` — match this spring config when adding new motion.

Parallax `useTransform` is **only** used on the background layer (`mesh-bg` at `App.jsx:27,41`). Do not apply parallax `useTransform` to section content. Also avoid `rotateX` and `scale` bounce — keep animations minimal.

### Styling & extra runtime deps
Tailwind v4 is wired through `@tailwindcss/vite` (`vite.config.js:3,6`) — there is no `tailwind.config.*` file; design tokens live in `src/styles/tokens.css` and globals in `src/styles/globals.css`. `mermaid` (runtime dep) is used only inside `ProjectDetail.jsx` for the Architecture slide; if you remove that slide, the dep can go too.

## Placeholders and content tone

Fields the user must fill before deployment use the literal marker `[채워주세요: ...]` in `src/data/profile.js` and `src/data/projects.js` (GitHub username, project periods, role specifics, demo URLs, measurement values). `App.jsx:29-31` detects this marker on `profile.name` to fall back to the brand string `"Portfolio"`.

**Critical content rule** — when editing copy or filling placeholders:
- **Never invent measurement values.** `troubleshooting.result` fields stay as `[실제 측정값 채워주세요: ...]` until the user provides real numbers. Example metrics like "5,000 TPS" or "p95 320ms→45ms" must not be inserted as placeholders, because they would ship verbatim if the user forgot to update them.
- **No exaggerated wording.** Use experience-framed verbs (참여 · 구현 · 기여 · 다룬다), not authority-framed ones (주도 · 리딩 · 설계 책임). Avoid 최고 / 전문가 / 대규모.
- The site copy is Korean; tagline, introduction, and strengths are tuned for an entry-level (신입) backend role and should stay in that register.

## Source-of-truth: `reference/`

`reference/`는 빌드에 포함되지 않는 1차 자료. `src/data/projects.js`·`profile.js`의 placeholder를 채우거나 troubleshooting/스택 표현을 검증할 때, 추정하지 말고 먼저 여기를 본다.

| 경로 | 내용 |
|---|---|
| `reference/p1/` | **동네마켓** — Java 21 / Spring Boot 3.5 모놀리식. Redis 분산 락 + GEO 배차, SSE+Spring Events+Redis Pub/Sub 알림, Spring Batch 5 정산. 풀 소스 + `README.MD`, `PROJECT_INDEX.md`. |
| `reference/p2/` | **CineStream** — Java 21 / Spring Boot 4.0.4 9개 마이크로서비스(gateway, user, movie, ticket, payment, settlement, streaming, creator, ai). Kafka·Quartz·Elasticsearch·MinIO. `Codex-ko.md`, `REVIEW-SYSTEM.md`, `docs/`. **역할: PO·팀장 (5인).** p3(Cinema)의 후속/확장 단계. |
| `reference/p3/` | **Cinema** — Java 21 / Spring Boot 3.5 + Next.js 16. 서버 기준 동기 상영(STOMP 10초 tick), FFmpeg HLS 워커, Spring Batch 월별 정산. 팀명 `lion-team4`. **역할: 팀원** — 콘텐츠/스케줄 QueryDSL 검색·시청기록·리뷰 담당. CineStream(p2)의 이전 단계 프로토타입. |
| `reference/p4/` | **Opene** — Spring Boot 3.1 + Python/PyTorch/YOLOv5. 코디 컬러 매칭 웹앱(2024년경, 첫 백엔드 협업 프로젝트). `openSource/`, `pythonProject/`. **역할: PO·팀장.** |
| `reference/activity/` | 상장·수료증·인증서 27개 (`연도_기관_내용_종류.확장자` 규칙). `README.md`가 표 색인 — 활동 이력 인용 시 이 표를 단일 출처로 사용. |

`projects.js`의 4개 항목과 p1~p4가 1:1로 매핑된다(p1=동네마켓, p2=CineStream, p3=Cinema, p4=Opene). 측정값·아키텍처·역할 설명은 각 README/Codex-ko.md/PROJECT_INDEX.md에서 직접 확인한다.

`reference/`는 `.gitignore`에 포함되어 있어 git이 추적하지 않는다. 1차 자료 외에 산출물(자소서·이력서 초안 등)을 같이 둬도 커밋에 섞일 위험이 없다.

## 작업 진행 룰

리팩터링이나 다중 PR 작업이 진행 중일 땐 프로젝트 루트의 `TODO.md`를 항상 최신 상태로 유지한다.

- 작업을 새로 시작 → 해당 항목 `[ ]` → `[~]`
- 작업을 끝낼 때 → `[x]`로 변경 (해당 turn 안에서)
- 블로커 만나면 → `[!]`로 마크하고 같은 줄 끝에 한 줄 사유 추가
- 새로 발견된 작업 → 해당 PR 섹션 하단에 `[ ] ...`로 추가
- TODO.md가 더 이상 변하지 않을 때(전부 `[x]`)까지 본 룰은 유효

작업 도중 사용자가 "어디까지 했어?" 물으면 TODO.md를 보고 답한다 — 별도 추정 금지.
