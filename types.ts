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
  width: number | null
  height: number | null
  created_at: string
  updated_at: string
  isApp: boolean
  educational: boolean
  sort: number
  hidden: boolean
  featured: boolean
  iosLink?: string
  yearOfRelease: number
  androidLink?: string
  steamLink?: string
  websiteLink?: string
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
  steam: string
  ios: string
  android: string
  name: string
  website: string
  description: string
  date_created: string
  date_updated: string
}
