import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  className?: string
  /**
   * Css value for height
   *
   * @example 20rem | 40px | calc(100% - var(--header-height))
   */
  height?: string
}

const Center: React.FC<Props> = ({ className, children }) => {
  return <div className={className}>{children}</div>
}

export default styled(Center)(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `
)
