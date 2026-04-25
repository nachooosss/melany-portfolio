import { lazy, Suspense, useEffect } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import Hero from './components/Hero'
import About from './components/About'
import ToolsStrip from './components/ToolsStrip'
import CustomCursor from './components/CustomCursor'
import StickyNav from './components/StickyNav'
import FloatingContacts from './components/FloatingContacts'
import ScrollBackground from './components/ScrollBackground'
import ScrollProgress from './components/ScrollProgress'
import Logo from './components/Logo'
import { cv } from './data/cv'

// Code-split below-the-fold + heavy components → menos JS en first paint
const Preloader = lazy(() => import('./components/Preloader'))
const ProjectsCarousel = lazy(() => import('./components/ProjectsCarousel'))
const Experience = lazy(() => import('./components/Experience'))
const Education = lazy(() => import('./components/Education'))
const Skills = lazy(() => import('./components/Skills'))
const Certifications = lazy(() => import('./components/Certifications'))
const Languages = lazy(() => import('./components/Languages'))
const Contact = lazy(() => import('./components/Contact'))

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <Suspense fallback={null}>
        <Preloader />
      </Suspense>
      <ScrollBackground />
      <ScrollProgress />
      <CustomCursor />
      <StickyNav />
      <FloatingContacts />
      <main id="top" className="text-ink">
        <Hero />
        <About />
        <ToolsStrip />
        <Suspense fallback={<div className="min-h-screen" />}>
          <ProjectsCarousel />
        </Suspense>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={null}>
          <Education />
          <Skills />
          <Certifications />
          <Languages />
          <Contact />
        </Suspense>
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
      <Analytics />
    </LazyMotion>
  )
}
