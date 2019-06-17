const key = 'github-search-list'

export const getData = () => {
  try {
    return JSON.parse(localStorage.getItem(key) || [])
  } catch {
    return []
  }
}

export const saveData = (data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // ignore
  }
}
