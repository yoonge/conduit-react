declare type User = {
  _id: string
  avatar?: string
  bio?: string
  birthday?: string
  email: string
  favorite?: [Types.ObjectId]
  gender?: number
  job?: string
  nickname?: string
  password: string
  phone?: number
  position?: string
  username: string
}

export { User }
