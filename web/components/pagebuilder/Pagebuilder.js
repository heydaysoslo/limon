import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styled, { css, ThemeProvider } from 'styled-components'

import CardSection from './CardSection'
import TextSection from './TextSection'
import FullImageSection from './FullImageSection'
import Section from './Section'
import TextImageSplit from './TextImageSplit'
import VideoSection from './VideoSection'
import Tabs from '../elements/Tabs'
import Stagger from '@heydays/animation/Stagger'
import Menu from '../Menu'
import ThemeResolver from '@heydays/ThemeResolver'

const sectionTypes = {
  section: 'pagebuilder/Section.js',
  cardSection: 'pagebuilder/CardSection.js',
  textSection: 'pagebuilder/TextSection.js',
  imageSection: 'pagebuilder/FullImageSection.js',
  textImageSplit: 'pagebuilder/TextImageSplit.js',
  carousel: 'pagebuilder/TextImageSplit.js',
  tabs: 'elements/Tabs.js',
  videoSection: 'pagebuilder/VideoSection',
  menu: 'Menu.js',
  scrollAnchor: 'pagebuilder/ScrollAnchor'
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
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    if (sectionTypes[section._type]) {
      // Dynamically import template
      import(`../../components/${sectionTypes[section._type]}`)
        .then(comp => setComponent(() => comp.default))
        .catch(err => console.log(err))
    }
  }, [section])

  return Component ? (
    <ThemeResolver themeName={section?.themeName}>
      <Component className="PageBuilder__item" section={section} {...props} />
    </ThemeResolver>
  ) : (
    <p key={section._key} style={{ background: 'yellow' }}>
      Component {section._type} not found
    </p>
  )
}

export default PageBuilder
