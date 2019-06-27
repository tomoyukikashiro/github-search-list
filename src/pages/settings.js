import React, {useContext, useState} from 'react'

import Layout from '../components/layout'
import { searchQueryContext, Query } from '../lib/search-query'
import { saveData } from '../lib/storage'

const EditPage = () => {
  const [queryCount, setQueryCount] = useState(1)
  const { searchQueryState, setSearchQueryState } = useContext(searchQueryContext)

  const onSubmit = (e) => {
    e.preventDefault()

    const nameElement = e.target.elements.namedItem('name')
    let queryElements = e.target.elements.namedItem('query')
    queryElements = !!queryElements.length ? Array.from(queryElements) : [queryElements]
    const name = nameElement.value
    const queryString = queryElements.filter(e => !!e.value).map(e => e.value)

    const newState = [...searchQueryState, new Query({name, queryString})]
    setSearchQueryState(newState)
    saveData(newState.map(e => e.toHash()))

    setQueryCount(1)
    nameElement.value = ''
  }

  const onRemove = (e, data) => {
    e.preventDefault()

    const newState = [...searchQueryState.filter(s => s.id !== data.id)]
    setSearchQueryState(newState)
    saveData(newState)
  }

  const addQueryString = e => {
    e.preventDefault()
    setQueryCount(queryCount + 1)
  }

  return (
    <Layout>
      <div>
        <form className="mb-5" onSubmit={onSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="name">Query Name</label>
            <input className="form-control" type="text" name="name" id="name" required placeholder="my pull requests" />
          </div>
          <div className="form-group">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <label className="mb-0">Query String</label>
                <span className="ml-3">(<a href="https://help.github.com/en/articles/about-searching-on-github" target="_blank" rel="noopener noreferrer">Github Query Help</a>)</span>
              </div>
              <button type="button" className="btn btn-outline-secondary" onClick={addQueryString}>Add 'OR' query</button>
            </div>
            { new Array(queryCount).fill().map((v, i) => (
              <textarea className="form-control mb-3" key={i} rows="3" name="query" required placeholder="is:pr is:open" />
            )) }
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
        <div>
          {!!searchQueryState.length && (
            <ul className="pl-0">
              {searchQueryState.map(data => (
                <li key={data.id} className="list-unstyled mb-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <span>{data.name}</span>
                      <button type="button" className="btn btn-outline-secondary" onClick={e => onRemove(e, data)}>Delete</button>
                    </div>
                    <ul className="list-group list-group-flush">
                      { data.queryString.map((q, i) => (
                        <li key={i} className="list-group-item">{q}</li>
                      )) }
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default EditPage

