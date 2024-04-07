import { useEffect, useRef, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import flatpickr from 'flatpickr'
import AVATAR from '../../constants/avatar'
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import ToastComp from '../../components/ToastComp'
import '../../assets/stylesheets/form.less'

import axios from '../../utils/axios'
import { loadingDelay } from '../../utils/loading'
import { BASE_URL } from '../../constants/settiings'
import { useAcountStore, useLoadingStore } from '../../stores/auth'
import { User } from '../../types/user'

const Settings = () => {
  const { update, user = {} as User } = useAcountStore()
  const { loading = false, setLoading } = useLoadingStore()
  const [avatar, setAvatar] = useState(user.avatar)
  const [email] = useState(user.email)
  const [username, setUsername] = useState(user.username)
  const [nickname, setNickname] = useState(user.nickname)
  const [gender, setGender] = useState(user.gender)
  const [birthday, setBirthday] = useState(user.birthday)
  const [phone, setPhone] = useState(user.phone)
  const [job, setJob] = useState(user.job)
  const [bio, setBio] = useState(user.bio)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [toastMsg, setToastMsg] = useState('')
  const [show, setShow] = useState(false)

  const GENDERS = [
    { value: 1, label: 'Male' },
    { value: -1, label: 'Female' },
    { value: 0, label: 'Secret' }
  ]

  const flatpickrRef = useRef(null)
  useEffect(() => {
    flatpickr(flatpickrRef.current!, {
      onChange: (_, dateStr: string) => {
        handleInputChange('birthday', dateStr)
      }
    })
  }, [])

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'avatar':
        setAvatar(value)
        break
        case 'username':
        setUsername(value)
        break
      case 'nickname':
        setNickname(value)
        break
      case 'gender':
        setGender(parseInt(value))
        break
      case 'birthday':
        setBirthday(value)
        break
      case 'phone':
        setPhone(parseInt(value))
        break
      case 'job':
        setJob(value)
        break
      case 'bio':
        setBio(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'passwordConfirm':
        setPasswordConfirm(value)
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
      const formData = {
        _id: user._id,
        avatar,
        email,
        username,
        nickname,
        gender,
        birthday,
        phone,
        job,
        bio,
        password
      }
      setLoading(true)
      const { data = {} } = await axios.post('/settings/update', formData)
      const { msg = '', user: updatedUser = {} as User } = data
      update(updatedUser)
      await loadingDelay(400)
      setLoading(false)
      setToastMsg(msg)
      setShow(true)
    } catch (err: any) {
      setLoading(false)
      console.error('Settings update error: ', err)
    }
  }

  return (
    <>
      <Header />
      <Banner>
        <h2>
          <img
            alt={user?.username}
            src={`${BASE_URL}${avatar}`}
            title={user?.nickname || user?.username}
            width={100}
          />
        </h2>
        <h4 className="mt-3">{user?.nickname || user?.username}</h4>
        <p className="text-secondary">{user?.bio}</p>
      </Banner>
      <section className="settings">
        <Form
          className="mt-5"
          style={{ paddingBlockEnd: '96px' }}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <Form.Label htmlFor="avatar">Avatar</Form.Label>
            <Form.Select
              id="avatar"
              onChange={e => handleInputChange('avatar', e.target.value)}
              value={avatar}
            >
              {AVATAR.map(item => (
                <option key={item.title} value={item.src}>
                  {item.title}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              disabled
              id="email"
              onChange={e => handleInputChange('email', e.target.value)}
              required
              type="email"
              value={email}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              id="username"
              isInvalid={!username.trim()}
              onChange={e => handleInputChange('username', e.target.value)}
              required
              type="text"
              value={username}
            />
            <Form.Control.Feedback type="invalid">Username is required.</Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="nickname">Nickname</Form.Label>
            <Form.Control
              id="nickname"
              onChange={e => handleInputChange('nickname', e.target.value)}
              type="text"
              value={nickname}
            />
          </div>
          <div className="mb-3">
            <Form.Label>Gender</Form.Label>
            <div className="form-control form-radio-control">
              {GENDERS.map(item => (
                <Form.Check.Label className="me-5" key={item.label}>
                  <Form.Check
                    checked={gender === item.value}
                    inline
                    onChange={e => handleInputChange('gender', e.target.value)}
                    type="radio"
                    value={item.value}
                  />
                  {item.label}
                </Form.Check.Label>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="birthday">Birthday</Form.Label>
            <Form.Control
              id="birthday"
              onChange={e => handleInputChange('birthday', e.target.value)}
              placeholder="2016-03-14"
              ref={flatpickrRef}
              type="text"
              value={birthday}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="phone">Phone Number</Form.Label>
            <Form.Control
              id="phone"
              onChange={e => handleInputChange('phone', e.target.value)}
              placeholder="13800138000"
              type="number"
              value={phone}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="job">Job</Form.Label>
            <Form.Control
              id="job"
              onChange={e => handleInputChange('job', e.target.value)}
              placeholder="What do you do"
              type="text"
              value={job}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="bio">Bio</Form.Label>
            <textarea
              className="form-control"
              cols={30}
              id="bio"
              onChange={e => handleInputChange('bio', e.target.value)}
              placeholder="Short bio about you"
              rows={10}
              value={bio}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              autoComplete="off"
              id="password"
              onChange={e => handleInputChange('password', e.target.value)}
              placeholder="A new password, if you wanna change"
              type="password"
              value={password}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="passwordConfirm">Password Confirm</Form.Label>
            <Form.Control
              autoComplete="off"
              id="passwordConfirm"
              isInvalid={password !== passwordConfirm}
              onChange={e => handleInputChange('passwordConfirm', e.target.value)}
              placeholder="Confirm your new password"
              type="password"
              value={passwordConfirm}
            />
            <Form.Control.Feedback type="invalid">Passwords are inconsistent</Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <Button variant="dark" type="submit" disabled={loading}>
              <Spinner
                animation="border"
                aria-hidden="true"
                as="span"
                className="me-2"
                hidden={!loading}
                role="status"
                size="sm"
              />
              Update
            </Button>
          </div>
        </Form>
      </section>

      <ToastComp
        content={toastMsg}
        position="bottom-end"
        show={show}
        setShow={setShow}
        title="Success"
      />
    </>
  )
}

export default Settings
