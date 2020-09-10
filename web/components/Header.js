import React, { useLayoutEffect } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Switch from '@heydays/Switch'
import Container from './elements/Container'
import Logo from './Logo'

const Header = ({ className, isDark, setIsDark }) => {
  useLayoutEffect(() => {
    const height = document
      ?.querySelector('#menuHeight')
      ?.getBoundingClientRect()?.height
    document.documentElement.style.setProperty('--headerHeight', height + 'px')
  }, [])

  return (
    <Container>
      <div className={className} id="menuHeight">
        <div></div>
        <h1>
          <Link href="/">
            <Logo />
          </Link>
        </h1>
        <Switch
          size={60}
          state={isDark}
          onClick={() => setIsDark(prevState => !prevState)}
        />
      </div>
    </Container>
  )
}

export default styled(Header)(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
)
