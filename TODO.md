# 포트폴리오 리팩터링 TODO

> 진행 중에 항상 최신 상태로 유지. 룰은 `CLAUDE.md` "작업 진행 룰" 항목 참고.
>
> 표기:
> - `[ ]` 미시작
> - `[~]` 진행 중
> - `[x]` 완료
> - `[!]` 블로커 (같은 줄 끝에 사유 한 줄)

---

## PR-1 — 콘텐츠 데이터 갱신 (의존성 없음)

- [x] `src/data/profile.js`: `title` → `'Java · Spring 백엔드 신입'`
- [x] `src/data/profile.js`: `taglineShort: '설계 · AI · 검증'` 신설
- [x] `src/data/profile.js`: `heroStack` 배열 신설 (`['Java','Spring Boot','Kafka','Redis','Elasticsearch','PostgreSQL','AWS','Docker']`)
- [x] `src/data/profile.js`: `introduction` 160자로 압축 (페르소나 3축 명시)
- [x] `src/data/projects.js`: 각 프로젝트에 `personaTags: ['설계','AI','검증']` 추가
- [x] `src/data/projects.js`: 각 프로젝트에 `aiWorkflow: { summary, detail }` 추가
- [x] `npm run dev`로 사이트 깨짐 없는지 확인 (UI 변경 0건이어야 함)

## PR-2 — 제거 (Skills · TerminalWidget · Resume · About 4카드)

- [x] `src/components/Skills.jsx` 삭제
- [x] `src/components/TerminalWidget.jsx` 삭제
- [x] `src/components/Resume.jsx` 삭제
- [x] `src/components/AboutCard.jsx` 삭제
- [x] `src/components/AboutDetail.jsx` 삭제
- [x] `src/data/skills.js` 삭제
- [x] `src/App.jsx`: 위 컴포넌트 import·렌더 제거 (`Skills`, `TerminalWidget`, `Resume`, `skillGroups`)
- [x] `src/components/Nav.jsx`: `skills`/`resume` 항목 제거
- [x] `src/styles/globals.css`: `.skills-grid` / `.skill-group` / `.skill-chips` / `.resume-card` 제거
- [x] `npm run build` 통과 확인
- [x] 백틱 키 글로벌 리스너 충돌 없음 (TerminalWidget 삭제로 리스너 자체 소멸)

## PR-3 — Hero 재구성

- [x] 메인 헤드라인을 「{name} / {title}」 형태로 (이름과 직군 한 시야)
- [x] "구직 중" 배지는 작게 유지
- [x] 부제 = `taglineShort` 단순 텍스트 (HighlightText 컴포넌트 제거)
- [x] `heroStack` 칩 영역 추가
- [x] CTA: 이력서 PDF (1순위, `btn-accent`, `/resume.pdf` 다운로드) + GitHub (2순위)
- [x] "프로젝트 보기" / "이메일 보내기" 버튼 제거
- [x] `bootUpVariants`의 `rotateX`/`scale` 제거 → `opacity + y(20px)` fadeIn만
- [x] 두 개의 parallax `useScroll`/`useTransform` 제거
- [x] 배경 blur orb 단순화 (1개만)
- [x] 데스크톱 1440·1920에서 5초 룩 검증 (다크/라이트 둘 다)
- [x] **사용자 작업**: `public/resume.pdf` 파일 배치 (사용자 직접 생성·배치 완료)

## PR-4 — About 압축 ✅ PR-2에서 선처리 완료

- [x] `aboutItems` 배열 제거, modal `activeItem` state 제거
- [x] AboutCard·AboutDetail import·렌더 제거
- [x] 1 문단 introduction + 메타 행(학력 / 부트캠프 / 활동) 구조로 교체
- [x] About 본문에서 `font-mono` 클래스 제거
- [x] `useScroll` 패럴랙스, `AnimatePresence` 정리

## PR-5 — ProjectDetail에 페르소나 칩 + AI 활용 슬라이드

