const isDev = process.env.NODE_ENV === 'production'

const SITE_NAME = 'Next.js starter'

const HOST = isDev ? 'http://localhost:3000/' : 'https://www.aaaa.com/'

const LOGO_URL = ''

const GA_TRACKING_ID = ''

export { GA_TRACKING_ID, HOST, isDev, LOGO_URL, SITE_NAME }
