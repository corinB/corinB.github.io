import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import AboutCard from './AboutCard.jsx';
import AboutDetail from './AboutDetail.jsx';

export default function About({ profile }) {
  const containerRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Unified items for the 2x2 grid
  const aboutItems = [
    {
      id: 'whoami',
      title: '자기소개 및 가치관',
      content: profile.introduction.split('\n\n')[0],
      detail: profile.introduction,
      highlights: [
        '투명한 문서화와 소통 중시',
        'AI 도구를 활용한 생산성 극대화',
        '신뢰하되 검증하는(Trust, but Verify) 원칙',
        '시스템 안정성과 성능의 균형 추구'
      ]
    },
    {
      id: 'education',
      title: '학력 및 전공 정보',
      content: profile.education,
      detail: `${profile.education}에서 전공 기초와 심화 과정을 이수했습니다.`,
      highlights: [
        '컴퓨터공학 및 전자정보융합전공',
        '시스템 아키텍처 및 자료구조 등 핵심 과목 이수',
        '학내 개발 및 창업 동아리 리더 활동'
      ]
    },
    {
      id: 'bootcamp',
      title: '전문 교육 수료 내역',
      content: profile.bootcamp,
      detail: '실무 역량 강화를 위해 고강도 백엔드 교육 과정을 수료했습니다.',
      highlights: [
        '멋쟁이사자처럼 자바 백엔드 19기 수료',
        '프로그래머스 백엔드 데브코스 단기심화 5기 수료',
        '실무 위주의 프로젝트 중심 학습'
      ]
    },
    {
      id: 'activity',
      title: '주요 활동 및 경험',
      content: profile.extracurricular,
      detail: '커뮤니티 리딩과 대외 활동을 통해 협업 능력을 길렀습니다.',
      highlights: [
        '대구대학교 개발·창업 동아리 회장 역임',
        '다수의 팀 프로젝트 리딩 및 문서화 주도',
        'IT 기술 트렌드 공유 및 세미나 기획'
      ]
    }
  ];

  return (
    <section id="about" ref={containerRef} className="relative z-10 py-32 overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-24">
          <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-[var(--accent)] opacity-60"></span>
            Profile Modules
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">소개</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {aboutItems.map((item, index) => {
            const isRight = index % 2 !== 0;
            const yTransform = isRight ? yRight : yLeft;

            return (
              <motion.div
                key={item.id}
                style={{ y: yTransform, perspective: 1200 }}
                className={isRight ? "md:mt-12" : ""}
              >
                <motion.div
                  initial={{ opacity: 0, rotateX: -45, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    type: "spring", 
                    bounce: 0.3,
                    delay: index * 0.1 
                  }}
                  style={{ transformOrigin: "bottom center" }}
                  className="h-full"
                >
                  <AboutCard 
                    item={item} 
                    index={index} 
                    onOpen={setActiveItem} 
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <AboutDetail 
            item={activeItem} 
            onClose={() => setActiveItem(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
