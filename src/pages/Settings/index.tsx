import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import AVATAR from '../../constants/avatar'
import { BASE_URL } from '../../constants/settiings'
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import './index.less'

import { useAcountStore } from '../../stores/auth'
import { User } from '../../types/user'

const Settings: React.FC = () => {
  const { user = {} as User } = useAcountStore()
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

  const GENDERS = [
    { value: 1, label: 'Male' },
    { value: -1, label: 'Female' },
    { value: 0, label: 'Secret' }
  ]

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
  }

  return (
    <>
      <Header />
      <Banner
        headline={
          <h2>
            <img
              alt={user?.username}
              src={`${BASE_URL}${avatar}`}
              title={user?.nickname || user?.username}
              width={100}
            />
          </h2>
        }
        secondary={
          <>
            <h4 className="mt-3">{user?.nickname || user?.username}</h4>
            <p className="text-secondary">{user?.bio}</p>
          </>
        }
      />
      <div className="settings">
        {/* <h2>title</h2> */}
        {/* <h4><img className="avatar" src="{{ user.avatar }}" alt="Avatar" title="{{ user.username }}" width="64" /></h4> */}
        <Form className="mt-5" style={{ paddingBlockEnd: '96px' }} noValidate onSubmit={handleSubmit}>
          {/* <input type="hidden" name="_id" value={user._id.toString()} /> */}
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
              onChange={e => handleInputChange('username', e.target.value)}
              required
              type="text"
              value={username}
              isInvalid={!username.trim()}
            />
            <Form.Control.Feedback type="invalid">
              Username is required.
            </Form.Control.Feedback>
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
            <Form.Label htmlFor="gender">Gender</Form.Label>
            <div className="form-control form-radio-control" id="gender">
              {GENDERS.map(item => (
                <Form.Check
                  checked={gender === item.value}
                  className="me-4"
                  inline
                  key={item.value}
                  onChange={e => handleInputChange('gender', e.target.value)}
                  type="radio"
                  value={item.value}
                >
                  <Form.Check.Label>
                    <Form.Check.Input name="gender" type="radio" />
                    {item.label}
                  </Form.Check.Label>
                </Form.Check>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="birthday">Birthday</Form.Label>
            <Form.Control
              id="birthday"
              onChange={e => handleInputChange('birthday', e.target.value)}
              placeholder="2016-03-14"
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
              id="password"
              onChange={e => handleInputChange('password', e.target.value)}
              placeholder="A new password, if you wanna change"
              type="password"
              value={password}
            />
          </div>
          <div className="mb-3">
            <Button variant="dark" type="submit">Update</Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Settings
