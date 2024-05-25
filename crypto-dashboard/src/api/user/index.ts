import { axiosClient } from '..'
import { API_URL } from '../../util/env'
import { UpdatedUser, User } from '../../util/pages/userProfile/types'

const UserUrls = {
  postRegisterUser: `${API_URL.api_url}/api/register`,
  postLoginUser: `${API_URL.api_url}/api/login`,
  getAccountDetails: `${API_URL.api_url}/api/userProfile`,
  updateAccountDetails: `${API_URL.api_url}/api/userProfile`,
}

export const UserUrlsApi = {
  registerUser: async ({
    username,
    name,
    surname,
    email,
    password,
    date_of_birth,
  }: {
    username: string
    name: string
    surname: string
    email: string
    password: string
    date_of_birth: string
  }) =>
    axiosClient
      .post(UserUrls.postRegisterUser, {
        username,
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

  getUserAccountDetails: async ({
    userId,
  }: {
    userId: string
  }): Promise<User> =>
    axiosClient
      .post(UserUrls.updateAccountDetails, {
        userId,
      })
      .then((res) => res.data),

  updateUserAccount: async ({
    userId,
    username,
    name,
    surname,
    date_of_birth,
  }: {
    userId: string

    username: string
    name: string
    surname: string
    date_of_birth: string
  }): Promise<UpdatedUser> =>
    axiosClient
      .put(UserUrls.getAccountDetails, {
        userId,
        username,
        name,
        surname,
        date_of_birth,
      })
      .then((res) => res.data),
}
