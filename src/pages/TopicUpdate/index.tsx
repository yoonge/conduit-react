import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Modal } from 'react-bootstrap'
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import TopicForm from '../../components/TopicForm'
import '../../assets/stylesheets/form.less'

import axios from '../../utils/axios'
import { loadingDelay } from '../../utils/loading'
import { BASE_URL } from '../../constants/settiings'
import { useAcountStore, useLoadingStore } from '../../stores/auth'
import { User } from '../../types/user'
import { Topic } from '../../types/topic'

const TopicUpdate = () => {
  const navigate = useNavigate()
  const { user = {} as User } = useAcountStore()
  const { loading = false, setLoading } = useLoadingStore()
  const [topic, setTopic] = useState({} as Topic)
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [modalShow, setModalShow] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!e.currentTarget.checkValidity()) {
      return
    }

    try {
      const formData = {
        content,
        tags,
        tagsRemoved: topic?.tags?.filter(tag => !tags.includes(tag)) || [],
        title,
        topicId: topic?._id,
      }
      setLoading(true)
      const { data: { updatedTopic = {} } = {} } = await axios.post('/topic/update', formData)
      setTopic(updatedTopic)
      localStorage.setItem('topic', JSON.stringify(updatedTopic))
      await loadingDelay(400)
      setLoading(false)
      navigate(`/topic/${topic?._id}`)
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
      <Banner>
        <h2>Topic Update</h2>
        <img
          alt={user.username}
          className="avatar mt-4"
          src={`${BASE_URL}${user.avatar}`}
          title={user.nickname}
          width="48"
          height="48"
        />
      </Banner>
      <Container className="newTopic py-5">
        <TopicForm
          action='update'
          content={content}
          handleSubmit={handleSubmit}
          loading={loading}
          setContent={setContent}
          setModalShow={setModalShow}
          setTags={setTags}
          setTitle={setTitle}
          setTopic={setTopic}
          tags={tags}
          title={title}
        />
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
