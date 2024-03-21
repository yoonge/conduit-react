import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from './components/Header'
import Banner from './components/Banner'
import TabsComponent from './components/TabsComponent'
import ListView from './components/ListView'
import './App.less'

import { TopicStoreProvider } from './stores/topic'

const App = () => {
  const navigete = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'all'
  const [activeKey, setActiveKey] = useState(tab)

  const handleTabSelect = (key: string) => {
    if (key === 'sign-in') {
      navigete('/login')
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
    <>
      <Header />
      <Banner />
      <TopicStoreProvider activeKey={activeKey}>
        <main className="main mx-auto">
          <TabsComponent activeKey={activeKey} handleTabSelect={handleTabSelect} />
          <ListView activeKey={activeKey} handleTabSelect={handleTabSelect} />
        </main>
      </TopicStoreProvider>
    </>
  )
}

export default App
