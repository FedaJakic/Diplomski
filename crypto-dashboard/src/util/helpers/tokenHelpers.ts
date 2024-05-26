import { jwtDecode, JwtPayload } from 'jwt-decode'

export interface CustomJwtPayload extends JwtPayload {
  id: string
  email: string
  role: string
}

export const tokenDecode = (token: string): CustomJwtPayload => {
  const decodedToken = jwtDecode<CustomJwtPayload>(token)
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

export const setRole = (role: string): void => {
  localStorage.setItem('role', role)
}

export const removeRole = (): void => {
  localStorage.removeItem('role')
}
