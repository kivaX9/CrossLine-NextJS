import { User } from '@/domain/User'

class LocalStorageUser {
  private LOCAL_STORAGE_KEY = 'user'

  public getLocalStorageUser(): User | null {
    if (typeof window === 'undefined') return null

    const stringifiedUser = localStorage.getItem(this.LOCAL_STORAGE_KEY) ?? '{}'
    const jsonParsedUser = JSON.parse(stringifiedUser) as User

    if (jsonParsedUser?.accessToken) return jsonParsedUser

    return null
  }

  public setLocalStorageUser(user: User) {
    const localStorageUser = this.getLocalStorageUser()

    const updateLocalStorageUser = (value: User) =>
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(value))

    if (localStorageUser?.accessToken) {
      const currentLocalStorageUser: User = {
        ...localStorageUser,
        ...user,
      }

      updateLocalStorageUser(currentLocalStorageUser)
    } else {
      const currentLocalStorageUser: User = {
        ...user,
      }

      updateLocalStorageUser(currentLocalStorageUser)
    }
  }

  public removeLocalStorageUser() {
    localStorage.removeItem('user')
  }
}

const newLocalStorageUser = new LocalStorageUser()
export default newLocalStorageUser
