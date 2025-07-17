import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './styles/reset.css';
import "./styles/variables.css";
import AppRoute from '../Routes'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <SpeedInsights />
    <AppRoute />
  </StrictMode>,
)