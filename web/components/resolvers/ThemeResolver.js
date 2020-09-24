import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

export default function ThemeResolver({ themeName, children }) {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    if (themeName && themeName !== 'defaultTheme') {
      // Dynamically import template
      import(`../../styles/themes/${themeName}.ts`)
        .then(comp => setTheme(() => comp.default))
        .catch(err => console.log(err))
    }
  }, [themeName])

  if (!theme) return children

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
