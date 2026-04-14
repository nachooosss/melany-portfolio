import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { cv } from '../data/cv'

const palette = {
  bg: '#F5F1EC',
  surface: '#FFFFFF',
  ink: '#1C1917',
  muted: '#6B5F55',
  accent: '#9C6B4F',
  line: '#E5DED4',
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: palette.bg,
    color: palette.ink,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  headerBlock: {
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    paddingBottom: 16,
    marginBottom: 18,
  },
  name: {
    fontFamily: 'Times-Roman',
    fontSize: 28,
    color: palette.ink,
    marginBottom: 4,
  },
  nameItalic: {
    fontFamily: 'Times-Italic',
    color: palette.muted,
  },
  role: {
    fontSize: 11,
    color: palette.ink,
    marginTop: 2,
  },
  tagline: {
    fontSize: 9,
    color: palette.muted,
    marginTop: 4,
    maxWidth: 420,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
    fontSize: 8.5,
    color: palette.muted,
  },
  metaItem: { marginRight: 10 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 8,
  },
  sectionNumber: {
    fontFamily: 'Times-Italic',
    fontSize: 8,
    color: palette.accent,
    marginRight: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: palette.line,
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: palette.ink,
  },

  paragraph: {
    marginBottom: 4,
    textAlign: 'justify',
    color: palette.ink,
  },

  jobBlock: { marginBottom: 10 },
  jobHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  jobTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 10.5,
    color: palette.ink,
  },
  jobDates: {
    fontSize: 8.5,
    color: palette.muted,
  },
  jobPlace: {
    fontSize: 8.5,
    color: palette.muted,
    marginBottom: 4,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletMark: {
    width: 10,
    color: palette.accent,
  },
  bulletText: {
    flex: 1,
  },

  twoCol: {
    flexDirection: 'row',
    gap: 20,
  },
  col: { flex: 1 },
  subTitle: {
    fontSize: 7.5,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: palette.muted,
    marginBottom: 4,
    marginTop: 6,
  },
  listItem: {
    marginBottom: 2,
  },
  inlineList: { fontSize: 9.5, color: palette.ink },

  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  certRowFirst: { borderTopWidth: 0 },
  certName: { fontFamily: 'Times-Bold' },
  certIssuer: { color: palette.muted },
  certDate: { color: palette.muted, fontSize: 8.5 },

  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
})

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionNumber}>{number}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  )
}

export function CVDocument() {
  return (
    <Document
      author={cv.personal.name}
      title={`${cv.personal.name} — CV`}
      subject="Curriculum Vitae"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBlock}>
          <Text style={styles.name}>
            {cv.personal.name.split(' ')[0]}{' '}
            <Text style={styles.nameItalic}>
              {cv.personal.name.split(' ').slice(1).join(' ')}
            </Text>
          </Text>
          <Text style={styles.role}>{cv.personal.role}</Text>
          <Text style={styles.tagline}>{cv.personal.tagline}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>{cv.personal.email}</Text>
            <Text style={styles.metaItem}>·  {cv.personal.phone}</Text>
            <Text style={styles.metaItem}>·  {cv.personal.location}</Text>
          </View>
        </View>

        <SectionTitle number="01" title="Perfil" />
        {cv.profile.map((p, i) => (
          <Text key={i} style={styles.paragraph}>
            {p}
          </Text>
        ))}

        <SectionTitle number="02" title="Experiencia" />
        {cv.experience.map((job, i) => (
          <View key={i} style={styles.jobBlock} wrap={false}>
            <View style={styles.jobHead}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobDates}>{job.dates}</Text>
            </View>
            <Text style={styles.jobPlace}>{job.place}</Text>
            {job.bullets.map((b, j) => (
              <View key={j} style={styles.bullet}>
                <Text style={styles.bulletMark}>—</Text>
                <Text style={styles.bulletText}>{b}</Text>
              </View>
            ))}
          </View>
        ))}

        <SectionTitle number="03" title="Formación" />
        {cv.education.map((ed, i) => (
          <View key={i} style={styles.jobHead} wrap={false}>
            <View>
              <Text style={styles.jobTitle}>{ed.degree}</Text>
              <Text style={styles.jobPlace}>
                {ed.school} · {ed.location}
              </Text>
            </View>
            <Text style={styles.jobDates}>{ed.dates}</Text>
          </View>
        ))}

        <SectionTitle number="04" title="Habilidades" />
        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.subTitle}>Software</Text>
            <Text style={styles.inlineList}>{cv.skills.software.join('  ·  ')}</Text>
            <Text style={styles.subTitle}>Disciplinas</Text>
            {cv.skills.disciplines.map((d) => (
              <Text key={d} style={styles.listItem}>
                — {d}
              </Text>
            ))}
          </View>
          <View style={styles.col}>
            <Text style={styles.subTitle}>Competencias</Text>
            {cv.skills.soft.map((s) => (
              <Text key={s} style={styles.listItem}>
                — {s}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.twoCol} wrap={false}>
          <View style={styles.col}>
            <SectionTitle number="05" title="Certificaciones" />
            {cv.certifications.map((c, i) => (
              <View key={i} style={[styles.certRow, i === 0 && styles.certRowFirst]}>
                <Text>
                  <Text style={styles.certName}>{c.name}</Text>{' '}
                  <Text style={styles.certIssuer}>· {c.issuer}</Text>
                </Text>
                <Text style={styles.certDate}>{c.date}</Text>
              </View>
            ))}
          </View>
          <View style={styles.col}>
            <SectionTitle number="06" title="Idiomas" />
            {cv.languages.map((l, i) => (
              <View key={i} style={[styles.langRow, i === 0 && styles.certRowFirst]}>
                <Text style={styles.certName}>{l.name}</Text>
                <Text style={styles.certDate}>{l.level}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default function PrintableCV() {
  return null
}
