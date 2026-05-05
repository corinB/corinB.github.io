import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AboutCard({ item, index, onOpen }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`flex flex-col bg-[var(--bg-elev)] rounded-xl text-left transition-all duration-300 relative overflow-hidden h-full group border ${isHovered ? 'border-[var(--accent)] shadow-[0_0_30px_var(--accent-ring)] -translate-y-1' : 'border-[var(--border)] shadow-xl'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(item)}
      style={{ cursor: 'pointer' }}
    >
      {/* Terminal Mac Header */}
      <div className={`flex items-center px-4 py-2.5 border-b shrink-0 transition-colors duration-300 ${isHovered ? 'bg-[var(--surface-2)] border-[var(--accent-soft)]' : 'bg-[var(--surface)] border-[var(--border)]'}`}>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full transition-colors" style={{ backgroundColor: isHovered ? '#ff5f56' : '#374151' }} />
          <div className="w-3 h-3 rounded-full transition-colors" style={{ backgroundColor: isHovered ? '#ffbd2e' : '#374151' }} />
          <div className="w-3 h-3 rounded-full transition-colors" style={{ backgroundColor: isHovered ? '#27c93f' : '#374151' }} />
        </div>
        <div className="mx-auto text-[11px] font-mono font-bold tracking-widest text-[var(--text-faint)]">
          {item.id}.sh
        </div>
      </div>

      <div className="p-6 flex flex-col h-full font-mono bg-transparent">
        {/* Command Line */}
        <div className="mb-5 flex flex-wrap items-center text-sm">
          <span className="text-[var(--accent)] font-bold mr-2">root@dev:</span>
          <span className="text-[var(--accent-2)] mr-2">~/profile</span>
          <span className="text-[var(--text-faint)] mr-2">$</span>
          <span className="text-[var(--text)] font-bold">./view</span>
          <span className="text-[var(--text)] ml-2 font-bold text-lg border-b-2 border-[var(--accent)] uppercase tracking-tighter">{item.id}</span>
        </div>

        {/* Preview Output */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-[var(--accent-2)] shrink-0 font-bold text-xs mt-1 tracking-widest">[TITLE]</span>
            <span className="text-[var(--text)] text-[14px] leading-relaxed font-bold">{item.title}</span>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-[var(--accent-3)] shrink-0 font-bold text-xs mt-1 tracking-widest">[CONTENT]</span>
            <span className="text-[var(--text-muted)] text-[14px] leading-relaxed line-clamp-3">
              {item.content}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-6 mt-auto pt-5 border-t border-[var(--border)]">
          <button
            type="button"
            className={`font-bold text-sm transition-colors flex items-center gap-2 ${isHovered ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(item);
            }}
          >
            <span className="text-[var(--text-faint)]">{">"}</span> ./inspect.sh 
            <span className={`w-2 h-4 bg-[var(--accent)] inline-block transition-opacity ${isHovered ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
