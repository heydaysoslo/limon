import React from 'react'
import styled, { css } from 'styled-components'
import dynamic from 'next/dynamic'

import Pagebuilder from '../pagebuilder/Pagebuilder'
import Container from '@heydays/Container'
const Hero = dynamic(() => import('../Hero'))

const FrontPage = ({ className, pagebuilder }) => {
  return (
    <div className={className}>
      <Container className="Page__container">
        <Hero />
        {pagebuilder?.sections && (
          <div className="Page__content">
            <Pagebuilder sections={pagebuilder.sections} />
          </div>
        )}
      </Container>
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
