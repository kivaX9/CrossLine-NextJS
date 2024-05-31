export interface LoginUser {
  username: string
  password: string
}

export interface RegisterUser {
  username: string
  password: string
  confirmPassword?: string

  firstName: string
  lastName: string
}
