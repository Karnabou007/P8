import React from 'react';
import styles from './Loader.module.css'

// Loader visible au chargement du site le temps que la page s'affiche
function Loader() {
  return <div className={styles.loader}><span></span></div>
}

export default Loader