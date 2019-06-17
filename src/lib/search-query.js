import React, { createContext, useState } from 'react'
import { getData } from './storage'

export const searchQueryContext = createContext([])

export const SearchQuery = ({ children }) => {
  const initData = getData()
  const [searchQueryState, setSearchQueryState] = useState(initData)
  return (
    <searchQueryContext.Provider
      value={{
        state: searchQueryState,
        setSate: setSearchQueryState
      }}>
      { children }
    </searchQueryContext.Provider>
  )
}
