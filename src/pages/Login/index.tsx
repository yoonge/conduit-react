import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap'
import Logo from '../../assets/images/nodejs.ico'
import '../../assets/stylesheets/sign.less'

import axios from '../../utils/axios'
import { useAcountStore } from '../../stores/auth'

const Login: React.FC = () => {
  const [searchParams] = useSearchParams()
  const defaultEmail = searchParams.get('email') || ''
  const redirect = searchParams.get('redirect') || '/'
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const navigete = useNavigate()
  const { login } = useAcountStore()

  const handleChange = (type: string, val: string) => {
    switch (type) {
      case 'email':
        setEmail(val)
        break
      case 'password':
        setPassword(val)
        break
      default:
        break
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (!e.currentTarget.checkValidity()) {
      return
    }
    console.log('handleSubmit: ', email, password)
    const { data = {} } = await axios.post('/login', {
      email,
      password
    })
    const { code, msg, token, user } = data
    if (code === 500) {
      setAlertMsg(msg)
      return
    } else if (code === 200) {
      login(user, token)
      navigete(redirect)
    }
  }

  return (
    <main className="form-signin mx-auto p-3">
      <Form className="text-center" noValidate onSubmit={handleSubmit}>
        <img className="mb-4" src={Logo} alt="Logo" title="Node.js" height="57" />
        <Alert variant="danger" show={alertMsg !== ''}>
          {alertMsg}
        </Alert>
        <FloatingLabel controlId="email" label="Email address">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            required
            onChange={e => handleChange('email', e.target.value)}
            autoComplete="off"
            isInvalid={!email.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)}
          />
          <Form.Control.Feedback tooltip type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="password" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={e => handleChange('password', e.target.value)}
            autoComplete="off"
            isInvalid={!password}
          />
          <Form.Control.Feedback tooltip type="invalid">
            Please enter a valid password.
          </Form.Control.Feedback>
        </FloatingLabel>

        {/* <div className="checkbox mb-3">
          <label> <input type="checkbox" value="remember-me" /> Remember me </label>
        </div> */}
        <Button className="w-100" variant="dark" size="lg" type="submit">
          Sign In
        </Button>
        <p className="text-start mt-4 mb-3">
          Need an accout? <a href="/register">Sign Up</a>.
        </p>
      </Form>
    </main>
  )
}

export default Login
