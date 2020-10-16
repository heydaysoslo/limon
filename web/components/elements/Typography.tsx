import styled, {
  css,
  DefaultTheme,
  FlattenSimpleInterpolation
} from 'styled-components'

import { applyModifier } from '../../styles/utilities'

type Modifiers = 'large' | 'small'

type PModifiers = {
  theme: DefaultTheme
  modifiers?: Modifiers | Modifiers[] | null | undefined
}

export const P = styled.p<PModifiers>(
  ({ theme, modifiers = null }) => css`
    ${!modifiers &&
      css`
        ${theme.fonts.body()}
      `}
    ${applyModifier(
      'small',
      css`
        ${theme.fonts.small()};
      `
    )}
    ${applyModifier(
      'large',
      css`
        ${theme.fonts.superLarge()};
        text-transform: uppercase;
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

export const A = styled.a(
  ({ theme }) => css`
    color: currentColor;
    text-decoration: underline;
  `
)
