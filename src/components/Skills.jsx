import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const bootUpVariants = {
  hidden: { opacity: 0, rotateX: -45, y: 60, scale: 0.9 },
  visible: {
    opacity: 1, rotateX: 0, y: 0, scale: 1,
    transition: { duration: 0.8, type: 'spring', bounce: 0.3 }
  },
};

export default function Skills({ groups }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="skills" ref={containerRef} className="relative z-10 py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-24">
          <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-[var(--accent)] opacity-60"></span>
            Skills
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">기술 스택</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: 1200 }}>
          {groups.map((g, i) => {
            const yTransform = useTransform(scrollYProgress, [0, 1], [i * 30, -(i * 20)]);
            
            return (
              <motion.div 
                key={g.label} 
                style={{ y: yTransform }}
                className={i % 2 !== 0 ? "md:mt-8 lg:mt-0" : ""}
              >
                <motion.div 
                  variants={bootUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1 }}
                  style={{ transformOrigin: "bottom center" }}
                  className="h-full bg-[var(--bg-elev)] border border-[var(--border)] rounded-xl p-8 shadow-[var(--shadow-lg)]"
                >
                  <h3 className="text-[var(--accent)] font-mono text-lg mb-6">> {g.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span key={item} className="px-3 py-1.5 bg-[var(--surface)] text-[var(--text-muted)] font-mono text-xs rounded border border-[var(--border)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
