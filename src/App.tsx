import { HoxRoot } from 'hox'
import Header from './components/Header'
import Banner from './components/Banner'
import Tabs from './components/Tabs'
import ListView from './components/ListView'
import './App.less'

const App = () => {

  return (
    <HoxRoot>
      <Header />
      <Banner />
      <main className="main mx-auto">
        <Tabs />
        <ListView />
      </main>
    </HoxRoot>
  )
}

export default App
