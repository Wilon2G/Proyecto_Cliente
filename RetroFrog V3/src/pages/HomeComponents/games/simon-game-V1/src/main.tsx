import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SimonGame from './SimonGame.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimonGame />
  </StrictMode>,
)
