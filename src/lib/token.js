import React, {createContext, useState} from 'react'

export const tokenContext = createContext({})

export const Token = ({ children }) => {
  const [tokenState, setTokenState] = useState('')
  return (
    <tokenContext.Provider
      value={{
        state: tokenState,
        setState: setTokenState
      }}>
      { children }
    </tokenContext.Provider>
  )
}
