import { motion } from 'framer-motion';

export default function About({ profile }) {
  return (
    <section id="about" className="relative z-10 py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16">
          <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-[var(--accent)] opacity-60" />
            Profile
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">소개</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-lg leading-relaxed text-[var(--text)] mb-10">
            {profile.introduction}
          </p>
          <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-8">
            <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
              <span className="font-mono text-xs text-[var(--text-faint)] uppercase tracking-widest">학력</span>
              <span className="text-sm text-[var(--text)] font-medium">{profile.education}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
              <span className="font-mono text-xs text-[var(--text-faint)] uppercase tracking-widest">부트캠프</span>
              <span className="text-sm text-[var(--text)] font-medium">{profile.bootcamp}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
              <span className="font-mono text-xs text-[var(--text-faint)] uppercase tracking-widest">활동</span>
              <span className="text-sm text-[var(--text)] font-medium">{profile.extracurricular}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
