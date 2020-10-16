import { GlobalStyle } from '../styles/utilities/Global'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'

import 'lazysizes/plugins/respimg/ls.respimg.js'
import 'lazysizes/plugins/attrchange/ls.attrchange.js'
import 'lazysizes'
import 'default-passive-events'

import '../styles/reset.css'

import theme from 'styles/themes/defaultTheme'
import darkTheme from 'styles/themes/darkTheme'
import Header from 'components/Header'
import SEO from 'components/SEO'
import Footer from '../components/Footer'
import { SanityProvider } from '../components/context/sanityContext'
import { AppProvider } from 'components/context/appContext'
import useAppContext from '@heydays/useAppContext'

function MyApp(props) {
  return (
    <SanityProvider>
      <AppProvider>
        <Inner {...props} />
      </AppProvider>
    </SanityProvider>
  )
}

const Inner = ({ Component, pageProps }) => {
  const { state } = useAppContext()
  return (
    <ThemeProvider theme={state.isStoreOpen ? theme : darkTheme}>
      <Head>
        <link href="/fonts/fonts.css" rel="stylesheet" />
      </Head>
      <SEO
        page={pageProps?.frontpage || pageProps?.article || pageProps?.page}
      />
      <Header />
      <GlobalStyle />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
      <Footer />
    </ThemeProvider>
  )
}

export default MyApp
