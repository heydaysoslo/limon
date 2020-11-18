import React from 'react'
import dynamic from 'next/dynamic'

const templates = {
  frontpage: dynamic(() => import('../pages/FrontPage.js')),
  default: dynamic(() => import('../pages/Page.js'))
}

const TemplateResolver = ({ page, ...props }) => {
  const Component = templates?.[page._type]
    ? templates?.[page._type]
    : templates.default

  if (!Component) return <div style={{ minHeight: '100vh' }} />

  return <Component {...page} {...props} />
}

export default TemplateResolver
