export interface Game {
  id: number
  name: string
  description: string
  thumbnail: string
  banner: string | null
  approved: boolean
  studio_id: number
  url: string | null
  tags: string
  exclude: string
  width: number | null
  height: number | null
  created_at: string
  updated_at: string
  isApp: boolean
  educational: boolean
  playableOnHeihei: boolean
  sort: number
  hidden: boolean
  featured: boolean
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
