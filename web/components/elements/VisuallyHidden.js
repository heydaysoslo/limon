import React from 'react'
import styled, { css } from 'styled-components'

const VisuallyHidden = ({ className, children }) => {
  return <div className={className}>{children}</div>
}

export default styled(VisuallyHidden)(
  ({ theme }) => css`
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap; /* added line */
  `
)
