import React from 'react'
import './index.less'

const Header: React.FC = () => {
  return (
    <header>
      <div className="container">
        <h1>Conduit</h1>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Sign in</a></li>
          <li><a href="#">Sign up</a></li>
        </ul>
      </div>
    </header>
  )
}

export default Header
