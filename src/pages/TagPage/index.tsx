import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Banner from '../../components/Banner'
import ListPage from '../../components/ListPage'

import { TopicListStoreProvider } from '../../stores/topic'

const TagPage = () => {
  const { tag = '' } = useParams()
  const [activeKey] = useState(`tag${tag}`)

  const tabs = [{ key: `tag${tag}`, label: tag, visibility: 0 }]

  const handleTabSelect = (key: string) => {
    if (key === `tag${tag}`) {
      return
    }
  }

  return (
    <TopicListStoreProvider activeKey={activeKey}>
      <ListPage
        activeKey={activeKey}
        BannerComp={
          <Banner>
            <h2>Tag: {tag}</h2>
          </Banner>
        }
        defaultActiveKey={`tag${tag}`}
        handleTabSelect={handleTabSelect}
        tabs={tabs}
      />
    </TopicListStoreProvider>
  )
}

export default TagPage
