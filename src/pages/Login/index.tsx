import React from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import Logo from '../../assets/images/nodejs.ico'

import '../../assets/stylesheets/sign.less'

const Login: React.FC = () => {
  return (
    <main className="form-signin mx-auto p-3">
      <Form className="text-center">
        <img className="mb-4" src={Logo} alt="Logo" title="Node.js" height="57" />
        <FloatingLabel controlId="email" label="Email address">
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="password" label="Password">
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>

        {/* <div className="checkbox mb-3">
          <label> <input type="checkbox" value="remember-me" /> Remember me </label>
        </div> */}
        <Button className="w-100" variant="dark" size="lg">Sign In</Button>
        <p className="text-start mt-4 mb-3">
          Need an accout? <a href="/register">Sign Up</a>.
        </p>
      </Form>
    </main>
  )
}

export default Login
