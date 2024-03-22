import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../Header'
import Banner from '../Banner'
import TabsComponent from '../TabsComponent'
import ListView from '../ListView'
import './index.less'

import { TopicStoreProvider } from '../../stores/topic'

interface ListPageProps {
  defaultActiveKey: string
  headline: string | JSX.Element
  secondary: string | JSX.Element
  tabs: {
    key: string
    label: string
    visibility: number
  }[]
  theUserId?: string | undefined
}

const ListPage: React.FC<ListPageProps> = ({ defaultActiveKey, headline, secondary, tabs, theUserId }) => {
  const navigete = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') || defaultActiveKey
  const [activeKey, setActiveKey] = useState(tab)

  const handleTabSelect = (key: string) => {
    if (key === 'sign-in') {
      navigete('/login')
    } else if (key === defaultActiveKey) {
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
    <>
      <Header />
      <Banner headline={headline} secondary={secondary} />
      <TopicStoreProvider activeKey={activeKey}>
        <main className="main mx-auto">
          <TabsComponent activeKey={activeKey} handleTabSelect={handleTabSelect} tabs={tabs} />
          <ListView activeKey={activeKey} handleTabSelect={handleTabSelect} theUserId={theUserId} />
        </main>
      </TopicStoreProvider>
    </>
  )
}

export default ListPage
