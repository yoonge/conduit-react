import { useState } from 'react'
import { createStore } from 'hox'
import axios from '../utils/axios'

import { Topic } from '../types/topic'
import { User } from '../types/user'

interface TopicListStoreProps {
  activeKey: string
}

export const [useTopicListStore, TopicListStoreProvider] = createStore((props: TopicListStoreProps) => {
  const [topicList, setTopicList] = useState([] as Array<Topic>)
  const [theUser, setTheUser] = useState({} as User)
  const { activeKey = 'all' } = props;

  const fetchTopicList = async (username: string | undefined) => {
    try {
      let api = '/';
      if (username) {
        activeKey === 'topics'
          ? api += `profile/${username}`
          : api += `profile/${username}/favorites`
      } else {
        switch (activeKey) {
          case 'my-topics':
          case 'my-favorites':
            api += activeKey
            break
          default:
            break
        }
      }
      const { data = {} } = await axios.get(api)
      // console.log('fetchTopicList data: ', data)
      const { formatTopics = [], theUser = {} } = data;
      setTopicList(formatTopics)
      setTheUser(theUser)
    } catch (err) {
      console.error('fetchTopicList error: ', err)
    }
  }

  return { fetchTopicList, theUser, topicList }
})
