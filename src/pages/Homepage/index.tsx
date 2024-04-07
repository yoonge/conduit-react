import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Banner from '../../components/Banner'
import ListPage from '../../components/ListPage'

import { TopicListStoreProvider } from '../../stores/topic'

const Homepage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'all'
  const [activeKey, setActiveKey] = useState(tab)

  const tabs = [
    { key: 'all', label: 'All Topics', visibility: 0 },
    { key: 'my-topics', label: 'My Topics', visibility: 1 },
    { key: 'my-favorites', label: 'My Favorites', visibility: 1 },
    { key: 'sign-in', label: 'Sign in to see your own topics & favorites', visibility: -1 },
  ]

  const handleTabSelect = (key: string) => {
    if (key === 'sign-in') {
      navigate('/login')
    } else if (key === 'all') {
      setActiveKey(key)
      searchParams.delete('page')
      searchParams.delete('tab')
      setSearchParams({...searchParams})
    } else {
      setActiveKey(key)
      searchParams.delete('page')
      setSearchParams({
        ...searchParams,
        tab: key
      })
    }
  }

  return (
    <TopicListStoreProvider activeKey={activeKey}>
      <ListPage
        activeKey={activeKey}
        BannerComp={
          <Banner>
            <h1>Conduit</h1>
            <p>A place to share your knowledge.</p>
          </Banner>
        }
        defaultActiveKey="all"
        handleTabSelect={handleTabSelect}
        tabs={tabs}
      />
    </TopicListStoreProvider>
  )
}

export default Homepage
