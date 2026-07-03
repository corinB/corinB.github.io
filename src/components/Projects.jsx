import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, PlayCircle } from 'lucide-react';
import ScenarioVisual from './projects/ScenarioVisuals';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LinkButton = ({ href, children, accent = false, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={
      accent
        ? 'inline-flex items-center gap-2 rounded border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2.5 text-sm font-semibold text-[var(--accent)] transition-all hover:brightness-110'
        : 'inline-flex items-center gap-2 rounded border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text-muted)] transition-all hover:border-[var(--border-strong)] hover:bg-[var(--surface-strong)] hover:text-[var(--text)]'
    }
  >
    {Icon ? <Icon size={16} strokeWidth={2.2} /> : null}
    {children}
  </a>
);

const SectionLabel = ({ children }) => <p className="project-section-label">{children}</p>;

const Paragraphs = ({ items }) => (
  <div className="project-copy">
    {items.map((item) => (
      <p key={item}>{item}</p>
    ))}
  </div>
);

const ProjectBlock = ({ project, index }) => (
  <motion.article
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px', amount: 0.01 }}
    className="project-case"
  >
    <div className="project-case-index font-mono">{String(index + 1).padStart(2, '0')}</div>

    <div className="project-case-main">
      <header className="project-case-header">
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap gap-2">
            {project.personaTags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="project-case-title">{project.name}</h3>
          <p className="project-summary">{project.summary}</p>
        </div>

        <div className="project-case-meta">
          <span>{project.period}</span>
          <span>{project.lead}</span>
        </div>
      </header>

      <div className="project-case-actions">
        <LinkButton href={project.repo} icon={GitBranch}>
          GitHub
        </LinkButton>
        {project.demo ? (
          <LinkButton href={project.demo} accent icon={PlayCircle}>
            데모 영상
          </LinkButton>
        ) : null}
      </div>

      <div className="project-case-flow">
        <section className="project-section">
          <SectionLabel>프로젝트 개요</SectionLabel>
          <Paragraphs items={project.overview} />
        </section>

        <section className="project-section">
          <SectionLabel>담당 역할</SectionLabel>
          <Paragraphs items={project.role} />
        </section>

        {project.sections.map((section) => (
          <section key={section.title} className="project-section">
            {section.eyebrow ? <SectionLabel>{section.eyebrow}</SectionLabel> : null}
            <h4 className="project-subtitle">{section.title}</h4>
            {section.scenario ? (
              <div className="project-section-visual">
                <ScenarioVisual scenario={section.scenario} />
              </div>
            ) : null}
            <p className="project-body after-visual">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="project-source-link">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-faint)] transition-colors hover:text-[var(--accent)]"
        >
          저장소에서 근거 보기
          <ExternalLink size={14} strokeWidth={2.2} />
        </a>
      </div>
    </div>
  </motion.article>
);

export default function Projects({ projects }) {
  return (
    <section id="projects" className="relative z-10 overflow-hidden py-24 md:py-28">
      <div className="absolute bottom-[12%] right-[-18%] h-[720px] w-[720px] rounded-full bg-[var(--accent-ring)] blur-[150px] pointer-events-none" />

      <div className="container relative mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-[var(--accent)]">
            <span className="h-px w-8 bg-[var(--accent)] opacity-60" />
            프로젝트
          </p>
          <h2 className="text-4xl font-bold text-[var(--text)] md:text-5xl">프로젝트</h2>
        </div>

        <div className="space-y-14">
          {projects.map((project, index) => (
            <ProjectBlock key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
