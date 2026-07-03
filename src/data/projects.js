export const projects = [
  {
    id: 'cinestream',
    name: 'CineStream',
    summary:
      '예매, 결제, 실시간 상영, HLS 스트리밍을 하나의 관람 흐름으로 묶은 OTT형 백엔드 프로젝트입니다.',
    period: '2026.03.17 ~ 2026.05.04',
    repo: 'https://github.com/prgrms-be-adv-devcourse/beadv5_5_3M_BE',
    demo: 'https://www.youtube.com/watch?v=krwVaERh1qE',
    lead: 'PO · 팀장 · ticket-service / streaming-service 담당',
    personaTags: ['MSA', '대기열', 'HLS', '부하 테스트'],
    overview: [
      'CineStream은 영화 상세 조회에서 예매, 결제, 로비 입장, 실시간 채팅, HLS 시청, 상영 종료까지 이어지는 관람 경험을 9개 Spring Boot 마이크로서비스로 나눈 프로젝트입니다. 정해진 상영 시간, 좌석 재고, 결제 상태, 시청 권한이 함께 움직이는 도메인을 다뤘습니다.',
      '프로젝트 흐름은 좌석을 임시 점유한 뒤 제한 시간 안에 결제를 끝내고, 상영 시간에는 sessionToken으로 HLS와 STOMP 요청을 검증한 뒤 ForceExit로 세션을 정리하는 구조입니다. 취소/환불 burst 상황의 대기열 처리는 문서에 기록된 실제 부하 테스트 수치만 포트폴리오에 반영했습니다.',
    ],
    role: [
      'PO와 팀장 역할로 요구사항, 일정, 서비스 경계를 조율했고, 백엔드에서는 ticket-service 구현을 담당했습니다. CART, IN_PROGRESSING, TICKETING, LOBBY, STREAMING, FINISH로 이어지는 상태 흐름을 정의하고 Redis stock, queue, paying 상태와 Quartz Job을 연결했습니다.',
      '결제 구간에서는 user-service 쿠키 차감 성공 뒤 ticket-service 저장이 실패할 수 있는 지점에 보상 콜백을 등록했습니다. streaming-service에서는 HLS manifest 요청과 STOMP CONNECT 요청이 같은 sessionToken을 공유하도록 맞추고, 상영 종료 후 ForceExit와 Redis 세션 정리를 처리했습니다.',
    ],
    sections: [
      {
        eyebrow: '흐름 설계',
        title: '예매와 시청을 하나의 시간 기반 라이프사이클로 다뤘습니다.',
        body:
          'CineStream은 상영 시작 전후의 상태 전이가 중요했습니다. 사용자는 장바구니에 좌석을 담고 제한 시간 안에 결제를 끝내야 하며, 상영 시간에는 로비와 스트리밍 세션으로 이동해야 합니다. 그래서 티켓 상태와 상영 스케줄을 중심으로 서비스 이벤트를 연결했습니다.',
        scenario: {
          scenario: 'ticket-lifecycle',
          title: '관람 라이프사이클',
          before: '기존: 예매와 시청 권한 흐름 분리',
          change: '변경: 티켓 상태를 시간 순서로 연결',
          result: '결과: 예매 제한부터 시청 종료까지 추적',
          diagram: {
            badge: '시간 순서대로 권한과 상태를 추적',
            steps: [
              { eyebrow: 'CART', title: '좌석 임시 점유' },
              { eyebrow: 'PAYING', title: '결제 진행' },
              { eyebrow: 'TICKETING', title: '티켓 확정' },
              { eyebrow: 'LOBBY', title: '상영 대기' },
              { eyebrow: 'STREAMING', title: '관람 세션' },
              { eyebrow: 'FINISH', title: '상영 종료' },
            ],
          },
        },
      },
      {
        eyebrow: '개선 포인트',
        title: '환불 burst 상황에서는 한 명씩 깨우던 대기열을 재고 수만큼 묶어서 처리했습니다.',
        body:
          '처음에는 좌석이 복구될 때마다 대기열의 다음 사용자 한 명만 결제로 이동시키는 방식이었습니다. 하지만 여러 좌석이 동시에 복구되면 뒤쪽 사용자는 재고가 충분해도 여러 drain cycle을 기다려야 했습니다. 이를 `min(stock, queueSize)` 기준의 window 방식으로 바꿔 복구된 좌석 수만큼 대기자를 한 번에 결제 단계로 열었습니다.',
        scenario: {
          scenario: 'queue-window',
          title: '대기열 처리 방식 비교',
          before: '기존: 복구마다 1명만 결제 진입',
          change: '변경: 복구 재고만큼 window 개방',
          result: '결과: 3,152 ms → 2,017 ms',
          diagram: {
            delta: '약 36% 단축',
            lanes: [
              {
                variant: 'one-by-one',
                title: '기존 one-by-one',
                selected: '1명 통과',
                gate: '결제 진입',
                metric: '3,152 ms',
                people: 6,
              },
              {
                variant: 'window',
                title: '개선 window',
                selected: '묶음 통과',
                gate: '복구 재고만큼 진입',
                metric: '2,017 ms',
                people: 6,
              },
            ],
          },
        },
      },
      {
        eyebrow: '정합성 처리',
        title: '외부 호출 성공과 내부 저장 실패 사이의 정합성 위험을 보상 흐름으로 줄였습니다.',
        body:
          '결제 과정에서는 user-service의 쿠키 차감이 먼저 성공하고, 이후 ticket-service의 DB 저장이 실패하는 상황이 생길 수 있었습니다. 이 구간을 단순 예외 처리로 남기면 사용자는 쿠키를 잃었지만 티켓은 없는 상태가 됩니다. 그래서 트랜잭션 종료 시점에 보상 콜백을 등록해 내부 저장 실패 시 쿠키 환불 요청이 이어지도록 구성했습니다.',
        scenario: {
          scenario: 'compensation-flow',
          title: '결제 보상 트랜잭션',
          before: '기존: 쿠키 차감 후 저장 실패 위험',
          change: '변경: 실패 시 보상 콜백 등록',
          result: '결과: 쿠키 환불로 정합성 회복',
          diagram: {
            main: [
              { eyebrow: 'T0', title: '결제 요청' },
              { eyebrow: 'T1', title: '쿠키 차감', detail: '외부 호출 성공' },
              { eyebrow: 'T2', title: '티켓 저장 시도', className: 'comp-node-pivot' },
            ],
            success: { eyebrow: '정상', title: '예매 확정', detail: '티켓 저장 성공' },
            failure: [
              { eyebrow: '실패', title: '저장 실패', className: 'comp-node-failed' },
              { eyebrow: 'EVENT', title: '보상 이벤트 생성', className: 'comp-node-event' },
              { eyebrow: '보상', title: '쿠키 환불', className: 'comp-node-refund' },
            ],
          },
        },
      },
      {
        eyebrow: '권한 제어',
        title: 'HLS 요청과 WebSocket 연결을 같은 sessionToken 기준으로 묶었습니다.',
        body:
          '스트리밍 권한은 HLS 요청과 STOMP 연결이 따로 검증되면 같은 사용자 세션인지 확인하기 어려워질 수 있습니다. 단일 sessionToken을 HLS query와 STOMP header에 함께 사용하고, 상영 종료 시 ForceExit 이벤트와 Redis 세션 정리를 함께 처리했습니다.',
        scenario: {
          scenario: 'session-token',
          title: '스트리밍 세션 제어',
          before: '기존: HLS와 STOMP 검증 기준 분리',
          change: '변경: sessionToken 단일 기준',
          result: '결과: 종료 시 Redis session 정리',
          diagram: {
            start: { eyebrow: '발급', title: 'sessionToken', detail: '관람 시작 기준' },
            tokenLabel: 'same token',
            checks: [
              { eyebrow: 'HLS', title: 'manifest 요청', detail: 'query token 검증' },
              { eyebrow: 'STOMP', title: 'CONNECT', detail: 'header token 검증' },
            ],
            redis: { eyebrow: 'Redis', title: 'session 유지' },
            close: { eyebrow: 'ForceExit', title: 'session 정리' },
          },
        },
      },
    ],
  },
  {
    id: 'dongne-market',
    name: '동네마켓',
    summary:
      '고객, 마트, 라이더, 관리자를 연결하는 지역 상권 기반 배달 플랫폼 백엔드 프로젝트입니다.',
    period: '2026.01.18 ~ 2026.02.25',
    repo: 'https://github.com/lion-final-project/final-back',
    demo: 'https://www.youtube.com/watch?v=hY1qML2QABM',
    lead: 'PO · 팀장 · 라이더 위치 관리 / 배차 흐름 담당',
    personaTags: ['배달 플랫폼', 'Redis GEO', '분산 락', 'SSE 알림'],
    overview: [
      '동네마켓은 고객이 주변 마트 상품을 주문하고, 마트가 주문을 접수하며, 라이더가 배달을 수행하고, 관리자가 전체 운영 상태를 확인하는 4개 역할 기반 플랫폼입니다. 하나의 주문이 결제, 재고, 배차, 배송, 정산으로 이어지기 때문에 역할별 화면보다 상태 흐름을 먼저 맞추는 일이 중요했습니다.',
      '백엔드는 Java 21과 Spring Boot 기반의 모놀리식 구조로 만들었고, 역할별 권한과 도메인 패키지를 나눠 유지했습니다. 위치처럼 자주 바뀌는 데이터는 Redis로, 주문과 정산처럼 기록이 필요한 데이터는 PostgreSQL/PostGIS로 나눠 다뤘습니다.',
      '제가 집중한 영역은 라이더 위치 관리와 배차 안정성이었습니다. 가까운 라이더를 찾는 것만으로 끝나는 문제가 아니라, 여러 라이더가 같은 배달 요청을 동시에 수락할 때 중복 배정이 생기지 않도록 제어해야 했습니다.',
    ],
    role: [
      'PO와 팀장 역할로 요구사항을 정리하고 일정과 데일리 스크럼을 조율했습니다. 구현 전에는 프로토타입 UI로 주문과 배달 흐름을 함께 확인해 팀원마다 다르게 이해하던 부분을 줄였습니다.',
      '백엔드에서는 라이더 위치를 Redis GEO에 저장하고, 마트 주변 라이더를 조회해 배달 요청을 보내는 흐름을 담당했습니다. 배달 수락 구간에는 Redis SETNX 기반 lock을 적용해 같은 주문이 두 명 이상의 라이더에게 배정되지 않도록 제어했습니다.',
    ],
    sections: [
      {
        eyebrow: '흐름 설계',
        title: '4개 역할이 같은 주문을 각자의 상태로 바라보는 구조를 만들었습니다.',
        body:
          '고객에게는 주문과 결제가 중요하지만, 마트에는 접수와 조리 상태가 중요하고, 라이더에게는 배차와 위치 공유가 중요합니다. 관리자는 전체 주문 상태와 정산 결과를 봐야 합니다. 그래서 역할별 API와 권한을 나누면서도, 주문 상태 전이는 하나의 흐름으로 맞춰야 했습니다.',
        scenario: {
          scenario: 'order-roles',
          title: '주문 역할 흐름',
          before: '기존: 역할별 주문 기준 혼재',
          change: '변경: 권한별 주문 처리 분리',
          result: '결과: 생성부터 정산까지 상태 연결',
          diagram: {
            states: [
              { eyebrow: 'CUSTOMER', title: '주문 생성' },
              { eyebrow: 'STORE', title: '접수 / 조리' },
              { eyebrow: 'RIDER', title: '배차 / 배송' },
              { eyebrow: 'ADMIN', title: '정산 확인' },
            ],
          },
        },
      },
      {
        eyebrow: '개선 포인트',
        title: '라이더 위치 조회는 DB 중심에서 Redis GEO 중심의 상태 데이터 처리로 바꿨습니다.',
        body:
          '라이더 위치는 계속 바뀌고 빠르게 조회되어야 하는 데이터입니다. 이를 매번 DB에 저장하고 조회하면 위치 업데이트 빈도가 높아질수록 DB 연결과 조회 비용이 커질 수 있었습니다. 그래서 위치는 Redis GEO에 올리고, 주문과 배달 이력처럼 남겨야 하는 데이터는 DB에 저장하는 식으로 성격을 나눴습니다.',
        scenario: {
          scenario: 'geo-dispatch',
          title: '라이더 위치 검색',
          before: '기존: 위치 갱신과 주문 DB 처리 혼재',
          change: '변경: 라이더 위치를 Redis GEO로 분리',
          result: '결과: 주변 검색과 배차 책임 명확화',
          diagram: {
            store: '마트',
            badge: 'Redis GEO 후보군',
            riders: [
              { label: 'R1', slot: 'a' },
              { label: 'R2', slot: 'b' },
              { label: 'R3', slot: 'c', status: 'excluded' },
            ],
            label: {
              eyebrow: 'Redis GEO',
              title: '반경 안의 라이더만 후보로 전달',
              detail: 'R3는 반경 밖 후보에서 제외',
            },
          },
        },
      },
      {
        eyebrow: '정합성 처리',
        title: '동시에 들어온 배달 수락 요청은 Redis lock으로 한 명만 통과시켰습니다.',
        body:
          '여러 라이더가 같은 배달 요청을 동시에 수락하면 동일 주문이 중복 배정될 위험이 있었습니다. 배달 수락 구간에 Redis SETNX 기반 분산 락을 적용하고, 트랜잭션 완료 후 락을 해제해 하나의 주문이 한 명의 라이더에게만 배정되도록 제어했습니다.',
        scenario: {
          scenario: 'dispatch-lock',
          title: '중복 배차 방지',
          before: '기존: 동시 수락 시 중복 배정 위험',
          change: '변경: Redis lock 선점 요청만 통과',
          result: '결과: 주문당 라이더 1명만 확정',
          diagram: {
            requests: [
              { rider: 'R1', label: '먼저 도착', state: 'pass' },
              { rider: 'R2', label: '뒤늦게 도착', state: 'reject' },
              { rider: 'R3', label: '뒤늦게 도착', state: 'reject' },
            ],
            lock: 'Redis SETNX lock',
            result: {
              title: 'R1 배정 확정',
              detail: 'R2/R3 거절',
            },
          },
        },
      },
    ],
  },
];
