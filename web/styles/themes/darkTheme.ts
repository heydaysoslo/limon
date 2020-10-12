import { css, DefaultTheme } from 'styled-components'
import defaultTheme, { baseColors } from 'styles/themes/defaultTheme'

export const darkTheme: DefaultTheme = {
  ...defaultTheme,
  name: 'darkTheme',
  colors: {
    primary: baseColors.yellow,
    secondary: baseColors.yellow,
    text: baseColors.yellow,
    border: 'black',
    background: baseColors.green
  }
}

export default darkTheme
