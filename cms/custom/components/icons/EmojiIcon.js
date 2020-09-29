import React from 'react'

const EmojiIcon = ({ children, small }) => {
  return (
    <div className="EmojiIcon" style={{ fontSize: small ? '1em' : 30 }}>
      {children}
    </div>
  )
}

export default EmojiIcon
