import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, FloatingLabel, Form, Spinner } from 'react-bootstrap'
import Header from '../../components/Header'
import ToastComp from '../../components/ToastComp'
import '../../assets/stylesheets/sign.less'

import Logo from '../../assets/images/nodejs.ico'

import axios from '../../utils/axios'
import { useAcountStore, useLoadingStore } from '../../stores/auth'
import { loadingDelay } from '../../utils/loading'


const Login = () => {
  const navigate = useNavigate()
  const { loading = false, setLoading } = useLoadingStore()
  const [searchParams] = useSearchParams()
  const defaultEmail = searchParams.get('email') || ''
  const redirect = searchParams.get('redirect') || '/'
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState('')
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!e.currentTarget.checkValidity()) {
      return
    }

    try {
      setLoading(true)
      const { data = {} } = await axios.post('/login', {
        email,
        password
      })
      const { token, user } = data
      login(user, token)
      await loadingDelay(400)
      setLoading(false)
      navigate(redirect)
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
              placeholder="name@example.com"
              required
              type="email"
              value={email}
            />
            {/* <Form.Control.Feedback tooltip type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback> */}
          </FloatingLabel>
          <FloatingLabel controlId="password" label="Password">
            <Form.Control
              autoComplete="off"
              className="mb-3"
              isInvalid={!password}
              onChange={e => handleChange('password', e.target.value)}
              placeholder="Password"
              required
              type="password"
              value={password}
            />
            {/* <Form.Control.Feedback tooltip type="invalid">
              Please enter a valid password.
            </Form.Control.Feedback> */}
          </FloatingLabel>

          <Button className="w-100" disabled={loading} variant="dark" size="lg" type="submit">
            <Spinner
              animation="border"
              aria-hidden="true"
              as="span"
              className="me-3"
              hidden={!loading}
              role="status"
              size="sm"
            />
            Sign In
          </Button>
          <p className="text-start mt-4 mb-3">
            Need an accout? <a href="/register">Sign Up</a>.
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
        title="Login Error"
      />
    </>
  )
}

export default Login
