import ScrollToTop from '@/components/scrollToTop'

import Footer from './footer'
import Header from './header'

function Layout({ children }) {
  return (
    <div className="fluid">
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Layout
