# 다음 모델 작업 가이드

## 목적

이 문서는 포트폴리오 사이트의 현재 상태를 피드백하고, 다음 중간 단계 모델이 바로 이어서 작업할 수 있도록 우선순위와 작업 기준을 정리한 가이드다.

핵심 목표는 기존 피드백인 "난잡하다", "짧은 시간 안에 어떤 사람인지 와야 한다", "텍스트가 눈에 안 들어온다"를 다시 기준점으로 삼아, 현재 남은 문제를 작게 나눠 처리하는 것이다.

## 현재 상태 요약

- `npm.cmd run build` 통과.
- 첫 화면은 이름, 직군, 핵심 스택, 이력서 CTA가 보여 "Java · Spring 백엔드 신입" 정체성은 비교적 빠르게 전달된다.
- 프로젝트 섹션은 카드/모달 구조에서 본문형 case study와 시나리오 다이어그램 구조로 바뀌어 깊이는 좋아졌다.
- 다만 `Nav.jsx`의 터미널 명령 오버레이, 모바일 헤더 오버플로우, `Approach` 독립 섹션의 밀도, 오래된 CSS/문서 흔적이 다시 난잡함을 만들 수 있다.

## 확인한 근거

- 소스: `src/App.jsx`, `src/components/Hero.jsx`, `src/components/Nav.jsx`, `src/components/Approach.jsx`, `src/components/Projects.jsx`, `src/components/projects/ScenarioVisuals.jsx`, `src/data/profile.js`, `src/data/projects.js`, `src/styles/globals.css`, `src/styles/tokens.css`
- 화면: Playwright + Edge headless로 1440x900, 390x900, light/dark 화면 확인
- 모바일 진단: 390px 기준 `documentElement.clientWidth = 390`, `scrollWidth = 437`; 메뉴 버튼이 `right = 417`까지 밀려나 오른쪽이 잘림
- 검증: `npm.cmd run build` 성공

## 회고

좋아진 점:

- Hero는 과거보다 훨씬 명확하다. 이름, 직군, CTA가 첫 화면에 있고, 이력서 PDF가 1순위 행동으로 잘 보인다.
- 프로젝트는 "무엇을 했는지"보다 "어떤 흐름을 다뤘는지"가 보이기 시작했다. 대기열, 보상 트랜잭션, sessionToken, Redis GEO, lock 같은 백엔드 판단 근거가 화면에 있다.
- `ProjectCard.jsx`, `ProjectDetail.jsx`, `mermaid`, `gsap` 제거 이후 런타임 의존성은 가벼워졌다.

아쉬운 점:

- 터미널 콘셉트가 `Nav.jsx` 오버레이와 브랜드 아이콘, Footer, Agentation 버튼까지 겹쳐 다시 장난감처럼 보일 수 있다.
- `Approach`가 별도 대형 섹션으로 들어오면서 "Hero / Projects / Contact 중심"이라는 초기 전략에서 조금 벗어났다.
- 모바일 헤더는 실제로 오른쪽이 잘린다. 시각 피드백 이전에 기능성 버그다.
- 다크모드는 시안 계열이 강해 백엔드 신입 포트폴리오보다는 사이버/게임 UI에 가까워진다.
- `globals.css`에는 현재 JSX가 쓰지 않는 오래된 `.hero`, `.nav`, `.about-*`, `.contact-*`, terminal scrollbar 계열 스타일이 남아 있어 다음 수정 때 판단 비용을 높인다.
- `AGENTS.md`에는 `ProjectDetail.jsx`, `mermaid`, `gsap` 등 현재 코드와 어긋난 설명이 남아 있다.

## 우선순위

### P0 - 바로 고칠 것

1. 모바일 헤더 오버플로우를 고친다.
   - 대상: `src/components/Nav.jsx`, 필요 시 `src/styles/globals.css`
   - 목표: 390px, 430px, 768px에서 `document.documentElement.scrollWidth === document.documentElement.clientWidth`
   - 힌트: 모바일 헤더의 brand, theme toggle, hamburger 폭과 gap을 줄이거나 brand suffix를 모바일에서 숨긴다.

2. `Nav.jsx`의 터미널 명령 오버레이를 제거한다.
   - 대상: `src/components/Nav.jsx`
   - 제거 후보: `TypingText`, `executingCmd`, 1200ms 지연, `root@dev:~$`, `System Navigation` overlay
   - 목표: 내비게이션 클릭 즉시 스크롤. 사용자가 버튼을 눌렀는데 화면 하단에 터미널 UI가 뜨지 않게 한다.

### P1 - 첫인상과 읽기 흐름 개선

3. `Approach` 섹션을 압축하거나 About 아래 요약으로 병합한다.
   - 대상: `src/App.jsx`, `src/components/Approach.jsx`, `src/components/About.jsx`, `src/data/profile.js`, `src/components/Nav.jsx`
   - 권장: 별도 nav 항목 `Approach`는 제거하고, 강점 3개는 About 말미의 짧은 evidence row 또는 Projects 앞 요약으로 낮춘다.
   - 이유: 리크루터 5-10초 목표에서는 Hero 다음 Projects로 바로 내려가는 편이 낫다.

