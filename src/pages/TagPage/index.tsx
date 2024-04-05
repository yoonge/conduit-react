import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ListPage from '../../components/ListPage'

import { TopicListStoreProvider } from '../../stores/topic'
import { User } from '../../types/user'

const TagPage = () => {
  const { tag = '' } = useParams()
  const [activeKey] = useState(`tag${tag}`)

  const tabs = [
    { key: `tag${tag}`, label: tag, visibility: 1 },
  ]

  const handleTabSelect = (key: string) => {
    if (key === `tag${tag}`) {
      return
    }
  }

  const generateHeadline = (_: User) => {
    return <h2>{tag}</h2>
  }

  const generateSecondary = (_: User) => {
    return <></>
  }

  return (
    <TopicListStoreProvider activeKey={activeKey}>
      <ListPage
        activeKey={activeKey}
        defaultActiveKey={`tag${tag}`}
        generateHeadline={generateHeadline}
        generateSecondary={generateSecondary}
        handleTabSelect={handleTabSelect}
        tabs={tabs}
      />
    </TopicListStoreProvider>
  )
}

export default TagPage
