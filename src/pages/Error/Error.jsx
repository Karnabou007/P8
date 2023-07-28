import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Block from '../../components/Block/Block'
import styles from './Error.module.css'

function Error() {
  // Mettre à jour le titre de la page
  useEffect(() => {
    document.title = 'Hicham CHAOUI - Erreur 404'
  }, [])

  return (
    <main role='main' className={styles.main}>
      <Block>
        <h2 className={styles.error}>404</h2>
        <p className={styles.text}>Oups ! La page que vous demandez n'existe pas.</p>
        <i className={styles.icone + ' fa-solid fa-arrow-right'}></i>
        <Link className={styles.link} to='/' aria-label="Retourner sur la page d'accueil">
          Retourner sur la page d'accueil
        </Link>
      </Block>
    </main>
  )
}

export default Error
