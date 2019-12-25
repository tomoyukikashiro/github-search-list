import React, { createContext, useState } from 'react'
import { getData } from './storage'

export const workSpaceSerializer = workSpaces => {
  return workSpaces.map(ws => ws.toHash())
}

export class WorkSpace {
  #id = null
  #name = null
  #queries = null

  constructor({ id, name, queries = [] }) {
    this.#id = id || Date.now()
    this.#name = name
    this.#queries = queries
  }

  get id() {
    return this.#id
  }

  get name() {
    return this.#name
  }

  get queries() {
    return this.#queries
  }

  update(name) {
    this.#name = name
  }

  updateQuery(queryHash) {
    const index = this.queries.findIndex(q => q.id === queryHash.id)
    const newQueries = this.queries.filter(q => q.id !== queryHash.id)
    newQueries.splice(index, 0 , new Query(queryHash))
    this.#queries = newQueries
  }

  addQuery(queryHash) {
    this.#queries = [...this.#queries, new Query(queryHash)]
  }

  removeQuery(query) {
    this.#queries = this.queries.filter(q => q.id !== query.id)
  }

  static restore({ id, name, queries = [] }) {
    const queryData = queries.map(qd => new Query(qd))
    return new WorkSpace({ id, name, queries: queryData})
  }

  toHash() {
    return {
      id: this.#id,
      name: this.#name,
      queries: this.#queries.map(q => q.toHash())
    }
  }
}

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

export const workSpaceContext = createContext([])

export const WorkSpaceContext = ({ children }) => {
  const initData = getData()
  const [workSpaceState, setWorkSpaceState] = useState(initData)
  return (
    <workSpaceContext.Provider
      value={{
        workSpaceState,
        setWorkSpaceState
      }}>
      { children }
    </workSpaceContext.Provider>
  )
}
