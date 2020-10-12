import React, { useState, useEffect, ComponentType, Component } from 'react'
import styled, { css } from 'styled-components'
import { icons } from 'styles/themes/defaultTheme'

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

type Modifiers = keyof typeof icons

type Props = {
  name: Name
  color?: string
  className?: string
  modifiers?: Modifiers
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

export default styled(Icon)(
  ({ theme, color, modifiers = 'medium' }) => css`
    display: inline-block;
    height: ${theme.icons[modifiers]};
    fill: ${color ? color : 'currentColor'};
  `
)
