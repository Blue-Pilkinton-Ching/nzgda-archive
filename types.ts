export interface Game {
  id: number
  name: string
  description: string
  thumbnail: string
  banner?: string
  approved: boolean
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
  hidden: boolean
}
export interface UserTypes {
  admins: Admin[]
  privileged: Admin[]
}

export interface DashboardData {
  games: Game[]
  admins: Admin[]
  requests: Admin[]
  studios: Studio[]
}

export interface Admin {
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

export interface Studio {
  id: number
  name: string
}
