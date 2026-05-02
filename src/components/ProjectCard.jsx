import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, index, onOpen }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex flex-col bg-[var(--bg-elev)] border border-[var(--border)] rounded-xl p-8 text-left transition-all duration-300 relative overflow-hidden h-full shadow-[var(--shadow-lg)] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(project)}
      style={{ cursor: 'pointer' }}
    >
      {/* Background glow effect on hover */}
      <div className={`absolute inset-0 bg-[var(--accent-soft)] transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      <div className="font-mono text-xs font-medium text-[var(--text-faint)] tracking-widest mb-4 flex items-center gap-2">
        <span>0{index + 1}</span>
        <span className="flex-1 h-px bg-[var(--border)]"></span>
      </div>

      <div className="flex items-center gap-3 flex-wrap mb-2">
        <h3 className="text-2xl font-bold text-[var(--text)] tracking-tight leading-tight">{project.name}</h3>
        {project.lead && (
          <span className="inline-flex items-center px-3 py-1 bg-[var(--surface-strong)] text-[var(--accent)] rounded-full text-xs font-semibold tracking-wide border border-[var(--border-strong)]">
            {project.lead}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto border-t border-[var(--border)] pt-4 pb-4">
        <div>
          <span className="block text-[var(--text-faint)] font-mono text-xs mb-1">Metrics</span>
          <p className="font-semibold text-sm line-clamp-2 text-[var(--text)]">
            {project.highlights?.[0] || '프로젝트 성과 요약'}
          </p>
        </div>
        <div>
          <span className="block text-[var(--text-faint)] font-mono text-xs mb-1">Challenge</span>
          <p className="text-sm text-[var(--text-muted)] line-clamp-2">
            {project.troubleshooting ? project.troubleshooting.problem : project.summary}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto mb-6">
        {project.stack?.slice(0, 4).map(t => (
          <span key={t} className="font-mono text-[11px] font-medium px-2 py-1 bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] rounded">
            {t}
          </span>
        ))}
        {project.stack?.length > 4 && (
          <span className="font-mono text-[11px] font-medium px-2 py-1 text-[var(--text-faint)]">
            +{project.stack.length - 4}
          </span>
        )}
      </div>

      <div className="flex gap-3 pt-4 mt-4 border-t border-[var(--border)] relative z-10">
        <button
          type="button"
          style={{ color: 'var(--accent-fg)' }}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] font-bold font-mono text-sm rounded hover:opacity-80 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(project);
          }}
        >
          자세히 보기
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-[var(--border-strong)] text-[var(--text-muted)] font-mono text-sm rounded hover:bg-[var(--surface-2)] hover:text-[var(--text)] transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          GitHub
        </a>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        className="absolute bottom-0 left-0 w-full bg-[var(--surface-strong)] p-2 border-t border-[var(--border-strong)] pointer-events-none"
      >
        <p className="text-[var(--accent)] font-mono text-xs">
          <span className="animate-pulse">_</span> systemctl status {project.name}.service ... Running
        </p>
      </motion.div>
    </div>
  );
}
