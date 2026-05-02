import { useEffect } from 'react';
import mermaid from 'mermaid';
import { motion } from 'framer-motion';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
});

export default function ProjectDetail({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    
    // Mermaid initialization if architecture diagram exists
    if (project.architectureDiagram) {
      mermaid.contentLoaded();
    }
    
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[var(--bg-elev)] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-[var(--border)] p-8 pt-10 text-[var(--text)] relative shadow-2xl shadow-[var(--accent-ring)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-4 right-6 text-[var(--text-faint)] hover:text-[var(--text)] font-mono bg-[var(--surface)] px-3 py-1 rounded border border-[var(--border)] transition-colors" onClick={onClose}>
          ✕ ESC
        </button>

        <h2 className="text-3xl font-bold mb-6 font-sans flex flex-wrap items-center gap-4">
          {project.name}
          {project.lead && <span className="px-2 py-1 bg-[var(--surface-strong)] text-[var(--accent)] text-xs rounded border border-[var(--border-strong)] font-mono">{project.lead}</span>}
          <span className="text-[var(--accent-2)] text-sm font-mono ml-auto mr-8">[LOGGED_IN]</span>
        </h2>

        <p className="text-[var(--text-muted)] mb-6 font-sans">
          {project.period && !project.period.includes('[')
            ? `${project.period} · ${project.summary}`
            : project.summary}
        </p>

        <div className="mb-6">
          <h4 className="font-bold text-[var(--accent)] font-mono mb-2">{"> cat role.txt"}</h4>
          <p className="text-[var(--text-muted)] pl-4 border-l-2 border-[var(--border)]">{project.role}</p>
        </div>

        <div className="mb-6">
          <h4 className="font-bold text-[var(--accent)] font-mono mb-2">{"> ls -l features/"}</h4>
          <ul className="pl-4 space-y-1 text-[var(--text-muted)] border-l-2 border-[var(--border)]">
            {project.highlights.map((h) => (
              <li key={h} className="relative before:content-['-'] before:absolute before:-left-3 before:text-[var(--text-faint)] pl-2">{h}</li>
            ))}
          </ul>
        </div>

        {project.architectureDiagram && (
          <div className="mb-8 p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)]">
            <h3 className="text-[var(--accent)] font-mono text-lg mb-4">{"> cat architecture.md"}</h3>
            <div className="mermaid flex justify-center bg-[var(--surface-strong)] p-4 rounded text-[var(--text)]">
              {project.architectureDiagram}
            </div>
          </div>
        )}

        {project.troubleshooting && (
          <div className="mb-8 border-l-4 border-[var(--accent)] pl-4 bg-[var(--surface)] p-4 rounded-r-lg">
            <h3 className="text-xl font-bold mb-4 font-mono text-[var(--text)]">Troubleshooting</h3>
            <div className="space-y-4 text-sm text-[var(--text-muted)]">
              <p><strong className="text-red-500 font-mono block mb-1">ERROR:</strong> {project.troubleshooting.problem}</p>
              <p><strong className="text-blue-500 font-mono block mb-1">DEBUG:</strong> {project.troubleshooting.solution}</p>
              <p><strong className="text-[var(--accent-2)] font-mono block mb-1">SUCCESS:</strong> {project.troubleshooting.result}</p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h4 className="font-bold text-[var(--accent)] font-mono mb-2">{"> env | grep STACK"}</h4>
          <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-[var(--border)]">
            {project.stack.map((t) => (
              <span key={t} className="px-2 py-1 bg-[var(--surface)] text-[var(--text-muted)] font-mono text-xs rounded border border-[var(--border)]">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-[var(--border)] mt-8">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[var(--surface)] text-[var(--text)] font-mono text-sm hover:bg-[var(--surface-2)] transition-colors border border-[var(--border-strong)] rounded"
          >
            ./github.sh
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-fg)' }}
              className="px-4 py-2 bg-[var(--accent)] font-mono font-bold text-sm hover:opacity-80 transition-opacity rounded"
            >
              ./demo.sh
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
