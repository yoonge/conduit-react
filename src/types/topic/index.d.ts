import { User } from './user'

declare type Topic = {
  _id: string
  comment?: number
  content: string
  favorite?: number
  status?: number
  title: string
  updateTime: Date
  updateTimeStr?: string
  user: User
}

export { Topic }
