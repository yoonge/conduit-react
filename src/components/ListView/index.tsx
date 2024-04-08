import { useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
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
          {(activeKey.indexOf('tag') === 0) && (
            <>
              Nothing yet... You can initiate a new topic with <Badge bg="success">{activeKey.substring(3)}</Badge> <a href="/topic/initiate">HERE</a>.
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ListView
