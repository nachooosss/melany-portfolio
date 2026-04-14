import { cv } from '../data/cv'

const palette = {
  bg: '#FFFFFF',
  ink: '#1C1917',
  muted: '#6B5F55',
  accent: '#9C6B4F',
  line: '#E5DED4',
}

const fontDisplay = "'Fraunces', Georgia, serif"
const fontSans = "'Inter', system-ui, sans-serif"

export default function PrintableCV() {
  return (
    <div id="printable-cv" className="printable-root no-print-hide">
      <div
        style={{
          width: '210mm',
          minHeight: '297mm',
          padding: '15mm',
          background: palette.bg,
          color: palette.ink,
          fontFamily: fontSans,
          fontSize: '10pt',
          lineHeight: 1.5,
        }}
      >
        {/* Header */}
        <header style={{ borderBottom: `1px solid ${palette.line}`, paddingBottom: '8mm' }}>
          <h1
            style={{
              fontFamily: fontDisplay,
              fontSize: '28pt',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              margin: 0,
            }}
          >
            {cv.personal.name}
          </h1>
          <p style={{ margin: '3mm 0 0', color: palette.muted, fontSize: '11pt' }}>
            {cv.personal.role} · {cv.personal.tagline}
          </p>
          <div
            style={{
              marginTop: '4mm',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4mm',
              fontSize: '9pt',
              color: palette.muted,
            }}
          >
            <span>{cv.personal.email}</span>
            <span>·</span>
            <span>{cv.personal.phone}</span>
            <span>·</span>
            <span>{cv.personal.location}</span>
          </div>
        </header>

        {/* Perfil */}
        <Section number="01" title="Perfil">
          {cv.profile.map((p, i) => (
            <p key={i} style={{ margin: '0 0 2mm', textAlign: 'justify' }}>
              {p}
            </p>
          ))}
        </Section>

        {/* Experiencia */}
        <Section number="02" title="Experiencia">
          {cv.experience.map((job, i) => (
            <div key={i} style={{ marginBottom: '5mm', pageBreakInside: 'avoid' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '4mm',
                }}
              >
                <h3
                  style={{
                    fontFamily: fontDisplay,
                    fontSize: '12pt',
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {job.title}
                </h3>
                <span style={{ fontSize: '9pt', color: palette.muted }}>{job.dates}</span>
              </div>
              <p style={{ margin: '1mm 0 2mm', color: palette.muted, fontSize: '9pt' }}>
                {job.place}
              </p>
              <ul style={{ margin: 0, paddingLeft: '4mm' }}>
                {job.bullets.map((b, j) => (
                  <li key={j} style={{ margin: '0 0 1mm' }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Formación */}
        <Section number="03" title="Formación">
          {cv.education.map((ed, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '4mm',
                pageBreakInside: 'avoid',
              }}
            >
              <div>
                <p style={{ fontFamily: fontDisplay, fontSize: '12pt', margin: 0 }}>
                  {ed.degree}
                </p>
                <p style={{ margin: '1mm 0 0', color: palette.muted, fontSize: '9pt' }}>
                  {ed.school} · {ed.location}
                </p>
              </div>
              <span style={{ fontSize: '9pt', color: palette.muted }}>{ed.dates}</span>
            </div>
          ))}
        </Section>

        {/* Habilidades */}
        <Section number="04" title="Habilidades">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6mm' }}>
            <div>
              <SubTitle>Software</SubTitle>
              <p style={{ margin: 0 }}>{cv.skills.software.join(' · ')}</p>
              <SubTitle style={{ marginTop: '3mm' }}>Técnicas</SubTitle>
              <ul style={{ margin: 0, paddingLeft: '4mm' }}>
                {cv.skills.technical.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <SubTitle>Competencias</SubTitle>
              <ul style={{ margin: 0, paddingLeft: '4mm' }}>
                {cv.skills.soft.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Certificaciones + Idiomas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6mm' }}>
          <Section number="05" title="Certificaciones" compact>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {cv.certifications.map((c, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '3mm',
                    padding: '1.5mm 0',
                    borderTop: i === 0 ? 'none' : `1px solid ${palette.line}`,
                  }}
                >
                  <span>
                    {c.name} <span style={{ color: palette.muted }}>· {c.issuer}</span>
                  </span>
                  <span style={{ color: palette.muted, fontSize: '9pt' }}>{c.date}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section number="06" title="Idiomas" compact>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {cv.languages.map((l, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1.5mm 0',
                    borderTop: i === 0 ? 'none' : `1px solid ${palette.line}`,
                  }}
                >
                  <span>{l.name}</span>
                  <span style={{ color: palette.muted, fontSize: '9pt' }}>{l.level}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({
  number,
  title,
  children,
  compact = false,
}: {
  number: string
  title: string
  children: React.ReactNode
  compact?: boolean
}) {
  return (
    <section
      style={{
        marginTop: compact ? '6mm' : '8mm',
        pageBreakInside: 'avoid',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '3mm',
          marginBottom: '3mm',
        }}
      >
        <span
          style={{
            fontFamily: fontDisplay,
            fontSize: '8pt',
            color: palette.accent,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {number}
        </span>
        <span style={{ flex: 1, height: '1px', background: palette.line }} />
        <h2
          style={{
            fontFamily: fontDisplay,
            fontSize: '11pt',
            fontWeight: 500,
            margin: 0,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

function SubTitle({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <p
      style={{
        margin: '0 0 1.5mm',
        fontSize: '8pt',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: palette.muted,
        ...style,
      }}
    >
      {children}
    </p>
  )
}
