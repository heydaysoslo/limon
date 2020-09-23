import React from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import Container from './Container'
import { fonts, spacing } from '../../styles/utilities'

const Loader = ({ className }) => {
  return (
    <Container className={className}>
      <motion.span
        animate={{ rotate: [0, 360] }}
        transition={{ loop: Infinity }}
        role="image"
        aria-label="limon logo loader"
      >
        🍋
      </motion.span>
    </Container>
  )
}

export default styled(Loader)(
  ({ theme }) => css`
    text-align: center;
    ${theme.spacing.section('my')};

    span {
      display: inline-block;
      ${theme.fonts.h1()};
    }
  `
)
