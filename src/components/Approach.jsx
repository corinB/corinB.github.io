// 강점(strengths) 카드를 독립 섹션으로 렌더링하는 Approach 컴포넌트
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users } from 'lucide-react';

const iconMap = { ShieldCheck, Target, Users };

export default function Approach({ profile }) {
  if (!profile.strengths?.length) return null;

  return (
    <section id="approach" className="relative z-10 py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-14">
          <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-[var(--accent)] opacity-60" />
            Approach
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">일하는 방식</h2>
        </div>

        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          {profile.strengths.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <div
                key={s.title}
                className="border border-[var(--border)] rounded-lg p-6"
              >
                <div className="flex items-center gap-2 mb-0.5">
                  {Icon ? <Icon className="w-5 h-5 text-[var(--accent)]" strokeWidth={2} /> : null}
                  <p className="font-mono text-sm text-[var(--accent)] font-bold">{s.title}</p>
                </div>
                <p className="text-2xl font-semibold text-[var(--text)] mb-2">{s.subtitle}</p>
                <p
                  className="text-xl leading-relaxed text-[var(--text-muted)] [&_strong]:text-[var(--accent)] [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
