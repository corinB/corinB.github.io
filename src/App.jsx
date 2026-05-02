import { lazy, Suspense } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Resume from './components/Resume.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { useTheme } from './hooks/useTheme.js';
import { profile } from './data/profile.js';
import { projects } from './data/projects.js';
import { skillGroups } from './data/skills.js';

const Agentation = import.meta.env.DEV
  ? lazy(() =>
      import('agentation').then((m) => ({ default: m.Agentation }))
    )
  : null;

export default function App() {
  const { theme, toggle } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const brand = profile.name && !profile.name.includes('[')
    ? profile.name
    : 'Portfolio';

  return (
    <>
      {/* Premium Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <motion.div className="mesh-bg" style={{ y }} />
      <Nav theme={theme} onToggle={toggle} brand={brand} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Projects projects={projects} />
        <Skills groups={skillGroups} />
        <Resume />
        <Contact profile={profile} />
      </main>
      <Footer brand={brand} />
      {Agentation ? (
        <Suspense fallback={null}>
          <Agentation />
        </Suspense>
      ) : null}
    </>
  );
}
