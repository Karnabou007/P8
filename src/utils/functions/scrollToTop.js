import { useEffect, useState } from 'react'

export const useScrollToTop = () => {
   // Déclaration de 'isVisible' initialisé à 'false'
  const [isVisible, setIsVisible] = useState(false)

  // Fonction permettant de basculer la visibilité de l'élément en fonction de la position de la fenêtre
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Fonction pour faire défiler la page vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Ajout d'un écouteur d'événement 'scroll' à la fenêtre
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return [isVisible, scrollToTop]
}

// Fonction pour faire défiler la page vers le haut rapidement
export const scrollToTopSpeed = () => {
  window.scrollTo({
    top: 0
  })
}