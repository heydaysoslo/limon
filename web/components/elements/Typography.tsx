import styled, { css } from 'styled-components'
import { applyStyleModifiers } from 'styled-components-modifiers'

import { fonts } from '../../styles/utilities'

type Modifiers = 'large' | 'small'

type Props = {
  modifiers?: Modifiers | Modifiers[]
}

const P_MODIFIERS = {
  large: ({ theme }) => css`
    font-size: 2rem;
  `,
  small: ({ theme }) => css`
    font-size: 0.8rem;
  `
}

export const P = styled.p<Props>(
  ({ theme }) => css`
    ${fonts.body()}
    ${applyStyleModifiers(P_MODIFIERS)}
  `
)

export const H1 = styled.h1(
  ({ theme }) => css`
    ${fonts.h1()}
  `
)

export const H2 = styled.h2(
  ({ theme }) => css`
    ${fonts.h1()}
  `
)

export const H3 = styled.h3(
  ({ theme }) => css`
    ${fonts.title()}
  `
)
