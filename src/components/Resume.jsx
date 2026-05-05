import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const bootUpVariants = {
  hidden: { opacity: 0, rotateX: -45, y: 60, scale: 0.9 },
  visible: {
    opacity: 1, rotateX: 0, y: 0, scale: 1,
    transition: { duration: 0.8, type: 'spring', bounce: 0.3 }
  },
};

export default function Resume() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section id="resume" ref={containerRef} className="relative z-10 py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16">
          <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-[var(--accent)] opacity-60"></span>
            Resume
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">이력서</h2>
        </div>

        <div className="flex justify-center" style={{ perspective: 1200 }}>
          <motion.div style={{ y: yParallax }} className="w-full max-w-2xl">
            <motion.div 
              variants={bootUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              style={{ transformOrigin: "bottom center" }}
              className="bg-[var(--bg-elev)] border border-[var(--border)] rounded-xl p-10 shadow-[var(--shadow-lg)] flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-[var(--text)] mb-2 font-sans">이력서 PDF</h3>
                <p className="text-[var(--text-muted)] font-mono text-sm">> 최신 이력서를 다운로드 받으실 수 있습니다.</p>
              </div>
              <a href="/resume.pdf" download className="flex items-center gap-2 px-6 py-3 btn-accent font-bold font-mono rounded hover:opacity-80 transition-opacity whitespace-nowrap">
                다운로드
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
