declare type Topic = {
  _id: string
  comment?: number
  comments?: [Types.ObjectId]
  content: string
  favorite?: number
  tags?: [string]
  status?: number
  title: string
  createTime: string
  updateTime: string
  updateTimeStr: string
  user: Types.ObjectId
}

export { Tab, Topic }
