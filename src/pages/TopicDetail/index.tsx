import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge, Container, Form } from 'react-bootstrap'
import Vditor from 'vditor'
import Header from '../../components/Header'
import TopicBanner from './TopicBanner'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import ToastComp from '../../components/ToastComp'
import './index.less'

import axios from '../../utils/axios'
import { useAcountStore, useLoadingStore } from '../../stores/auth'
import { loadingDelay } from '../../utils/loading'

import { Topic } from '../../types/topic'
import { Comment } from '../../types/comment'

const TopicDetail = () => {
  const navigate = useNavigate()
  const { user } = useAcountStore()
  const { loading = false, setLoading } = useLoadingStore()
  const [topic, setTopic] = useState({} as Topic)
  const [comments, setComments] = useState([] as Array<Comment>)
  const { _id } = useParams()
  const [toastBg, setToastBg] = useState('dark')
  const [toastTitle, setToastTitle] = useState('')
  const [toastMsg, setToastMsg] = useState('')
  const [toastShow, setToastShow] = useState(false)

  const topicContentRef = useRef(null)
  useEffect(() => {
    handleTopicQuery()
  }, [_id])

  const handleTopicQuery = async () => {
    const topicStr = localStorage.getItem('topic')
    if (_id) {
      if (topicStr) {
        const topicJSON = JSON.parse(topicStr) as Topic
        if (_id === topicJSON?._id) {
          const { comments = [] } = topicJSON
          setComments(comments)
          setTopic(topicJSON)

          handleTopicPreview(topicContentRef.current!, topicJSON?.content)
          return
        } else {
          setComments([] as Array<Comment>)
          setTopic({} as Topic)
          localStorage.removeItem('topic')
        }
      }

      try {
        const { data: { topic: topicData = {} as Topic } = {} } = await axios.get(`/topic/${_id}`)
        const { comments = [] } = topicData
        setComments(comments)
        setTopic(topicData)

        handleTopicPreview(topicContentRef.current!, topicData?.content)
        localStorage.setItem('topic', JSON.stringify(topicData))
      } catch (err) {
        console.error('Topic query error: ', err)
      }
    } else {
      navigate(-1)
    }
  }

  const handleTopicPreview = (topicContentElem: HTMLDivElement, content: string) => {
    Vditor.preview(topicContentElem, content, {
      cdn: 'https://cdn.jsdelivr.net/npm/vditor@3.10.2',
      lang: 'en_US',
      mode: 'light',
      theme: {
        current: 'light',
        path: 'https://cdn.jsdelivr.net/npm/vditor@3.10.2/dist/css/content-theme'
      }
    })
  }

  const handleCommentSubmit = async (comment: Comment) => {
    setLoading(true)
    try {
      const { data: { updatedTopic = {} } = {} } = await axios.post('/topic/comment', comment)
      setComments(comments)
      setTopic(updatedTopic)
      localStorage.setItem('topic', JSON.stringify(updatedTopic))
      await loadingDelay(400)
      setLoading(false)
      handleToastShow('Success', 'Comment successfully.')
    } catch (err) {
      setLoading(false)
      console.error('Comment error: ', err)
    }
  }

  const handleToastShow = (title: string, msg: string, bg?: Bg) => {
    setToastBg(bg || 'dark')
    setToastTitle(title)
    setToastMsg(msg)
    setToastShow(true)
  }

  return (
    <>
      <Header />
      <TopicBanner topic={topic} />

      <Container id="topicContent" className="topicContent mx-auto" ref={topicContentRef}>
        <Form.Control as="textarea" className="d-none" defaultValue={topic?.content} />
      </Container>

      <Container className="tagsSection">
        {topic?.tags && topic?.tags?.length > 0 && (
          <>
            Tags: {topic?.tags?.map((tag, i) => (
              <Badge
                as="a"
                bg="success"
                className={i === 0 ? '' : 'ms-2'}
                href={`/tags/${tag}`}
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </>
        )}
      </Container>

      {user?.username || comments.length ? (
        <Container className="topicComment mx-auto">
          {user?.username ? (
            <CommentForm
              handleCommentSubmit={handleCommentSubmit}
              handleToastShow={handleToastShow}
              loading={loading}
              topicId={_id}
            />
          ) : null}

          {comments.length
            ? comments.map(item => <CommentItem key={item?._id} comment={item} />)
            : null}
        </Container>
      ) : null}

      <ToastComp
        bg={toastBg as Bg}
        content={toastMsg}
        position="bottom-end"
        setShow={setToastShow}
        show={toastShow}
        title={toastTitle}
      />
    </>
  )
}

export default TopicDetail
