import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import useIsFontLoaded from './hooks/useIsFontLoaded'
import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'
import { usePageVisibility } from '@heydays/usePageVisibility'

const Scene = dynamic(() => import('./Scene'))

const Hero = ({ className, navigation }) => {
  const hero = useRef(null)
  const isPageVisible = usePageVisibility()
  const { isFontLoaded, error } = useIsFontLoaded()
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0.7,
    triggerOnce: false
  })
  return (
    <div ref={ref}>
      <div className={className} ref={hero}>
        {isFontLoaded && inView && isPageVisible && (
          <Scene wrapper={hero} words={navigation} />
        )}
      </div>
    </div>
  )
}

export default styled(Hero)(
  ({ theme }) => css`
    height: 70vh;
  `
)
