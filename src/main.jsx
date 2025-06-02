import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react' // ✅ importa el componente
import './index.css'
import AppRoute from '../Routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SpeedInsights />
    <AppRoute />
  </StrictMode>,
)