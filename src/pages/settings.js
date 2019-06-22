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
            <form onSubmit={e => onSubmit(e, context)}>
              <label>
                <div>
                  <strong>Query Name</strong>
                </div>
                <div>
                  <input type="text" name="name" required placeholder="my pull requests" />
                </div>

                <div>
                  <strong>Query String</strong><button onClick={addQueryString}>+</button>
                </div>
                <div>
                  { new Array(queryCount).fill().map(Math.random).map(v => (
                    <div key={v}>
                      <textarea rows="3" name="query" required placeholder="e.g. is:pr is:open" />
                    </div>
                  )) }
                </div>
                <button>save</button>
              </label>
            </form>
            <div>
              {!!context.state.length && (
                <ul>
                  {context.state.map(data => (
                    <li key={data.id}>
                      <div>{data.name}<button onClick={e => onRemove(e, context, data)}>x</button></div>
                      <ul>
                        { data.queryString.map((q, i) => (
                          <li key={i}>{q}</li>
                        )) }
                      </ul>
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

