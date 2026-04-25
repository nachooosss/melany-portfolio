export type Swatch = { name: string; hex: string }
export type StatItem = { value: string; label: string }
export type ObjectItem = { iconName: string; label: string }

export type ExperienceItem = {
  title: string
  client: string
  category: string
  area: string
  place: string
  dates: string
  year: string
  concept: string
  palette: Swatch[]
  highlights: string[]
  materials: string[]
  tools: string[]
  stats: StatItem[]
  objects: ObjectItem[]
  moodboardImages: string[]
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
  title: string
  description: string
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
    email: 'msantiestebangs@gmail.com',
    phone: '+507 6577-6878',
    phoneRaw: '+50765776878',
    whatsapp: 'https://wa.me/50765776878?text=Hola%20Melany%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo.',
    mapsUrl: 'https://maps.google.com/?q=Panama+City,Panama',
    linkedin: {
      label: 'Melany Santiesteban',
      url: 'https://www.linkedin.com/in/melany-santiesteban-b9960a402',
    },
    instagram: {
      label: '@ms.desiggns',
      url: 'https://www.instagram.com/ms.desiggns',
    },
    // TODO: Melany debe añadir la URL de su portafolio (Behance / Drive / sitio propio)
    portfolio: { label: 'Ver portafolio', url: '#' },
    photo: '/perfil.webp',
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
      title: 'Proyecto Residencial',
      client: 'Proyecto de portafolio',
      category: 'Residencial',
      area: '12.5 m²',
      place: 'Panama City, Panamá',
      dates: 'Oct 2025 – Dic 2025',
      year: '2025',
      concept: 'Japandi minimalista',
      palette: [
        { name: 'Terracota', hex: '#9C6B4F' },
        { name: 'Verde apagado', hex: '#7F8B72' },
        { name: 'Crema cálido', hex: '#E5DCC8' },
        { name: 'Madera natural', hex: '#B58A5E' },
        { name: 'Off-black', hex: '#2A2522' },
      ],
      highlights: [
        'Rediseño completo de habitación de 12.5 m², transformando un espacio neutro en un ambiente con identidad propia mediante estilo Japandi con influencias minimalistas.',
        'Propuesta cromática con paleta de terracota, verdes apagados e iluminación cálida para generar calidez en un espacio reducido.',
        'Resolución de reto de optimización espacial: maximizar funciones (descanso, almacenamiento, tocador) sin comprometer la sensación de amplitud.',
        'Entrega completa con levantamiento de medidas, planos técnicos, selección de mobiliario y renders fotorrealistas en D5 con iluminación atmosférica.',
      ],
      materials: [
        'Madera natural',
        'Tapicería tonos profundos',
        'Iluminación cálida 3000K',
        'Textiles texturizados',
      ],
      tools: ['SketchUp', 'D5 Render', 'AutoCAD'],
      stats: [
        { value: '12.5', label: 'm² intervenidos' },
        { value: '3', label: 'zonas integradas' },
        { value: 'Japandi', label: 'estilo aplicado' },
      ],
      objects: [
        { iconName: 'Bed', label: 'Descanso' },
        { iconName: 'Lamp', label: 'Iluminación cálida' },
        { iconName: 'Archive', label: 'Almacenamiento' },
        { iconName: 'Sparkles', label: 'Tocador' },
        { iconName: 'BookOpen', label: 'Lectura' },
        { iconName: 'Flower2', label: 'Detalle natural' },
      ],
      moodboardImages: [
        '/moodboard/residencial/1.webp',
        '/moodboard/residencial/2.webp',
        '/moodboard/residencial/3.webp',
        '/moodboard/residencial/4.webp',
        '/moodboard/residencial/5.webp',
      ],
    },
    {
      title: 'Salvia Ecologic Makeup',
      client: 'Proyecto de portafolio',
      category: 'Comercial',
      area: '180 m²',
      place: 'Panama City, Panamá',
      dates: 'Ene 2026 – Mar 2026',
      year: '2026',
      concept: 'Biofílico orgánico',
      palette: [
        { name: 'Verde salvia', hex: '#8FA68B' },
        { name: 'Tierra cálida', hex: '#A47551' },
        { name: 'Crema arena', hex: '#EFE3CB' },
        { name: 'Verde profundo', hex: '#3E5240' },
        { name: 'Beige reciclado', hex: '#C8B89E' },
      ],
      highlights: [
        'Diseño integral de 180 m² para tienda de maquillaje ecológico, con concepto biofílico que integra formas curvas.',
        'Selección y especificación de materiales reciclados, superficies biosostenibles y vegetación interior para cumplir los estándares de hábitat saludable requeridos por la marca.',
        'Desarrollo de distribución espacial y flujo de circulación orientado a la experiencia de compra.',
        'Modelado y renderizado fotorrealista en SketchUp y D5 para presentación de concepto al cliente.',
        'Elaboración de planos técnicos, moodboard, memoria descriptiva y ficha de materiales completa.',
      ],
      materials: [
        'Materiales reciclados',
        'Superficies biosostenibles',
        'Vegetación interior',
        'Curvas orgánicas',
        'Iluminación natural',
      ],
      tools: ['SketchUp', 'D5 Render', 'AutoCAD'],
      stats: [
        { value: '180', label: 'm² de tienda' },
        { value: '100%', label: 'materiales sostenibles' },
        { value: 'Biofílico', label: 'concepto guía' },
      ],
      objects: [
        { iconName: 'Leaf', label: 'Vegetación interior' },
        { iconName: 'Brush', label: 'Maquillaje' },
        { iconName: 'Recycle', label: 'Reciclados' },
        { iconName: 'Sun', label: 'Luz natural' },
        { iconName: 'Store', label: 'Retail' },
        { iconName: 'Droplets', label: 'Sostenible' },
      ],
      moodboardImages: [
        '/moodboard/salvia/1.webp',
        '/moodboard/salvia/2.webp',
        '/moodboard/salvia/3.webp',
        '/moodboard/salvia/4.webp',
        '/moodboard/salvia/5.webp',
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
    { name: 'Inglés', level: 'Medio', score: 3 },
  ] as Language[],

  projects: {
    heading: 'Renders y visualización 3D',
    items: [
      {
        src: '/renders/1.webp',
        title: 'Restaurante contemporáneo',
        description:
          'Área de restaurante con un estilo contemporáneo que combina mobiliario en madera y tapicería en tonos profundos, complementado con arte mural de inspiración natural y una iluminación cálida que realza la atmósfera acogedora.',
        alt: 'Render de área de restaurante contemporáneo con mobiliario en madera y tapicería en tonos profundos',
      },
      {
        src: '/renders/2.webp',
        title: 'Cocina abierta moderna',
        description:
          'Cocina abierta de diseño moderno con predominio de acabados en madera y superficies claras, que integra funcionalidad y estética mediante líneas limpias, iluminación indirecta y distribución eficiente.',
        alt: 'Render de cocina abierta moderna con acabados en madera y superficies claras',
      },
      {
        src: '/renders/3.webp',
        title: 'Gimnasio minimalista',
        description:
          'Espacio de gimnasio interior con enfoque minimalista, donde la iluminación ambiental y los revestimientos texturizados generan una atmósfera sofisticada y motivadora.',
        alt: 'Render de gimnasio interior minimalista con iluminación ambiental y revestimientos texturizados',
      },
      {
        src: '/renders/4.webp',
        title: 'Zona de entrenamiento',
        description:
          'Zona de entrenamiento equipada con mobiliario funcional y espejos de gran formato que amplifican la percepción espacial, acompañados de acabados cálidos y detalles en madera.',
        alt: 'Render de zona de entrenamiento con espejos de gran formato y acabados cálidos en madera',
      },
      {
        src: '/renders/5.webp',
        title: 'Área de maquillaje profesional',
        description:
          'Área de maquillaje profesional diseñada con iluminación perimetral uniforme, superficies limpias y organización eficiente que favorece la precisión y comodidad del usuario.',
        alt: 'Render de área de maquillaje profesional con iluminación perimetral uniforme',
      },
      {
        src: '/renders/6.webp',
        title: 'Lounge con vista urbana',
        description:
          'Espacio lounge con vista urbana que integra elementos naturales y mobiliario contemporáneo, creando un ambiente relajante y visualmente equilibrado.',
        alt: 'Render de lounge con vista urbana, elementos naturales y mobiliario contemporáneo',
      },
      {
        src: '/renders/7.webp',
        title: 'Dormitorio contemporáneo',
        description:
          'Dormitorio de estilo contemporáneo que destaca por su iluminación cálida, composición minimalista y elementos decorativos gráficos que aportan carácter al espacio.',
        alt: 'Render de dormitorio contemporáneo con iluminación cálida y composición minimalista',
      },
      {
        src: '/renders/8.webp',
        title: 'Detalle de mobiliario auxiliar',
        description:
          'Detalle de mobiliario auxiliar que resalta la simplicidad formal y la funcionalidad, acompañado de iluminación tenue que aporta calidez y sofisticación.',
        alt: 'Render de detalle de mobiliario auxiliar con iluminación tenue',
      },
      {
        src: '/renders/9.webp',
        title: 'Coffee Shop orgánico',
        description:
          'Área de Coffee Shop con diseño orgánico que combina formas curvas, texturas suaves y acentos naturales, generando un ambiente acogedor y moderno.',
        alt: 'Render de Coffee Shop con diseño orgánico, formas curvas y acentos naturales',
      },
      {
        src: '/renders/10.webp',
        title: 'Dormitorio principal',
        description:
          'Dormitorio principal con enfoque contemporáneo que integra materiales naturales, iluminación ambiental y una paleta neutra para crear un espacio de descanso elegante y confortable.',
        alt: 'Render de dormitorio principal contemporáneo con materiales naturales y paleta neutra',
      },
      {
        src: '/renders/11.webp',
        title: 'Dormitorio contemporáneo geométrico',
        description:
          'Dormitorio contemporáneo que integra materiales naturales y texturas cálidas, destacando un mobiliario de líneas limpias, iluminación ambiental estratégica y elementos decorativos geométricos que aportan equilibrio visual y confort.',
        alt: 'Render de dormitorio contemporáneo con materiales naturales, texturas cálidas y elementos decorativos geométricos',
      },
    ] as Project[],
  },
}
