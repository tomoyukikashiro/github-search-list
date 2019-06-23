import React, { useState } from 'react'

import Layout from '../components/layout'
import { searchQueryContext, Query } from '../lib/search-query'
import { saveData } from '../lib/storage'

const EditPage = () => {
  const [queryCount, setQueryCount] = useState(1)

  const onSubmit = (e, context) => {
    e.preventDefault()

    const nameElement = e.target.elements.namedItem('name')
    let queryElements = e.target.elements.namedItem('query')
    queryElements = !!queryElements.length ? Array.from(queryElements) : [queryElements]
    const name = nameElement.value
    const queryString = queryElements.filter(e => !!e.value).map(e => e.value)

    const newState = [...context.state, new Query({name, queryString})]
    context.setSate(newState)
    saveData(newState.map(e => e.toHash()))

    setQueryCount(1)
    nameElement.value = ''
  }

  const onRemove = (e, context, data) => {
    e.preventDefault()

    const newState = [...context.state.filter(s => s.id !== data.id)]
    context.setSate(newState)
    saveData(newState)
  }

  const addQueryString = e => {
    e.preventDefault()
    setQueryCount(queryCount + 1)
  }


  return (
    <Layout>
      <searchQueryContext.Consumer>
        { context => (
          <div>
            <form className="mb-5" onSubmit={e => onSubmit(e, context)}>
              <div className="form-group mb-4">
                <label htmlFor="name">Query Name</label>
                <input className="form-control" type="text" name="name" id="name" required placeholder="my pull requests" />
              </div>
              <div className="form-group">
                <label className="d-flex justify-content-between align-items-center">
                  <span>Query String</span>
                  <button type="button" className="btn btn-outline-secondary" onClick={addQueryString}>Add 'OR' query</button>
                </label>
                { new Array(queryCount).fill().map(Math.random).map(v => (
                  <textarea className="form-control mb-3" key={v} rows="3" name="query" required placeholder="is:pr is:open" />
                )) }
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
            <div>
              {!!context.state.length && (
                <ul className="pl-0">
                  {context.state.map(data => (
                    <li key={data.id} className="list-unstyled mb-4">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <span>{data.name}</span>
                          <button type="button" className="btn btn-outline-secondary" onClick={e => onRemove(e, context, data)}>Delete</button>
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
        )}
      </searchQueryContext.Consumer>
    </Layout>
  )
}

export default EditPage

