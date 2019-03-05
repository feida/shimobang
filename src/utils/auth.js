import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCookie(str) {
  return Cookies.get(str)
}

export function setCookie(key, value) {
  return Cookies.set(key, value)
}

export function removeCookie(str) {
  return Cookies.remove(str)
}
