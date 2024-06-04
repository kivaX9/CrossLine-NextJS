export interface User {
  id: number

  username: string
  password: string

  createdAt: string

  accessToken?: string
  refreshToken?: string
}

export interface UpdateUser {
  username: string
  password: string
}
