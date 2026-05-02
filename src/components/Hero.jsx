import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const bootUpVariants = {
  hidden: { opacity: 0, rotateX: -45, y: 60, scale: 0.9 },
  visible: {
    opacity: 1, rotateX: 0, y: 0, scale: 1,
    transition: { duration: 1, type: 'spring', bounce: 0.4 }
  },
};

const HighlightText = ({ text }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.6 },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 10,
      color: "var(--accent)",
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      color: "var(--text)",
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div 
      className="text-xl md:text-2xl max-w-3xl leading-relaxed mb-12 font-sans"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          variants={child}
          key={i}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Hero({ profile }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const yActions = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const githubUrl = profile.github && !profile.github.includes('[')
    ? `https://github.com/${profile.github}`
    : '#';

  return (
    <section id="top" ref={containerRef} className="relative pt-40 pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[var(--accent-ring)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--accent-soft)] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10" style={{ perspective: 1200 }}>
        <motion.div 
          style={{ y: yText }}
          className="mb-8"
        >
          <motion.div
            variants={bootUpVariants}
            initial="hidden"
            animate="visible"
            style={{ transformOrigin: "bottom left" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full font-mono text-xs text-[var(--accent)] mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent-ring)]" />
              {profile.title} · 구직 중
            </span>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 text-[var(--text)] leading-tight">
              {profile.name}
            </h1>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yActions }}
        >
          <motion.div
            variants={bootUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            style={{ transformOrigin: "bottom left" }}
          >
            <HighlightText text={profile.tagline} />
            <div className="flex flex-wrap gap-4">
              <a href="#projects" style={{ color: 'var(--accent-fg)' }} className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] font-bold font-mono rounded hover:opacity-80 transition-opacity hover:-translate-y-1 hover:shadow-[0_0_15px_var(--accent-ring)]">
                프로젝트 보기
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a href={`mailto:${profile.email}`} className="px-6 py-3 bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] font-mono rounded hover:bg-[var(--surface-2)] transition-all hover:-translate-y-1">
                이메일 보내기
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] font-mono rounded hover:bg-[var(--surface-2)] transition-all hover:-translate-y-1"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
