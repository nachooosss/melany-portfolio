import { useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import ProjectsCarousel from './components/ProjectsCarousel'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Languages from './components/Languages'
import Contact from './components/Contact'
import ToolsStrip from './components/ToolsStrip'
import CustomCursor from './components/CustomCursor'
import StickyNav from './components/StickyNav'
import FloatingContacts from './components/FloatingContacts'
import ScrollBackground from './components/ScrollBackground'
import ScrollProgress from './components/ScrollProgress'
import Logo from './components/Logo'
import Preloader from './components/Preloader'
import { cv } from './data/cv'

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Preloader />
      <ScrollBackground />
      <ScrollProgress />
      <CustomCursor />
      <StickyNav />
      <FloatingContacts />
      <main id="top" className="text-ink">
        <Hero />
        <About />
        <ToolsStrip />
        <ProjectsCarousel />
        <Experience />
        <Education />
        <Skills />
        <Certifications />
        <Languages />
        <Contact />
        <footer className="section-gutter py-16 border-t border-line">
          <div className="max-content">
            <div className="ornament-rule mb-10">
              <span className="ornament-glyph" aria-hidden />
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-4">
                <Logo height={68} />
              </div>
              <p className="text-sm text-muted">
                © 2026 {cv.personal.name} · Diseñado y desarrollado con cuidado.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
