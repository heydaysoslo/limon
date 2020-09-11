import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import Scene from './Scene'

const FloatingWord = ({ className, word, color }) => {
  const wrapper = useRef(null)
  return (
    <div className={className} ref={wrapper}>
      <Scene color={color} wrapper={wrapper} words={[word]} noHinders />
    </div>
  )
}

export default styled(FloatingWord)(
  ({ theme }) => css`
    height: 200px;
    width: 100%;
  `
)
