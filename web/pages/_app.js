import { GlobalStyle } from '../styles/utilities/Global'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'

import 'lazysizes/plugins/respimg/ls.respimg.js'
import 'lazysizes/plugins/attrchange/ls.attrchange.js'
import 'lazysizes'

import theme, { darkTheme } from 'styles/themes'
import Header from 'components/Header'
import SEO from 'components/SEO'

function MyApp({ Component, pageProps }) {
  const [isDark, setIsDark] = React.useState(false)
  return (
    <ThemeProvider theme={isDark ? darkTheme : theme}>
      <Head>
        <link href="./fonts/fonts.css" rel="stylesheet" />
      </Head>
      <SEO
        page={pageProps?.frontpage || pageProps?.article || pageProps?.page}
      />
      <Header isDark={isDark} setIsDark={setIsDark} />
      <GlobalStyle />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default MyApp
