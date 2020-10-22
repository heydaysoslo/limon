import Container from '@heydays/Container'
import React from 'react'
import styled, { css } from 'styled-components'
import Editor from '../editor/'

const TextSection = ({ className, body, themeName }) => {
  const Wrapper = themeName === 'inverted' ? Container : 'div'
  return (
    <Wrapper className={className}>
      <Editor blocks={body} />
    </Wrapper>
  )
}

export default styled(TextSection)(({ theme, themeName, alignment }) => {
  return css`
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    ${themeName === 'inverted'
      ? css`
          ${theme.spacing.lg('p')};
        `
      : css`
          ${theme.spacing.container('px')};
        `}
    ${alignment === 'center' &&
      css`
        * {
          margin: 0 auto;
        }
        text-align: center;
      `}
  `
})
