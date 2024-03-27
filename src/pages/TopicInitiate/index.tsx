import { useEffect, useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Vditor from 'vditor'
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import '../../assets/stylesheets/form.less'

import { BASE_URL } from '../../constants/settiings'
import { useAcountStore } from '../../stores/auth'

const TopicInitiate: React.FC = () => {
  const { user } = useAcountStore()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const vditorRef = useRef(null)
  useEffect(() => {
    new Vditor(vditorRef?.current!, {
      blur(val) {
        setContent(val)
      },
      cache: { enable: false },
      cdn: 'https://cdn.jsdelivr.net/npm/vditor@3.9.2',
      input(val) {
        setContent(val)
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
          current: 'light'
          // path: 'https://cdn.jsdelivr.net/npm/vditor@3.9.2/dist/css/content-theme'
        }
      },
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
  }, [])

  const handleSubmit = () => {
    console.log('submit', title, content)
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
              disabled
              value={user.nickname}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="title" className="form-label">
              Title
            </Form.Label>
            <Form.Control
              id="title"
              name="title"
              onChange={e => setTitle(e.target.value)}
              placeholder="What's this topic about"
              value={title}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="content" className="form-label">
              Content
            </Form.Label>
            <div ref={vditorRef} />
            <Form.Control
              as="textarea"
              className="d-none"
              id="content"
              onChange={e => setContent(e.target.value)}
              value={content}
            />
            {/* <textarea
              className="form-control"
              id="content"
              name="content"
              style={{ display: 'none' }}
            /> */}
          </div>
          <div className="mb-3">
            <Button type="submit" variant="dark">
              Publish
            </Button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default TopicInitiate
