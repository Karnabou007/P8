import '../../style/global-style.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useContext, useEffect } from 'react'
import Error from '../../pages/Error/Error'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import About from '../../pages/About/About'
import Projets from '../../pages/Projets/Projets/Projets'
import Work from '../../pages/Work/Work'
import AddWork from '../../pages/AddWork/AddWork'
import Loader from '../Loader/Loader'
import { ThemeContext } from '../../utils/context/Context'
const Home = lazy(() => import('../../pages/Home/Home'))

function App() {
  // Récupération de la valeur du thème depuis le contexte
  const { theme } = useContext(ThemeContext)

   // Changement du thème de la page en fonction de la valeur du contexte
  useEffect(() => {
    if (theme === 'dark') {
      document.getElementById('root').classList.add('dark')
    } else {
      document.getElementById('root').classList.remove('dark')
    }
  }, [theme])

  // Structure de l'application
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
        <Route path='/about' element={<About />} />
        <Route path='/admin' element={<AddWork />} />
        <Route path='/projets' element={<Projets />} />
        <Route path='/work/:id' element={<Work />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App
