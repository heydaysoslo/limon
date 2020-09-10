import React from 'react'
import { applyStyleModifiers } from 'styled-components-modifiers'
import styled, { css } from 'styled-components'

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
    border: 1px solid ${theme.colors.border};
    font-size: 2rem;
    padding: 20px;
    transition: 0.15s ease background-color, color;

    &:hover {
      background-color: black;
      color: white;
    }

    ${applyStyleModifiers(BUTTON_MODIFIERS)}
  `
)
