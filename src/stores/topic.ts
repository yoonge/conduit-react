import { useState } from 'react'
import { createStore } from 'hox'
import axios from '../utils/axios'

import { Topic } from '../types/topic'
import { User } from '../types/user'

interface TopicListStoreProps {
  activeKey: string
}

export const [useTopicListStore, TopicListStoreProvider] = createStore(
  (props: TopicListStoreProps) => {
    const [topicList, setTopicList] = useState([] as Array<Topic>)
    const [total, setTotal] = useState(0)
    const [theUser, setTheUser] = useState({} as User)
    const { activeKey = 'all' } = props

    const fetchTopicList = async (username: string | undefined, page: string = '1') => {
      try {
        let api = '/'
        if (username) {
          activeKey === 'topics'
            ? (api += `profile/${username}`)
            : (api += `profile/${username}/favorites`)
        } else {
          switch (activeKey) {
            case 'my-topics':
            case 'my-favorites':
              api += activeKey
              break
            default:
              if (activeKey.indexOf('tag') === 0) {
                api += `tags/${activeKey.substring(3)}`
              }
              break
          }
        }
        if (page !== '1') {
          api += `?page=${page}`
        }
        const { data = {} } = await axios.get(api)
        // console.log('fetchTopicList data: ', data)
        const { formatTopics = [], theUser = {}, total = 0 } = data
        setTopicList(formatTopics)
        setTheUser(theUser)
        setTotal(total)
      } catch (err) {
        console.error('fetchTopicList error: ', err)
      }
    }

    const updateTopicList = (topic: Topic) => {
      const index = topicList.findIndex(item => item._id === topic._id)
      if (index > -1) {
        topicList[index] = topic
      }
      setTopicList([...topicList])
    }

    const removeTopicFromList = (topic: Topic) => {
      const index = topicList.findIndex(item => item._id === topic._id)
      if (index > -1) {
        topicList.splice(index, 1)
      }
      setTopicList([...topicList])
      setTotal(total - 1)
    }

    return { fetchTopicList, removeTopicFromList, theUser, topicList, total, updateTopicList }
  }
)
