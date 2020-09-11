const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const path = require('path')

const withSvgr = require('next-svgr')

module.exports = withPlugins([
  [
    withSvgr,
    {
      svgrOptions: {
        configFile: path.resolve(__dirname, '.svgrrc.js')
      }
    }
  ],
  withBundleAnalyzer
])
