import Link from 'next/link'

import { PAGES } from '@/constants/routes'

import styles from './index.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          {PAGES.map((p) => (
            <li key={p.id}>
              <Link href={p.href}>
                <a>{p.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
