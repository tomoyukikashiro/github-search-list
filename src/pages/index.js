import React, { useEffect, useState, useContext } from "react"
import { navigate } from 'gatsby'
import * as clipboard from 'clipboard-polyfill'
import Octokit from '@octokit/rest'

import Layout from "../components/layout"
import { searchQueryContext } from '../lib/search-query'
import { tokenContext } from '../lib/token'

const toHtml = (task) => {
  const repo = task.repository_url.split('/').pop()
  const title = `#${task.number} ${task.title}`
  return (
    <li key={task.id} className="list-group-item">
      <span className="text-secondary mr-2">{repo}</span><a href={task.html_url} title={title} target="_blank" rel="noopener noreferrer">{ title }</a>
      <div>
        { task.labels.length && task.labels.map(label => (
          <span key={label.id} className="badge badge-light mr-1" style={ { color: '#fff', backgroundColor: `#${label.color}` } }>{ label.name }</span>
        )) }
      </div>
    </li>
  )
}

const toMarkdown = (task) => {
  const repo = task.repository_url.split('/').pop()
  const title = `#${task.number} ${task.title}`
  return `[${title}](${task.html_url}) [${repo}]`
}


const IndexPage = () => {
  const { searchQueryState } = useContext(searchQueryContext)
  const { tokenState, setTokenState } = useContext(tokenContext)
  const [ results, setResults ] = useState(searchQueryState.map(q => ({id: q.id, name: q.name})))
  let octokit = null

  useEffect(() => {
    if (!searchQueryState.length) return navigate('/settings')
    fetch()
  }, [])

  const onClickClipboard = data => {
    clipboard.writeText(data.items.map(task => (toMarkdown(task))).join('\n'))
  }

  const getGithubClient = (gt) => {
    if (octokit) return octokit;
    octokit = new Octokit({ auth: gt})
    return octokit
  }

  const fetch = async e => {
    if (e) e.preventDefault()
    if (!tokenState) return;

    const newResults = await Promise.all(searchQueryState.map(async data => {
      if (data.queryString.length === 1) {
        const res = await getGithubClient(tokenState).search.issuesAndPullRequests({q: data.queryString[0]})
        return { id: data.id, name: data.name, items: res.data.items }
      } else {
        const items = await Promise.all(data.queryString.map(async query => {
          const res = await getGithubClient(tokenState).search.issuesAndPullRequests({q: query})
          return res.data.items
        }))
        const uniqItems = items.reduce((result, items) => {
          const newItem = items.filter(i => !result.find(j => j.id === i.id))
          return [...result, ...newItem]
        }, [])
        return { id: data.id, name: data.name, items: uniqItems }
      }
    }))

    setResults(newResults)
  }

  return (
    <Layout>
      <div className="mb-3">
        <form className="form-inline" onSubmit={e => fetch(e)}>
          <div className="form-group mr-2 w-25">
            <input className="form-control w-100" type="password" name="gt" value={tokenState} onChange={e => setTokenState(e.currentTarget.value)}/>
          </div>
          <button className="btn btn-primary">fetch</button>
        </form>
      </div>

      { results.map(data => (
        <div key={data.id} className="card mb-4">
          <h5 className="card-header d-flex justify-content-between align-items-center">
            <span>{data.name}</span>
            <button className="btn btn-outline-dark" onClick={() => onClickClipboard(data)}>copy as markdown</button></h5>
          <div className="card-body">
            { data.hasOwnProperty('items')
              ? !!data.items.length
                ? <ul className="list-group list-group-flush">
                  { data.items.map(task => (
                    toHtml(task)
                  )) }
                </ul>
                : <div>なし</div>
              : <div>Loading...</div> }

          </div>
        </div>
      )) }
    </Layout>
  )
}

export default IndexPage
