declare type Topic = {
  _id: string
  comment?: number
  comments?: [Types.ObjectId]
  content: string
  favorite?: number
  status?: number
  title: string
  createTime: Date
  updateTime: Date
  updateTimeStr: string
  user: Types.ObjectId
}

export { Tab, Topic }
