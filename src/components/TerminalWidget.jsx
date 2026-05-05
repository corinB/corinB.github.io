import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMANDS = {
  help: '사용 가능한 명령어: ls, cd [target], theme [light|dark], clear, whoami, contact, exit',
  ls: 'about, projects, skills, resume, contact',
  whoami: '이름: 백종현 | 역할: 신입 백엔드 개발자 | 좌우명: 설계로 소통하고 검증으로 완성한다.',
  contact: 'Email: gkdisrha2020@gmail.com | GitHub: https://github.com/corinB',
};

export default function TerminalWidget({ theme, onToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([{ type: 'output', text: 'Welcome to J-Baek Terminal v1.0.0. Type "help" to start.' }]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Global hotkey
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    
    const cmd = inputValue.trim().toLowerCase();
    const [base, ...args] = cmd.split(' ');
    
    const newHistory = [...history, { type: 'input', text: inputValue }];

    if (base === 'clear') {
      setHistory([]);
    } else if (base === 'exit') {
      setIsOpen(false);
    } else if (base === 'ls') {
      setHistory([...newHistory, { type: 'output', text: COMMANDS.ls }]);
    } else if (base === 'whoami') {
      setHistory([...newHistory, { type: 'output', text: COMMANDS.whoami }]);
    } else if (base === 'contact') {
      setHistory([...newHistory, { type: 'output', text: COMMANDS.contact }]);
    } else if (base === 'help') {
      setHistory([...newHistory, { type: 'output', text: COMMANDS.help }]);
    } else if (base === 'theme') {
      const target = args[0];
      if ((target === 'dark' && theme !== 'dark') || (target === 'light' && theme !== 'light')) {
        onToggle();
        setHistory([...newHistory, { type: 'output', text: `Theme changed to ${target}.` }]);
      } else {
        setHistory([...newHistory, { type: 'output', text: 'Usage: theme [light|dark]' }]);
      }
    } else if (base === 'cd') {
      const target = args[0];
      const validTargets = ['about', 'projects', 'skills', 'resume', 'contact'];
      if (validTargets.includes(target)) {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setHistory([...newHistory, { type: 'output', text: `Navigating to /${target}...` }]);
        }
      } else {
        setHistory([...newHistory, { type: 'output', text: `Target not found: ${target}` }]);
      }
    } else if (cmd !== '') {
      setHistory([...newHistory, { type: 'output', text: `Command not found: ${cmd}. Type "help" for assistance.` }]);
    }

    setInputValue('');
  };

  const suggestions = ['ls', 'cd about', 'cd projects', 'theme dark', 'whoami', 'contact'];

  const handleSuggestionClick = (s) => {
    setInputValue(s);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-[100] w-12 h-12 bg-[var(--bg-elev)] border border-[var(--border)] rounded-full shadow-2xl flex items-center justify-center group overflow-hidden"
      >
        <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-10 transition-opacity" />
        <span className="font-mono font-bold text-[var(--accent)] text-lg">{isOpen ? '×' : '>_'}</span>
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 left-6 z-[100] w-[500px] max-w-[90vw] h-[400px] bg-[var(--bg-elev)] border border-[var(--border)] rounded-xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col backdrop-blur-2xl ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="bg-[var(--surface-2)] px-4 py-2.5 border-b border-[var(--border)] flex items-center justify-between shrink-0">
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-3.5 h-3.5 rounded-full flex items-center justify-center group/btn shadow-inner"
                  style={{ backgroundColor: '#ff5f56' }}
                >
                  <svg className="w-2 h-2 opacity-0 group-hover/btn:opacity-100 text-[#4d0000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
                <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: '#ffbd2e' }} />
                <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: '#27c93f' }} />
              </div>
              <span className="text-[10px] font-mono font-bold text-[var(--text-faint)] uppercase tracking-[0.2em]">Console Terminal</span>
              <div className="w-12" /> {/* Spacer */}
            </div>

            {/* History */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto font-mono text-[13px] leading-relaxed custom-scrollbar bg-black/5"
            >
              {history.map((item, i) => (
                <div key={i} className={`mb-3 ${item.type === 'input' ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}`}>
                  {item.type === 'input' ? (
                    <div className="flex gap-2">
                      <span className="text-[var(--accent)] font-bold">➜</span>
                      <span className="text-[var(--accent-2)]">~</span>
                      <span className="opacity-80">{item.text}</span>
                    </div>
                  ) : (
                    <div className="pl-4 border-l border-[var(--border)] ml-1 py-1 whitespace-pre-wrap opacity-90">{item.text}</div>
                  )}
                </div>
              ))}
              
              {/* Active Input Line */}
              <div className="flex gap-2 items-center mt-2 group/input">
                <span className="text-[var(--accent)] font-bold">➜</span>
                <span className="text-[var(--accent-2)] font-mono">~</span>
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent border-none outline-none w-full text-[var(--text)] p-0 m-0 caret-[var(--accent)]"
                    spellCheck="false"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
              </div>
            </div>

            {/* Suggestions & Footer */}
            <div className="bg-[var(--surface)] border-t border-[var(--border)] shrink-0">
              <div className="flex gap-2 p-2 px-4 overflow-x-auto no-scrollbar border-b border-[var(--border)]/50">
                <span className="text-[9px] font-bold text-[var(--text-faint)] self-center uppercase mr-1">Suggest:</span>
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-2.5 py-1 bg-[var(--surface-strong)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border)] rounded text-[10px] font-mono text-[var(--text-muted)] transition-all whitespace-nowrap shadow-sm"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="px-4 py-1.5 flex justify-between items-center bg-black/10">
                <p className="text-[9px] font-mono text-[var(--text-faint)] italic">
                  Type "help" for a list of commands
                </p>
                <div className="flex gap-3 text-[9px] font-mono text-[var(--text-faint)]">
                  <span>UTF-8</span>
                  <span className="text-[var(--accent)] opacity-60">● Online</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
