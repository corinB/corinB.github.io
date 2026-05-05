import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function Hero({ profile }) {
  const githubUrl = profile.github && !profile.github.includes('[')
    ? `https://github.com/${profile.github}`
    : '#';

  return (
    <section id="top" className="relative pt-40 pb-32 overflow-hidden min-h-screen flex items-center">
      <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[var(--accent-ring)] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* 구직 중 배지 */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full font-mono text-xs text-[var(--accent)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent-ring)]" />
              {profile.title} · 구직 중
            </span>
          </motion.div>

          {/* 이름 */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-8xl font-extrabold tracking-tight text-[var(--text)] leading-tight"
          >
            {profile.name}
          </motion.h1>

          {/* 직군 + 페르소나 부제 */}
          <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
            <p className="text-xl md:text-2xl font-semibold text-[var(--text-muted)]">
              {profile.title}
            </p>
            <p className="font-mono text-sm text-[var(--accent)] tracking-widest uppercase">
              {profile.taglineShort}
            </p>
          </motion.div>

          {/* 스택 칩 */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            {profile.heroStack.map((group) => (
              <div key={group.category} className="flex items-start gap-3">
                <span className="font-mono text-[10px] text-[var(--text-faint)] tracking-widest uppercase pt-1.5 w-[76px] shrink-0 text-right">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 btn-accent font-bold rounded hover:opacity-80 transition-all hover:-translate-y-0.5"
            >
              이력서 PDF
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded hover:bg-[var(--surface-2)] transition-all hover:-translate-y-0.5"
            >
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
