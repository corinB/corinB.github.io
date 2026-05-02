import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const bootUpVariants = {
  hidden: { opacity: 0, rotateX: -45, y: 60, scale: 0.9 },
  visible: {
    opacity: 1, rotateX: 0, y: 0, scale: 1,
    transition: { duration: 0.8, type: 'spring', bounce: 0.3 }
  },
};

export default function About({ profile }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="about" ref={containerRef} className="relative z-10 py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-24">
          <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-[var(--accent)] opacity-60"></span>
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">소개</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start" style={{ perspective: 1200 }}>
          <motion.div 
            className="md:col-span-7 h-full"
            style={{ y: yLeft }}
          >
            <motion.div 
              variants={bootUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              style={{ transformOrigin: "bottom center" }}
              className="bg-[var(--bg-elev)] border border-[var(--border)] rounded-xl p-8 shadow-[var(--shadow-lg)]"
            >
              {profile.introduction.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-[var(--text-muted)] text-lg leading-relaxed mb-6 font-sans">{paragraph}</p>
              ))}
              <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-[var(--border)] font-mono">
                <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                  <span className="text-[var(--accent)] text-sm">> EDU</span>
                  <span className="text-[var(--text)] text-sm">{profile.education}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                  <span className="text-[var(--accent)] text-sm">> BOOTCAMP</span>
                  <span className="text-[var(--text)] text-sm">{profile.bootcamp}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                  <span className="text-[var(--accent)] text-sm">> ACTIVITY</span>
                  <span className="text-[var(--text)] text-sm">{profile.extracurricular}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="md:col-span-5 h-full md:mt-8"
            style={{ y: yRight }}
          >
            <motion.div 
              variants={bootUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              style={{ transformOrigin: "bottom center" }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 shadow-[var(--shadow-lg)]"
            >
              <h3 className="text-[var(--accent)] font-mono text-lg mb-6">> cat strengths.txt</h3>
              <ul className="flex flex-wrap gap-3">
                {profile.strengths.map((s) => (
                  <li key={s} className="px-3 py-1.5 bg-[var(--surface-strong)] text-[var(--text-muted)] border border-[var(--border-strong)] rounded font-mono text-sm hover:border-[var(--accent)] hover:text-[var(--text)] transition-colors cursor-default">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
