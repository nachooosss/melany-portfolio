# Melany Santiesteban — CV Web

Portafolio y CV personal de Melany Santiesteban, diseñadora de interiores en Panamá.
React 18 + Vite + TypeScript + TailwindCSS + Framer Motion. Descarga a PDF con html2pdf.js.

## Desarrollo

```bash
npm install
npm run dev       # servidor local
npm run build     # build producción
npm run preview   # previsualizar build
```

## Deploy en Vercel

1. Subir el repo a GitHub/GitLab.
2. En Vercel → New Project → importar el repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Deploy.

No requiere variables de entorno.

## Estructura

```
src/
  components/      secciones de la página + PrintableCV + DownloadButton
  data/cv.ts       única fuente de verdad del contenido del CV
  hooks/           variants de Framer Motion
  styles/          globals.css con tokens de diseño
```

Todo el contenido del CV vive en [src/data/cv.ts](src/data/cv.ts). Editar allí
y el sitio + el PDF se actualizan automáticamente.

## TODOs antes de publicar

- [ ] Añadir foto real en `public/melany.jpg` (cuadrada, mínimo 800×800).
- [ ] Reemplazar la URL de LinkedIn en `src/data/cv.ts` (`personal.linkedin.url`).
- [ ] Añadir la URL del portafolio (Behance / Drive / sitio propio) en
      `personal.portfolio.url`.
- [ ] Opcional: crear una imagen Open Graph (1200×630) y añadirla como
      `public/og.jpg` + referencia en `index.html`.
