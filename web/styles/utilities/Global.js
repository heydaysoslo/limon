import { createGlobalStyle, css } from 'styled-components'
import { globalTypeStyle } from './Typography'

export const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    html {
      font-size: 62.5%;
    }
  :root {
    --document-height: 10000px;
  }

    body {
      position: relative;
      overflow-x: hidden;
      font-family: ${theme.fontFamily.sans};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: ${theme.colors.text};
      ${theme.fonts.body()}
      background-color: ${theme.colors.background};
      /* &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: var(--document-height);
        z-index: -1;
          filter: url(#roughpaper);
      } */
    }

    ::selection {
      background: ${theme.colors.primary};
      color: white;
    }

    figure {
      margin: 0;
      position: relative;
    }

    img {
      max-width: 100%;
      height: auto;
      vertical-align: middle; /*  remove space above/below images */
    }

    [role='button'] {
      cursor: pointer;
    }

    button {
      cursor: pointer;
      appearance: none;
      border-radius: 0;
      background: none;
      color: currentColor;
      font-size: inherit;
      border: none;
      padding: 0;
      vertical-align: baseline;
      font-family: ${theme.fontFamily.sans};
      ${theme.fonts.body()};

      &:disabled {
        cursor: default;
      }
    }

    select {
      cursor: pointer;
      appearance: none;
      border: none;
      background: none;
      font-family: ${theme.fontFamily.sans};

      ${theme.fonts.body()}
    }

    input {
      appearance: none;
      margin: 0;
      padding: 0;
      border-radius: 0;
    }

    input[type='number'] {
      appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      appearance: none;
    }

    hr {
      height: ${theme.borderWidth.large};
      width: 100%;
      background: ${theme.colors.border};
      border: none;
    }

    summary {
      cursor: pointer;
    }

    ul {
      list-style: none;
    }

    /* Typography */
    ${globalTypeStyle}

    /* Global styling from theme */
    ${theme.defaultStyle && theme.defaultStyle}

    /* Add visible tag that shows breakpoint for dev environment */
    ${process.env.NODE_ENV === 'development' &&
      css`
    body:after {
      content: "${theme.breakpoints[0]}";
      background: rgba(255, 255, 255, 0.5);
      position: fixed;
      ${theme.spacing.xs(['py', 'px', 'bottom', 'left'])}
      ${theme.fonts.body()}
      ${Object.keys(theme.breakpoints).map(key => {
        return css`
          ${theme?.bp?.[key]} {
            content: "${key}";
          }
        `
      })}
    }
  `}

  `
)
