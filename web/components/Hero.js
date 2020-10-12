import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import useIsFontLoaded from './hooks/useIsFontLoaded'
import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'
import { usePageVisibility } from '@heydays/usePageVisibility'
import useSanity from '@heydays/useSanity'

const Scene = dynamic(() => import('./Scene'))

const Hero = ({ className }) => {
  const hero = useRef(null)
  const { isFontLoaded } = useIsFontLoaded()
  const isPageVisible = usePageVisibility()
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.1,
    triggerOnce: false
  })
  const data = useSanity()
  return (
    <div ref={ref}>
      <div className={className} ref={hero}>
        {isFontLoaded &&
          inView &&
          isPageVisible &&
          data?.siteSettings?.primaryMenu?.item && (
            <Scene wrapper={hero} words={data.siteSettings.primaryMenu.item} />
          )}
      </div>
    </div>
  )
}

export default styled(Hero)(
  ({ theme }) => css`
    width: 100%;
    height: 70vh;
  `
)
