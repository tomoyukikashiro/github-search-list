import Octokit from '@octokit/rest'

let octokit = null
export const cachedResults = new Map()

export const getTasks = async (token, queries) => {
  octokit = octokit || new Octokit({ auth: token})
  const items = await Promise.all(queries.map(query => {
    return octokit.search.issuesAndPullRequests({q: query})
      .then(res => res.data.items)
  }))
  const uniqItems = items.reduce((result, items) => {
    const newItem = items.filter(i => !result.find(j => j.id === i.id))
    return [...result, ...newItem]
  }, [])
  cachedResults.set(queries, uniqItems)
  return cachedResults
}
