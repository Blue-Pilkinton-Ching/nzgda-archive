export interface Game {
  id: number
  name: string
  description: string
  thumbnail: string
  banner?: string
  approved: number
  studio: Studio
  url?: string
  tags: string
  exclude: string
  width?: number
  height?: number
  createdAt: string
  updatedAt: string
  isApp: boolean
  educational: boolean
  playableOnHeihei?: boolean
  sort: number
}
export interface UserTypes {
  admins: User[]
  privileged: User[]
}

export interface AdminDashboard {
  users: UserTypes
  studios: Studio[]
  authRequests: User[]
}

export interface User {
  studio: number
  email: string
  uid: string
}

export type UserPrivilege =
  | 'missing'
  | 'invalid'
  | 'error'
  | 'noprivilege'
  | 'admin'
  | 'privileged'

export interface Studio {
  id: number
  name: string
}
