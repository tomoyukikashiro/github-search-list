import React, { useEffect, useState, useContext } from "react"
import { navigate } from 'gatsby'
import * as clipboard from 'clipboard-polyfill'
import Octokit from '@octokit/rest'

import Layout from "../components/layout"
import { searchQueryContext } from '../lib/search-query'

const toHtml = (task) => {
  const repo = task.repository_url.split('/').pop()
  const title = `#${task.number} ${task.title}`
  return (
    <li key={task.id}>
      <a href={task.url} title={title}>{ title }</a> [{repo}]
      <div>
        { task.labels.length && task.labels.map(label => (
          <span key={label.id} style={ { color: '#fff', backgroundColor: `#${label.color}` } }>{ label.name }</span>
        )) }
      </div>
    </li>
  )
}

const toMarkdown = (task) => {
  const repo = task.repository_url.split('/').pop()
  const title = `#${task.number} ${task.title}`
  return `[${title}](${task.url}) [${repo}]`
}


const IndexPage = () => {
  const { state: initialSearchQueries } = useContext(searchQueryContext)
  const [state, setState] = useState(initialSearchQueries)
  const [gt, setGa] = useState('')
  let octokit = null

  useEffect(() => {
    if (!state.length) return navigate('/settings')
    fetch()
  }, [])

  const onClickClipboard = data => {
    clipboard.writeText(data.result.map(task => (toMarkdown(task))).join('\n'))
  }

  const getGithubClient = (gt) => {
    if (octokit) return octokit;
    octokit = new Octokit({ auth: gt})
    return octokit
  }

  const fetch = async e => {
    if (e) e.preventDefault()
    if (!gt) return;
    const newState = await Promise.all(state.map(async data => {
      if (data.queryString.length === 1) {
        const res = await getGithubClient(gt).search.issuesAndPullRequests({q: data.queryString[0]})
        return { ...data, result: res.data.items }
      } else {
        const items = await Promise.all(data.queryString.map(async query => {
          const res = await getGithubClient(gt).search.issuesAndPullRequests({q: query})
          return res.data.items
        }))
        const uniqItems = items.reduce((result, items) => {
          const newItem = items.filter(i => !result.find(j => j.id === i.id))
          return [...result, ...newItem]
        }, [])
        return { ...data, result: uniqItems }
      }

    }))
    setState(newState)
  }

  return (
    <Layout>
      <div>
        <form onSubmit={e => fetch(e)}>
          <input type="password" name="gt" value={gt} onChange={e => setGa(e.currentTarget.value)}/>
          <button>fetch issues</button>
        </form>
      </div>
      { state.map(data => (
        <div key={data.id}>
          <h2>{data.name} <button onClick={() => onClickClipboard(data)}>copy as markdown</button></h2>
          { data.hasOwnProperty('result')
            ? !!data.result.length
              ? <ul>
                { data.result.map(task => (
                  toHtml(task)
                )) }
                </ul>
              : <div>なし</div>
            : <div>Loading...</div> }
        </div>
      )) }
    </Layout>
  )
}

export default IndexPage
