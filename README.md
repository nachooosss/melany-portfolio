# Melany Santiesteban — CV Web

Portafolio y CV personal de Melany Santiesteban, diseñadora de interiores en Panamá.
React 18 + Vite + TypeScript + TailwindCSS + Framer Motion. PDF generado con
`@react-pdf/renderer`.

## Desarrollo

```bash
npm install
npm run dev       # servidor local
npm run build     # build producción
npm run preview   # previsualizar build
```

## Deploy en Vercel

1. Push del repo a GitHub/GitLab.
2. Vercel → New Project → importar el repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Deploy. No requiere variables de entorno.

`.npmrc` ya incluye `legacy-peer-deps=true` para tolerar el peer de
`@vitejs/plugin-react` con vite 8.

## Estructura

```
src/
  components/      secciones de la página + ProjectsCarousel + PrintableCV + DownloadButton
  data/cv.ts       única fuente de verdad del contenido del CV
  hooks/           variants de Framer Motion
  styles/          globals.css con tokens de diseño, ticker, cursor
public/
  perfil.jpg       (AÑADIR — foto de perfil 728x1080)
  renders/1..11.jpeg  (renders del proyecto residencial)
```

## PDF

El botón "Descargar CV" usa `@react-pdf/renderer` para construir el PDF
programáticamente con `<Document>`, `<Page>`, `<Text>`. No depende de
`html2canvas`, por lo que no sale en blanco y el texto es seleccionable.
Fuentes built-in: `Times-Roman` (display) + `Helvetica` (body) — aproximación
sobria a Fraunces + Inter.

## TODOs antes de publicar

- [ ] **Foto de perfil** — guardar `public/perfil.jpg` (728×1080, retrato).
      El Hero ya la referencia; mientras no exista se muestra un placeholder.
- [ ] **LinkedIn URL** — reemplazar `personal.linkedin.url` en
      [src/data/cv.ts](src/data/cv.ts).
- [ ] **Portafolio externo** — opcional; añadir `personal.portfolio.url` si
      existe un Behance / Drive adicional.
- [ ] **Imagen Open Graph** (opcional) — `public/og.jpg` 1200×630 +
      referencia en `index.html`.
