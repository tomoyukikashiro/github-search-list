import React, {createContext, useState} from 'react'
import {getToken} from '../lib/storage'

export const tokenContext = createContext({})

export const Token = ({ children }) => {
  const token = getToken()
  const [tokenState, setTokenState] = useState(token)
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
