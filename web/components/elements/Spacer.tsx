import React from 'react'
import styled, { css } from 'styled-components'
import { SpacingFuncs } from 'styles/utilities/spacingFactory'
import { responsiveSpacing } from 'styles/themes/defaultTheme'

const COLORS = ['083d77', 'ebebd3', 'f4d35e', 'ee964b', 'f95738'].map(
  color => `#${color}`
)
const COLOR_MAP = Object.keys(responsiveSpacing).reduce((res, key, i) => {
  res[key] = COLORS[i % COLORS.length]
  return res
}, {})

export type SpacerProps = {
  className?: string
  size?: keyof SpacingFuncs
  custom?: string
}

const Spacer: React.FC<SpacerProps> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(Spacer)(({ theme, size = 'md', custom }) => {
  let showSpacing = false
  if (
    process.env.NODE_ENV === 'development' &&
    typeof document !== 'undefined'
  ) {
    showSpacing = document?.body?.classList?.contains?.('showSpacing')
  }
  return css`
    ${!custom && theme.spacing[size](['height', 'width'])};
    ${custom &&
      css`
        height: ${custom};
        width: ${custom};
      `};

    ${showSpacing &&
      css`
      position: relative;
        &:before {
          position: absolute;
          top: 0;
          left: 0;
          content: "${size}";
          display: inline-block;
          ${!custom && theme.spacing[size](['height', 'width'])};
          ${custom &&
            css`
              height: ${custom};
              width: ${custom};
            `};
          background-color: ${COLOR_MAP[size]};
          font-size: 8px;
        }
      `}
  `
})
