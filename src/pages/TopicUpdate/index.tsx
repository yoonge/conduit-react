import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Container, Form, Modal, Spinner } from 'react-bootstrap'
import Vditor from 'vditor'
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import '../../assets/stylesheets/form.less'

import axios from '../../utils/axios'
import { loadingDelay } from '../../utils/loading'
import { BASE_URL } from '../../constants/settiings'
import { useAcountStore, useLoadingStore } from '../../stores/auth'
import { User } from '../../types/user'

import { Topic } from '../../types/topic'

const TopicUpdate: React.FC = () => {
  const navigate = useNavigate()
  const { _id = '' } = useParams()
  const { user = {} as User } = useAcountStore()
  const { loading = false, setLoading } = useLoadingStore()
  const [topic, setTopic] = useState({} as Topic)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [clsName, setClsName] = useState('')
  const [modalShow, setModalShow] = useState(false)

  const contentRef = useRef('')
  const vditorRef = useRef(null)
  useEffect(() => {
    handleVditorInit()
  }, [_id])

  const checkContentValidity = (val: string) => {
    if (!val.trim()) {
      setClsName('vditor is-invalid')
      return
    }

    setClsName('vditor')
  }

  const handleVditorInit = () => {
    const instance = new Vditor(vditorRef?.current!, {
      after: () => {
        handleTopicQuery().then(() => {
          instance.setValue(contentRef.current, true)
          checkContentValidity(contentRef.current)
        })
        .catch(err => {
          console.error('Topic query error: ', err)
        })
      },
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
      ],
      value: content,
    })
  }

  const handleTopicQuery = async () => {
    const topicStr = localStorage.getItem('topic')
    if (_id) {
      if (topicStr) {
        const topicJSON = JSON.parse(topicStr) as Topic
        if (_id && _id === topicJSON?._id) {
          setTopic(topicJSON)
          setTitle(topicJSON?.title)
          setContent(topicJSON?.content)
          contentRef.current = topicJSON?.content
          return
        } else {
          setTopic({} as Topic)
          localStorage.removeItem('topic')
        }
      }

      try {
        const { data: { topic: topicData = {} as Topic } = {} } = await axios.get(`/topic/${_id}`)
        if (user?._id === topicData?.user?._id) {
          setTopic(topicData)
          setTitle(topicData?.title)
          setContent(topicData?.content)
          contentRef.current = topicData?.content
          localStorage.setItem('topic', JSON.stringify(topicData))
        } else {
          setModalShow(true)
          throw Error('403 Forbiddon, it\'s NOT your topic.')
        }
      } catch (err) {
        console.error('Topic query error: ', err)
      }
    } else {
      navigate(-1)
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
        content,
        title,
        topicId: topic?._id,
      }
      setLoading(true)
      await axios.post('/topic/update', formData)
      loadingDelay(400).then(() => {
        setLoading(false)
        navigate(`/topic/${topic?._id}`)
      })
    } catch (err) {
      setLoading(false)
      console.error('Topic update error: ', err)
    }
  }

  const handleModalClose = () => {
    setModalShow(false)
    navigate(-1)
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
              defaultValue={topic?.title}
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
              defaultValue={topic?.content}
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

      <Modal
        backdrop="static"
        centered
        keyboard={false}
        onHide={handleModalClose}
        show={modalShow}
      >
        <Modal.Header>
          <Modal.Title>403 Forbiddon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is <strong>NOT</strong> your own topic, your have no rights to edit it.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleModalClose}>
            Go Backward
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TopicUpdate
