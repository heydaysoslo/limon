import React, { useEffect, useState } from 'react'
import styled, { css, useTheme } from 'styled-components'

import useSanity from '@heydays/useSanity'
import Editor from './editor'
import useInterval from '@heydays/useInterval'
import { AnimatePresence, motion } from 'framer-motion'
import checkIfStoreIsOpen from 'utils/openingHours'
import useAppContext from '@heydays/useAppContext'

const OpeningHours = ({ className }) => {
  const data = useSanity()
  const [isOpen, setIsOpen] = useState(false)
  const [isStoreOpen, setIsStoreOpen] = useState<boolean | null>(null)
  const theme = useTheme()
  const { actions } = useAppContext()

  useEffect(() => {
    const openState = checkIfStoreIsOpen(data?.companyInfo?.openingHoursData)
    setIsStoreOpen(openState)
    actions.setIsStoreOpen(openState)
  }, [data])

  useInterval(() => {
    const openState = checkIfStoreIsOpen(data?.companyInfo?.openingHoursData)
    // Don't set uneccesary state. This will trigger render on the whole app
    if (isStoreOpen !== openState) {
      setIsStoreOpen(openState)
      actions.setIsStoreOpen(openState)
    }
  }, 5000)

  return (
    <div
      className={className}
      onMouseEnter={() => setIsOpen(true)}
      onMouseOut={() => {
        setIsOpen(false)
      }}
    >
      <button
        onClick={() => setIsOpen(prev => !prev)}
        onMouseDown={e => e.preventDefault()}
        style={{ color: isOpen ? theme.colors.background : theme.colors.text }}
      >
        {isStoreOpen === null && 'Opening hours'}
        {typeof isStoreOpen === 'boolean' &&
          (isStoreOpen ? 'Open now' : 'Closed now')}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              exit={{ opacity: 0, y: 50 }}
              className="info-table"
            >
              <div style={{ position: 'relative' }}>
                {data?.companyInfo?.openingHours && (
                  <Editor blocks={data.companyInfo.openingHours} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}

export default styled(OpeningHours)(
  ({ theme: t }) => css`
    position: relative;
    .info-table {
      ${t.spacing.sm(['px', 'pb'])};
      ${t.spacing.sm(['top', 'left'], { negative: true })};
      background: ${t.colors.text};
      color: ${t.colors.background};
      position: absolute;
      z-index: -1;
      text-align: left;
      padding-top: 2em;
      width: 25ch;
    }
  `
)
