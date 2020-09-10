import React from 'react'

const NewspaperIcon = () => {
  const style = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeMiterlimit: '10'
  }
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      width="1em"
      preserveAspectRatio="xMidYMid meet"
    >
      <g>
        <rect x="0.5" y="0.5" style={style} width="23" height="23" />
        <line style={style} x1="6.5" y1="5.5" x2="10.5" y2="5.5" />
        <line style={style} x1="3.5" y1="8.5" x2="10.5" y2="8.5" />
        <line style={style} x1="3.5" y1="11.5" x2="10.5" y2="11.5" />
        <line style={style} x1="3.5" y1="14.5" x2="20.5" y2="14.5" />
        <line style={style} x1="3.5" y1="17.5" x2="15.5" y2="17.5" />
        <rect x="12.5" y="3.5" style={style} width="8" height="8" />
      </g>
    </svg>
  )
}

export default NewspaperIcon
