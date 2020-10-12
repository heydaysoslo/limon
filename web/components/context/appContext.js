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
            setOverflowHidden(condition ? condition : toggledState)
            setState({
              ...state,
              isMenuOpen: condition ? condition : toggledState
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
