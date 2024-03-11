import React, { useState } from 'react'
import ListItem from '../ListItem'
import './index.less'

const ListView: React.FC = () => {
  const listDefault = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
  ]
  const [list, _setList] = useState(listDefault)

  return (
    <section>
      {list.length ? (
        list.map(item => <ListItem key={item.id} />)
      ) : (
        <div className="noTopic text-muted">
          Nothing yet... You can find some topics that interest you <a href="/">HERE</a>. Nothing
          yet... You can initiate a new topic <a href="/topic/initiate">HERE</a>.
        </div>
      )}
    </section>
  )
}

export default ListView