4. Hero 스택 칩 수를 줄인다.
   - 대상: `src/data/profile.js`, `src/components/Hero.jsx`
   - 권장: 첫 화면에는 `featuredTech` 5개와 `Team Lead · PO 경험 다수`만 강하게 보이고, 나머지 stack group은 한 줄 이하 또는 About/Projects로 이동한다.
   - 이유: 현재 모바일에서는 칩이 CTA 전까지 많은 높이를 차지한다.

5. 프로젝트 섹션의 첫 문단 밀도를 줄인다.
   - 대상: `src/data/projects.js`, `src/components/Projects.jsx`
   - 권장: 각 프로젝트의 `overview`/`role`은 1문단씩만 먼저 보이게 하고, 자세한 내용은 scenario 아래로 분산한다.
   - 주의: 측정값은 새로 만들지 말 것. 수정이 필요하면 `reference/` 또는 원측정 문서를 먼저 확인한다.

### P2 - 정리와 품질 바닥

6. 다크모드 팔레트를 백엔드 포트폴리오 톤으로 낮춘다.
   - 대상: `src/styles/tokens.css`
   - 권장: 시안/보라/핑크 3색 강조를 줄이고, 차분한 graphite + restrained cyan 또는 neutral accent로 정리한다.

7. 불필요한 코드 클린업을 별도 작업으로 챙긴다.
   - 대상: 사용하지 않는 import, state, helper component, dead branch, 삭제된 컴포넌트 흔적, 주석으로만 남은 과거 구조
   - 후보: `Nav.jsx`의 터미널 오버레이 관련 상태/컴포넌트, 삭제된 `ProjectCard.jsx`/`ProjectDetail.jsx`/`mermaid`를 전제로 한 문서·스타일·주석
   - 작업 전 `rg`로 실제 참조 여부를 확인하고, 참조가 없다는 근거가 있을 때만 삭제한다.

8. 오래된 CSS를 삭제한다.
   - 대상: `src/styles/globals.css`
   - 후보: `.hero`, `.nav`, `.about-grid`, `.about-text`, `.about-side`, `.contact-list`, `.contact-item`, `.custom-scrollbar` 등 현재 JSX에서 참조하지 않는 스타일
   - 작업 전 `rg`로 클래스 사용 여부를 확인한다.

9. 문서와 현재 코드의 불일치를 정리한다.
   - 대상: `AGENTS.md`, `TODO.md`, 필요 시 `improvement.md`
   - 갱신 포인트: `ProjectDetail.jsx`/`mermaid` 제거, `gsap` 제거, active section에 `approach`가 있는지 여부, 프로젝트 구조가 카드/모달이 아니라 본문형 case study라는 점

10. 접근성 소품을 챙긴다.
   - 대상: `src/components/Nav.jsx`, `src/components/ThemeToggle.jsx`, `src/components/Contact.jsx`, `src/components/Hero.jsx`
   - 체크: 모바일 메뉴 버튼 `aria-label`/`aria-expanded`, theme toggle label, 외부 링크 `aria-label`, `mailto:`의 `target="_blank"` 필요 여부, lucide icon 사용 가능 여부

## 작업 순서 제안

1. P0 모바일 헤더/터미널 오버레이 제거만 한 PR로 처리한다.
2. 빌드 후 390x900, 430x900, 1440x900 light/dark에서 화면 확인한다.
3. P1 콘텐츠 밀도 조정은 한 번에 크게 갈아엎지 말고 `Approach` 압축 → Hero 칩 축소 → Projects 문단 축소 순서로 진행한다.
4. P2 CSS/문서 정리는 기능 변경 뒤에 한다. 사용하지 않는 CSS 삭제는 빌드와 화면 확인을 반드시 붙인다.

## 금지/주의사항

- 측정값을 새로 만들지 않는다. `3,152 ms`, `2,017 ms`, `약 36%`, `p95` 같은 값은 근거 없이 수정하지 않는다.
- 보이는 문구는 우선 `src/data/profile.js`, `src/data/projects.js`에서 수정한다.
- `agentation`은 dev-only lazy import 상태를 유지한다. top-level import로 바꾸지 않는다.
- 새 런타임 의존성은 추가하지 않는다.
- 기능을 지운 뒤에는 관련 import/state/CSS/문서 흔적까지 같이 지운다. "동작에는 문제 없음"만 보고 dead code를 남기지 않는다.
- source 변경 후에는 `npm.cmd run build`를 실행한다.
- `package-lock.json`을 건드리면 클린 환경에서 `npm ci` 재현까지 확인한다.

## 완료 기준

- 390px 모바일에서 오른쪽 잘림과 가로 스크롤이 없다.
- nav 클릭 시 터미널 오버레이 없이 바로 이동한다.
- 첫 화면에서 5초 안에 `백종현 / Java · Spring 백엔드 신입 / 이력서 PDF / GitHub`가 읽힌다.
- Projects까지 내려갔을 때 각 프로젝트가 "무슨 도메인, 어떤 문제, 어떤 개선"인지 스캔된다.
- 제거한 기능의 import/state/helper/CSS/문서 흔적이 남아 있지 않다.
- `npm.cmd run build`가 통과한다.
- 변경한 내용이 `TODO.md`에 반영되어 있다.
