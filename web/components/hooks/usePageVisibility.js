import React from 'react'
import {
  getBrowserVisibilityProp,
  getIsDocumentHidden
} from 'utils/browserVisibility'

export function usePageVisibility() {
  const [isVisible, setIsVisible] = React.useState(getIsDocumentHidden())
  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden())
  React.useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp()
    document.addEventListener(visibilityChange, onVisibilityChange, false)
    return () => {
      document.removeEventListener(visibilityChange, onVisibilityChange)
    }
  })
  return isVisible
}
