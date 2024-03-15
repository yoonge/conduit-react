import Header from './components/Header'
import Banner from './components/Banner'
import Tabs from './components/Tabs'
import ListView from './components/ListView'
import './App.less'

const App = () => {

  return (
    <>
      <Header />
      <Banner />
      <main className="main">
        <Tabs />
        <ListView />
      </main>
    </>
  )
}

export default App
