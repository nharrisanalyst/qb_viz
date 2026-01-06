import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import GoatCounterTracker  from './components/GoatCounterTracker/GoatCounterTracker'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <GoatCounterTracker/>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
