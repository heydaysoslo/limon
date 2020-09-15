import styled, { css } from 'styled-components'

import { fonts } from '../../styles/utilities'

type Modifiers = 'large' | 'small'

type Props = {
  modifiers?: Modifiers | Modifiers[]
}

export const P = styled.p<Props>(
  ({ theme, modifiers }) => css`
    ${fonts?.body?.()}
    ${modifiers?.includes('large') &&
      css`
        font-size: 2rem;
      `}
    ${modifiers?.includes('large') &&
      css`
        font-size: 0.8rem;
      `}
  `
)

export const H1 = styled.h1(
  ({ theme }) => css`
    ${fonts?.h1?.()}
  `
)

export const H2 = styled.h2(
  ({ theme }) => css`
    ${fonts?.h1?.()}
  `
)

export const H3 = styled.h3(
  ({ theme }) => css`
    ${fonts?.title?.()}
  `
)
