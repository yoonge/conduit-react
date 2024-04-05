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
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setTopic?: React.Dispatch<React.SetStateAction<Topic>>
  tags: string[]
  title: string
}

const TopicForm: React.FC<TopicFormProps> = ({
  action,
  content,
  handleSubmit,
  loading,
  setContent,
  setModalShow,
  setTags,
  setTitle,
  setTopic,
  tags,
  title
}) => {
  const navigate = useNavigate()
  const { _id = '' } = useParams()
  const { user } = useAcountStore()
  const [clsName, setClsName] = useState('')

  const contentRef = useRef('')
  const vditorRef = useRef(null)
  useEffect(() => {
    let vditorInst: Vditor | undefined
    Tags.init('select.tags-select', {
      // items: tags,
      selected: tags,
      showAllSuggestions: true,
      onCanAdd: (val: string, _data: any, inst: any) => {
        // console.log('onCanAdd values: ', inst.getSelectedValues())
        setTags([...inst.getSelectedValues(), val])
      },
      onClearItem: (_val: string, inst: any) => {
        // console.log('onClearItem values: ', inst.getSelectedValues())
        setTags([...inst.getSelectedValues()])
      }
      // onCreateItem: (_opt: string, inst: any) => {
      //   console.log('onCreateItem values: ', inst.getSelectedValues())
      // },
      // onSelectItem: (_item: string, inst: any) => {
      //   console.log('onSelectItem values: ', inst.getSelectedValues())
      // }
    })

    handleVditorInit(vditorInst)

    return () => {
      Tags.getInstance(document.querySelector('#tags-select'))?.dispose()
      vditorInst?.destroy()
      contentRef.current = ''
      vditorRef.current = null
    }
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
        if (_id === topicJSON?._id) {
          const { content = '', tags = [], title = '' } = topicJSON
          setTopic && setTopic(topicJSON)
          setTags(tags)
          setTitle(title)
          setContent(content)
          contentRef.current = content
          tags.map((tag: string) =>
            Tags.getInstance(document.querySelector('#tags-select'))?.addItem(tag)
          )
          return
        } else {
          setTopic && setTopic({} as Topic)
          localStorage.removeItem('topic')
        }
      }

      try {
        const { data: { topic: topicData = {} as Topic } = {} } = await axios.get(`/topic/${_id}`)
        if (user?._id === topicData?.user?._id) {
          const { content = '', tags = [], title = '' } = topicData
          setTopic && setTopic(topicData)
          setTags(tags)
          setTitle(title)
          setContent(content)
          contentRef.current = content
          tags.map((tag: string) =>
            Tags.getInstance(document.querySelector('#tags-select'))?.addItem(tag)
          )
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

  const handleVditorInit = (instance: Vditor | undefined) => {
    const vditorOptions: IOptions = {
      after:
        action === 'update'
          ? () => {
              handleTopicQuery()
                .then(() => {
                  instance?.setValue(contentRef.current, true)
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

    instance = new Vditor(vditorRef?.current!, vditorOptions)
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
        <Form.Label htmlFor="tags-select" className="form-label">
          Tags
        </Form.Label>
        <select
          className="form-select tags-select"
          data-add-on-blur
          data-allow-clear
          data-allow-new
          data-badge-style="success"
          data-clear-end
          data-max={8}
          data-regex="^[\w-]{1,20}$"
          data-show-drop-icon
          data-update-on-select="true"
          id="tags-select"
          multiple
          name="tags[]"
        >
          <option disabled hidden value="">
            Add or select at most 8 tags here, each tag length is up to 20
          </option>
        </select>
        <Form.Control.Feedback type="invalid">
          Only letters, numbers, spaces between letters, _ and - are allowed, single tag length is
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
