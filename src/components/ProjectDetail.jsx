import { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import { motion, AnimatePresence } from 'framer-motion';

// Initial configuration is handled dynamically inside the component

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

const TerminalCommand = ({ command, onComplete, children }) => {
  const [text, setText] = useState('');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let timeout;
    let index = 0;
    
    timeout = setInterval(() => {
      setText(command.slice(0, index + 1));
      index++;
      if (index === command.length) {
        clearInterval(timeout);
        setTimeout(() => {
          setShowResult(true);
          if (onComplete) onComplete();
        }, 300);
      }
    }, 40);

    return () => clearInterval(timeout);
  }, [command]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="font-bold font-mono mb-3 flex items-center min-h-[24px] text-[14px] flex-wrap leading-relaxed">
        <span className="text-[var(--accent)] mr-2 shrink-0">root@dev:</span>
        <span className="text-[var(--accent-2)] mr-2 shrink-0">~/projects</span>
        <span className="text-[var(--text-faint)] mr-2 shrink-0">$</span>
        <span className="text-[var(--text)] mr-1 shrink-0">{text.split(' ')[0]}</span>
        <span className="text-[var(--text-muted)]">{text.split(' ').slice(1).join(' ')}</span>
        {!showResult && <span className="w-2.5 h-4 ml-1 bg-[var(--text-faint)] animate-pulse inline-block shrink-0" />}
      </div>
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

const OverviewSlide = ({ project }) => {
  const [step, setStep] = useState(0);

  return (
    <div className="space-y-6">
      <TerminalCommand 
        command="cat role.txt" 
        onComplete={() => setStep(1)}
      >
        <p className="text-[var(--text)] leading-relaxed pl-4 border-l-2 border-[var(--border)] bg-transparent py-3 pr-4">{project.role}</p>
      </TerminalCommand>

      {step >= 1 && project.highlights && (
        <TerminalCommand 
          command="ls -l features/" 
          onComplete={() => setStep(2)}
        >
          <ul className="pl-4 space-y-2 text-[var(--text)] border-l-2 border-[var(--border)]">
            {project.highlights.map((h, i) => (
              <li key={i} className="relative before:content-['-'] before:absolute before:-left-3 before:text-[var(--accent)] pl-2 text-[15px] leading-relaxed">{h}</li>
            ))}
          </ul>
        </TerminalCommand>
      )}

      {step >= 2 && project.stack && (
        <TerminalCommand 
          command="env | grep STACK"
        >
          <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-[var(--border)] pt-2">
            {project.stack.map((t) => (
              <span key={t} className="px-2.5 py-1 bg-[var(--surface-2)] text-[var(--text-muted)] font-mono text-xs rounded border border-[var(--border-strong)] shadow-sm">
                {t}
              </span>
            ))}
          </div>
        </TerminalCommand>
      )}
    </div>
  );
};

const TroubleshootingSlide = ({ project }) => {
  const [active, setActive] = useState('problem');
  const [stepKey, setStepKey] = useState(0);

  const handleTab = (tab) => {
    setActive(tab);
    setStepKey(prev => prev + 1);
  };

  const getCommand = () => {
    if (active === 'problem') return "cat problem.log";
    if (active === 'solution') return "./resolve_issue.sh";
    return "cat result.out";
  };

  const getContent = () => {
    if (active === 'problem') return project.troubleshooting.problem;
    if (active === 'solution') return project.troubleshooting.solution;
    return project.troubleshooting.result;
  };

  const getTheme = () => {
    if (active === 'problem') return { color: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/10", icon: <circle cx="12" cy="12" r="10"/>, title: "[ERROR] ISSUE_DETECTED" };
    if (active === 'solution') return { color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10", icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>, title: "[DEBUG] EXECUTING_SOLUTION" };
    return { color: "text-green-400", border: "border-green-500/30", bg: "bg-green-500/10", icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>, title: "[SUCCESS] VERIFICATION_PASSED" };
  };

  const theme = getTheme();

  return (
    <div className="flex flex-col h-full font-mono bg-transparent pt-2">
      <div className="flex-1 flex flex-col min-h-0 bg-transparent">
        <div className="flex flex-wrap gap-3 mb-6 shrink-0 border-b border-[var(--border)] pb-5">
           <button 
             onClick={() => handleTab('problem')} 
             className={`px-4 py-2 text-sm font-bold rounded transition-all duration-300 ${active === 'problem' ? 'bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'text-[var(--text-faint)] border border-transparent hover:text-[var(--text)] hover:bg-[var(--surface-strong)]'}`}
           >
             [1] problem.log
           </button>
           <button 
             onClick={() => handleTab('solution')} 
             className={`px-4 py-2 text-sm font-bold rounded transition-all duration-300 ${active === 'solution' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'text-[var(--text-faint)] border border-transparent hover:text-[var(--text)] hover:bg-[var(--surface-strong)]'}`}
           >
             [2] resolve_issue.sh
           </button>
           <button 
             onClick={() => handleTab('result')} 
             className={`px-4 py-2 text-sm font-bold rounded transition-all duration-300 ${active === 'result' ? 'bg-green-500/10 text-green-400 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'text-[var(--text-faint)] border border-transparent hover:text-[var(--text)] hover:bg-[var(--surface-strong)]'}`}
           >
             [3] result.out
           </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 text-sm leading-relaxed whitespace-pre-wrap">
          <TerminalCommand key={stepKey} command={getCommand()} onComplete={() => {}}>
            <div className={`mt-4 border-l-2 pl-4 py-2 ${theme.border} ${theme.bg} rounded-r-lg`}>
              <h5 className={`${theme.color} mb-3 font-bold flex items-center gap-2 text-sm tracking-widest`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{theme.icon}</svg>
                {theme.title}
              </h5>
              <div className="text-[var(--text)] leading-loose text-[14.5px]">
                {getContent()}
              </div>
            </div>
          </TerminalCommand>
        </div>
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
  if (project.troubleshooting) slides.push({ id: 'troubleshooting', title: '트러블슈팅' });

  const currentSlide = slides[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex(p => Math.min(p + 1, slides.length - 1));
  };
  const handlePrev = () => {
    setCurrentSlideIndex(p => Math.max(p - 1, 0));
  };

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
        <div className="flex items-center px-4 py-3 bg-[var(--surface-2)] border-b border-[var(--border)] shrink-0 relative">
          <div className="flex gap-2 relative z-50">
            <button 
              onClick={onClose} 
              className="w-3.5 h-3.5 rounded-full transition-colors flex items-center justify-center group cursor-pointer shadow-sm hover:brightness-90"
              style={{ backgroundColor: '#ff5f56' }}
            >
               <svg className="w-2 h-2 opacity-0 group-hover:opacity-100" style={{ color: '#4d0000' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: '#ffbd2e' }} />
            <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: '#27c93f' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <span className="text-[11px] text-[var(--text-faint)] font-mono font-bold tracking-widest">{project.id}.sh - 120x40</span>
          </div>
        </div>

        <div className="flex flex-col pt-6 px-8 pb-2 bg-transparent shrink-0 font-mono">
          <div className="text-sm mb-3 flex flex-wrap items-center">
             <span className="text-[var(--accent)] font-bold mr-2">root@dev:</span>
             <span className="text-[var(--accent-2)] mr-2">~/projects</span>
             <span className="text-[var(--text-faint)] mr-2">$</span>
             <span className="text-[var(--text)] font-bold mr-2">./start_project.sh --name</span>
             <span className="text-[var(--text)] font-bold text-lg border-b-2 border-[var(--accent)]">{project.name}</span>
          </div>
          <p className="text-[var(--text-muted)] text-[14px] leading-relaxed max-w-2xl mt-2 flex items-start gap-3">
            <span className="text-[var(--accent-3)] font-bold shrink-0 mt-0.5 tracking-widest">[INFO]</span>
            <span>
              {project.period && !project.period.includes('[')
                ? `${project.period} · ${project.summary}`
                : project.summary}
            </span>
          </p>
        </div>

        <div className="flex-1 overflow-hidden px-8 pb-4 bg-transparent relative text-[var(--text)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col overflow-y-auto custom-scrollbar pr-2"
            >
              {currentSlide.id === 'overview' && (
                <OverviewSlide project={project} />
              )}

              {currentSlide.id === 'architecture' && project.architectureDiagram && (
                <TerminalCommand 
                  command="./render_graph.sh --target architecture_diagram.svg"
                >
                  <div 
                    onClick={() => setIsZoomed(true)}
                    className="flex-1 w-full min-h-[400px] bg-transparent rounded border-l-2 border-[var(--border)] flex items-center justify-center overflow-hidden p-4 mt-2 cursor-zoom-in group/diag relative"
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover/diag:opacity-100 transition-opacity bg-[var(--surface-strong)] p-2 rounded border border-[var(--border)] text-[var(--text-faint)] flex items-center gap-2 text-xs z-10">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                       Click to expand
                    </div>
                    <MermaidDiagram chart={project.architectureDiagram} />
                  </div>
                </TerminalCommand>
              )}

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
                 <div className="w-full h-full flex items-center justify-center">
                   <MermaidDiagram chart={project.architectureDiagram} />
                 </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 font-mono text-sm tracking-widest uppercase">
                Architecture Diagram Fullscreen View - ESC to close
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions & Slide Navigation */}
        <div className="flex items-center justify-between pt-5 px-8 pb-6 border-t border-[var(--border)] bg-[var(--surface-2)] shrink-0 mt-auto shadow-[0_-10px_20px_rgba(0,0,0,0.05)] relative z-10 font-mono">
          {/* Left Actions */}
          <div className="flex gap-4">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] text-sm hover:bg-[var(--surface-strong)] transition-colors border border-[var(--border)] rounded shadow-sm flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              ./github.sh
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-ring)] font-bold text-sm hover:brightness-110 transition-all rounded shadow-md flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                ./demo.sh
              </a>
            )}
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-6">
            <button 
              onClick={handlePrev} 
              disabled={currentSlideIndex === 0}
              className="p-2 hover:bg-[var(--surface-strong)] rounded-full text-[var(--text-faint)] hover:text-[var(--text)] disabled:opacity-20 disabled:hover:bg-transparent transition-colors shadow-sm"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            
            <div className="flex gap-2.5">
              {slides.map((slide, idx) => (
                <div 
                  key={slide.id} 
                  className={`w-12 h-1.5 rounded-full transition-colors duration-300 ${idx === currentSlideIndex ? 'bg-[var(--accent)] shadow-[0_0_8px_var(--accent-ring)]' : 'bg-[var(--border-strong)]'}`} 
                />
              ))}
            </div>

            <button 
              onClick={handleNext} 
              disabled={currentSlideIndex === slides.length - 1}
              className="p-2 hover:bg-[var(--surface-strong)] rounded-full text-[var(--text-faint)] hover:text-[var(--text)] disabled:opacity-20 disabled:hover:bg-transparent transition-colors shadow-sm"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
