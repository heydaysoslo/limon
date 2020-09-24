import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Switch from '@heydays/Switch'
import Container from './elements/Container'
import Logo from './Logo'

const Header = ({ className, isDark, setIsDark }) => {
  const header = useRef(null)

  useEffect(() => {
    const height = header?.current?.getBoundingClientRect()?.height
    console.log('Header -> height', height)
    document.documentElement.style.setProperty('--headerHeight', height + 'px')
  }, [header])

  return (
    <Container>
      <div className={className} ref={header}>
        <div>Open now</div>
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
    align-items: flex-end;
  `
)
