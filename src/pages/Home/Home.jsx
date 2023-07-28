import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Carousel } from 'antd'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'
import Block from '../../components/Block/Block'
import Collapse from '../../components/Collapse/Collapse'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
// import works from '../../datas/works.json'
import { ThemeContext } from '../../utils/context/Context'
import { scrollToTopSpeed, useScrollToTop } from '../../utils/functions/scrollToTop'
import styles from './Home.module.css'
import bird from '../../assets/images/bird.webp'
import avatar from '../../assets/images/avatar.webp'
import { child, get, ref } from 'firebase/database'
import { getDownloadURL, getStorage, ref as refS } from 'firebase/storage'
import { database } from '../../firebase'

function Home() {
  const { theme } = useContext(ThemeContext)
  const [datas, setDatas] = useState({})
  const [worksPictures, setWorksPictures] = useState([])

  useEffect(() => {
    const dbRef = ref(database)
    get(child(dbRef, `works/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDatas(snapshot.val())
        } else {
          console.log("No data available")
        }
      })
      .catch((error) => {
        console.error(error);
      })

  }, [])

  useEffect(() => {
    const storage = getStorage();
    const loadImages = async () => {
      const images = await Promise.all(
        Object.values(datas).map(async (work) => {
          const url = await getDownloadURL(refS(storage, `images/${work.title}/${work.title.toLowerCase()}.webp`));
          return { ...work, imageUrl: url };
        })
      )
      setWorksPictures(images);
    }
    loadImages()
  }, [datas])


  // Mettre à jour le titre de la page
  useEffect(() => {
    document.title = 'Hicham CHAOUI - Accueil'
  }, [])

  // Générer le contenu du carousel à partir des données dans le fichier JSON
  const renderPictures = () => {
    if (worksPictures.length > 0) {
      return worksPictures.map((work, index) => (
        <div key={`${work.title + index}`}>
          <h3 className="visually-hidden">{work.title}</h3>
          <NavLink to={`/work/${work.title}`} onClick={scrollToTopSpeed} aria-label={`Lien vers le projet ${work.title}`}>
            <img className={styles.carouselPicture} src={work.imageUrl} alt={work.title} title={work.title} />
          </NavLink>
        </div>
      ));
    } else {
      return null;
    }
  };

  // Définir un état pour afficher ou masquer le bouton 'retour en haut de page'
  const [isVisible, scrollToTop] = useScrollToTop()

  return (
      <ParallaxProvider>
        <main role='main'className={theme === 'dark' ? styles.dark : ''}>
          <Parallax className={styles.parallax} translateX={['-2500px', '800px']}>
            <img src={bird} alt='Oiseau' title='Oiseau' className={styles.bird} />
          </Parallax>
          <section aria-label='Présentation succinte' className={styles.presentationContainer}>
            <h2 className='visually-hidden'>Présentation</h2>
            <Block>
              <p>Bonjour, je suis <strong>Hicham CHAOUI</strong>.</p>
              <p>Je termine actuellement ma formation de <strong>Développeur Web</strong> chez OpenClassrooms.</p>
              <p>Je souhaite par la suite proposer mes services en tant que <strong>freelance</strong>.</p>
            </Block>
            <div className={styles.decoration}>
              <img className={styles.profilePicture} src={avatar} alt='Avatar de Hicham CHAOUI' title='Avatar de Hicham CHAOUI' />
            </div>
          </section>
 
          {isVisible && (
            <button onClick={scrollToTop} className='iconeBack'>
              <i className='fa-solid fa-circle-chevron-up fa-4x'></i>
              <span className='visually-hidden'>Retour en haut de page</span>
            </button>
          )}
        </main>
    </ParallaxProvider>
  )
}

export default Home
