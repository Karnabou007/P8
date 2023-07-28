import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Block from '../../components/Block/Block'
// import works from '../../datas/works.json'
import { useScrollToTop } from '../../utils/functions/scrollToTop'
import styles from './Work.module.css'
import { child, get, ref } from 'firebase/database'
import { database } from '../../firebase'
import { getDownloadURL, getMetadata, getStorage, ref as refS } from 'firebase/storage'

function Work() {
  const storage = getStorage();

// Récupération de l'id dans les paramètres de l'URL
  const { id } = useParams()
  
  const navigate = useNavigate()

  const [datas, setDatas] = useState({})
  const [workPictures, setWorkPictures] = useState([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const dbRef = ref(database)
    get(child(dbRef, `works/${id}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDatas(snapshot.val())
        } else {
          // Vérification de l'existence de données et redirection si ce n'est pas le cas
          navigate('/error')
          console.log("No data available")
        }
      })
      .catch((error) => {
        console.error(error);
      })
      setIsMounted(true)
  }, [])

  useEffect(() => {
  if (isMounted) {
    // Mettre à jour le titre de la page
    document.title = `Hicham CHAOUI - Projet ${datas.title}`
    // Charger les images depuis Firebase Storage
    const loadImages = async () => {
      const images = await Promise.all([
        getDownloadURL(refS(storage, `images/${datas.title}/${datas.title.toLowerCase()}.webp`)),
        getDownloadURL(refS(storage, `images/${datas.title}/${datas.title.toLowerCase()}_maquette.webp`)),
        // Vérifier si l'image existe
        getMetadata(refS(storage, `images/${datas.title}/${datas.title.toLowerCase()}_maquette_mob.webp`))
          .then(metadata => {
            return getDownloadURL(refS(storage, `images/${datas.title}/${datas.title.toLowerCase()}_maquette_mob.webp`));
          })
          .then(url => {
            // Utiliser l'URL de téléchargement de l'image
            return url
          })
          .catch(error => {
            // Une erreur s'est produite, l'image n'existe pas
            console.error(`L'image n'existe pas.`)
            return null
          })
      ])
      const workPictures = [
        { name: `${datas.title.toLowerCase()}.webp`, url: images[0] },
        { name: `${datas.title.toLowerCase()}_maquette.webp`, url: images[1] }
      ]
      if (images[2]) {
        workPictures.push({ name: `${datas.title.toLowerCase()}_maquette_mob.webp`, url: images[2] });
      }
      setWorkPictures(workPictures)
      console.log(workPictures)
    }
    loadImages();
  }
  }, [datas])
  
  // Définir un état pour afficher ou masquer le bouton 'retour en haut de page'
  const [isVisible, scrollToTop] = useScrollToTop()
  
  return (
    datas && Object.keys(datas).length > 0 && Object.keys(workPictures).length > 0 && (
      <main role='main'>
        <Block>
          <h2 className={styles.title}>{datas.title}</h2>
          <section aria-label={`Projet ${datas.title}`} className={styles.workContainer}>
            <img className={styles.mainPicture} src={workPictures[0].url} alt={datas.title} title={datas.title} />
            <h3 className='visually-hidden'>Description du projet</h3>
            <p className={styles.p}>{datas.description}</p>
            {datas.problems && <div><h3 className='visually-hidden'>Problématiques rencontrées</h3><p className={styles.p}>{datas.problems}</p></div>}
            <div className={styles.flexContainer}>
              <div className={styles.widthContainer}>
                <ul className={styles.list}>
                  <h3 className={styles.h3}>Compétences évaluées sur ce projet :</h3>
                  {datas.skills.map((skill, index) => <li key={datas.title + index}>{skill}</li>)}
                </ul>
                <ul className={styles.list}>
                  <h3 className={styles.h3}>Technologies utilisées :</h3>
                  {datas.technos.map(techno => <li key={datas.title + techno}>{techno}</li>)}
                </ul>
              </div>
              <div className={styles.linkContainer}>
                <a className={styles.link} href={datas.linkGH} rel='noreferrer' target='_blank'>
                  <i className='fa-brands fa-github'></i>
                  <span className='visually-hidden'>Code sur GitHub</span>
                </a>
                {datas.link && <a className={styles.link} href={datas.link} rel='noreferrer' target='_blank'>
                  <i className='fa-solid fa-link'></i>
                  <span className='visually-hidden'>Projet en ligne sur GitHub Pages</span>
                </a>}
              </div>
            </div>
            <h3 className='visually-hidden'>Maquette :</h3>
            <picture>
              <source media='(max-width: 576px)' srcSet={workPictures[2] && workPictures[2].url} />
              <source media='(min-width: 576px)' srcSet={workPictures[1].url} />
              <img className={styles.pictureModel} src={workPictures[1].url} alt={`Maquette de ` + datas.title} title={`Maquette de ` + datas.title} />
						</picture>
          </section>
        </Block>
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
  )
}

export default Work
