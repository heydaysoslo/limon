import { useContext } from 'react'
import AppContext from 'components/context/appContext'

const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

export default useAppContext
