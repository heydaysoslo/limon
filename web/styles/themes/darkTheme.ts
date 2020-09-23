import { css, DefaultTheme } from 'styled-components'
import defaultTheme, { baseColors } from 'styles/themes/defaultTheme'

export const darkTheme: DefaultTheme = {
  ...defaultTheme,
  colors: {
    primary: baseColors.yellow,
    secondary: baseColors.yellow,
    text: baseColors.yellow,
    border: 'black',
    background: baseColors.green
  }
}

export default darkTheme
