import React, { useEffect } from 'react'
import { animateScroll as scroll } from 'react-scroll'

import ArrowTop from '../icons/ArrowTop'
import styles from './index.module.css'

function ScrollToTop() {
  useEffect(() => {
    const { body } = document

    const handleScroll = () => {
      if (window.pageYOffset > 100) body.setAttribute('data-scrolltop', 'on')
      else body.setAttribute('data-scrolltop', 'off')
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <button
      id="scrolltop"
      type="button"
      className={styles.scrolltop}
      onClick={() => {
        scroll.scrollToTop()
      }}
      aria-label="Scroll to top"
    >
      <span className={styles['svg-icon']}>
        <ArrowTop />
      </span>
    </button>
  )
}

export default ScrollToTop
