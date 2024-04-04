import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Spinner } from 'react-bootstrap'
import Tags from 'bootstrap5-tags'
import Vditor from 'vditor'

import axios from '../../utils/axios'
import { useAcountStore } from '../../stores/auth'
import { Topic } from '../../types/topic'

interface TopicFormProps {
  action: string
  content: string
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  loading: boolean
  setContent: React.Dispatch<React.SetStateAction<string>>
  setModalShow?: React.Dispatch<React.SetStateAction<boolean>>
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setTopic?: React.Dispatch<React.SetStateAction<Topic>>
  title: string
}

const TopicForm: React.FC<TopicFormProps> = ({
  action,
  content,
  handleSubmit,
  loading,
  setContent,
  setModalShow,
  setTitle,
  setTopic,
  title
}) => {
  const navigate = useNavigate()
  const { _id = '' } = useParams()
  const { user } = useAcountStore()
  const [clsName, setClsName] = useState('')

  const contentRef = useRef('')
  const vditorRef = useRef(null)
  useEffect(() => {
    Tags.init()
    handleVditorInit()
  }, [])

  const checkContentValidity = (val: string) => {
    if (!val.trim()) {
      setClsName('vditor is-invalid')
      return
    }

    setClsName('vditor')
  }

  const handleTopicQuery = async () => {
    const topicStr = localStorage.getItem('topic')
    if (_id) {
      if (topicStr) {
        const topicJSON = JSON.parse(topicStr) as Topic
        if (_id && _id === topicJSON?._id) {
          setTopic && setTopic(topicJSON)
          setTitle(topicJSON?.title)
          setContent(topicJSON?.content)
          contentRef.current = topicJSON?.content
          return
        } else {
          setTopic && setTopic({} as Topic)
          localStorage.removeItem('topic')
        }
      }

      try {
        const { data: { topic: topicData = {} as Topic } = {} } = await axios.get(`/topic/${_id}`)
        if (user?._id === topicData?.user?._id) {
          setTopic && setTopic(topicData)
          setTitle(topicData?.title)
          setContent(topicData?.content)
          contentRef.current = topicData?.content
          localStorage.setItem('topic', JSON.stringify(topicData))
        } else {
          setModalShow && setModalShow(true)
          throw Error("403 Forbiddon, it's NOT your topic.")
        }
      } catch (err) {
        console.error('Topic query error: ', err)
      }
    } else {
      navigate(-1)
    }
  }

  const handleVditorInit = () => {
    const vditorOptions: IOptions = {
      after:
        action === 'update'
          ? () => {
              handleTopicQuery()
                .then(() => {
                  instance.setValue(contentRef.current, true)
                  checkContentValidity(contentRef.current)
                })
                .catch(err => {
                  console.error('Topic query error: ', err)
                })
            }
          : () => {
              checkContentValidity(content)
            },
      blur(val) {
        setContent(val)
        checkContentValidity(val)
      },
      cache: { enable: false },
      // cdn: 'https://cdn.jsdelivr.net/npm/vditor@3.10.2',
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
        }
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
      value: action === 'update' ? content : ''
    }

    const instance = new Vditor(vditorRef?.current!, vditorOptions)
  }

  // @ts-ignore
  window['handleCanAdd'] = (val: string, data: any, inst: any) => {
    console.log(val, data, inst)
  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <div className="mb-3">
        <Form.Label htmlFor="nickname" className="form-label">
          Initiator
        </Form.Label>
        <Form.Control id="nickname" defaultValue={user.nickname} disabled required />
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
        <Form.Control.Feedback type="invalid">Topic title is required.</Form.Control.Feedback>
      </div>
      <div className="mb-3">
        <Form.Label htmlFor="tags-input" className="form-label">
          Tags
        </Form.Label>
        <select
          className="form-select"
          data-add-on-blur
          data-allow-clear
          data-allow-new
          data-badge-style="success"
          data-clear-end
          data-max={8}
          data-on-can-ddd="handleCanAdd"
          data-placeholder="Add your tags here, at most 8"
          data-regex="^[\w-]{1,20}$"
          id="tags-input"
          multiple
          name="tags[]"
        />
        <Form.Control.Feedback type="invalid">
          The tag is invalid, only letters, numbers, spaces between letters, _ and - are allowed,
          up to 20.
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
        <Form.Control.Feedback type="invalid">Topic content is required.</Form.Control.Feedback>
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
  )
}

export default TopicForm
