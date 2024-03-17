import { useState } from 'react'
import { createStore } from 'hox'
import axios from 'axios'
import { API_PREFIX } from '../constants/settiings'

import { Topic } from '../types/topic'

interface TopicStoreProps {
  activeKey: string
}

export const [useTopicStore, TopicStoreProvider] = createStore((props: TopicStoreProps) => {
  const [topicList, setTopicList] = useState([] as Array<Topic>)
  const { activeKey = 'all' } = props;

  const fetchTopicList = async () => {
    try {
      let api = `${API_PREFIX}/`;
      switch (activeKey) {
        case 'my-topics':
          api += 'my-topics'
          break
        case 'my-favorites':
          api += 'my-favorites'
          break
        default:
          // Nothing to do.
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
