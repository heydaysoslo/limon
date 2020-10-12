import React from 'react'
import styled, { css } from 'styled-components'
import { SpacingFuncs } from 'styles/utilities/spacingFactory'

type Props = {
  className?: string
  size?: keyof SpacingFuncs
  custom?: string
}

const Spacer: React.FC<Props> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(Spacer)(
  ({ theme, size = 'md', custom }) => css`
    ${!custom && theme.spacing[size]('height')};
    ${custom && `height: ${custom}`};
  `
)
