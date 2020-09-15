import React from 'react'
import styled, { css } from 'styled-components'
import { bp, color } from '../../styles/utilities'

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

export default styled(Button)<Props>(
  ({ theme, modifiers }) => css`
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

    ${bp.above.md`
      background: orange;
    `}

    ${modifiers?.includes('small') &&
      css`
        padding: 0;
      `}

    ${modifiers?.includes('secondary') &&
      css`
        color: ${theme.colors.primary};
        background-color: ${theme.colors.secondary};
      `}
  `
)
