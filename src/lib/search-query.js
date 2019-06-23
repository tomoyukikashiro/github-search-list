import React, { createContext, useState } from 'react'
import { getData } from './storage'

export class Query {
  id = null
  name = null
  #queryString = []

  constructor({ id, name, queryString } = {}) {
    this.id = id || Date.now()
    if (name) this.name = name
    if (queryString) this.#queryString = queryString
  }

  set(queryStrings = []) {
    this.#queryString = queryStrings
  }

  clone() {
    return new Query({
      id: this.id,
      name: this.name,
      queryString: this.#queryString
    })
  }

  get queryString() {
    return this.#queryString
  }

  get size() {
    return this.#queryString.length
  }

  toHash() {
    return {
      id: this.id,
      name: this.name,
      queryString: this.#queryString
    }
  }
}

export const searchQueryContext = createContext({})

export const SearchQuery = ({ children }) => {
  const initData = getData()
  const [searchQueryState, setSearchQueryState] = useState(initData)
  return (
    <searchQueryContext.Provider
      value={{
        searchQueryState,
        setSearchQueryState
      }}>
      { children }
    </searchQueryContext.Provider>
  )
}
