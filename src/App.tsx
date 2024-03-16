import { HoxRoot } from 'hox'
import Header from './components/Header'
import Banner from './components/Banner'
import Tabs from './components/Tabs'
import ListView from './components/ListView'
import './App.less'

import { TopicStoreProvider } from './stores/topic'

const App = () => {
  return (
    <HoxRoot>
      <Header />
      <Banner />
      <TopicStoreProvider>
        <main className="main mx-auto">
          <Tabs />
          <ListView />
        </main>
      </TopicStoreProvider>
    </HoxRoot>
  )
}

export default App
