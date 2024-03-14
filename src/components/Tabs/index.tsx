import React from 'react'

const Tabs: React.FC = () => {
  return (
    <>
      <div className="text-end">
        <a href="/topic/initiate" className="btn btn-dark">New Topic</a>
      </div>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            href="/"
            className="nav-link active"
            // className="nav-link"
          >All Topics</a>
        </li>
        <li className="nav-item">
          <a
            href="/myTopics"
            // className="nav-link active"
            className="nav-link"
          >MyTopics</a>
        </li>
        <li className="nav-item">
          <a
            href="/myFavorites"
            // className="nav-link active"
            className="nav-link"
          >MyFavorites</a>
        </li>
        <li className="nav-item">
          <a
            href="/login"
            className="nav-link"
          >Sign in to see your own topics & favorite</a>
        </li>
      </ul>
    </>
  )
}

export default Tabs
