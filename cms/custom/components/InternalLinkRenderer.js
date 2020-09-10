import React from 'react'

const InternalLinkRenderer = props => (
  <span>{props.linkText || props.children}</span>
)

export default InternalLinkRenderer
