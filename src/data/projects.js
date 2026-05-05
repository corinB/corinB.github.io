export const projects = [
  {
    id: 'cinestream',
    name: 'CineStream',
    summary: '영화 티켓팅과 라이브 스트리밍을 통합한 OTT 플랫폼 (5인 팀 프로젝트)',
    period: '2026.03.17 ~ 2026.05.04',
    repo: 'https://github.com/prgrms-be-adv-devcourse/beadv5_5_3M_BE',
    demo: 'https://www.youtube.com/watch?v=krwVaERh1qE',
    lead: 'PO · 팀장',
    personaTags: ['설계', 'AI', '검증'],
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
      problem:
        '`@Transactional` 메서드 안에서 Redis 캐시 갱신·외부 HTTP 호출(쿠키 차감/환불)·Kafka 발행을 함께 수행하다 보니, DB가 롤백되어도 부수 효과는 남아 정합성이 깨지는 케이스가 여러 곳에서 발견됐습니다. 환불에서는 쿠키 HTTP 환불이 성공한 뒤 티켓 삭제가 실패해 재환불이 가능했고, 티켓팅 시작에서는 Redis 5개 키를 시드한 뒤 schedule 저장이 실패해 대기열만 열려 있는 상태가 만들어졌습니다.',
      solution:
        'DB 외 부수 효과는 `@TransactionalEventListener(phase = AFTER_COMMIT)` 핸들러로 옮겨 DB 커밋이 확정된 뒤에만 실행되도록 분리했습니다. 트랜잭션 안에서 먼저 일어나야 하는 HTTP 차감은 `TransactionSynchronization.afterCompletion(STATUS_ROLLED_BACK)` 콜백에 보상 환불을 등록해 롤백 시 자동으로 되돌리도록 했고, 한 핸들러 안의 독립 부수 효과(쿠키 환불 / stock 복구 / `queue.drain` 발행)는 각각 try-catch로 격리해 하나의 실패가 나머지를 막지 않게 했습니다.',
      result:
        'Redis 성공·DB 실패, HTTP 성공·DB 실패, 환불 일부 실패 같은 갈라짐 시나리오에서 정합성이 유지됐고, 팀의 이슈 트래킹 기준 트랜잭션(TX) 7건 중 6건·메시징(KFK) 5건 전수가 RESOLVED로 처리됐습니다. 큐 드레인은 `@Async` 풀 고갈을 계기로 Kafka 컨슈머(`QueueDrainConsumer` concurrency=4)로 전환해 백프레셔가 안정화됐습니다.',
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
      problem:
        '실시간 라이더 좌표를 3~5초 주기로 PostgreSQL에 갱신하면서 디스크 I/O가 폭증했고, ACID 보장을 위한 Row-level Lock 경합으로 피크 타임 API 응답이 지연됐습니다. 영속성이 필요 없는 휘발성 좌표가 DB 커넥션을 점유해 결제·주문 처리에까지 영향이 번졌습니다.',
      solution:
        '실시간 좌표는 영속성보다 최신성이 중요한 휘발성 데이터로 보고 쓰기 부하를 Redis로 이관했습니다. 공간 탐색은 Redis GEO search로 메모리 내 O(log N) 처리해 픽업지 10km 이내 라이더를 추리고 SSE로 푸시했고, 동일 배달건 다중 수락은 Redis 분산 락(setIfAbsent TTL 5초)으로 원자성을 보장했습니다. 라이더별 동시 배달 3건 제한은 Redis SET·SCARD로 O(1) 카운팅했고, 운행 종료 시 좌표를 즉시 삭제하고 maxmemory `allkeys-lru` 정책으로 메모리를 안전하게 관리했습니다.',
      result:
        '위치 업데이트 쿼리를 RDBMS에서 Redis로 옮겨 DB 쓰기 부하의 약 90%를 덜어냈고(전체 쿼리 중 위치 업데이트 비중 기준), 메모리 기반 연산으로 라이더 주변 목록 렌더링 응답 속도가 향상됐습니다. 분산 락과 Atomic Counter로 중복 배차·동시 배달 제한 위반을 차단했습니다.',
    },
  },
];
