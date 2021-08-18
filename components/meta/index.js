import Head from 'next/head'

import { HOST, LOGO_URL, SITE_NAME } from '../../constants'

const Meta = (props) => {
  const { title, image, desc, canonical } = props
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>{title}</title>
      <meta name="description" content={desc} />

      {/* facebook */}
      <meta property="og:title" content={SITE_NAME} />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={HOST} />
      <meta property="og:type" content="website" />

      {image ? (
        <meta property="og:image" content={`${image}`} />
      ) : (
        <meta property="og:image" content={LOGO_URL} />
      )}

      {/* pwa */}
      {canonical && <link rel="canonical" href={`${canonical}`} />}

      {/* connect to domain of font files  */}
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light+Two&family=Swanky+and+Moo+Moo&display=swap"
        rel="stylesheet"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/favicons/apple-touch-icon.png?v=zXvom8rnqL"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/favicons/favicon-32x32.png?v=zXvom8rnqL"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/assets/favicons/android-chrome-192x192.png?v=zXvom8rnqL"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/favicons/favicon-16x16.png?v=zXvom8rnqL"
      />

      <link rel="manifest" href="/site.webmanifest?v=zXvom8rnqL" />

      <link
        rel="mask-icon"
        href="/assets/favicons/safari-pinned-tab.svg?v=zXvom8rnqL"
        color="#156aa9"
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="/assets/favicons/favicon.ico?v=zXvom8rnqL"
      />
      <link
        rel="icon"
        type="image/x-icon"
        href="/assets/favicons/favicon.ico?v=zXvom8rnqL"
      />

      <meta name="application-name" content={title} />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />

      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="/assets/favicons/mstile-144x144.png?v=zXvom8rnqL"
      />
      <meta
        name="msapplication-config"
        content="/browserconfig.xml?v=zXvom8rnqL"
      />

      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  )
}
export default Meta
