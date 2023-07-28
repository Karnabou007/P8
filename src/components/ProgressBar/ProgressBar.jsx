import { useContext } from 'react'
import styles from './ProgressBar.module.css'
import { ThemeContext } from '../../utils/context/Context'

function ProgressBar({ percentage, index }) {
  // Récupération de la valeur du thème depuis le contexte
  const { theme } = useContext(ThemeContext)

  return (
    <div aria-label={`Maîtrise ${percentage}%`} className={theme === 'dark' ? styles.dark + ' ' + styles.container : styles.container}>
        <div className={styles.progress + ' ' + styles[`progress${percentage}`] + ' ' + styles[`progress${index}`]}></div>
    </div>
  )
}

export default ProgressBar
