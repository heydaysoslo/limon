import React from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

type Props = {
  className?: string
  isOpen: boolean
  onClick?: () => void
  color: string
  width?: number
  height?: number
  strokeWidth?: number
}

const Hamburger: React.FC<Props> = ({
  className,
  isOpen,
  onClick,
  width = 50,
  height = 20,
  strokeWidth = 4,
  ...props
}) => {
  return (
    <button className={className} onClick={onClick} {...props}>
      <motion.div
        className="outer"
        initial={{ origin: 0.5 }}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: {
            y: height / 2 - strokeWidth,
            transition: { when: 'beforeChildren' }
          },
          closed: { y: 0, transition: { when: 'afterChildren' } }
        }}
      >
        <motion.div
          variants={{
            open: { rotate: 45 },
            closed: { rotate: 0 }
          }}
          className="line"
        ></motion.div>
      </motion.div>
      <motion.div
        className="outer"
        initial={{ origin: 0.5 }}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: {
            y: -height / 2 - strokeWidth + 1,
            transition: { when: 'beforeChildren' }
          },
          closed: { y: 0, transition: { when: 'afterChildren' } }
        }}
      >
        <motion.div
          variants={{
            open: { rotate: -45, y: 1 },
            closed: { rotate: 0, y: 0 }
          }}
          className="line"
        ></motion.div>
      </motion.div>
    </button>
  )
}

export default styled(Hamburger)(
  ({ theme, color, width = 45, height = 20, strokeWidth = 3 }) => css`
    position: relative;
    width: ${width}px;
    height: ${height}px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    outline: 0;

    .line {
      width: ${width}px;
      height: ${strokeWidth}px;
      background: ${color ? color : theme.colors.text};
    }
  `
)
