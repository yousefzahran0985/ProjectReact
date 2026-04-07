import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MyCarProvider } from './components/Context/ItemCartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyCarProvider>
      <App />
    </MyCarProvider>
  </StrictMode>,
)
