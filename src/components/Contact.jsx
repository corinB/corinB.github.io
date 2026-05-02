import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const bootUpVariants = {
  hidden: { opacity: 0, rotateX: -45, y: 60, scale: 0.9 },
  visible: {
    opacity: 1, rotateX: 0, y: 0, scale: 1,
    transition: { duration: 0.8, type: 'spring', bounce: 0.3 }
  },
};

export default function Contact({ profile }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const githubUrl =
    profile.github && !profile.github.includes('[')
      ? `https://github.com/${profile.github}`
      : null;
  const extraLinks = profile.links
    .filter((l) => l.url && !l.url.includes('[') && l.url.length > 0)
    .filter((l) => l.label !== 'GitHub');

  const contactItems = [
    {
      type: 'email',
      label: 'Email',
      value: profile.email,
      url: `mailto:${profile.email}`,
      icon: <MailIcon />
    },
    ...(githubUrl ? [{
      type: 'github',
      label: 'GitHub',
      value: `@${profile.github}`,
      url: githubUrl,
      icon: <GithubIcon />
    }] : []),
    ...extraLinks.map(l => ({
      type: 'link',
      label: 'Link',
      value: l.label,
      url: l.url,
      icon: <LinkIcon />
    }))
  ];

  return (
    <section id="contact" ref={containerRef} className="relative z-10 py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-24">
          <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-[var(--accent)] opacity-60"></span>
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">연락처</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
          {contactItems.map((item, i) => {
            const yTransform = useTransform(scrollYProgress, [0, 1], [i * 15, -(i * 20)]);
            
            return (
              <motion.div 
                key={item.url} 
                style={{ y: yTransform }}
                className={i % 2 !== 0 ? "md:mt-6 lg:mt-0" : ""}
              >
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={bootUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1 }}
                  style={{ transformOrigin: "bottom center" }}
                  className="flex flex-col h-full bg-[var(--bg-elev)] border border-[var(--border)] rounded-xl p-8 shadow-[var(--shadow-lg)] hover:border-[var(--accent)] group transition-colors"
                >
                  <div className="w-12 h-12 bg-[var(--surface)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--accent)] mb-6 group-hover:bg-[var(--accent)] group-hover:text-[var(--bg)] transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-[var(--text-muted)] font-mono text-sm mb-2">> {item.label}</h3>
                  <p className="text-[var(--text)] font-medium break-all">{item.value}</p>
                </motion.a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
