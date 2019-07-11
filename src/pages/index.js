import React, {useEffect, useContext, Suspense, useState} from 'react'
import { navigate } from 'gatsby'
import * as clipboard from 'clipboard-polyfill'
import Octicon, {IssueClosed, IssueOpened, GitPullRequest} from '@primer/octicons-react'

import Layout from "../components/layout"
import { searchQueryContext } from '../lib/search-query'
import { tokenContext } from '../lib/token'
import { getTasks, cachedResults } from '../lib/github-client'

const TaskList = ({ tasks }) => {
  const repoName = (task) => task.repository_url.split('/').pop()
  const title = (task) => `#${task.number} ${task.title}`

  const onClickClipboard = task => {
    clipboard.writeText(toMarkdown(task))
  }

  if (!tasks.length) return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item">なし</li>
    </ul>
  )
  return (
    <ul className="list-group list-group-flush">
      { tasks.map(task => (
        <li key={task.id} className="list-group-item px-0 d-flex flex-column flex-md-row justify-content-md-between">
          <div className="flex-shrink-1 d-flex">
            <div className="mr-3">
              <TaskIcon task={task} />
            </div>
            <div>
              <span className="text-secondary mr-2">{repoName(task)}</span>
              <a href={task.html_url} title={title(task)} target="_blank" rel="noopener noreferrer">{ title(task) }</a>
              <div>
                { task.labels.map(label => (
                  <span key={label.id} className="badge badge-light mr-1" style={ { color: '#fff', backgroundColor: `#${label.color}` } }>{ label.name }</span>
                )) }
              </div>
            </div>
          </div>
          <div className="pl-md-3">
            <button className="btn btn-sm btn-outline-dark" onClick={() => onClickClipboard(task)}>copy as markdown</button>
          </div>
        </li>
      )) }
    </ul>
  )
}

const TaskIcon = ({ task }) => {
  if (task.hasOwnProperty('pull_request')) {
    return <Octicon verticalAlign='top' icon={GitPullRequest} />
  } else if (task.state === 'close') {
    return <Octicon verticalAlign='top' icon={IssueClosed} />
  } else {
    return <Octicon verticalAlign='top' icon={IssueOpened} />
  }
}

const TaskListSuspense = ({ token, queries }) => {
  if (!token) return <></>
  const tasks = cachedResults.get(queries)
  if (tasks) {
    return <TaskList tasks={tasks}/>
  }
  throw getTasks(token, queries)
}

const toMarkdown = task => {
  const repo = task.repository_url.split('/').pop()
  const title = `#${task.number} ${task.title}`
  return `[${repo}] [${title}](${task.html_url})`
}

const queryToMarkdown = queryString => {
  const tasks = cachedResults.get(queryString)
  if (!tasks) return
  return tasks.map(task => (toMarkdown(task))).join('\n')
}

const IndexPage = () => {
  const { searchQueryState } = useContext(searchQueryContext)
  const { tokenState, setTokenState } = useContext(tokenContext)
  const [fetched, setFetched] = useState(0)

  useEffect(() => {
    if (!searchQueryState.length) return navigate('/settings')
  }, [])

  const onClickClipboard = data => {
    clipboard.writeText(queryToMarkdown(data.queryString))
  }

  const fetch = e => {
    e.preventDefault()
    if (fetched) {
      // refetch
      cachedResults.clear()
      setFetched(count => count + 1)
    } else {
      // fetch
      setFetched(count => count + 1)
    }
    setTokenState(e.target.elements.namedItem('gt').value)
  }

  return (
    <Layout>
      <div className="mb-3">
        <form className="form-inline" onSubmit={fetch}>
          <div className="form-group mr-2 w-25">
            <input className="form-control w-100" type="password" name="gt" placeholder="Github Token" defaultValue={tokenState}/>
          </div>
          <button className="btn btn-primary"> { fetched ? 'refetch' : 'fetch' }</button>
        </form>
      </div>

      { searchQueryState.map(data => (
        <div key={data.id} className="card mb-4">
          <h5 className="card-header d-flex justify-content-between align-items-center">
            <span>{data.name}</span>
            <button className="btn btn-dark btn-sm" onClick={() => onClickClipboard(data)}>copy as markdown</button>
          </h5>
          <div className="card-body">
            <Suspense fallback={<>Loading...</>}>
              <TaskListSuspense token={tokenState} queries={data.queryString}/>
            </Suspense>
          </div>
        </div>
      )) }
    </Layout>
  )
}

export default IndexPage
