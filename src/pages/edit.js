import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import { searchQueryContext } from '../lib/search-query'
import { saveData } from '../lib/storage'

const EditPage = () => {
  const onSubmit = (e, context) => {
    e.preventDefault()

    const [nameElement, queryElement] = e.target
    const newState = [...context.state, { id: Date.now(), name: nameElement.value, query: queryElement.value }]
    context.setSate(newState)
    saveData(newState)
    nameElement.value = ''
    queryElement.value = ''
  }

  const onRemove = (e, context, data) => {
    e.preventDefault()

    const newState = [...context.state.filter(s => s.id !== data.id)]
    context.setSate(newState)
    saveData(newState)
  }

  return (
    <Layout>
      <div><Link to="/">Home</Link></div>
      <searchQueryContext.Consumer>
        { context => (
          <div>
            <form onSubmit={e => onSubmit(e, context)}>
              <label>
                <div>
                  <strong>Query Name</strong>
                </div>
                <div>
                  <input type="text" name="name" placeholder="my pull requests" />
                </div>

                <div>
                  <strong>Query String</strong>
                </div>
                <div>
                  <textarea rows="3" name="query" placeholder="e.g. is:pr is:open" />
                </div>
                <button>save</button>
              </label>
            </form>
            <div>
              {!!context.state.length && (
                <ul>
                  {context.state.map(data => (
                    <li key={data.id}>{data.name} / {data.query} <button onClick={e => onRemove(e, context, data)}>x</button></li>
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

