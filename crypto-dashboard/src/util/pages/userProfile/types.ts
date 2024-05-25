export interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
  date_of_birth: string
  role_id: string
  profile_picture: string
  created: string
}

export interface UpdatedUser {
  data: User
  message: string
  success: boolean
}
