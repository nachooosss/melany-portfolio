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
import DownloadButton from './components/DownloadButton'
import Ticker from './components/Ticker'
import CustomCursor from './components/CustomCursor'
import StickyNav from './components/StickyNav'
import FloatingContacts from './components/FloatingContacts'
import ParallaxDivider from './components/ParallaxDivider'
import { cv } from './data/cv'

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <CustomCursor />
      <StickyNav />
      <FloatingContacts />
      <main id="top" className="bg-bg text-ink">
        <Hero />
        <About />
        <ParallaxDivider word="INTERIOR" subword="design" />
        <ProjectsCarousel />
        <Ticker />
        <Experience />
        <ParallaxDivider word="VISUALIZACIÓN" subword="3D" accent />
        <Education />
        <Skills />
        <Certifications />
        <Languages />
        <Contact />
        <footer className="section-gutter py-12 border-t border-line">
          <div className="max-content flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="font-display text-lg">{cv.personal.monogram}.</span>
              <p className="text-sm text-muted">
                © 2026 {cv.personal.name} · Diseñado y desarrollado con cuidado.
              </p>
            </div>
            <DownloadButton variant="ghost" />
          </div>
        </footer>
      </main>
    </>
  )
}
