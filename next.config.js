const path = require('path')
require('dotenv').config()

const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withPlugins(
  [[withBundleAnalyzer]],
  withPWA({
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development'
    },
    future: {
      webpack5: true
    },
    webpack: (config) => {
      const { resolve } = config

      // jsconfig
      resolve.alias['@'] = path.resolve(__dirname)

      return config
    }
  })
)
