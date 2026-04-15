import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

// Desactivar restauración automática de scroll por el navegador.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

// Si la URL trae un hash (#something), lo quitamos antes de montar
// para evitar que el navegador haga jump automático a ese id.
if (typeof location !== 'undefined' && location.hash) {
  history.replaceState(null, '', location.pathname + location.search)
}

// Fuerza el top antes del primer render.
window.scrollTo(0, 0)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
