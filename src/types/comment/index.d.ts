import { User } from './user'

declare type Comment = {
  _id: string
  content: string
  status?: number
  topic: Types.ObjectId
  createTime: string
  user: User
}

export { Comment }
