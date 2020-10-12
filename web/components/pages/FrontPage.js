import React from 'react'
import styled, { css, ThemeProvider } from 'styled-components'
import dynamic from 'next/dynamic'

import Pagebuilder from '../pagebuilder/Pagebuilder'
import Container from '@heydays/Container'
import fontFactory from 'styles/utilities/fontFactory'
import { bp } from 'styles/themes/defaultTheme'
import spacingFactory from 'styles/utilities/spacingFactory'
import defaultTheme from 'styles/themes/defaultTheme'
import Spacer from '@heydays/Spacer'

const Hero = dynamic(() => import('../Hero'))

const fromSanityToThemeSchema = theme => {
  if (!theme) return defaultTheme
  const fonts = fontFactory({ responsiveFonts: theme.responsiveFonts, bp })
  const spacing = spacingFactory({
    responsiveSpacing: theme.responsiveSpacing,
    bp
  })
  return {
    ...theme,
    fonts,
    spacing
  }
}

const FrontPage = ({ className, pagebuilder, siteSettings }) => {
  const theme = fromSanityToThemeSchema(siteSettings?.designTokens?.theme)

  return (
    <div className={className}>
      <ThemeProvider theme={theme}>
        <Spacer custom="var(--header-height)" />
        <Hero />
        {pagebuilder?.sections && (
          <div className="Page__content">
            <Pagebuilder sections={pagebuilder.sections} />
          </div>
        )}
      </ThemeProvider>
    </div>
  )
}

export default styled(FrontPage)(
  ({ theme }) => css`
    .Page__header {
      ${theme.spacing.sm('mt')}
    }
    .Page__content {
      ${theme.spacing.sm('mt')}
    }
  `
)
