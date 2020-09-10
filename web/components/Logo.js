import React from 'react'
import styled, { css } from 'styled-components'
import { useTheme } from 'styled-components'

const Logo = ({ className }) => {
  const theme = useTheme()
  return (
    <svg className={className} viewBox="0 0 404.28 134.33">
      <path
        fill={theme.colors.text}
        d="M62.45,132.41H0V31.56h11.64v90.57h50.81V132.41z M89.51,31.56v100.85H77.86V31.56H89.51z M160.57,132.41
	h-11.79L120.5,41.09v91.33h-11.49V31.56h20.26l25.7,83.77l25.25-83.77h20.41v100.85h-11.64V40.33L160.57,132.41z M315.01,81.24
	c0,28.48-18.14,53.09-51.08,53.09c-31.39,0-50.7-23.35-50.7-52.94c0-28.44,19.57-52.42,51.26-52.42
	C295.19,28.97,315.01,52.42,315.01,81.24z M226.03,80.98c0,22.37,13.29,42.9,38.3,42.9c25.28,0,37.87-19.5,37.87-42.39
	c0-21.9-13.17-42.08-38.42-42.08C239.46,39.41,226.03,58.78,226.03,80.98z M404.28,132.41H386.9l-47.93-87.09v87.09h-11.64V31.56
	h16.48l48.84,88.91V31.56h11.64V132.41z M260.11,22.07h10.08L283.13,0h-14.84L260.11,22.07z"
      />
    </svg>
  )
}

export default styled(Logo)(
  ({ theme }) => css`
    height: 50px;
  `
)
