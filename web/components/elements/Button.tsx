import React from 'react'
import { applyStyleModifiers } from 'styled-components-modifiers'
import styled, { css } from 'styled-components'
import { color } from '../../styles/utilities'

type Modifiers = 'secondary' | 'small'

type Props = {
  children: React.ReactNode
  className?: string
  modifiers?: Modifiers | Modifiers[]
  onClick?: () => void
}

const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={className}
      onMouseDown={e => e.preventDefault}
      {...props}
    >
      {children}
    </button>
  )
}

const BUTTON_MODIFIERS = {
  secondary: () => css`
    background: orange;
    border-color: orange;

    &:hover {
      background-color: none;
      color: orange;
    }
  `,
  small: () => css`
    padding: 10px;
  `
}

export default styled(Button)(
  ({ theme }) => css`
    appearance: none;
    background: none;
    display: inline-block;
    border: 2px solid transparent;
    background-color: ${theme.colors.text};
    color: ${theme.colors.background};
    font-size: 2rem;
    padding: 20px;
    transition: 0.15s ease background-color, color;
    cursor: pointer;

    &:hover {
      background-color: ${color.lighten(theme.colors.text, 0.2)};
    }

    ${applyStyleModifiers(BUTTON_MODIFIERS)}
  `
)
