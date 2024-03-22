import { User } from './user'

declare type Topic = {
  _id: string
  comment?: number
  content: string
  favorite?: number
  status?: number
  title: string
  createTime: Date
  updateTime: Date
  user: User
}

export { Tab, Topic }
