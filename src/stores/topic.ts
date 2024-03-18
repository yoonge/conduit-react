import { useState } from 'react'
import { createStore } from 'hox'
import axios from '../utils/axios'

import { Topic } from '../types/topic'

interface TopicStoreProps {
  activeKey: string
}

export const [useTopicStore, TopicStoreProvider] = createStore((props: TopicStoreProps) => {
  const [topicList, setTopicList] = useState([] as Array<Topic>)
  const { activeKey = 'all' } = props;

  const fetchTopicList = async () => {
    try {
      let api = '/';
      switch (activeKey) {
        case 'my-topics':
          api += 'my-topics'
          break
        case 'my-favorites':
          api += 'my-favorites'
          break
        default:
          break
      }
      const { data = {} } = await axios.get(api)
      // console.log('fetchTopicList data: ', data)
      const { formatTopics = [] } = data;
      setTopicList(formatTopics)
    } catch (err) {
      console.error('fetchTopicList error: ', err)
    }
  }

  return { topicList, fetchTopicList }
})
