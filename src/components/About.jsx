// About 섹션 — 소개·메타 정보를 단일 칼럼으로 렌더링하는 컴포넌트
import { motion } from 'framer-motion';

export default function About({ profile }) {
  return (
    <section id="about" className="relative z-10 py-20">
      <div className="absolute top-1/2 -translate-y-1/2 right-[-12%] w-[500px] h-[500px] rounded-full bg-[var(--accent-ring)] blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-3xl relative">
        <div className="mb-14">
          <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-[var(--accent)] opacity-60" />
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">소개</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl md:text-2xl leading-relaxed text-[var(--text)] mb-6 font-semibold tracking-tight">
            {profile.introduction}
          </p>
          {profile.introductionDetail ? (
            <p className="text-lg leading-loose text-[var(--text-muted)]">
              {profile.introductionDetail}
            </p>
          ) : null}

          <div className="mt-12 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
            <div>
              <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold mb-1.5">학력</p>
              <p className="text-base text-[var(--text)] leading-relaxed">{profile.education}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold mb-1.5">부트캠프</p>
              <div className="flex flex-col gap-1.5">
                {profile.bootcamps.map((b) => (
                  <div key={b.name} className="flex items-baseline justify-between gap-3">
                    <span className="text-base text-[var(--text)] leading-relaxed">{b.name}</span>
                    {b.period ? (
                      <span className="font-mono text-xs text-[var(--text-muted)] whitespace-nowrap">{b.period}</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold mb-1.5">활동</p>
              <div className="flex flex-col gap-1.5">
                {profile.extracurriculars.map((e) => (
                  <div key={e.name} className="flex items-baseline justify-between gap-3">
                    <span className="text-base text-[var(--text)] leading-relaxed">{e.name}</span>
                    {e.period ? (
                      <span className="font-mono text-xs text-[var(--text-muted)] whitespace-nowrap">{e.period}</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            {profile.teamLead ? (
              <div>
                <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold mb-1.5">Team Lead</p>
                <p className="text-base text-[var(--text)] leading-relaxed">{profile.teamLead}</p>
              </div>
            ) : null}
            {profile.awards?.length ? (
              <div>
                <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold mb-1.5">주요 수상</p>
                <div className="flex flex-col gap-3">
                  {profile.awards.map((award) => (
                    <div key={award} className="flex gap-3 items-start text-base text-[var(--text)] leading-relaxed">
                      <span className="text-[var(--accent)] shrink-0 font-mono text-sm mt-0.5">▸</span>
                      <span className="flex-1">{award}</span>
                    </div>
                  ))}
                  {profile.awardsArchive ? (
                    <a
                      href={profile.awardsArchive}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[var(--accent)] hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      → 전체 증빙 보기 (Academic Evidence Portfolio)
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
