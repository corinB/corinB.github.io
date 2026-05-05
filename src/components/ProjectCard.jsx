import { useState } from 'react';

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export default function ProjectCard({ project, onOpen }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex flex-col h-full bg-[var(--bg-elev)] rounded-xl border transition-all duration-300 cursor-pointer ${
        isHovered
          ? 'border-[var(--accent)] shadow-[0_0_20px_var(--accent-ring)] -translate-y-1'
          : 'border-[var(--border)] shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(project)}
    >
      <div className="p-7 flex flex-col h-full gap-5">

        {/* 헤더: 프로젝트명 + GitHub 아이콘 */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1.5 min-w-0">
            <h3 className="text-2xl font-bold tracking-tight text-[var(--text)] leading-snug">
              {project.name}
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              {project.period && !project.period.includes('[')
                ? `${project.period} · ${project.lead}`
                : project.lead}
            </p>
          </div>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 p-2 -m-2 text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors"
            aria-label="GitHub 저장소"
          >
            <ExternalLinkIcon />
          </a>
        </div>

        {/* 요약 */}
        <p className="text-[14px] leading-relaxed text-[var(--text-muted)] line-clamp-2">
          {project.summary}
        </p>

        {/* 페르소나 칩 */}
        {project.personaTags?.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {project.personaTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest border border-[var(--border)] rounded text-[var(--accent)] bg-[var(--accent-soft)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 스택 칩 */}
        <div className="flex flex-wrap gap-2">
          {project.stack?.slice(0, 5).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 bg-[var(--surface)] border border-[var(--border)] rounded font-mono text-[11px] text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
          {project.stack?.length > 5 && (
            <span className="px-2.5 py-1 font-mono text-[11px] text-[var(--text-faint)]">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* 자세히 보기 hint — 우하단 */}
        <div className="mt-auto pt-3 border-t border-[var(--border)] flex justify-end">
          <span
            className={`text-sm flex items-center gap-1.5 transition-all duration-200 ${
              isHovered ? 'text-[var(--accent)]' : 'text-[var(--text-faint)]'
            }`}
          >
            자세히 보기
            <span className={`transition-transform duration-200 ${isHovered ? 'translate-x-0.5' : ''}`}>
              <ArrowIcon />
            </span>
          </span>
        </div>

      </div>
    </div>
  );
}
