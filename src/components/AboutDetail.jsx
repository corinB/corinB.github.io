import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalCommand = ({ command, children }) => {
  const [text, setText] = useState('');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let index = 0;
    const timeout = setInterval(() => {
      setText(command.slice(0, index + 1));
      index++;
      if (index === command.length) {
        clearInterval(timeout);
        setTimeout(() => setShowResult(true), 300);
      }
    }, 40);
    return () => clearInterval(timeout);
  }, [command]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-sm font-mono">
        <span className="text-[var(--accent)] font-bold">root@dev:~$</span>
        <div className="flex items-center">
          <span className="text-[var(--text)]">{text}</span>
          <motion.span 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-[var(--accent)] ml-1"
          />
        </div>
      </div>
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="pl-4 border-l-2 border-[var(--border)] py-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AboutDetail({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[var(--bg-elev)] w-full max-w-2xl h-[70vh] overflow-hidden flex flex-col rounded-xl border border-[var(--border)] relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center px-4 py-3 bg-[var(--surface-2)] border-b border-[var(--border)] shrink-0">
          <div className="flex gap-2">
            <button 
              onClick={onClose} 
              className="w-3.5 h-3.5 rounded-full flex items-center justify-center group shadow-inner"
              style={{ backgroundColor: '#ff5f56' }}
            >
              <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 text-[#4d0000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: '#ffbd2e' }} />
            <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: '#27c93f' }} />
          </div>
          <div className="mx-auto text-[11px] font-mono font-bold tracking-widest text-[var(--text-faint)] uppercase">
            inspect_profile_{item.id}.sh
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8 font-mono custom-scrollbar">
          <TerminalCommand command={`cat /profile/${item.id}.txt`}>
            <div className="space-y-8 mt-4">
              <div>
                <h4 className="text-[var(--accent)] font-bold text-lg mb-4 tracking-tight uppercase">
                   {">"} {item.title}
                </h4>
                <div className="text-[var(--text)] text-[15px] leading-loose whitespace-pre-wrap">
                  {item.detail || item.content}
                </div>
              </div>

              {item.highlights && (
                <div className="space-y-4">
                  <h5 className="text-[var(--accent-2)] font-bold text-sm tracking-widest">[HIGHLIGHTS]</h5>
                  <ul className="space-y-3">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-[14px]">
                        <span className="text-[var(--text-faint)] mt-1 opacity-50">0{i+1}.</span>
                        <span className="text-[var(--text-muted)]">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TerminalCommand>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-4 bg-[var(--surface-2)] border-t border-[var(--border)] flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-[var(--surface-strong)] hover:bg-[var(--accent)] hover:text-white text-[var(--text)] rounded text-sm font-bold transition-all border border-[var(--border)]"
          >
            close_window.sh
          </button>
        </div>
      </div>
    </motion.div>
  );
}
