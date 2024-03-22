import ListPage from '../../components/ListPage'

const Homepage = () => {
  const tabs = [
    { key: 'all', label: 'All Topics', visibility: 0 },
    { key: 'my-topics', label: 'My Topics', visibility: 1 },
    { key: 'my-favorites', label: 'My Favorites', visibility: 1 },
    { key: 'sign-in', label: 'Sign in to see your own topics & favorites', visibility: -1 },
  ]

  return (
    <ListPage
      defaultActiveKey="all"
      headline={<h1>Conduit</h1>}
      secondary={<p>A place to share your knowledge.</p>}
      tabs={tabs}
    />
  )
}

export default Homepage
