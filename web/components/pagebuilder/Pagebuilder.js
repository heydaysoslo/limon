import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styled, { css } from 'styled-components'

import Stagger from '@heydays/animation/Stagger'
import ThemeResolver from '@heydays/ThemeResolver'

const sectionTypes = {
  section: dynamic(() => import('pagebuilder/Section.js')),
  cardSection: dynamic(() => import('pagebuilder/CardSection.js')),
  textSection: dynamic(() => import('pagebuilder/TextSection.js')),
  imageSection: dynamic(() => import('pagebuilder/FullImageSection.js')),
  textImageSplit: dynamic(() => import('pagebuilder/TextImageSplit.js')),
  carousel: dynamic(() => import('pagebuilder/TextImageSplit.js')),
  tabs: dynamic(() => import('elements/Tabs.js')),
  videoSection: dynamic(() => import('pagebuilder/VideoSection')),
  menu: dynamic(() => import('Menu.js')),
  scrollAnchor: dynamic(() => import('pagebuilder/ScrollAnchor'))
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
