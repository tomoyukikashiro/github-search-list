import React, {createContext, useState} from 'react'

export const tokenContext = createContext({})

export const Token = ({ children }) => {
  const [tokenState, setTokenState] = useState('')
  return (
    <tokenContext.Provider
      value={{
        tokenState,
        setTokenState
      }}>
      { children }
    </tokenContext.Provider>
  )
}
