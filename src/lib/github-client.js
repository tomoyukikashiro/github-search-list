import GitHub from 'github-api';

let gh = null;
export const cachedResults = new Map()

export const getTasks = async (token, queries) => {
  gh = gh || new GitHub({ token: token}).search()
  const items = await Promise.all(queries.map(query => {
    return gh.forIssues({q: query})
      .then(res => res.data)
  }))
  const uniqItems = items.reduce((result, items) => {
    const newItem = items.filter(i => !result.find(j => j.id === i.id))
    return [...result, ...newItem]
  }, [])
  cachedResults.set(queries, uniqItems)
  return cachedResults
}
