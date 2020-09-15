import { useState, useEffect } from 'react'
/**
 * This requires the use of webFontloader which adds classes to the html class
 *
 * This checks if the classname includes the name of the string you pass inn
 *
 * ex output class: wf-venus-n4-active || wf-loading
 * ex string: venus
 *
 * in this case if the output class includes the name venus this will return true
 *
 * @param {*} string
 */

const useIsFontLoaded = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchFont = async () => {
      try {
        const isLoaded = await document.fonts.ready
        if (isLoaded.status === 'loaded') {
          setIsFontLoaded(true)
        }
      } catch (err) {
        setIsFontLoaded(false)
        setError(error)
      }
    }
    fetchFont()
  }, [])

  return { isFontLoaded, error }
}

export default useIsFontLoaded
