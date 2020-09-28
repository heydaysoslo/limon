import React, { useEffect, useLayoutEffect } from 'react'
import { useTheme } from 'styled-components'

const SvgFilter = () => {
  const theme = useTheme()
  useLayoutEffect(() => {
    const height = document.documentElement.scrollHeight
    console.log('SvgFilter -> height', height)
    document.documentElement.style.setProperty(
      '--document-height',
      height + 'px'
    )
  })
  return (
    <svg height="0" width="0">
      <filter id="roughpaper" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.04"
          result="noise"
          numOctaves="5"
        />

        <feDiffuseLighting
          in="noise"
          lighting-color={theme.colors.background}
          surfaceScale="1"
          result="light"
        >
          <feDistantLight azimuth="45" elevation="60" />
        </feDiffuseLighting>
        <feBlend mode="screen" in="light" in2="noise" result="blend" />
      </filter>
    </svg>
  )
}

export default SvgFilter
