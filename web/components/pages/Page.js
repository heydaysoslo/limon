import React from 'react'
import styled, { css } from 'styled-components'

import Pagebuilder from '../pagebuilder/Pagebuilder'
import { H1, P } from '@heydays/Typography'
import Container from '@heydays/Container'

const Page = ({ className, title, content, pagebuilder, ...props }) => {
  return (
    <div className={className}>
      <Container>
        <header className="Page__header">
          <P>Page</P>
          {title && <H1>{title}</H1>}
        </header>
        {pagebuilder && (
          <div className="Page__content">
            {pagebuilder?.sections && (
              <Pagebuilder sections={pagebuilder.sections} />
            )}
          </div>
        )}
      </Container>
    </div>
  )
}

export default styled(Page)(
  ({ theme: t }) => css`
    .Page__header {
      ${t.spacing.sm('mt')}
    }
    .Page__content {
      ${t.spacing.sm('mt')}
    }
  `
)
