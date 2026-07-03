export const profile = {
  name: '백종현',
  nameEn: 'Baek Jong-hyun',
  title: 'Java · Spring 백엔드 신입',
  tagline:
    '사용자의 관점에서 고민하고, 안정적인 서비스로 답하는 개발자.',
  taglineShort: '문제 해결 · 설계 · 가치 창출 · 검증',
  heroBadges: ['Team Lead · PO 경험 다수'],
  featuredTech: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'PostgreSQL'],
  heroStack: [
    {
      category: 'Backend',
      items: ['Java', 'Spring Boot', 'Kafka', 'Redis'],
    },
    {
      category: 'Data',
      items: ['PostgreSQL', 'PostGIS', 'Elasticsearch', 'QueryDSL'],
    },
    {
      category: 'Infra',
      items: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions'],
    },
    {
      category: 'Domain',
      items: ['Ticketing', 'Delivery', 'Streaming', 'Settlement'],
    },
  ],
  introduction:
    '사용자의 불편에서 출발해 원인을 끝까지 파고들고, 안정적인 서비스 흐름으로 답하는 개발자입니다.',
  introductionDetail:
    '예매 시스템 개발 중 부하 테스트를 통해 대기열 후순위 사용자의 결제 진입이 지연되는 병목을 발견했습니다. 기존 구조는 재고가 여러 장 복구되어도 선두 사용자 한 명만 결제 단계로 이동하는 방식이었고, 이를 재고 수와 대기열 길이에 따라 결제 가능 인원을 동적으로 조정하는 구조로 개선했습니다.',
  email: 'gkdisrha2020@gmail.com',
  github: 'corinB',
  links: [
    { label: 'GitHub', url: 'https://github.com/corinB' },
    { label: '블로그', url: '' },
  ],
  education: '대구대학교 컴퓨터공학 · 전자정보융합전공',
  bootcamps: [
    { name: '멋쟁이사자처럼 자바 백엔드 19기', period: '2025.08 ~ 2026.02' },
    { name: '프로그래머스 백엔드 데브코스 단기심화 5기', period: '2026.03 ~ 2026.05' },
  ],
  extracurriculars: [
    { name: '대구대학교 개발·창업 동아리 회장', period: '2025.03 ~ 2025.12' },
    { name: '대구대학교 개발·창업 동아리 부회장', period: '2022.09 ~ 2023.12' },
  ],
  teamLead: '다수 팀 리딩 경험 (PO·팀장)',
  awards: [
    '대구대 IT/공학계열 작품 경진대회 — 최우수상 (2025)',
    '영남대 글로벌 캡스톤 디자인 — 혁신상 (2024)',
    '서울 공공데이터 활용 경진대회 — 최우수상 (2023)',
    '호서대 소셜벤처 해커톤 — 우수상 (2023)',
  ],
  awardsArchive: 'https://github.com/corinB/Academic-Evidence-Portfolio',
  strengths: [
    {
      title: '[문제 해결]',
      subtitle: '사용자의 불편에서 출발해 원인을 끝까지 파고드는 개발자',
      icon: 'ShieldCheck',
      body: '예매 서비스 개발 당시 부하 테스트에서 대기열 후순위 사용자의 결제 진입이 지연되는 문제를 발견했습니다. 이를 단순한 성능 저하로 넘기지 않고 결제 처리 흐름의 구조적 병목으로 분석했고, 재고 수와 대기열 길이에 따라 결제 가능 인원을 동적으로 조정해 <strong>대기열 소진 시간을 3.2초에서 2.0초로 약 36% 단축</strong>했습니다.',
    },
    {
      title: '[설계 역량]',
      subtitle: '최악의 사용자 경험을 막기 위해 먼저 구조를 고민하는 개발자',
      icon: 'Target',
      body: '예매 시스템에서는 사용자가 결제까지 완료했음에도 티켓이 발급되지 않는 상황을 가장 심각한 이탈 요인으로 보았습니다. 명세 단계에서 <strong>결제 성공 시 티켓 발급, 결제 실패 시 예매 실패 처리</strong> 흐름을 먼저 정의해 팀원들이 정합성 예외를 같은 기준으로 개발할 수 있도록 했습니다.',
    },
    {
      title: '[가치 창출]',
      subtitle: '제한된 조건 안에서 제품의 핵심 가치를 지키는 개발자',
      icon: 'Users',
      body: 'CineStream에서 일정 압박과 CDN 적용 부담으로 스트리밍 기능을 제외하자는 의견이 있었지만, 스트리밍은 사용자가 서비스 가치를 직접 경험하는 핵심 기능이라고 판단했습니다. 서비스 대상을 국내 사용자로 한정하고 <strong>CDN 없이 HLS 기반 스트리밍</strong>을 적용해 개발 리스크를 줄이면서도 핵심 경험을 지켜냈습니다.',
    },
  ],
};
