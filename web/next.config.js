const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const path = require('path')

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, 'public/favicon/favicon.png'),
        outputPath: '/static/assets'
      })
    )

    // Important: return the modified config
    return config
  }
}

const withSvgr = require('next-svgr')

module.exports = withPlugins(
  [
    [
      withSvgr,
      {
        svgrOptions: {
          configFile: path.resolve(__dirname, '.svgrrc.js')
        }
      }
    ],
    withBundleAnalyzer
  ],
  nextConfig
)
