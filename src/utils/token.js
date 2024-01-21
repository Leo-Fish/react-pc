const key = 'pc-key'

const setToken = (token) => {
  window.localStorage.setItem(key, token)
}

const getToken = () => {
  return window.localStorage.getItem(key)
}

const removeToken = () => {
  window.localStorage.removeItem(key)
}

export {
  setToken,
  getToken,
  removeToken
}
