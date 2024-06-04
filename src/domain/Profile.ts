import { User } from './User'

export interface Profile extends User {
  id: number
  firstName: string
  lastName: string

  telephone?: string

  user: User
}

export interface UpdateProfile {
  firstName: string
  lastName: string

  telephone: string
}
