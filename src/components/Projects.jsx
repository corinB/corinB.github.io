import { useState, useRef } from 'react';
import ProjectCard from './ProjectCard.jsx';
import ProjectDetail from './ProjectDetail.jsx';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Projects({ projects }) {
  const [active, setActive] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="projects" className="py-32 relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-24">
          <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-[var(--accent)] opacity-60"></span>
            Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">프로젝트</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {projects.map((p, i) => {
            const isRight = i % 2 !== 0;
            const yTransform = isRight ? yRight : yLeft;
            
            return (
              <motion.div
                key={p.id}
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
                    delay: 0.1 
                  }}
                  style={{ transformOrigin: "bottom center" }}
                  className="h-full"
                >
                  <ProjectCard project={p} index={i} onOpen={setActive} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <ProjectDetail project={active} onClose={() => setActive(null)} />
    </section>
  );
}

