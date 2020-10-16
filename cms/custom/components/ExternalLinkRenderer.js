import React from 'react'
import ExternalLinkIcon from 'react-icons/lib/md/open-in-new'

const ExternalLinkRenderer = props => (
  <span>
    {props.linkText || props.children} <ExternalLinkIcon />
  </span>
)

export default ExternalLinkRenderer
