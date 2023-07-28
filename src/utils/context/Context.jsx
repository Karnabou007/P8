import { createContext, useState } from 'react'

// Création du ThemeContext
export const ThemeContext = createContext('light')

// Création du ThemeProvider
export const ThemeProvider = ({ children }) => {
  // Initialisation du thème
  const [theme, setTheme] = useState('light')

  // Fonction permettant d'inverser la valeur du thème
  const toggleTheme = () => {
    setTheme(theme.toString() === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}