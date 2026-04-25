# Melany Santiesteban — CV Web

Portafolio y CV personal de Melany Santiesteban, diseñadora de interiores en Ciudad de Panamá. Especializada en visualización 3D fotorrealista, planimetría técnica y diseño de espacios residenciales, comerciales y corporativos.

**Stack**: React 18 + Vite 8 + TypeScript + TailwindCSS 3 + Framer Motion (con LazyMotion) + Vercel Analytics & Speed Insights.

---

## 🚀 Desarrollo

```bash
npm install         # instala dependencias
npm run dev         # servidor local en http://localhost:5173
npm run build       # build de producción → dist/
npm run preview     # previsualiza el build de producción
```

`.npmrc` ya incluye `legacy-peer-deps=true` para tolerar peer-deps menores entre Vite y plugins.

---

## 📦 Deploy en Vercel

1. Push del repo a GitHub/GitLab.
2. Vercel → **New Project** → importar el repo.
3. Framework preset: **Vite**. Build: `npm run build`. Output: `dist`.
4. Deploy. No requiere variables de entorno.
5. **Activar Analytics + Speed Insights** desde el dashboard de Vercel (Settings → Analytics).

Después del deploy, verificar en:

- [Search Console](https://search.google.com/search-console) → enviar `sitemap.xml`
- [opengraph.xyz](https://www.opengraph.xyz/) → ver cómo se previsualiza al compartir
- [PageSpeed Insights](https://pagespeed.web.dev/) → métricas Core Web Vitals

---

## 🗂 Estructura

```text
melany-portfolio/
├── public/                          # Assets estáticos servidos directamente
│   ├── docs/
│   │   └── Melany-Santiesteban-CV.pdf
│   ├── moodboard/
│   │   ├── residencial/{1-5}.webp   # Moodboard del proyecto Japandi
│   │   └── salvia/{1-5}.webp        # Moodboard del proyecto biofílico
│   ├── renders/{1-11}.webp          # Galería de renders 3D
│   ├── favicon.svg                  # Marca MS
│   ├── logo.webp                    # Logo de marca
│   ├── perfil.webp                  # Foto de perfil
│   ├── feed.xml                     # RSS feed
│   ├── feed.json                    # JSON Feed v1.1
│   ├── robots.txt
│   └── sitemap.xml                  # Sitemap con captions de imágenes
├── src/
│   ├── components/                  # Componentes React
│   │   ├── Hero.tsx                 # Sección principal (eager, above-fold)
│   │   ├── About.tsx
│   │   ├── ToolsStrip.tsx           # Iconos de software (eager)
│   │   ├── ProjectsCarousel.tsx     # Carrusel de renders (lazy)
│   │   ├── Experience.tsx           # Línea de proyectos con moodboards (lazy)
│   │   ├── MoodboardCarousel.tsx    # Carrusel CSS-puro
│   │   ├── Lightbox.tsx             # Modal fullscreen para imágenes
│   │   ├── Section.tsx              # Wrapper de sección reutilizable
│   │   ├── SectionHeading.tsx       # Título + número + icono editorial
│   │   ├── TechIcons.tsx            # SVG inline de cada software
│   │   ├── StickyNav.tsx            # Nav anclada (scroll)
│   │   ├── FloatingContacts.tsx     # FAB mobile + stack desktop
│   │   ├── Preloader.tsx            # Splash inicial (lazy)
│   │   ├── ScrollBackground.tsx     # Gradiente parallax
│   │   ├── ScrollProgress.tsx       # Barra de progreso superior
│   │   ├── CustomCursor.tsx         # Cursor anillo terracota (desktop)
│   │   ├── Logo.tsx                 # Logo SVG inline
│   │   ├── DownloadButton.tsx       # Botón descarga CV
│   │   └── SkeletonImage.tsx        # Imagen con shimmer placeholder
│   ├── constants/
│   │   └── animation.ts             # Easings + springs centralizados
│   ├── data/
│   │   └── cv.ts                    # ⚠ ÚNICA FUENTE DE VERDAD del contenido
│   ├── hooks/
│   │   ├── useScrollReveal.ts       # Variants de framer-motion compartidas
│   │   └── useSwipe.ts              # Detector de swipe horizontal touch
│   ├── styles/
│   │   └── globals.css              # Tailwind + tokens + animaciones CSS
│   ├── App.tsx                      # Root con Suspense + LazyMotion + Analytics
│   ├── main.tsx                     # Entry point
│   └── vite-env.d.ts
├── index.html                       # SEO + Open Graph + JSON-LD + preload
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🛠 Cómo modificar el contenido

### Toda la data viene de `src/data/cv.ts`

Cualquier cambio textual o de configuración del CV se hace ahí. Es la **única fuente de verdad**. Los componentes solo leen, nunca redefinen.

### Cambiar datos personales (email, teléfono, redes)

Editá el objeto `cv.personal` en `src/data/cv.ts`.

### Agregar un nuevo render al carrusel de proyectos

1. Comprimí el .webp a un máximo de **~150KB** (usá [squoosh.app](https://squoosh.app/) calidad 80).
2. Copiá a `public/renders/{N+1}.webp` (siguiendo numeración).
3. En `src/data/cv.ts`, agregá una nueva entrada al array `cv.projects.items` con `src`, `alt`, `title` y `description`.
4. Actualizá `public/sitemap.xml` y `public/feed.xml` con el nuevo render para SEO.

### Cambiar la paleta de un proyecto del moodboard

En `src/data/cv.ts`, cada proyecto en `cv.experience` tiene un array `palette`:

```ts
palette: [
  { name: 'Terracota', hex: '#9C6B4F' },
  { name: 'Verde apagado', hex: '#7F8B72' },
  // ...
]
```

Modificá los hex y nombres. Los swatches en el componente se actualizan automáticamente.

### Cambiar las imágenes del moodboard de un proyecto

1. Reemplazá los archivos en `public/moodboard/residencial/` o `public/moodboard/salvia/` (mismo nombre numérico).
2. Si cambia la cantidad, ajustá `moodboardImages` array en el proyecto correspondiente en `cv.ts`.

### Agregar/modificar un proyecto de experiencia

En `src/data/cv.ts`, el array `cv.experience` contiene cada proyecto. Cada uno requiere:

- `title`, `client`, `category` (Residencial/Comercial), `area`, `place`, `dates`, `year`
- `concept` — el estilo del proyecto en una frase
- `palette` — 5 swatches
- `highlights` — bullets de logros
- `materials` — chips de materiales
- `tools` — softwares usados (deben coincidir con keys en TECH_ICONS)
- `stats` — 3 KPIs `{ value, label }`
- `objects` — iconos representativos `{ iconName, label }` (los iconos están mapeados en `Experience.tsx:ICON_MAP`)
- `moodboardImages` — paths relativos a las imágenes

### Cambiar el CV PDF descargable

1. Reemplazá `public/docs/Melany-Santiesteban-CV.pdf` por la versión nueva (mismo nombre).
2. La URL se mantiene → no hay que tocar código.

### Agregar un nuevo idioma, certificación, habilidad

Todo en `src/data/cv.ts` en sus respectivos arrays:

- `cv.languages`
- `cv.certifications`
- `cv.skills.{software, disciplines, soft}`
- `cv.education`

---

## 🎨 Tokens de diseño

### Paleta (variables CSS en `src/styles/globals.css`)

```css
--bg:      #F5F1EC   /* crema cálido (fondo) */
--surface: #FFFFFF   /* blanco para cards */
--ink:     #1C1917   /* casi negro (texto) */
--muted:   #6B5F55   /* marrón topo (secundario) */
--accent:  #9C6B4F   /* terracota tostado (acento) */
--line:    #C9B9A3   /* hairlines */
```

### Tipografía

- **Display** (h1, h2): Fraunces — serif editorial.
- **Sans** (body, UI): Inter — neogrotesque.

### Animaciones

Curvas centralizadas en `src/constants/animation.ts`:

```ts
EASE_OUT_EXPO     // [0.22, 1, 0.36, 1]  — default del sitio
EASE_IN_HARD      // [0.55, 0, 0.55, 0.2]
EASE_IN_OUT_SINE  // [0.45, 0, 0.55, 1]
EASE_OVERSHOOT    // [0.76, 0, 0.24, 1]
SPRING_SOFT       // type: spring, stiffness: 120, damping: 22
SPRING_SNAPPY     // type: spring, stiffness: 280, damping: 22
```

Cambiarlas acá afecta TODO el sitio simultáneamente.

---

## ⚡ Optimizaciones aplicadas

- **Code splitting con React.lazy + Suspense** — secciones below-fold se cargan async.
- **LazyMotion** de framer-motion — solo carga `domAnimation` features (~25KB en vez de 50KB).
- **Tree-shaking** de Lucide icons (solo se incluyen los 21 iconos usados).
- **Preload** de imágenes críticas above-fold (`perfil.webp` + `renders/1.webp`).
- **Prefetch** del PDF en idle time → click instantáneo.
- **DNS prefetch** + **preconnect** a Google Fonts.
- **`loading="lazy"` + `decoding="async"`** en imágenes below-fold.
- **`<picture>` con WebP** en todas las imágenes (compresión moderna).
- **JSON-LD schema** (Person + ProfessionalService + ImageGallery + ImageObjects).
- **Sitemap.xml** con `<image:image>` + captions en cada render.
- **RSS + JSON feeds** indexables por agregadores.
- **Vercel Analytics + Speed Insights** para métricas reales en producción.

---

## ♿ Accesibilidad

- Semántica correcta: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, h1 único.
- `aria-label` en todos los botones interactivos sin texto visible.
- `alt` descriptivo en imágenes; `alt=""` solo en decorativas.
- `:focus-visible` con ring terracota para keyboard navigation.
- `prefers-reduced-motion` respetado en cursor, ticker, droplets, splash.
- Contraste AA en todo el texto.

---

## 🔧 Troubleshooting

### El logo no se ve en WhatsApp/Facebook al compartir

- Asegurate que `og:image` apunte a una URL **absoluta y HTTPS**.
- Tamaño mínimo: 1200×630 px para `summary_large_image`.
- Verificá con [opengraph.xyz](https://www.opengraph.xyz/).
- Algunos cachés tardan; forzá un re-scrape en [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

### Una imagen tarda mucho en cargar

- Comprimí con calidad 80–85 en [squoosh.app](https://squoosh.app/).
- Target: < 200KB por render, < 100KB por moodboard image.

### Build falla por peer-deps

- El `.npmrc` con `legacy-peer-deps=true` debería evitarlo.
- Si pasa: `npm install --legacy-peer-deps`.

---

## 📋 TODOs pendientes (no afectan funcionamiento)

- [ ] Subir foto/composición OG image dedicada 1200×630 en `public/og-image.png` para previews premium en WhatsApp/Facebook (actualmente usa `logo.webp`).
- [ ] Reemplazar URL placeholder `melany-portfolio.vercel.app` por dominio final en `index.html`, `sitemap.xml`, `feed.xml`, `feed.json` cuando se compre.
- [ ] Después de comprar dominio, dar de alta en [Google Search Console](https://search.google.com/search-console) y enviar `sitemap.xml`.

---

## 📄 Licencia

Contenido (CV, fotos, renders): © Melany Santiesteban. Todos los derechos reservados.
Código del sitio: uso personal, no redistribuir.
