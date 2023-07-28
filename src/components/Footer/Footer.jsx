import { useContext } from 'react'
import styles from './Footer.module.css'
import { ThemeContext } from '../../utils/context/Context'
import { Switch } from 'antd'

function Footer() {
  // Récupération de la valeur du thème depuis le contexte et de la fonction modifiant le thème
  const { toggleTheme, theme } = useContext(ThemeContext)

  return (
    <footer role='contentinfo' className={theme === 'dark' ? styles.dark + ' ' + styles.footer : styles.footer}>
      <div className={styles.contact}>
        <span>Hicham CHAOUI</span>
        <span className={styles.italic}>Développeur Web</span>
      </div>
      <div>
        <span className='visually-hidden'>Bouton Dark Mode</span>
        <Switch defaultChecked aria-label='Bouton Dark' onChange={toggleTheme} />
      </div>
      <div className={styles.links}>
        <a href='mailto: h.chaoui72@gmail.com' className={styles.socialNetworks}>
          <i className='fa-regular fa-envelope fa-2xl'></i>
          <span className='visually-hidden'>M'envoyer un e-mail</span>
        </a>
        <a href='https://github.com/Karnabou007' rel='noreferrer' target='_blank' className={styles.socialNetworks}>
          <i className='fa-brands fa-github fa-2xl'></i>
          <span className='visually-hidden'>GitHub</span>
        </a>
        <a href='https://www.linkedin.com/in/hicham-chaoui007/' rel='noreferrer' target='_blank' className={styles.socialNetworks}>
          <i className='fa-brands fa-linkedin fa-2xl'></i>
          <span className='visually-hidden'>Linkedin</span>
        </a>
        <a href='https://twitter.com/hicham_chaoui72' rel='noreferrer' target='_blank' className={styles.socialNetworks}>
          <i className='fa-brands fa-twitter fa-2xl'></i>
          <span className='visually-hidden'>Twitter</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
