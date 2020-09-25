import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'

const Scene = dynamic(() => import('./Scene'))

const FloatingWord = ({ className, word, color }) => {
  const wrapper = useRef(null)
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0.7,
    triggerOnce: false
  })
  return (
    <div ref={ref}>
      <div className={className} ref={wrapper}>
        <Scene color={color} wrapper={wrapper} words={[word]} noHinders />
      </div>
    </div>
  )
}

export default styled(FloatingWord)(
  ({ theme }) => css`
    height: 200px;
    width: 100%;
  `
)
