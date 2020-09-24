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

export default styled(TextSection)(({ theme, themeName }) => {
  return css`
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    ${themeName === 'darkTheme' &&
      css`
        ${theme.spacing.lg('p')};
        text-align: center;
      `}
  `
})
