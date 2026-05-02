import { motion } from 'framer-motion';

export default function Footer({ brand }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 py-20 bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-[var(--surface-strong)] border border-[var(--border-strong)]">
                <span className="font-mono font-bold text-xs text-[var(--accent)]">{">_"}</span>
              </div>
              <span className="font-sans font-bold text-xl tracking-tight text-[var(--text)]">
                {brand}<span className="text-[var(--accent)]">.dev</span>
              </span>
            </div>
            <p className="text-[var(--text-muted)] font-mono text-xs">
              System Architect & Backend Developer Portfolio
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors font-mono text-sm"
            >
              <span className="relative">
                BACK TO TOP
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent)] transition-all group-hover:w-full"></span>
              </span>
              <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              </div>
            </button>
            <div className="flex items-center gap-4 text-[var(--text-faint)] font-mono text-[10px] tracking-widest uppercase">
              <span>© {new Date().getFullYear()} {brand}</span>
              <span className="w-1 h-1 bg-[var(--border-strong)] rounded-full"></span>
              <span>Built with React & Framer Motion</span>
            </div>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--accent)] opacity-[0.03] blur-[100px] pointer-events-none rounded-full"></div>
      </div>
    </footer>
  );
}
