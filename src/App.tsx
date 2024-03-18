import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Banner from './components/Banner'
import TabsComponent from './components/TabsComponent'
import ListView from './components/ListView'
import './App.less'

import { TopicStoreProvider } from './stores/topic'

const App = () => {
  const [activeKey, setActiveKey] = useState('all')
  const navigete = useNavigate()

  const handleTabSelect = (key: string) => {
    if (key === 'sign-in') {
      navigete('/login')
    } else {
      setActiveKey(key)
    }
  }

  return (
    <>
      <Header />
      <Banner />
      <TopicStoreProvider activeKey={activeKey}>
        <main className="main mx-auto">
          <TabsComponent activeKey={activeKey} handleTabSelect={handleTabSelect} />
          <ListView activeKey={activeKey} />
        </main>
      </TopicStoreProvider>
    </>
  )
}

export default App
