export type ExperienceItem = {
  title: string
  place: string
  dates: string
  bullets: string[]
}

export type Certification = {
  name: string
  issuer: string
  date: string
}

export type Language = {
  name: string
  level: string
  score: number
}

export type Project = {
  src: string
  alt: string
}

export const cv = {
  personal: {
    name: 'Melany Santiesteban',
    role: 'Diseñadora de Interiores · Visualización 3D · Panamá',
    tagline:
      'Visualización 3D fotorrealista y planimetría técnica para proyectos residenciales, comerciales y corporativos.',
    availabilityPill:
      'Disponible para prácticas y proyectos freelance · Panamá · Presencial, Híbrido o Remoto',
    location: 'Ciudad de Panamá, Panamá',
    email: 'msg072garcia@gmail.com',
    phone: '+507 6577-6878',
    phoneRaw: '+50765776878',
    whatsapp: 'https://wa.me/50765776878?text=Hola%20Melany%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo.',
    mapsUrl: 'https://maps.google.com/?q=Panama+City,Panama',
    // TODO: Melany debe pegar aquí la URL real de su LinkedIn antes de publicar
    linkedin: { label: 'Melany Santiesteban', url: '#' },
    // TODO: Melany debe añadir la URL de su portafolio (Behance / Drive / sitio propio)
    portfolio: { label: 'Ver portafolio', url: '#' },
    photo: '/perfil.jpeg',
    monogram: 'MS',
  },

  profile: [
    'Estudiante de Diseño de Interiores en tercer año, con formación en el desarrollo y ejecución de proyectos enfocados en la funcionalidad, la estética y la coherencia espacial. Me especializo en la creación de espacios cálidos y visualmente equilibrados, adaptados a las necesidades específicas de cada usuario.',
    'Cuento con experiencia en elaboración y lectura de planos técnicos, modelado y visualización 3D, así como en el desarrollo de propuestas conceptuales, moodboards y memorias descriptivas para proyectos residenciales, comerciales e institucionales.',
    'Manejo herramientas como AutoCAD, SketchUp, D5, Twinmotion y Photoshop para la representación de proyectos de diseño.',
    'Actualmente busco oportunidades para seguir creciendo profesionalmente y aportar valor a través del diseño.',
  ],

  pullQuote: 'Visualización 3D + planimetría técnica.',

  education: [
    {
      degree: 'Licenciatura en Diseño de Interiores',
      school: 'Universidad Católica Santa María La Antigua (USMA)',
      location: 'Panamá',
      dates: 'ene 2024 – ene 2027',
    },
  ],

  experience: [
    {
      title: 'Proyecto Comercial — diseño de interiores',
      place: 'Proyecto Independiente, Panamá',
      dates: 'oct 2025 – dic 2025',
      bullets: [
        'Desarrollo de propuesta de diseño para espacio comercial, enfocado en la experiencia del usuario y la identidad visual del espacio.',
        'Análisis de distribución y flujo de circulación para optimizar la funcionalidad del entorno.',
        'Creación de concepto de diseño, selección de materiales, iluminación y mobiliario acorde al estilo del proyecto.',
        'Modelado y renderizado 3D en SketchUp, Twinmotion y D5 para la visualización realista del espacio.',
      ],
    },
    {
      title: 'Proyecto Residencial — diseño de interiores',
      place: 'Proyecto Independiente, Panamá',
      dates: 'ene 2026',
      bullets: [
        'Diseño y desarrollo de proyecto residencial (habitación), incluyendo levantamiento de medidas, elaboración de planos técnicos, propuesta de diseño y modelado y renderizado 3D para la visualización del espacio.',
      ],
    },
  ] as ExperienceItem[],

  skills: {
    software: ['AutoCAD', 'SketchUp', 'D5 Render', 'Twinmotion', 'Photoshop'],
    disciplines: [
      'Visualización arquitectónica',
      'Interpretación de planos técnicos',
      'Modelado 3D',
      'Renderizado 3D',
      'Diseño de interiores',
    ],
    soft: [
      'Comunicación visual efectiva',
      'Trabajo en equipo',
      'Resolución de problemas',
      'Pensamiento conceptual',
      'Creatividad aplicada al diseño',
      'Atención al detalle',
    ],
  },

  tools: ['AUTOCAD', 'SKETCHUP', 'D5 RENDER', 'TWINMOTION', 'PHOTOSHOP'],

  certifications: [
    { name: 'AutoCAD', issuer: 'USMA', date: 'may 2025' },
    { name: 'SketchUp', issuer: 'USMA', date: 'jun 2025' },
    { name: 'Renderizado 3D (D5 y Twinmotion)', issuer: 'USMA', date: 'ago 2025' },
  ] as Certification[],

  languages: [
    { name: 'Español', level: 'Nativo', score: 5 },
    { name: 'Inglés', level: 'Intermedio', score: 4 },
  ] as Language[],

  projects: {
    heading: 'Renders y visualización 3D',
    caption:
      'Proyecto Residencial · Dormitorio · Modelado y renderizado en D5 y Twinmotion · 2025',
    items: Array.from({ length: 11 }, (_, i) => ({
      src: `/renders/${i + 1}.jpeg`,
      alt: `Render ${i + 1} — visualización 3D de interior por Melany Santiesteban`,
    })) as Project[],
  },
}
