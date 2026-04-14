import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Languages from './components/Languages'
import Contact from './components/Contact'
import PrintableCV from './components/PrintableCV'
import DownloadButton from './components/DownloadButton'
import { cv } from './data/cv'

export default function App() {
  return (
    <>
      <main className="bg-bg text-ink">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Certifications />
        <Languages />
        <Contact />
        <footer className="section-gutter py-12 border-t border-line">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-sm text-muted">
              © 2026 {cv.personal.name} · Diseñado y desarrollado con cuidado.
            </p>
            <DownloadButton variant="ghost" />
          </div>
        </footer>
      </main>
      <PrintableCV />
    </>
  )
}
