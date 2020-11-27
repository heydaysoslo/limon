import React from 'react'
import styled, { css } from 'styled-components'
import dynamic from 'next/dynamic'

import Pagebuilder from '../pagebuilder/Pagebuilder'
import Spacer from '@heydays/Spacer'
import SEO from 'components/SEO'

const Hero = dynamic(() => import('../Hero'))

const FrontPage = ({ className, pagebuilder, siteSettings }) => {
  return (
    <div className={className}>
      <SEO seo={siteSettings.seo} />
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
