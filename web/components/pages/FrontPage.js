import React from 'react'
import styled, { css } from 'styled-components'
import dynamic from 'next/dynamic'

import Pagebuilder from '../pagebuilder/Pagebuilder'
import Spacer from '@heydays/Spacer'

const Hero = dynamic(() => import('../Hero'))

// const fromSanityToThemeSchema = theme => {
//   if (!theme) return defaultTheme
//   const fonts = fontFactory({ responsiveFonts: theme.responsiveFonts, bp })
//   const spacing = spacingFactory({
//     responsiveSpacing: theme.responsiveSpacing,
//     bp
//   })
//   return {
//     ...theme,
//     fonts,
//     spacing
//   }
// }

const FrontPage = ({ className, pagebuilder, siteSettings }) => {
  // const theme = fromSanityToThemeSchema(siteSettings?.designTokens?.theme)

  return (
    <div className={className}>
      <Spacer custom="var(--header-height)" />
      <Hero />
      {pagebuilder?.sections && (
        <div className="Page__content">
          <Pagebuilder sections={pagebuilder.sections} />
        </div>
      )}
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
