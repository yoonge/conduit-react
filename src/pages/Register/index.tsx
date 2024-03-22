import React from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import Header from '../../components/Header'
import Logo from '../../assets/images/nodejs.ico'

import '../../assets/stylesheets/sign.less'

const Register: React.FC = () => {
  return (
    <>
      <Header />
      <main className="form-signin mx-auto p-3">
        <Form className="text-center">
          <img className="mb-5" src={Logo} alt="Logo" title="Node.js" height="57" />
          <FloatingLabel controlId="email" label="Email address">
            <Form.Control type="email" placeholder="name@example.com" autoComplete="off" />
          </FloatingLabel>
          <FloatingLabel controlId="username" label="Username">
            <Form.Control type="text" placeholder="Username" autoComplete="off" />
          </FloatingLabel>

          <FloatingLabel controlId="password" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>

          <Button className="w-100" variant="dark" size="lg">Sign Up</Button>
          <p className="text-start mt-4 mb-3">
            Already have an account? <a href="/login">Sign In</a>.
          </p>
        </Form>
      </main>
    </>
  )
}

export default Register
