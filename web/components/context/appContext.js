import React, { createContext, useState } from 'react'
import { setOverflowHidden } from 'utils/helpers'

const initialState = {
  isMenuOpen: false,
  isStoreOpen: null
}

const AppContext = createContext(initialState)

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  return (
    <AppContext.Provider
      value={{
        state: state,
        actions: {
          toggleMenu: condition => {
            const toggledState = !state.isMenuOpen
            setOverflowHidden(
              typeof condition === 'boolean' ? condition : toggledState
            )
            setState({
              ...state,
              isMenuOpen:
                typeof condition === 'boolean' ? condition : toggledState
            })
          },
          setIsStoreOpen: condition => {
            setState({
              ...state,
              isStoreOpen: condition
            })
          }
        }
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
