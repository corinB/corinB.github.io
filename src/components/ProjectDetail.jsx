import { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import { motion, AnimatePresence } from 'framer-motion';

const MermaidDiagram = ({ chart }) => {
  const containerRef = useRef(null);
  const isDark = document.documentElement.dataset.theme === 'dark';

  useEffect(() => {
    if (containerRef.current && chart) {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'neutral',
        securityLevel: 'loose',
        fontFamily: 'monospace',
      });

      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      try {
        mermaid.render(id, chart).then((result) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = result.svg;
            const svg = containerRef.current.querySelector('svg');
            if (svg) {
              svg.style.maxWidth = '100%';
              svg.style.maxHeight = '100%';
              svg.style.width = '100%';
              svg.style.height = '100%';
              svg.removeAttribute('width');
              svg.removeAttribute('height');
            }
          }
        });
      } catch (e) {
        console.error('Mermaid render error:', e);
      }
    }
  }, [chart, isDark]);

  return <div ref={containerRef} className="w-full h-full flex items-center justify-center text-[var(--text)] overflow-hidden" />;
};

const SectionLabel = ({ children }) => (
  <p className="text-xs font-mono text-[var(--accent)] tracking-widest mb-2 uppercase">{children}</p>
);

const OverviewSlide = ({ project }) => (
  <div className="space-y-7">
    <div>
      <SectionLabel>Role</SectionLabel>
      <p className="text-[var(--text)] leading-relaxed pl-4 border-l-2 border-[var(--border)] py-3 pr-4 text-[14.5px]">
        {project.role}
      </p>
    </div>

    {project.highlights?.length > 0 && (
      <div>
        <SectionLabel>Highlights</SectionLabel>
        <ul className="pl-4 space-y-2 border-l-2 border-[var(--border)] py-1">
          {project.highlights.map((h, i) => (
            <li key={i} className="text-[var(--text)] text-[14.5px] leading-relaxed flex gap-2">
              <span className="text-[var(--accent)] shrink-0 mt-0.5">–</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {project.stack?.length > 0 && (
      <div>
        <SectionLabel>Stack</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span key={t} className="px-2.5 py-1 bg-[var(--surface-2)] text-[var(--text-muted)] font-mono text-xs rounded border border-[var(--border-strong)]">
              {t}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

const AiSlide = ({ project }) => (
  <div className="overflow-y-auto custom-scrollbar h-full pr-1 pb-2 flex flex-col gap-8">
    <p className="text-[var(--text)] leading-[1.85] text-[15px]">
      {project.aiWorkflow.detail}
    </p>

    {project.aiWorkflow.items?.length > 0 && (
      <div>
        <p className="text-[11px] font-mono text-[var(--accent)] tracking-widest uppercase mb-4">워크플로우</p>
        <div className="flex flex-col divide-y divide-[var(--border)]">
          {project.aiWorkflow.items.map((item) => (
            <div key={item.label} className="flex gap-5 items-baseline py-3 first:pt-0 last:pb-0">
              <span className="font-mono text-[11px] text-[var(--accent)] font-bold tracking-wider shrink-0 w-[88px]">
                {item.label}
              </span>
              <span className="text-[var(--text)] text-[14px] leading-relaxed">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const TroubleshootingSlide = ({ project }) => {
  const [active, setActive] = useState('problem');

  const getContent = () => {
    if (active === 'problem') return project.troubleshooting.problem;
    if (active === 'solution') return project.troubleshooting.solution;
    return project.troubleshooting.result;
  };

  const tabs = [
    { id: 'problem', label: '문제', activeClass: 'bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]' },
    { id: 'solution', label: '해결', activeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' },
    { id: 'result', label: '결과', activeClass: 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]' },
  ];

  const contentColor = active === 'problem' ? 'border-l-red-500/30' : active === 'solution' ? 'border-l-blue-500/30' : 'border-l-green-500/30';

  return (
    <div className="flex flex-col h-full pt-2">
      <div className="flex flex-wrap gap-3 mb-6 shrink-0 border-b border-[var(--border)] pb-5 font-mono">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 text-sm font-bold rounded border transition-all duration-300 ${
              active === tab.id
                ? tab.activeClass
                : 'text-[var(--text-faint)] border-transparent hover:text-[var(--text)] hover:bg-[var(--surface-strong)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`pl-4 border-l-2 py-2 ${contentColor}`}
          >
            <p className="text-[var(--text)] leading-loose text-[14.5px]">
              {getContent()}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function ProjectDetail({ project, onClose }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
      if (e.key === 'ArrowRight' && !isZoomed) handleNext();
      if (e.key === 'ArrowLeft' && !isZoomed) handlePrev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  });

  if (!project) return null;

  const slides = [{ id: 'overview', title: '프로젝트 개요' }];
  if (project.architectureDiagram) slides.push({ id: 'architecture', title: '시스템 아키텍처' });
  if (project.aiWorkflow) slides.push({ id: 'ai', title: 'AI 활용' });
  if (project.troubleshooting) slides.push({ id: 'troubleshooting', title: '트러블슈팅' });

  const currentSlide = slides[currentSlideIndex];

  const handleNext = () => setCurrentSlideIndex(p => Math.min(p + 1, slides.length - 1));
  const handlePrev = () => setCurrentSlideIndex(p => Math.max(p - 1, 0));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-elev)] w-full max-w-4xl h-[85vh] overflow-hidden flex flex-col rounded-xl border border-[var(--border)] relative shadow-2xl shadow-black/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mac traffic light header */}
        <div className="flex items-center px-4 py-3 bg-[var(--surface-2)] border-b border-[var(--border)] shrink-0 relative">
          <div className="flex gap-2 relative z-50">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full flex items-center justify-center group cursor-pointer shadow-inner hover:brightness-90 transition-all"
              style={{ backgroundColor: '#ff5f56' }}
            >
              <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 text-[#4d0000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: '#ffbd2e' }} />
            <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: '#27c93f' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[11px] text-[var(--text-faint)] font-mono tracking-widest">{currentSlide.title}</span>
          </div>
        </div>

        {/* 프로젝트 헤더 */}
        <div className="px-8 pt-5 pb-4 shrink-0 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold text-[var(--text)] mb-1">{project.name}</h2>
          <p className="text-xs text-[var(--text-muted)]">
            {project.period && !project.period.includes('[') ? `${project.period} · ` : ''}
            {project.lead} · {project.summary}
          </p>
        </div>

        {/* 슬라이드 콘텐츠 */}
        <div className="flex-1 relative overflow-hidden text-[var(--text)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 overflow-y-auto custom-scrollbar px-8 py-5"
            >
              {currentSlide.id === 'overview' && <OverviewSlide project={project} />}

              {currentSlide.id === 'architecture' && project.architectureDiagram && (
                <div
                  onClick={() => setIsZoomed(true)}
                  className="flex-1 w-full min-h-[400px] rounded border border-[var(--border)] flex items-center justify-center overflow-hidden p-4 cursor-zoom-in group/diag relative"
                >
                  <div className="absolute top-4 right-4 opacity-0 group-hover/diag:opacity-100 transition-opacity bg-[var(--surface-strong)] p-2 rounded border border-[var(--border)] text-[var(--text-faint)] flex items-center gap-2 text-xs z-10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    Click to expand
                  </div>
                  <MermaidDiagram chart={project.architectureDiagram} />
                </div>
              )}

              {currentSlide.id === 'ai' && project.aiWorkflow && <AiSlide project={project} />}

              {currentSlide.id === 'troubleshooting' && project.troubleshooting && (
                <TroubleshootingSlide project={project} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fullscreen Diagram Overlay */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-8 backdrop-blur-xl"
              onClick={() => setIsZoomed(false)}
            >
              <button
                className="absolute top-8 right-8 text-white/50 hover:text-white p-2 transition-colors z-[110]"
                onClick={() => setIsZoomed(false)}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <div className="w-full h-full flex items-center justify-center p-4 md:p-12" onClick={e => e.stopPropagation()}>
                <MermaidDiagram chart={project.architectureDiagram} />
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 font-mono text-sm tracking-widest">
                ESC to close
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer: 액션 + 슬라이드 네비 */}
        <div className="flex items-center justify-between pt-4 px-8 pb-5 border-t border-[var(--border)] bg-[var(--surface-2)] shrink-0 mt-auto relative z-10">
          <div className="flex gap-3">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] text-sm hover:bg-[var(--surface-strong)] transition-colors border border-[var(--border)] rounded flex items-center gap-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-ring)] font-semibold text-sm hover:brightness-110 transition-all rounded flex items-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                데모 영상
              </a>
            )}
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="p-2 hover:bg-[var(--surface-strong)] rounded-full text-[var(--text-faint)] hover:text-[var(--text)] disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <div className="flex gap-2 items-center">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className="py-3 flex items-center cursor-pointer"
                  aria-label={slide.title}
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlideIndex
                      ? 'w-12 bg-[var(--accent)] shadow-[0_0_8px_var(--accent-ring)]'
                      : 'w-6 bg-[var(--border-strong)] hover:bg-[var(--text-faint)]'
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentSlideIndex === slides.length - 1}
              className="p-2 hover:bg-[var(--surface-strong)] rounded-full text-[var(--text-faint)] hover:text-[var(--text)] disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
