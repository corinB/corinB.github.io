import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle.jsx';

const links = [
  { href: '#about', label: 'About' },
  { href: '#approach', label: 'Approach' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const TypingText = ({ text }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span className="text-[var(--text)]">{displayed}</span>;
};

export default function Nav({ theme, onToggle, brand }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [executingCmd, setExecutingCmd] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href, label) => {
    e.preventDefault();
    setExecutingCmd(label.toLowerCase());
    setMobileMenuOpen(false);

    // Wait for typing animation to finish
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
      // Keep overlay for a bit after scroll starts
      setTimeout(() => setExecutingCmd(null), 600);
    }, 1200);
  };

  const handleThemeToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setExecutingCmd(`set_theme --mode ${nextTheme}`);
    
    // Smooth delay for typing animation
    setTimeout(() => {
      onToggle();
      setTimeout(() => setExecutingCmd(null), 600);
    }, 1200);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[var(--bg-elev)]/80 backdrop-blur-md border-b border-[var(--border)] shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group" onClick={(e) => handleNavClick(e, '#top', 'home')}>
            <div className="flex items-center justify-center w-8 h-8 rounded bg-[var(--surface-strong)] border border-[var(--border-strong)] group-hover:border-[var(--accent)] transition-colors">
              <span className="font-mono font-bold text-xs text-[var(--accent)]">{">_"}</span>
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              {brand}<span className="text-[var(--accent)]">.dev</span>
            </span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8" aria-label="주요 섹션">
            {links.map((l) => (
              <a 
                key={l.href} 
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href, l.label)}
                className="font-mono text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors relative group/link"
              >
                <span className="text-[var(--accent)] opacity-0 group-hover/link:opacity-100 mr-1 transition-opacity absolute -left-3">/</span>
                {l.label}
              </a>
            ))}
            <div className="w-px h-4 bg-[var(--border)]"></div>
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
          </nav>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-[var(--surface-strong)] border border-[var(--border)] rounded-md"
            >
              <motion.span 
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-[var(--text)] block"
              />
              <motion.span 
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 bg-[var(--text)] block"
              />
              <motion.span 
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-[var(--text)] block"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Terminal Command Overlay */}
      <AnimatePresence>
        {executingCmd && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md"
          >
            <div className="bg-[var(--bg-elev)] border border-[var(--accent-soft)] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden font-mono">
              <div className="bg-[var(--surface-2)] px-4 py-2 border-b border-[var(--border)] flex items-center justify-between">
                <span className="text-[10px] text-[var(--text-faint)] uppercase tracking-widest font-bold">System Navigation</span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
              </div>
              <div className="p-5 flex items-center gap-3">
                <span className="text-[var(--accent)] font-bold shrink-0">root@dev:~$</span>
                <div className="flex items-center">
                  <TypingText text={executingCmd.includes('theme') ? executingCmd : `cd /${executingCmd}`} />
                  <motion.span 
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-5 bg-[var(--accent)] ml-1"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--bg-elev)] pt-32 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-8">
              {links.map((l, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href, l.label)}
                  className="text-3xl font-bold text-[var(--text)] flex items-center gap-4 group"
                >
                  <span className="text-[var(--accent)] font-mono text-xl opacity-0 group-hover:opacity-100 transition-opacity">0{i+1}.</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            
            <div className="absolute bottom-12 left-6 right-6">
              <div className="w-full h-px bg-[var(--border)] mb-8"></div>
              <p className="font-mono text-xs text-[var(--text-faint)] mb-2">SYSTEM STATUS</p>
              <p className="font-mono text-sm text-[var(--accent)]">● ALL SYSTEMS OPERATIONAL</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
