import React from 'react'

import { useAcountStore } from '../../stores/auth'

const Tabs: React.FC = () => {
  const { user } = useAcountStore()

  return (
    <>
      {user.username ? (
        <div className="text-end">
          <a href="/topic/initiate" className="btn btn-dark">New Topic</a>
        </div>
      ) : null}

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            href="/"
            className="nav-link active"
            // className="nav-link"
          >All Topics</a>
        </li>
        {user.username ? (
          <>
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
          </>
        ) : (
          <li className="nav-item">
            <a
              href="/login"
              className="nav-link"
            >Sign in to see your own topics & favorite</a>
          </li>
        )}
      </ul>
    </>
  )
}

export default Tabs
