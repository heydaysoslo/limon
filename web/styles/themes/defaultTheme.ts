import { css, DefaultTheme } from 'styled-components'

import { remSize } from '../utilities/Converters'
import breakpointsFactory, {
  bp as bpObject
} from '../utilities/breakpointsFactory'
import spacingFactory from '../utilities/spacingFactory'
import fontFactory, { fontFuncs } from '../utilities/fontFactory'
import color from '../utilities/Colors'

const green = '#01582E'
const yellow = '#fee93f'

export const baseColors = {
  green: '#01582E',
  yellow: '#fee93f'
}

export const colors = {
  primary: green,
  secondary: green,
  text: green,
  border: 'black',
  background: yellow
}

export const breakpoints = {
  xs: 0,
  sm: 550,
  md: 870,
  lg: 1200,
  xl: 1600,
  xxl: 1800
}

export const spacingUnit = {
  xs: remSize(5),
  sm: remSize(10),
  md: remSize(15),
  lg: remSize(40),
  xl: remSize(80),
  section: remSize(160),
  gutter: remSize(40)
}

export const responsiveSpacing = {
  container: {
    lg: '5rem',
    md: 'lg',
    xs: remSize(10)
  },
  gutter: {
    lg: 'gutter',
    xs: 'md'
  },
  lg: {
    xs: 'lg'
  },
  md: {
    lg: 'lg',
    xs: remSize(15)
  },
  pixel: {
    xs: '1px'
  },
  section: {
    xs: remSize(100)
  },
  sm: {
    lg: remSize(15),
    xs: remSize(10)
  },
  xs: {
    lg: remSize(10),
    xs: remSize(5)
  }
}

export const grid = {
  columns: 12
}

export const fontFamily = {
  sans: `'Venus', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;`,
  serif: `'Venus', times, serif`
}

export const responsiveFonts = {
  body: {
    xs: '28px/1.2',
    md: '36px/1.2',
    lg: '68px/1.2'
  },
  display: {
    xs: 'clamp(50px, 5vw, 200px)/1.2'
  },
  h1: {
    lg: '60px/1.2',
    xs: '40px/50px'
  },
  h2: {
    lg: '48px/1.2',
    md: '36px/1.2',
    xs: '28px/1.2'
  },
  h3: {
    xs: '24px/1.2'
  },
  small: {
    xs: '20px/1.2',
    md: '28px/1.2'
  },
  superLarge: {
    xs: 'clamp(50px, 10vw, 400px)/1.2'
  },
  title: {
    lg: '48px/1.2',
    md: '36px/1.2',
    xs: '28px/1.2'
  }
}

export const aspect = {
  portrait: 7 / 6,
  landscape: 2 / 3,
  square: 1,
  widescreen: 9 / 16,
  panorama: 11 / 16
}

export const elevation = {
  1: 9,
  2: 99,
  3: 999,
  4: 9999
}

export const contentWidth = {
  small: remSize(600),
  large: remSize(1200)
}

export const icons = {
  small: remSize(20),
  medium: remSize(40),
  large: remSize(60)
}

export const trans = {
  fast: `0.1s ease`,
  slow: `1s ease`
}

export const borderWidth = {
  small: remSize(1),
  large: remSize(3)
}

/**
 * Usage:
 * {
 *  border-left: ${theme.border.large()}
 * }
 */
export const border = {
  large: () => ({ theme }) =>
    `${theme.borderWidth.large} solid ${theme.colors.border};`,
  small: () => ({ theme }) =>
    `${theme.borderWidth.small} solid ${theme.colors.border};`
}

export const bp: bpObject = breakpointsFactory(breakpoints)
const spacing = spacingFactory({
  responsiveSpacing,
  bp: {
    sm: bp.sm,
    md: bp.md,
    lg: bp.lg,
    xl: bp.xl,
    xxl: bp.xxl
  }
})

const fonts: fontFuncs = fontFactory({ responsiveFonts, bp })

/**
 * TODO: Add types properly with
 * const theme: DefaultTheme = {
 *  ...
 * }
 *
 * export default theme
 */

const theme: DefaultTheme = {
  name: 'defaultTheme',
  colors,
  breakpoints,
  color,
  bp,
  spacingUnit,
  grid,
  fontFamily,
  aspect,
  elevation,
  fonts,
  responsiveFonts,
  spacing,
  responsiveSpacing,
  contentWidth,
  trans,
  icons,
  borderWidth,
  border
}

export default theme
