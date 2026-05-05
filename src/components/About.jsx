import { motion } from 'framer-motion';

export default function About({ profile }) {
  return (
    <section id="about" className="relative z-10 py-32">
      <div className="absolute top-1/2 -translate-y-1/2 right-[-12%] w-[500px] h-[500px] rounded-full bg-[var(--accent-ring)] blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-6xl relative">
        <div className="max-w-3xl">
          <div className="mb-14">
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
          >
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--text)] mb-6 font-semibold tracking-tight">
              {profile.introduction}
            </p>
            {profile.introductionDetail ? (
              <p className="text-base leading-loose text-[var(--text-muted)] mb-14">
                {profile.introductionDetail}
              </p>
            ) : null}
          <div className="flex flex-col gap-7 border-t border-[var(--border)] pt-10">
            <div className="grid grid-cols-[112px_1fr] gap-6 items-baseline">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold">학력</span>
              <span className="text-base text-[var(--text)] leading-relaxed">{profile.education}</span>
            </div>
            <div className="grid grid-cols-[112px_1fr] gap-6 items-baseline">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold">부트캠프</span>
              <span className="text-base text-[var(--text)] leading-relaxed">{profile.bootcamp}</span>
            </div>
            <div className="grid grid-cols-[112px_1fr] gap-6 items-baseline">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold">활동</span>
              <span className="text-base text-[var(--text)] leading-relaxed">{profile.extracurricular}</span>
            </div>
            {profile.teamLead ? (
              <div className="grid grid-cols-[112px_1fr] gap-6 items-baseline">
                <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold">팀 리딩</span>
                <span className="text-base text-[var(--text)] leading-relaxed">{profile.teamLead}</span>
              </div>
            ) : null}
            {profile.awards?.length ? (
              <div className="grid grid-cols-[112px_1fr] gap-6 items-start">
                <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold pt-0.5">주요 수상</span>
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
      </div>
    </section>
  );
}
