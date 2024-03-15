import React from 'react'
import { Container } from 'react-bootstrap'
import Logo from '../../assets/nodejs.ico'

import '../../assets/stylesheets/sign.less'

const Register: React.FC = () => {
  return (
    <main className="form-signin">
      <Container>
        <form action="/register" method="post">
          <img className="mb-4" src={Logo} alt="Logo" title="Node.js" height="57" />

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
              autoComplete="off"
              autoFocus
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              autoComplete="off"
            />
            <label htmlFor="username">Username</label>
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

          <button className="w-100 btn btn-lg btn-dark" type="submit">Sign Up</button>
          <p className="mt-4 mb-3">Already have an account? <a href="/login">Sign In</a>.</p>
        </form>
      </Container>
    </main>
  )
}

export default Register
