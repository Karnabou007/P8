import { useContext } from 'react'
import styles from './Block.module.css'
import { ThemeContext } from '../../utils/context/Context'

function Block({ children }) {
  // Récupération de la valeur du thème depuis le contexte
  const { theme } = useContext(ThemeContext)

  return (
    <div className={theme === 'dark' ? styles.dark + ' ' + styles.block : styles.block}>
      {children}
    </div>
  )
}

export default Block
