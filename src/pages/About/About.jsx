import { useEffect } from 'react'
import Block from '../../components/Block/Block'
import { useScrollToTop } from '../../utils/functions/scrollToTop'
import codePicture from '../../assets/images/code.webp'
import styles from './About.module.css'

function About() {
  // Mettre à jour le titre de la page
  useEffect(() => {
    document.title = 'Hicham CHAOUI - À propos'
  }, [])

  // Définir un état pour afficher ou masquer le bouton 'retour en haut de page'
  const [isVisible, scrollToTop] = useScrollToTop()

  return (
    <main role='main'>
      <div className={styles.blockFlex}>
        <section aria-label='Présentation complète' className={styles.block1}>
          <Block>
            <h2 className='visually-hidden'>Présentation</h2>
            <p>J'ai, aujourd'hui, un peu plus de la trentaine, et ai vécu toute mon enfance partagée entre l'Alsace et la Bretagne. Je vis maintenant en région parisienne, dans le Val d'Oise.</p>
            <p>Après avoir obtenu mon <strong>baccalauréat scientifique</strong>, je me suis dirigée vers les <strong>Mathématiques</strong>, ce qui me semblait logique et naturel.</p>
            <p>Une fois un bac +2 dans cette matière validé, j'ai réalisé que j'avais besoin d'espace. Étant sportive et aimant la nature, j'ai alors totalement changé de voie, et ai choisi de travailler avec les chiens.</p>
            <p>Fin 2021, j'ai ressenti l'envie de renouer avec mon premier amour, l'<strong>informatique</strong>. Quelques recherches sur internet m'ont amenée à m'intéresser aux langages HTML et CSS, puis au JavaScript.</p>
            <p>Une fois éprise de cette discipline, il m'était impossible de m'arrêter là. J'ai alors pris la décision de débuter une <strong>formation</strong> diplômante, afin d'en apprendre plus sur le métier de <strong>développeur web</strong>.</p>
            <p>Aujourd'hui, je suis en fin de formation chez OpenClassrooms. Mon objectif est d'allier mon emploi actuel, qui me satisfait pleinement, et ma passion pour le code, en tant que <strong>freelance</strong>.</p>
          </Block>
        </section>
        <div className={styles.block2}>
          <img className={styles.codePicture} src={codePicture} alt='Lignes de code' title='Lignes de code' />
        </div>
        <section aria-label='Ma formation' className={styles.block3}>
          <Block>
            <h2 className='visually-hidden'>Ma formation</h2>
            <p>J'ai réalisé plusieurs projets avec OpenClassrooms, accessibles via la page d'Accueil (avec leurs liens GitHub respectifs). J'ai également été reçue en soutenance par des évaluateurs de l'organisme pour chacun d'entre eux.</p>
            <p>En plus des <strong>compétences</strong> acquises (mentionnées sur la page principale), j'ai aussi appris à devenir <strong>autonome</strong>, et à chercher les réponses à mes questions. J'ai réalisé que j'étais d'un caractère à la fois patient et tenace, face aux différents 'bugs' que j'ai pu rencontrer, parfois résolus après de nombreuses heures de travail.</p>
            <p>Je suis ravie de m'être lancée dans cette aventure, car j'ai pris beaucoup de <strong>plaisir</strong> à participer à cette formation. Je souhaite poursuivre dans cette direction.</p>
          </Block>
        </section>
      </div>
      {isVisible && (
        <span className='iconeBackContainer'>
          <button onClick={scrollToTop} className='iconeBack'>
            <i className='fa-solid fa-circle-chevron-up fa-4x'></i>
            <span className='visually-hidden'>Retour en haut de page</span>
          </button>
        </span>
      )}
    </main>
  )
}

export default About
