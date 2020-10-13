import React, { useLayoutEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

import Switch from '@heydays/Switch'
import Container from './elements/Container'
import Logo from './Logo'
import useAppContext from '@heydays/useAppContext'
import Hero from './Hero'
import Portal from '@heydays/Portal'
import Hamburger from '@heydays/Hamburger'
import useWindowSize from '@heydays/useWindowSize'
import OpeningHours from './OpeningHours'

const Header = ({ className }) => {
  const header = useRef(null)
  const { state, actions } = useAppContext()
  const windowSize = useWindowSize()

  useLayoutEffect(() => {
    const height = header?.current?.getBoundingClientRect()?.height
    document.documentElement.style.setProperty('--header-height', height + 'px')
  }, [header, windowSize])

  return (
    <Container>
      <motion.div className={className} ref={header}>
        <OpeningHours />
        <h1 className="logo">
          <Link href="/">
            <a aria-label="logo and home button">
              <Logo />
            </a>
          </Link>
        </h1>
        <Hamburger
          isOpen={state.isMenuOpen}
          onClick={() => actions.toggleMenu()}
        />
        <Portal>
          <AnimatePresence>
            {state.isMenuOpen && (
              <Wrapper
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { when: 'beforeChildren' } }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  variants={{ open: { opacity: 1 }, close: { opacity: 0 } }}
                >
                  <Hero />
                </motion.div>
              </Wrapper>
            )}
          </AnimatePresence>
        </Portal>
      </motion.div>
    </Container>
  )
}

const Wrapper = styled(motion.div)(
  ({ theme }) => css`
    width: 100%;
    height: 100vh;
    background-color: ${theme.color.rgba(theme.colors.background, 0.9)};
    background-image: ${`radial-gradient(${
      theme.colors.background
    } 30%, ${theme.color.rgba(theme.colors.background, 0.01)})`};
  `
)

export default styled(Header)(
  ({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${theme.elevation[4]};
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    ${theme.spacing.sm('py')};
    ${theme.spacing.container('px')};
    width: 100%;
    background: ${theme.colors.background};

    .logo {
      width: 80%;
      flex-grow: 1;
      text-align: center;
    }
  `
)
