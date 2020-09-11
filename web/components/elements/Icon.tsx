import React, { useState, useEffect, ComponentType, Component } from 'react'
import styled, { css } from 'styled-components'
import { applyStyleModifiers } from 'styled-components-modifiers'

/**
 *
 * Converts svg files from icons folder into react components with inline svg.
 * To change folder see `gatsby-config.js` and query below
 *
 * Usage:
 * <Icon name="facebook" modifiers="small" />
 * <Icon name="twitter" />
 * <Icon name="instagram" color="orange"/>
 * <Icon name="email" modifiers="large" />
 *
 * @param {string} name // name of the icon file without extension.
 * @param {string} color // overrides colors
 */

type Name =
  | 'email'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'pinterest'
  | 'podcast'
  | 'spotify'
  | 'twitter'
  | 'rss'

type Modifiers = 'small' | 'medium' | 'large'

type Props = {
  name: Name
  color?: string
  className?: string
  modifiers?: Modifiers | Modifiers[]
}

const Icon = ({ className, name }: Props) => {
  const [Component, setComponent] = useState<ComponentType<{
    className?: string
  }> | null>(null)

  useEffect(() => {
    // Dynamically import svg
    import(`../../assets/icons/${name}.svg`)
      .then(comp =>
        setComponent(() => {
          return comp.default
        })
      )
      .catch(err => console.log(err))
  }, [name])

  return Component && <Component className={className} />
}

// Create modifiers based on theme.icons settings. Modifier name will be
// the same as the key value of theme.icons ex. 'large'
const ICON_MODIFIERS = theme =>
  Object.keys(theme.icons).reduce((obj, key) => {
    obj[key] = ({ theme }) => css`
      height: ${theme.icons[key]};

      /* Type spesific styling in this case size */
      ${key === 'large' &&
        css`
          .cls-3 {
            fill: red;
          }
        `}
    `
    return obj
  }, {})

export default styled(Icon)<Props>(
  ({ theme, color }) => css`
    display: inline-block;
    height: ${theme.icons.medium};

    svg {
      height: 100%;
    }

    .cls-3 {
      fill: green;
    }

    ${applyStyleModifiers(ICON_MODIFIERS(theme))}

    /* Override color */
    ${color &&
      css`
        .cls-3,
        .cls-2 {
          fill: ${color};
        }
      `}
  `
)
