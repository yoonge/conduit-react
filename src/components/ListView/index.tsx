import React, { useEffect } from 'react'
import { AxiosError } from 'axios'
import ListItem from '../ListItem'
import './index.less'

import { useTopicStore } from '../../stores/topic'

interface ListViewProps {
  activeKey: string
  handleTabSelect: (key: string) => void
  theUserId?: string | undefined
}

const ListView: React.FC<ListViewProps> = ({ activeKey, handleTabSelect }) => {
  const { topicList, fetchTopicList } = useTopicStore()
  useEffect(() => {
    fetchTopicList().catch((err: AxiosError) => {
      console.log('err', err)
    })
  }, [activeKey])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    handleTabSelect('all')
  }

  return (
    <section>
      <div className="topicList list-group">
        {topicList.length ? (
          topicList.map(item => <ListItem key={item?._id} topic={item} />)
        ) : (
          <div className="py-4 text-muted">
            {activeKey === 'my-favorites' ? (
              <>
                Nothing yet... You can find some topics that interest you <a href="" onClick={handleClick}>HERE</a>.
              </>
            ) : (
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
