import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import Scene from './Scene'
import useIsFontLoaded from './hooks/useIsFontLoaded'

const Hero = ({ className }) => {
  const hero = useRef(null)
  const { isFontLoaded, error } = useIsFontLoaded()
  return (
    <div className={className} ref={hero}>
      {isFontLoaded && (
        <Scene wrapper={hero} words={['MENU', 'ABOUT', 'CEVICHE', 'SALADS']} />
      )}
    </div>
  )
}

export default styled(Hero)(
  ({ theme }) => css`
    height: 70vh;
  `
)
