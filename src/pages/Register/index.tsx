import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, FloatingLabel, Form, Spinner } from 'react-bootstrap'
import Header from '../../components/Header'
import ToastComp from '../../components/ToastComp'
import '../../assets/stylesheets/sign.less'

import Logo from '../../assets/images/nodejs.ico'

import { useAcountStore, useLoadingStore } from '../../stores/auth'
import axios from '../../utils/axios'
import { loadingDelay } from '../../utils/loading'

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAcountStore()
  const { loading = false, setLoading } = useLoadingStore()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleChange = (type: string, val: string) => {
    switch (type) {
      case 'email':
        setEmail(val)
        break
      case 'username':
        setUsername(val)
        break
      case 'password':
        setPassword(val)
        break
      case 'passwordConfirm':
        setPasswordConfirm(val)
        break
      default:
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!e.currentTarget.checkValidity()) {
      return
    }

    try {
      const { data = {} } = await axios.post('/register', {
        email,
        password,
        username,
      })
      const { token, user } = data
      login(user, token)
      await loadingDelay(400)
      setLoading(false)
      navigate('/')
    } catch (err: any) {
      console.error('err', err)
      await loadingDelay(300)
      setLoading(false)
      setToastMsg(err.msg)
      setShowToast(true)
    }
  }

  return (
    <>
      <Header />
      <main className="form-signin mx-auto p-3">
        <Form className="text-center" noValidate onSubmit={handleSubmit}>
          <img className="mb-5" src={Logo} alt="Logo" title="Node.js" height="57" />
          <FloatingLabel controlId="email" label="Email address">
            <Form.Control
              autoComplete="off"
              isInvalid={!email.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="username@example.com"
              type="email"
              value={email}
            />
          </FloatingLabel>
          <FloatingLabel controlId="username" label="Username">
            <Form.Control
              autoComplete="off"
              isInvalid={!username}
              onChange={e => handleChange('username', e.target.value)}
              placeholder="Username"
              required
              type="text"
              value={username}
            />
          </FloatingLabel>

          <FloatingLabel controlId="password" label="Password">
            <Form.Control
              autoComplete="off"
              isInvalid={!password}
              onChange={e => handleChange('password', e.target.value)}
              placeholder="Password"
              required
              type="password"
              value={password}
            />
          </FloatingLabel>

          <FloatingLabel controlId="passwordConfirm" label="Password Confirm">
            <Form.Control
              autoComplete="off"
              className="mb-3"
              isInvalid={password !== passwordConfirm}
              onChange={e => handleChange('passwordConfirm', e.target.value)}
              placeholder="Confirm your password"
              type="password"
              value={passwordConfirm}
            />
          </FloatingLabel>

          <Button className="w-100" disabled={loading} size="lg" type="submit" variant="dark">
            <Spinner
              animation="border"
              aria-hidden="true"
              as="span"
              className="me-3"
              hidden={!loading}
              role="status"
              size="sm"
            />
            Sign Up
          </Button>
          <p className="text-start mt-4 mb-3">
            Already have an account? <a href="/login">Sign In</a>.
          </p>
        </Form>
      </main>

      <ToastComp
        bg="danger"
        content={toastMsg}
        delay={5000}
        position="bottom-end"
        show={showToast}
        setShow={setShowToast}
        title="Register Error"
      />
    </>
  )
}

export default Register
