import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PersonalFinanceApp from './page/PersonalFinanceApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersonalFinanceApp />
  </StrictMode>,
)
