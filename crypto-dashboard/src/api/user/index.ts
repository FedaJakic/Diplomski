import { axiosClient } from '..'
import { API_URL } from '../../util/env'

const UserUrls = {
  postRegisterUser: `${API_URL.api_url}/api/register`,
  postLoginUser: `${API_URL.api_url}/api/login`,
}

export const UserUrlsApi = {
  registerUser: async ({
    name,
    surname,
    email,
    password,
    date_of_birth,
  }: {
    name: string
    surname: string
    email: string
    password: string
    date_of_birth: string
  }) =>
    axiosClient
      .post(UserUrls.postRegisterUser, {
        name,
        surname,
        email,
        password,
        date_of_birth,
      })
      .then((res) => res.data),

  loginUser: async ({ email, password }: { email: string; password: string }) =>
    axiosClient
      .post(UserUrls.postLoginUser, {
        email,
        password,
      })
      .then((res) => res.data),
}
