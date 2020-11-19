import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styled, { css } from 'styled-components'

import Stagger from '@heydays/animation/Stagger'
import ThemeResolver from '@heydays/ThemeResolver'

const sectionTypes = {
  section: dynamic(() => import('./Section.js')),
  cardSection: dynamic(() => import('./CardSection.js')),
  textSection: dynamic(() => import('./TextSection.js')),
  imageSection: dynamic(() => import('./FullImageSection.js')),
  textImageSplit: dynamic(() => import('./TextImageSplit.js')),
  carousel: dynamic(() => import('./TextImageSplit.js')),
  tabs: dynamic(() => import('../elements/Tabs.js')),
  videoSection: dynamic(() => import('./VideoSection')),
  menu: dynamic(() => import('../Menu.js')),
  scrollAnchor: dynamic(() => import('./ScrollAnchor'))
}

const StyledPageBuilder = styled.div(
  ({ theme }) => css`
    .PageBuilder__item {
      ${theme.spacing.section('mt')};
    }
  `
)

const PageBuilder = ({ sections }) => {
  return (
    <StyledPageBuilder>
      <Stagger>
        {sections?.map((section, index) => (
          <PageBuilderResolver
            key={section._key}
            section={section}
            {...section}
            prevComp={sections[index - 1] ? sections[index - 1] : null}
            nextComp={sections[index + 1] ? sections[index + 1] : null}
          />
        ))}
      </Stagger>
    </StyledPageBuilder>
  )
}

const PageBuilderResolver = ({ section, ...props }) => {
  const Component = sectionTypes?.[section?._type]
    ? sectionTypes[section._type]
    : null

  return Component ? (
    <ThemeResolver themeName={section?.themeName}>
      <Component className="PageBuilder__item" section={section} {...props} />
    </ThemeResolver>
  ) : (
    <p key={section._key} style={{ background: 'red' }}>
      Component {section._type} not found
    </p>
  )
}

export default PageBuilder
