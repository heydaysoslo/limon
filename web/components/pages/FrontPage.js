import React from 'react'
import styled, { css } from 'styled-components'

import Pagebuilder from '../pagebuilder/Pagebuilder'
import Container from '@heydays/Container'
import { spacing } from '../../styles/utilities'
import Hero from '../Hero'

const FrontPage = ({ className, pagebuilder, title }) => {
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
      ${spacing.sm('mt')}
    }
    .Page__content {
      ${spacing.sm('mt')}
    }
  `
)
