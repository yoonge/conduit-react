import Header from './components/Header'
import Banner from './components/Banner'
import ListView from './components/ListView'
import './App.less'

const App = () => {

  return (
    <>
      <Header />
      <Banner />
      <main className="main">
        <ListView />
      </main>
    </>
  )
}

export default App
