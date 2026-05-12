export const projects = [
  {
    id: 'live-class',
    name: 'live-class',
    summary: 'AI 코드 생성을 안전하게 통제하는 멀티에이전트 하네스 — 라이브 강의 수강신청 도메인을 6개 서브에이전트가 순차/병렬로 산출하도록 단독 설계·구축한 개인 워크스페이스',
    period: '2026.05 ~ 진행중',
    repo: 'https://github.com/corinB/live-class',
    demo: '',
    lead: '개인 · 단독 설계·구축',
    personaTags: ['설계', 'AI', '검증'],
    featuredStack: ['Bash Hooks'],
    aiWorkflow: {
      summary:
        '도메인 → 동시성 → 태스크 분해 → 인프라/CI-CD → Git 규약 → 워커 실행을 6개 서브에이전트로 단계화. 각 단계를 슬래시 스킬로 호출하고, 상류 산출물 검증을 호출 전 게이트로 둠.',
      detail:
        '메인 세션은 직접 코드를 쓰지 않고 에이전트에 일을 시킨다. 각 단계의 산출물이 다음 단계의 입력이 되며, 슬래시 스킬은 상류 산출물이 없으면 호출 자체가 막히도록 설계했다.',
      items: [
        { label: '에이전트 분담', value: 'ddd-domain-architect / concurrency-architect / scrum-task-decomposer / infra-cicd-operator / git-master-conventions / blueprint-executor-worker' },
        { label: '안전 통제', value: 'settings.json 자동 허용·차단 + 7개 Bash 훅 + 워크트리 격리' },
        { label: '상태 가시화', value: 'SessionStart·UserPromptSubmit 훅이 파이프라인 배지를 매 턴 컨텍스트에 주입' },
      ],
    },
    stack: [
      'Java 21',
      'Spring Boot 4.0.6',
      'Gradle',
      'PostgreSQL',
      'Redis',
      'Docker Compose',
      'Bash Hooks',
      'Worktree Isolation',
      'Claude Code Agent SDK',
    ],
    architectureDiagram: `
graph TD
    A[ddd-domain-architect] -->|DOCS.md| B[concurrency-architect]
    B -->|ARCHITECTURE.md| C[scrum-task-decomposer]
    C -->|plan/before/*.md| D[infra-cicd-operator]
    C -->|plan/before/*.md| E[git-master-conventions]
    D -->|docker-compose.yml<br/>Dockerfile<br/>ci-cd.yml| F[blueprint-executor-worker]
    E -->|CONTRIBUTING.md<br/>pull_request_template.md| F
    F -->|src/**, plan/after/N.md| G[Merge via PR]
    `,
    highlights: [
      '6 서브에이전트 순차/병렬 파이프라인 (도메인 → 동시성 → 태스크 분해 → 인프라·CI-CD → Git 규약 → 워커)',
      '슬래시 스킬 6개로 에이전트 호출 + 상류 산출물 검증 게이트',
      'Bash 훅 7개로 destructive 차단·시크릿 차단·설계 문서 변경 경고·워크트리 경계 보호',
      'worker만 isolation: "worktree" 격리로 병렬 실행 시 충돌 차단',
    ],
    role: '단독 설계·구축. 도메인 모델 1차 정의, 6에이전트 역할 경계와 의존성 순서, 자동 허용·차단 정책 기준, 7개 훅 스크립트 작성·검증 일체를 본인이 결정·수행한 개인 프로젝트.',
    troubleshooting: {
      problem: [
        'AI에 코드 생성을 맡길 때 권한·범위 제약이 없으면 시크릿 노출·파괴적 명령·의도치 않은 파일 수정 위험.',
        '여러 에이전트를 동시에 돌리면 같은 파일을 만져 충돌·정합성 깨짐.',
        '상류 산출물(도메인 문서 등)이 바뀌었는데 후속 단계가 알아차리지 못하면 잘못된 입력으로 코드가 만들어짐.',
      ],
      solution: [
        'settings.json에 자동 허용·차단 패턴 명시(ls·gradle·docker compose는 허용, .env·*.key·credentials는 차단).',
        'pre-bash-block-destructive.sh 훅으로 rm -rf·git push --force·git reset --hard를 permissionDecision: deny로 끊음.',
        'worker만 isolation: "worktree"로 격리해 메인 트리 침범 차단.',
        'SessionStart·UserPromptSubmit 훅이 매 턴 파이프라인 상태 배지를 컨텍스트에 주입, Stop 훅이 설계 문서 변경 시 경고.',
      ],
      result: [
        '에이전트 6개·슬래시 스킬 6개·Bash 훅 7개가 한 워크스페이스 안에서 충돌 없이 병렬 실행.',
        '시크릿·파괴적 명령은 호출 자체가 막힘.',
        '상류 산출물 변경이 다음 단계로 자동 전달되어 입력 정합성 유지.',
      ],
    },
  },
  {
    id: 'cinestream',
    name: 'CineStream',
    summary: '영화 티켓팅과 라이브 스트리밍을 통합한 OTT 플랫폼 (5인 팀 프로젝트)',
    period: '2026.03.17 ~ 2026.05.04',
    repo: 'https://github.com/prgrms-be-adv-devcourse/beadv5_5_3M_BE',
    demo: 'https://www.youtube.com/watch?v=krwVaERh1qE',
    lead: 'PO · 팀장',
    personaTags: ['설계', 'AI', '검증'],
    featuredStack: ['Spring Cloud Gateway'],
    aiWorkflow: {
      summary:
        '문서 기반으로 스프린트별 작업과 보고서 생성을 AI에 지시. 보고서로 1차 검증 후 스프린트별 통합테스트로 최종 확인.',
      detail:
        '설계 문서를 기반으로 스프린트별 작업과 작업 보고서 생성을 AI에 함께 지시했습니다. 보고서를 1차 검증한 뒤 스프린트별 통합테스트로 최종 확인하는 사이클을 반복했습니다.',
      items: [
        { label: '모델 분담', value: '설계 Opus  /  코딩 Sonnet  /  문서 Haiku' },
        { label: '컨텍스트', value: '중요 작업 전 토큰 점검 → 압축 또는 초기화' },
        { label: '산출물 표준', value: 'output style 지정으로 산출 문서 포맷 통일' },
        { label: '문서 최신화', value: '주기적 /init 으로 프로젝트 문서 갱신' },
        { label: '프론트엔드', value: 'Figma AI 초안 → Agentation·Antigravity 디테일 수정 → 스프린트별 연결' },
      ],
    },
    stack: [
      'Java 21',
      'Spring Boot 4.0.4',
      'Spring Cloud Gateway',
      'PostgreSQL 18 (JPA/Hibernate)',
      'Redis 7 (Counters/Queue)',
      'Apache Kafka (KRaft)',
      'Elasticsearch 8 (nori)',
      'Quartz Clustered',
      'Spring Batch 5',
      'Spring AI (OpenAI)',
      'ffmpeg (HLS Streaming)',
      'Kubernetes (Helm)',
      'GitHub Actions CI/CD',
    ],
    architectureDiagram: `
flowchart LR
    Client[Client / FE]
    GW[gateway :8000]

    Client -->|JWT| GW

    subgraph SERVICES[Backend Services]
        Creator[creator :8080]
        Payment[payment :8081]
        Settlement[settlement :8083]
        Ticket[ticket :8084]
        User[user :8085]
        Movie[movie :8086]
        Streaming[streaming :8088]
        AI[ai :8089]
    end

    GW --> Creator
    GW --> Payment
    GW --> Settlement
    GW --> Ticket
    GW --> User
    GW --> Movie
    GW --> Streaming
    GW --> AI

    Ticket -. HTTP cookie deduct/refund .-> User
    Settlement -. HTTP settle .-> Creator
    Streaming -. HTTP movie location .-> Creator

    KAFKA[(Apache Kafka)]
    Creator <--> KAFKA
    Payment <--> KAFKA
    Ticket <--> KAFKA
    User <--> KAFKA
    Movie <--> KAFKA
    Streaming <--> KAFKA
    AI <--> KAFKA
    `,
    highlights: [
      'MSA 9개 서비스 + Kafka 비동기 메시징',
      '선착순 티켓팅 (Redis 대기열·재고 관리)',
      'HLS 라이브 송출 + 실시간 채팅',
    ],
    role: '티켓 서비스·스트리밍 서비스 구현, 데일리 스크럼 진행과 팀 의견 조율, 일정 관리',
    troubleshooting: {
      problem: [
        '`@Transactional` 메서드 안에서 Redis 갱신·외부 HTTP 호출·Kafka 발행을 함께 수행 → DB 롤백 후에도 부수 효과가 잔존해 정합성이 깨짐.',
        '환불: 쿠키 HTTP 환불 성공 → 티켓 삭제 실패 → 재환불 가능 상태가 됨.',
        '티켓팅 시작: Redis 5개 키 시드 → schedule 저장 실패 → 대기열만 열린 상태로 남음.',
      ],
      solution: [
        'DB 외 부수 효과를 `@TransactionalEventListener(AFTER_COMMIT)` 핸들러로 분리 — 커밋 확정 후에만 실행.',
        '트랜잭션 안에서 먼저 일어나는 HTTP 차감은 `TransactionSynchronization.afterCompletion(STATUS_ROLLED_BACK)` 콜백에 보상 환불 등록.',
        '핸들러 내 독립 부수 효과(쿠키 환불 / stock 복구 / queue.drain 발행)는 각각 try-catch로 격리해 하나의 실패가 나머지를 막지 않게 함.',
      ],
      result: [
        'Redis·DB·HTTP가 갈라지는 시나리오 전반에서 정합성 유지.',
        '팀 이슈 트래킹 기준 TX 7건 중 6건·KFK 5건 전수 RESOLVED.',
        '큐 드레인은 `@Async` 풀 고갈을 계기로 Kafka 컨슈머(`QueueDrainConsumer` concurrency=4)로 전환 → 백프레셔 안정화.',
      ],
    },
  },
  {
    id: 'dongne-market',
    name: '동네마켓',
    summary: '고객·로컬 마트·라이더·관리자를 잇는 동네 배송 플랫폼 (6인 팀 프로젝트)',
    period: '2026.01.18 ~ 2026.02.25',
    repo: 'https://github.com/lion-final-project/final-back',
    demo: 'https://www.youtube.com/watch?v=hY1qML2QABM',
    lead: 'PO · 팀장',
    personaTags: ['설계', 'AI', '검증'],
    featuredStack: ['PostgreSQL 16 + PostGIS'],
    aiWorkflow: {
      summary:
        '문서 기반으로 작업을 스프린트 단위로 나누어 AI에 위임하고, 산출물을 직접 테스트로 검증.',
      detail:
        '설계 문서를 기반으로 작업을 스프린트 단위로 분할해 AI에 위임했습니다. 산출물은 본인이 직접 통합테스트로 검증하는 사이클을 반복했고, output style을 별도 지정해 산출 문서의 포맷을 일관되게 유지했습니다.',
      items: [
        { label: '검증 방식', value: '스프린트 완료 후 직접 통합테스트' },
        { label: '산출물 표준', value: 'output style 지정으로 문서 포맷 통일' },
        { label: '프론트엔드', value: 'Antigravity·Agentation으로 초안 생성 → API 완성별 연결' },
      ],
    },
    stack: [
      'Java 21',
      'Spring Boot 3.5.10',
      'Spring Batch 5',
      'PostgreSQL 16 + PostGIS',
      'Redis 7 Cluster',
      'Spring Cloud OpenFeign',
      'Toss Payments',
      'AWS (RDS/ElastiCache/S3)',
      'Nginx / Docker',
      'GitHub Actions CI/CD',
    ],
    architectureDiagram: `
graph TD
    subgraph Client_Layer ["Client (React 19)"]
        Client["localhost:5173 / Vercel"]
    end

    Client -- "/api (Vite proxy / Nginx 443)" --> SpringBoot

    subgraph SpringBoot ["Spring Boot 3.5.10 (Port 8080)"]
        direction TB
        Filter["JwtAuthenticationFilter"]
        Controllers["Controllers"]
        Services["Services"]

        Filter --> Controllers
        Controllers --> Services
    end

    subgraph Storage_Layer ["Data & File Storage"]
        Redis[("Redis Cluster<br/>(Cache, GEO, Pub/Sub)")]
        PostgreSQL[("PostgreSQL 16<br/>+ PostGIS")]
        S3[("AWS S3 / MinIO<br/>(File Store)")]
    end

    subgraph External_API ["External Services"]
        Toss["Toss Payments"]
        CoolSMS["CoolSMS"]
        Gmail["Gmail SMTP"]
    end

    Filter -.-> Redis
    Services --> Redis
    Services --> PostgreSQL
    Services --> S3
    Services --- External_API
    `,
    highlights: [
      'PostGIS 기반 가게 위치·사용자 현재 위치를 활용한 가게 필터링',
      '라이더 실시간 위치를 폴링으로 받아 Redis에서 관리',
      '픽업 장소 10km 이내 라이더에게 SSE로 픽업 요청 메시지 발행',
      '주문·배달 라이프사이클 관리',
    ],
    role: 'PO로서 데일리 스크럼 주관과 팀원 간 의견 중재, 라이더 모듈·위치 기반 상점 검색 및 추천 기능 구현',
    troubleshooting: {
      problem: [
        '실시간 라이더 좌표를 3~5초 주기로 PostgreSQL에 갱신 → 디스크 I/O 폭증.',
        'Row-level Lock 경합으로 피크 타임 API 응답 지연.',
        '영속성이 필요 없는 휘발성 좌표가 DB 커넥션을 점유 → 결제·주문 처리에까지 영향 확산.',
      ],
      solution: [
        '실시간 좌표를 Redis로 이관 (영속성보다 최신성이 중요한 휘발성 데이터로 분류).',
        'Redis GEO search로 픽업지 10km 이내 라이더를 메모리 내 O(log N) 추출 후 SSE 푸시.',
        '동일 배달건 다중 수락은 Redis 분산 락(`setIfAbsent`, TTL 5초)으로 원자성 보장.',
        '라이더별 동시 배달 3건 제한은 Redis SET·SCARD O(1) 카운팅. 운행 종료 시 즉시 삭제 + maxmemory `allkeys-lru`.',
      ],
      result: [
        '위치 업데이트 쿼리를 RDBMS → Redis로 옮겨 DB 쓰기 부하 약 90% 절감 (위치 업데이트 비중 기준).',
        '메모리 기반 연산으로 라이더 주변 목록 렌더링 응답 속도 향상.',
        '분산 락 + Atomic Counter로 중복 배차·동시 배달 제한 위반 차단.',
      ],
    },
  },
  {
    id: 'cinema',
    name: 'Cinema',
    summary:
      '서버 기준 시간으로 동시에 시청·채팅하는 그룹 상영 + 자동 정산 플랫폼 → 이후 CineStream으로 구조 확장 (lion-team4 단기 협업)',
    period: '2026.01.12 ~ 2026.01.21',
    repo: 'https://github.com/corinB/cinema',
    demo: 'https://www.youtube.com/watch?v=GngLq_F9FmI',
    lead: '팀원 · PG·구독·리뷰·검색 담당',
    personaTags: ['설계', '검증'],
    featuredStack: ['QueryDSL'],
    stack: [
      'Java 21',
      'Spring Boot 3.5',
      'QueryDSL',
      'MySQL 8',
      'Next.js 16',
      'STOMP / WebSocket',
      'FFmpeg HLS',
      'Spring Batch',
      'Docker',
    ],
    highlights: [
      '토스 PG 연동 + 구독 시스템 결제·갱신 흐름 구현',
      '리뷰 관리 도메인 구현',
      'QueryDSL 기반 콘텐츠/스케줄 동적 검색·페이지네이션 (Page → Slice 최적화)',
    ],
    role: '토스 PG 연동, 구독 시스템, 리뷰 관리, 콘텐츠/스케줄 검색(QueryDSL 동적 검색·페이지네이션) 4개 도메인 구현 담당',
    troubleshooting: {
      problem: [
        'Spring Data `Page<T>`로 페이지네이션 반환 시 데이터 조회 외에 count 쿼리가 매 호출마다 추가 발생.',
        '검색·무한 스크롤 화면처럼 전체 페이지 수가 필요 없는 곳에서도 불필요한 연산 한 번이 매번 들어감.',
      ],
      solution: [
        '`Page` 대신 `Slice<T>` 사용 — `pageSize + 1`만 조회해 `hasNext`만 판단, count 쿼리 발생 없음.',
        '다음 페이지 존재 여부만 알면 충분한 검색 화면 요구사항과 자연스럽게 부합.',
      ],
      result: [
        '응답 1건당 count 쿼리 1회 제거 → 단일 쿼리로 단순화.',
        '검색 트래픽이 늘수록 절약 효과가 누적되는 구조.',
      ],
    },
  },
  {
    id: 'opene',
    name: 'Opene',
    summary:
      'Spring Boot 백엔드와 Python/Flask·YOLOv5 추론을 잇는 이종 스택 통합 웹앱. 도메인 요구를 풀기 위해 ML 도구 스택까지 직접 다룬 첫 백엔드 협업 프로젝트.',
    period: '2024',
    repo: 'https://github.com/corinB/Opene',
    demo: 'https://www.youtube.com/watch?v=DxCflyinK2I',
    lead: 'PO · 팀장',
    personaTags: ['팀 리딩', '검증'],
    featuredStack: ['Flask 2.x (Python 3.9)'],
    stack: [
      'Spring Boot 3.1',
      'Java 17',
      'Thymeleaf',
      'Flask 2.x (Python 3.9)',
      'PyTorch 2.3 / YOLOv5',
      'KMeans (scikit-learn)',
    ],
    highlights: [
      '문제 해결을 위해 도구를 가리지 않음 — Java 메인 스택 위에 Python/ML 런타임 직접 도입',
      'Spring Boot(:8080) ↔ Flask(:5000) 이종 런타임 연동: 이미지 업로드 → 추론 호출 → 추천 응답 파이프라인 구성',
      'YOLOv5 객체 탐지 + KMeans RGB 클러스터링으로 코디 컬러 매칭 로직 구현',
      'PO로서 5개 스타일 카테고리·약 2,914장 데이터셋 스코프 정의, 팀 일정 조율',
    ],
    role:
      'PO·팀장으로 협업 일정·스코프 조율. 백엔드 본 영역(Spring Boot)에 Python/Flask·YOLOv5 추론 서빙을 직접 결합해 도메인 요구(이미지 기반 컬러 추천)를 풀어냄. ML 라이브러리·다중 런타임 운영 경험을 메인 스택 외 영역으로 확장한 사례.',
    troubleshooting: {
      problem: [
        '사진별 상의·하의 색상 정보를 어떤 방식으로 저장·검색할지 막막.',
        '당시(2024) 벡터 DB·임베딩 유사도 검색이라는 개념을 인지하지 못한 상태.',
      ],
      solution: [
        'RDB 테이블에 사진별 상의·하의 RGB 값을 직접 컬럼으로 저장.',
        '추천 요청 시 입력 이미지 RGB와 테이블 값을 비교해 유사도 계산.',
      ],
      result: [
        '단순 컬럼 비교로 컬러 매칭 추천 기능은 정상 동작.',
        '회고: 이후 벡터 DB·임베딩 패턴을 학습하며 같은 문제를 더 적합한 자료구조로 풀 수 있다는 것을 확인.',
      ],
    },
  },
];
