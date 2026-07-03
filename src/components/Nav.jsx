import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle.jsx';

const links = [
  { href: '#about', label: 'About' },
  { href: '#approach', label: 'Approach' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav({ theme, onToggle, brand }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full overflow-x-clip transition-all duration-300 ${
          scrolled 
            ? 'bg-[var(--bg-elev)]/80 backdrop-blur-md border-b border-[var(--border)] shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl flex w-full min-w-0 items-center justify-between gap-4">
          <a href="#top" className="flex min-w-0 items-center gap-3 group" onClick={(e) => handleNavClick(e, '#top')}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[var(--surface-strong)] border border-[var(--border-strong)] group-hover:border-[var(--accent)] transition-colors">
              <span className="font-mono font-bold text-xs text-[var(--accent)]">{">_"}</span>
            </div>
            <span className="truncate font-sans font-bold text-xl tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              {brand}<span className="text-[var(--accent)]">.dev</span>
            </span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8" aria-label="주요 섹션">
            {links.map((l) => (
              <a 
                key={l.href} 
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="font-mono text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors relative group/link"
              >
                <span className="text-[var(--accent)] opacity-0 group-hover/link:opacity-100 mr-1 transition-opacity absolute -left-3">/</span>
                {l.label}
              </a>
            ))}
            <div className="w-px h-4 bg-[var(--border)]"></div>
            <ThemeToggle theme={theme} onToggle={onToggle} />
          </nav>

          <div className="md:hidden flex shrink-0 items-center gap-3">
            <ThemeToggle theme={theme} onToggle={onToggle} />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            id="mobile-navigation"
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
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="text-3xl font-bold text-[var(--text)] flex items-center gap-4 group"
                >
                  <span className="text-[var(--accent)] font-mono text-xl opacity-0 group-hover:opacity-100 transition-opacity">0{i+1}.</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
