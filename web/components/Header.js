import React, { useLayoutEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

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
  const windowSize = useWindowSize({ debounce: 200 })

  useLayoutEffect(() => {
    const height = header?.current?.getBoundingClientRect()?.height
    document.documentElement.style.setProperty('--header-height', height + 'px')
  }, [header, windowSize])

  return (
    <Container>
      <motion.div className={className} ref={header}>
        <div className="item">
          <OpeningHours />
        </div>
        <h1 className="logo">
          <Link href="/">
            <a aria-label="logo and home button">
              <Logo />
            </a>
          </Link>
        </h1>
        <div className="item">
          <Hamburger
            isOpen={state.isMenuOpen}
            onClick={() => actions.toggleMenu()}
          />
        </div>
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
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: ${theme.color.rgba(theme.colors.background, 0.9)};
    z-index: ${theme.elevation[4]};
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

    &:after {
      position: absolute;
      z-index: -1;
      width: 100%;
      left: 0;
      top: 100%;
      content: '';
      display: inline-block;
      width: 100%;
      ${theme.spacing.lg('height', { multiplier: 2 })};
      background: ${`linear-gradient(180deg, ${
        theme.colors.background
      } 1%, ${theme.color.rgba(theme.colors.background, 0.01)})`};
    }

    .item {
      width: 110px;

      &:first-of-type {
        display: flex;
        align-items: flex-end;
        position: relative;
        z-index: ${theme.elevation[3]};
      }

      &:nth-of-type(2) {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }

    .logo {
      flex-grow: 1;
      text-align: center;
    }

    ${theme.bp.lg} {
    }
  `
)
