import GitHub from 'github-api';

let gh = null;
export const cachedResults = new Map()

const convertSpecialQuery = query => {
  const todayString = new Date().toISOString().split('T')[0]
  return query.replace(/\${today}/g, todayString)
}

export const getTasks = async (token, queries) => {
  gh = gh || new GitHub({ token: token}).search()
  const items = await Promise.all(queries.map(query => {
    return gh.forIssues({q: convertSpecialQuery(query)})
      .then(res => res.data)
  }))
  const uniqItems = items.reduce((result, items) => {
    const newItem = items.filter(i => !result.find(j => j.id === i.id))
    return [...result, ...newItem]
  }, [])
  cachedResults.set(queries, uniqItems)
  return cachedResults
}

