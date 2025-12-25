import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  const base = (import.meta.env.BASE_URL || '/');
  const prefix = base.endsWith('/') ? base : base + '/';
  navigator.serviceWorker.register(`${prefix}sw.js`).catch(() => {});
}
