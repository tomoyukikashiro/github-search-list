import { WorkSpace, workSpaceSerializer } from './workspace'

const workSpacekey = 'github-search-workspace'
const tokenKey = 'github-search-token'

export const getData = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(workSpacekey) || [])
    return raw.map(data => WorkSpace.restore(data))
  } catch {
    return []
  }
}

export const saveData = (workSpaces = []) => {
  const data = workSpaceSerializer(workSpaces)
  try {
    localStorage.setItem(workSpacekey, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export const getToken = () => {
  try {
    return localStorage.getItem(tokenKey) || ''
  } catch {
    return ''
  }
}

export const saveToken = (token = '') => {
  try {
    localStorage.setItem(tokenKey, token)
  } catch {
    // ignore
  }
}
