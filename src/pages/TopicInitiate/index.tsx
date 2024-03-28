import { useEffect, useRef, useState } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import Vditor from 'vditor'
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import '../../assets/stylesheets/form.less'

import axios from '../../utils/axios'
import { loadingDelay } from '../../utils/loading'
import { BASE_URL } from '../../constants/settiings'
import { useAcountStore, useLoadingStore } from '../../stores/auth'
import { User } from '../../types/user'
import { useNavigate } from 'react-router-dom'

const TopicInitiate: React.FC = () => {
  const navigate = useNavigate()
  const { user = {} as User } = useAcountStore()
  const { loading = false, setLoading } = useLoadingStore()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [clsName, setClsName] = useState('')

  const vditorRef = useRef(null)
  useEffect(() => {
    new Vditor(vditorRef?.current!, {
      blur(val) {
        setContent(val)
        checkContentValidity(val)
      },
      cache: { enable: false },
      cdn: 'https://cdn.jsdelivr.net/npm/vditor@3.10.2',
      input(val) {
        setContent(val)
        checkContentValidity(val)
      },
      lang: 'en_US',
      minHeight: 480,
      placeholder: 'Write your topic content here (in markdown)',
      preview: {
        actions: [
          'desktop',
          // 'tablet',
          'mobile'
          // 'mp-wechat', 'zhihu'
        ],
        maxWidth: 1080,
        theme: {
          current: 'light',
          path: 'https://cdn.jsdelivr.net/npm/vditor@3.10.2/dist/css/content-theme'
        },
      },
      tab: '    ',
      // theme: 'dark',
      toolbar: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        '|',
        'line',
        'quote',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        'code',
        'inline-code',
        '|',
        // 'insert-after', 'insert-before',
        'undo',
        'redo',
        '|',
        // 'upload',
        'link',
        'table',
        '|',
        // 'record',
        'edit-mode',
        'both',
        'preview',
        'fullscreen',
        'outline'
        // 'code-theme', 'content-theme',
        // 'export', 'devtools', 'info', 'help', 'br'
      ]
    })

    checkContentValidity(content)
  }, [])

  const checkContentValidity = (val: string) => {
    if (!val.trim()) {
      setClsName('vditor is-invalid')
      return
    }

    setClsName('vditor')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!e.currentTarget.checkValidity()) {
      return
    }

    try {
      const formData = {
        content,
        title,
        user: user._id
      }
      setLoading(true)
      await axios.post('/topic/initiate', formData)
      loadingDelay(400).then(() => {
        setLoading(false)
        navigate('/')
      })
    } catch (err) {
      setLoading(false)
      console.error('Topic initiate error: ', err)
    }
  }

  return (
    <>
      <Header />
      <Banner
        headline={<h2>Initiate A New Topic</h2>}
        secondary={
          <img
            alt={user.username}
            className="avatar mt-4"
            src={`${BASE_URL}${user.avatar}`}
            title={user.nickname}
            width="48"
            height="48"
          />
        }
      />
      <Container className="newTopic py-5">
        <Form noValidate onSubmit={handleSubmit}>
          {/* <input type="hidden" name="user" value="{{ user._id.toString() }}" /> */}
          <div className="mb-3">
            <Form.Label htmlFor="nickname" className="form-label">
              Initiator
            </Form.Label>
            <Form.Control
              id="nickname"
              defaultValue={user.nickname}
              disabled
              required
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="title" className="form-label">
              Title
            </Form.Label>
            <Form.Control
              id="title"
              isInvalid={!title.trim()}
              name="title"
              onChange={e => setTitle(e.target.value)}
              placeholder="What's this topic about"
              required
              value={title}
            />
            <Form.Control.Feedback type="invalid">
              Topic title is required.
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="content" className="form-label">
              Content
            </Form.Label>
            <div className={clsName} ref={vditorRef} />
            <Form.Control
              as="textarea"
              className="d-none"
              id="content"
              isInvalid={!content.trim()}
              onChange={e => setContent(e.target.value)}
              required
              value={content}
            />
            <Form.Control.Feedback type="invalid">
              Topic content is required.
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <Button type="submit" variant="dark" disabled={loading}>
              <Spinner
                animation="border"
                aria-hidden="true"
                as="span"
                className="me-2"
                hidden={!loading}
                role="status"
                size="sm"
              />
              Publish
            </Button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default TopicInitiate
