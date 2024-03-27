import React from 'react'
import { useNavigate } from 'react-router-dom'
import ListItem from '../ListItem'
import './index.less'

import { useTopicListStore } from '../../stores/topic'

interface ListViewProps {
  activeKey: string
  handleTabSelect: (key: string) => void
}

const ListView: React.FC<ListViewProps> = ({ activeKey, handleTabSelect }) => {
  const navigate = useNavigate()
  const { topicList } = useTopicListStore()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    if (activeKey === 'favorites') {
      navigate('/')
    } else {
      handleTabSelect('all')
    }
  }

  return (
    <section>
      <div className="topicList list-group">
        {topicList.length ? (
          topicList.map(item => <ListItem key={item?._id} topic={item} />)
        ) : (
          <div className="py-4 text-muted">
            {['favorites', 'my-favorites'].includes(activeKey) && (
              <>
                Nothing yet... You can find some topics that interest you <a href="" onClick={handleClick}>HERE</a>.
              </>
            )}
            {['all', 'my-topics', 'topics'].includes(activeKey) && (
              <>
                Nothing yet... You can initiate a new topic <a href="/topic/initiate">HERE</a>.
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default ListView
