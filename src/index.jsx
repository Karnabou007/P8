import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import { ThemeProvider } from './utils/context/Context'

const root = ReactDOM.createRoot(document.getElementById('root'))

// Rendu de l'application
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)