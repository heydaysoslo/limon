import React from 'react'
import ExternalLinkIcon from 'react-icons/lib/md/open-in-new'

const ExternalLinkRenderer = props => (
  <span>
    {console.log(props.attributes)}
    {props.linkText || props.children} <ExternalLinkIcon />
  </span>
)

export default ExternalLinkRenderer
