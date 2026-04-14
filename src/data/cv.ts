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

export const cv = {
  personal: {
    name: 'Melany Santiesteban',
    role: 'Diseñadora de Interiores',
    tagline: 'Especializada en visualización 3D y planimetría técnica',
    location: 'Panamá City, Panamá',
    availability: 'Disponible para prácticas y proyectos freelance',
    email: 'msg072garcia@gmail.com',
    phone: '65776878',
    // TODO: Melany debe añadir su URL real de LinkedIn antes de publicar
    linkedin: { label: 'Melany Santiesteban', url: '#' },
    // TODO: Melany debe añadir su URL de portafolio (Behance / Drive / sitio propio)
    portfolio: { label: 'Ver portafolio', url: '#' },
    photo: '/melany.jpg',
  },

  profile: [
    'Estudiante de Diseño de Interiores en tercer año, con formación en el desarrollo y ejecución de proyectos enfocados en la funcionalidad, la estética y la coherencia espacial. Me especializo en la creación de espacios cálidos y visualmente equilibrados, adaptados a las necesidades específicas de cada usuario.',
    'Cuento con experiencia en elaboración y lectura de planos técnicos, modelado y visualización 3D, así como en el desarrollo de propuestas conceptuales, moodboards y memorias descriptivas para proyectos residenciales, comerciales e institucionales.',
    'Manejo herramientas como AutoCAD, SketchUp, D5, Twinmotion y Photoshop para la representación de proyectos de diseño.',
  ],

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
    software: [
      'AutoCAD',
      'SketchUp',
      'D5 Render',
      'Twinmotion',
      'Photoshop',
    ],
    technical: [
      'Elaboración y lectura de planos técnicos',
      'Modelado y visualización 3D',
      'Moodboards y memorias descriptivas',
      'Selección de materiales, iluminación y mobiliario',
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

  certifications: [
    { name: 'AutoCAD', issuer: 'USMA', date: 'may 2025' },
    { name: 'SketchUp', issuer: 'USMA', date: 'jun 2025' },
    { name: 'Renderizado 3D (D5 y Twinmotion)', issuer: 'USMA', date: 'ago 2025' },
  ] as Certification[],

  languages: [
    { name: 'Español', level: 'Nativo', score: 5 },
    { name: 'Inglés', level: 'Intermedio', score: 4 },
  ] as Language[],
}
