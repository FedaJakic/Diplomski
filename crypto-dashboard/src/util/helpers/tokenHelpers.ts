import { jwtDecode } from 'jwt-decode'

export const tokenDecode = (token: string) => {
  const decodedToken = jwtDecode(token)
  return decodedToken
}

export const isTokenExist = (): boolean => {
  return !!localStorage.getItem('token')
}

export const setToken = (token: string): void => {
  localStorage.setItem('token', token)
}

export const removeToken = (): void => {
  localStorage.removeItem('token')
}