- [x] `ProjectCard`(또는 Projects 카드 영역) 상단에 `personaTags` 칩 렌더
- [x] `ProjectDetail`의 `slides` 배열에 `{ id: 'ai', title: 'AI 활용' }` 추가
- [x] AI 슬라이드: `aiWorkflow.detail` 본문 + 공통 워크플로우(모델 분담 · 컨텍스트 운영 · output style · 주기적 `/init`) 표시
- [x] 슬라이드 도트 네비 자동 반영 확인
- [x] 두 프로젝트 모두 칩 표시 + AI 슬라이드 도달 가능 확인

## PR-6 — 타이포 정리 (가독성)

- [x] Hero: PR-3 재작성으로 버튼·CTA 모두 Pretendard
- [x] Contact: 카드 라벨(`> Email`) 모노 유지, 값 텍스트 Pretendard — 이미 올바름
- [x] ProjectDetail `TroubleshootingSlide`: PSR 본문에서 부모 `font-mono` 제거, 탭 버튼만 모노 유지
- [x] About: PR-4 재작성으로 라벨 모노, 본문 Pretendard — 올바름
- [x] `globals.css @theme`: Fira Code 제거 → `'JetBrains Mono', ui-monospace`
- [x] ProjectCard: 부모 `font-mono` 제거, 터미널 헤더·라벨·스택·액션만 명시적 모노
- [x] 모노 유지 영역 확인 완료 (터미널 헤더/칩/라벨/섹션 메타)
- [x] 한국어 본문 자간·행간 자연스러운지 다크/라이트 둘 다 확인

## PR-7 — 문서 정리

- [x] `CLAUDE.md`: TerminalWidget 섹션 제거 → Section IDs 항목으로 교체
- [x] `CLAUDE.md`: About 4카드 Exception 제거 + 단순 구조(introduction + 메타 3행)로 교체
- [x] `CLAUDE.md`: Data-driven rendering에서 skills.js 언급 제거
- [x] `CLAUDE.md`: Resume / validTargets 언급 제거 (TerminalWidget 섹션 삭제로 함께 처리)
- [x] `CLAUDE.md`: Animations 섹션 업데이트 (rotateX·parallax 제거 방침 명시)
- [x] `improvement.md`의 자가검증 체크리스트 마킹
- [x] TODO.md 전체 항목 [x] 확인 — 리팩터링 완료

---

## PR-8 — Projects 카드 시각 정리

