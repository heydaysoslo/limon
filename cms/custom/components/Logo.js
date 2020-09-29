import React, { Component } from 'react'

const style = {
  minHeight: '25px',
  transform: 'translateY(2px)'
}

export default class Logo extends Component {
  render() {
    return (
      <p style={{ margin: 0, fontSize: '1.5em', lineHeight: 0 }}>
        <span role="img" aria-label="limon logo">
          🍋
        </span>
      </p>
    )
  }
}
