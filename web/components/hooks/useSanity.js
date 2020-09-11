import { useContext } from 'react'
import SanityContext from '../context/sanityContext'

const useSanity = () => {
  const sanity = useContext(SanityContext)
  return sanity
}

export default useSanity
