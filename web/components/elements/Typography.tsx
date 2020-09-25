import styled, { css } from 'styled-components'

import { applyModifier } from '../../styles/utilities'

export const P = styled.p(
  ({ theme }) => css`
    ${theme.fonts.body()}

    ${applyModifier(
      'small',
      css`
        ${theme.fonts.small()};
      `
    )}
    ${applyModifier(
      'large',
      css`
        ${theme.fonts.display()};
      `
    )}
  `
)

export const H1 = styled.h1(
  ({ theme }) => css`
    ${theme.fonts.h1()}
  `
)

export const H2 = styled.h2(
  ({ theme }) => css`
    ${theme.fonts.h2()}
    text-transform: uppercase;
  `
)

export const H3 = styled.h3(
  ({ theme }) => css`
    ${theme.fonts.title?.()}
  `
)
