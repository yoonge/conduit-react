import React from 'react'
import { Container } from 'react-bootstrap'
import Logo from '../../assets/nodejs.ico'

import '../../assets/stylesheets/sign.less'


const Login: React.FC = () => {
  return (
    <main className="form-signin">
      <Container>
        <form action="/login" method="post">
          <img className="mb-4" src={Logo} alt="Logo" title="Node.js" height="57" />

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
              autoFocus
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
          </div>

          {/* <div className="checkbox mb-3">
            <label> <input type="checkbox" value="remember-me" /> Remember me </label>
          </div> */}
          <button className="w-100 btn btn-lg btn-dark" type="submit">Sign In</button>
          <p className="mt-4 mb-3">Need an accout? <a href="/register">Sign Up</a>.</p>
        </form>
      </Container>
    </main>
  )
}

export default Login
