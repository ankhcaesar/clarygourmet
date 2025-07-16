import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './styles/reset.css';
import "./styles/variables.css";
import AppRoute from '../Routes'

if ('startViewTransition' in document) {
  console.log('View Transitions API soportada!');
} else {
  console.warn('View Transitions no soportada - Usando fallback');
}

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <SpeedInsights />
    <AppRoute />
  </StrictMode>,
)