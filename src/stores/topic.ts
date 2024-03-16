import { useState } from 'react'
import { createStore } from 'hox'
import axios from 'axios'
import { API_PREFIX } from '../constants/settiings'

import { Topic } from '../types/topic'

export const [useTopicStore, TopicStoreProvider] = createStore(() => {
  const [topicList, setTopicList] = useState([] as Array<Topic>)

  const fetchTopicList = async () => {
    try {
      const { data = {} } = await axios.get(`${API_PREFIX}/`)
      // console.log('fetchTopicList data: ', data)
      const { formatTopics = [] } = data;
      setTopicList(formatTopics)
    } catch (err) {
      console.error('fetchTopicList error: ', err)
    }
  }

  return { topicList, fetchTopicList }
})
