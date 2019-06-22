import { Query } from './search-query'

const key = 'github-search-list'

export const getData = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || [])
    return raw.map(data => new Query(data))
  } catch {
    return []
  }
}

export const saveData = (data = []) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // ignore
  }
}
