import React from 'react'
import styled, { css } from 'styled-components'
import Editor from '../editor/'

const TextSection = ({ className, body }) => {
  return (
    <div className={className}>
      <Editor blocks={body} />
    </div>
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
        text-align: center;
      `}
  `
})
