import React, { useEffect } from 'react'
import ListItem from '../ListItem'
import './index.less'

import { useTopicStore } from '../../stores/topic'

const ListView: React.FC = () => {
  const { topicList, fetchTopicList } = useTopicStore()
  useEffect(() => {
    fetchTopicList()
  }, [])

  return (
    <section>
      <div className="topicList list-group">
        {topicList.length ? (
          topicList.map(item => <ListItem key={item?._id} topic={item} />)
        ) : (
          <div className="noTopic text-muted">
            Nothing yet... You can initiate a new topic <a href="/topic/initiate">HERE</a>.
          </div>
        )}
      </div>
    </section>
  )
}

export default ListView
