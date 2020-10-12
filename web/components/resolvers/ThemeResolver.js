import React, { useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from 'styled-components'

export default function ThemeResolver({ themeName, children }) {
  const [theme, setTheme] = useState(null)
  const currentTheme = useTheme()

  useEffect(() => {
    if (themeName && themeName !== 'defaultTheme') {
      const nextTheme =
        currentTheme.name === 'defaultTheme' ? 'darkTheme' : 'defaultTheme'
      if (themeName === 'inverted') {
        console.log(currentTheme.name)
        console.log('ThemeResolver -> nextTheme', nextTheme)
      }
      // Dynamically import template
      import(
        `../../styles/themes/${
          themeName === 'inverted' ? nextTheme : themeName
        }.ts`
      )
        .then(comp => setTheme(() => comp.default))
        .catch(err => console.log(err))
    }
  }, [themeName, currentTheme])

  if (!theme) return children

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
