import React from 'react'
// import cc from 'classcat'

/*
 *   Usage
 *
 *   <Icon name="<name-of-icon>" <size> />
 *
 *   Ex.
 *   <Icon name="clock" size="small" />
 *
 *   only use size if you don't want default.
 *   Default size is defined in defaultProps.
 */

const Wrapper = ({ children, className, size = 40 }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
      // className={cc({
      //   Icon: true,
      //   [className]: className,
      //   [`Icon--${size}`]: size
      // })}
    >
      {children}
    </svg>
  )
}

const Icon = ({ name, ...props }) => {
  switch (name) {
    case 'newspaper':
      const style = {
        fill: 'none',
        stroke: '#000000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: '10'
      }
      return (
        <Wrapper {...props}>
          <line style={style} x1="3.5" y1="3.5" x2="14.5" y2="3.5" />
          <rect x="3.5" y="6.5" style={style} width="5" height="6" />
          <line style={style} x1="11.5" y1="8.5" x2="14.5" y2="8.5" />
          <line style={style} x1="10.5" y1="10.5" x2="14.5" y2="10.5" />
          <line style={style} x1="10.5" y1="12.5" x2="14.5" y2="12.5" />
          <line style={style} x1="3.5" y1="14.5" x2="14.5" y2="14.5" />
          <line style={style} x1="3.5" y1="16.5" x2="14.5" y2="16.5" />
          <line style={style} x1="3.5" y1="18.5" x2="14.5" y2="18.5" />
          <path
            style={style}
            d="M19.5,5.5h2v15c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1V2h-2v2"
          />
          <path
            style={style}
            d="M20.5,23.5h-17c-1.7,0-3-1.3-3-3v-20h17v20C17.5,22.2,18.8,23.5,20.5,23.5c1.7,0,3-1.3,3-3v-17h-4"
          />
        </Wrapper>
      )
    default:
      return null
  }
}

export default Icon
