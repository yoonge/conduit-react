import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import TopicForm from '../../components/TopicForm'
import '../../assets/stylesheets/form.less'

import axios from '../../utils/axios'
import { loadingDelay } from '../../utils/loading'
import { BASE_URL } from '../../constants/settiings'
import { useAcountStore, useLoadingStore } from '../../stores/auth'
import { User } from '../../types/user'
import { useNavigate } from 'react-router-dom'

const TopicInitiate = () => {
  const navigate = useNavigate()
  const { user = {} as User } = useAcountStore()
  const { loading = false, setLoading } = useLoadingStore()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState('')

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
        title,
        user: user._id
      }
      setLoading(true)
      const { data: { newTopic = {} } = {} } =await axios.post('/topic/initiate', formData)
      localStorage.setItem('topic', JSON.stringify(newTopic))
      await loadingDelay(400)
      setLoading(false)
      navigate(`/topic/${newTopic?._id}`)
    } catch (err) {
      setLoading(false)
      console.error('Topic initiate error: ', err)
    }
  }

  return (
    <>
      <Header />
      <Banner>
        <h2>Topic Initiate</h2>
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
          action='initiate'
          content={content}
          handleSubmit={handleSubmit}
          loading={loading}
          setContent={setContent}
          setTags={setTags}
          setTitle={setTitle}
          tags={tags}
          title={title}
        />
      </Container>
    </>
  )
}

export default TopicInitiate
