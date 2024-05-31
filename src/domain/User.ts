export interface User {
  id: number

  username: string
  password: string

  createdAt: string

  accessToken?: string
  refreshToken?: string
}
