import { useState } from 'react';
import { createPortal } from 'react-dom';
import ProjectCard from './ProjectCard.jsx';
import ProjectDetail from './ProjectDetail.jsx';
import { motion } from 'framer-motion';

export default function Projects({ projects }) {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="py-32 relative z-10">
      <div className="absolute bottom-[8%] right-[-12%] w-[800px] h-[800px] rounded-full bg-[var(--accent-ring)] blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-6xl relative">
        <div className="mb-14">
          <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-[var(--accent)] opacity-60"></span>
            Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">프로젝트</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={i % 2 !== 0 ? "md:mt-12" : ""}
            >
              <ProjectCard project={p} onOpen={setActive} />
            </motion.div>
          ))}
        </div>
      </div>
      {createPortal(
        <ProjectDetail project={active} onClose={() => setActive(null)} />,
        document.body
      )}
    </section>
  );
}