> 배경: 일반인 시점에 카드가 난잡하다는 추가 피드백. 카드의 터미널 데코 6겹(Mac 라이트, 커맨드 라인, [ROLE]/[DESC]/[PERF] 라벨, # 해시태그 스택, ./view_details.sh 액션, 깜빡이는 caret) 제거.
>
> 상세 plan: `C:/Users/qorwh/.claude/plans/staged-seeking-pudding.md` — 구현 골격(JSX 스켈레톤) 포함.

- [x] `ProjectCard.jsx` 터미널 데코 제거 (Mac 라이트, 커맨드 라인, [ROLE]/[DESC]/[PERF] 라벨)
- [x] 새 구조 적용 (프로젝트명 H3 + GitHub 아이콘 / 메타 행 / summary line-clamp-2 / 페르소나 칩 / 스택 칩 / 우하단 자세히 보기 hint)
- [x] 스택 표시: 해시태그 → Hero와 동일한 칩 스타일 (5개 + `+N`)
- [x] 액션 단순화: GitHub은 우상단 외부링크 아이콘, 자세히 보기는 우하단 텍스트 hint
- [x] 호버 글로우 강도 살짝 축소 (`0_0_30px` → `0_0_20px`)
- [x] `framer-motion` import 제거, `index` prop 시그니처에서 제거
- [x] `npm run build` 통과
- [ ] 다크/라이트, 1440·1920·모바일(< 768px)에서 시각 확인
- [x] ProjectDetail 모달은 손대지 않음 (의도적 — opt-in 깊이 영역)

---

## PR-9 — Projects 가독성 개선 + 내용 오류 수정

- [x] `projects.js`: 동네마켓 Redisson → Redis setIfAbsent, GEORADIUS → GEO search
- [x] `Projects.jsx`: rotateX/parallax 제거, fadeIn만
- [x] `ProjectDetail.jsx`: TerminalCommand 제거, OverviewSlide 즉시 표시
- [x] `ProjectDetail.jsx`: 서브헤더 단순화 (root@dev 제거)
- [x] `ProjectDetail.jsx`: 탭 라벨 한국어화 (문제/해결/결과), footer 버튼 레이블
- [x] `npm run build` 통과
- [ ] 슬라이드 즉시 표시 + 다크/라이트 확인

---

## PR-10 — Cinema·Opene 카드 추가 + 팀 리딩 강조

> 배경: reference/p3(Cinema)·p4(Opene)이 portfolio 카드에 미등재. 사용자 PO·팀장 다수 경험도 어디에도 안 드러남. plan: `C:/Users/qorwh/.claude/plans/curious-cuddling-cake.md`.

- [x] `projects.js`: cinema 객체 추가 (lead='팀원·콘텐츠·시청기록 담당', personaTags=['설계','검증'], aiWorkflow/architectureDiagram 의도적 생략)
- [x] `projects.js`: opene 객체 추가 (lead='PO·팀장', personaTags=['팀 리딩','검증'], summary에 이종 스택 강조, highlights에 "도구를 가리지 않음" 메시지)
- [x] `projects.js`: cinema repo `https://github.com/corinB/cinema`, opene repo `https://github.com/corinB/Opene`
- [x] `profile.js`: taglineShort '설계 · AI · 검증' → '팀 리딩 · 설계 · AI · 검증'
- [x] `profile.js`: heroBadges=['Team Lead · PO 경험 다수'] 신설
- [x] `profile.js`: teamLead='다수 팀 리딩 경험 (PO·팀장)' 신설
- [x] `Hero.jsx`: heroStack 마지막 그룹 아래 Lead 칩 행 (heroBadges 조건부)
- [x] `About.jsx`: 활동 행 아래 '팀 리딩' 행 (teamLead 조건부)
- [x] `CLAUDE.md`: reference/ 표 매핑 단언으로 갱신
- [x] `public/resume.html`: Cinema·Opene 카드 추가 + job-title 아래 "팀 리딩 경험 다수" 보조 라인
- [x] `public/resume.html`: Cinema·Opene `.ts` 트러블슈팅 블록 추가 (Page→Slice / 벡터DB 회고)
- [x] `npm run build` 통과 (12.54s, exit 0)
- [x] Cinema lead/highlights 정정: 본인 담당 4개 도메인(토스 PG·구독·리뷰·콘텐츠/스케줄 검색)으로 교체, 팀 공통 기반 항목 제거 (Agentation 피드백 반영)
- [x] Cinema troubleshooting PSR (Page → Slice 최적화) — projects.js + resume.html 양쪽 반영
- [x] Opene troubleshooting PSR (벡터 DB 회고 + RGB 컬럼 저장) — projects.js + resume.html 양쪽 반영
- [x] `ProjectDetail.jsx` TroubleshootingSlide: string|array 둘 다 지원, array는 `<ul>` 불릿으로 렌더링 (가독성 개선)
- [x] `projects.js`: 4개 프로젝트 troubleshooting을 모두 짧은 불릿 배열로 재구성
- [x] `resume.html`: 4개 프로젝트 트러블슈팅을 portfolio와 동일한 불릿 구조로 재구성 (`.ts-section` + `ul.ts-list` CSS 신설)
- [x] `profile.js`+`Hero.jsx`: `featuredTech` 필드로 Java·Spring Boot·Claude Code를 PO 배지와 동일 accent 스타일로 강조
- [x] `profile.js`+`About.jsx`: '주요 수상' 행 신설 (4건 + Academic Evidence Portfolio 전체 보기 링크)
- [x] `resume.html`: 대외활동 섹션 끝에 증빙 GitHub 링크 한 줄 추가
- [ ] 다크/라이트, 모달 4개 troubleshooting 탭 가독성 시각 검증 (수동)

---

## 보류 · 후속 (이번 범위 외)

- `src/components/Contact.jsx` line 85: `useTransform`이 `map` 콜백 안에서 호출됨 — Hook 규칙 위반 우려. 별도 PR로.
- `profile.strengths` 8개 활용처 — 이력서 PDF 또는 인터뷰 초안에 활용
- 다크모드 액센트(시안+보라+핑크) 단순화 — 이번엔 유지, 후속 결정
