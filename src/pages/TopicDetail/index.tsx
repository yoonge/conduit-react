import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Form } from 'react-bootstrap'
import Vditor from 'vditor'
import Header from '../../components/Header'
import Banner from './Banner'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import './index.less'

import axios from '../../utils/axios'
import { AxiosResponse } from 'axios'
import { useAcountStore } from '../../stores/auth'

import { Topic } from '../../types/topic'
import { Comment } from '../../types/comment'

const TopicDetail: React.FC = () => {
  const { user } = useAcountStore()
  const [topic, setTopic] = useState({} as Topic)
  const [comments, setComments] = useState([] as Array<Comment>)
  const { _id } = useParams()
  const topicContentRef = useRef(null)

  useEffect(() => {
    axios
      .get(`/topic-detail/${_id}`)
      .then((res: AxiosResponse) => {
        const { data: { comments: allComments = [], topic = {} } = {} } = res
        setComments(allComments)
        setTopic(topic)

        Vditor.preview(topicContentRef?.current!, topic?.content, {
          lang: 'en_US',
          mode: 'light',
          theme: {
            current: 'light'
          }
        })
      })
      .catch(err => {
        console.error('err', err)
      })
  }, [_id])

  return (
    <>
      <Header />
      <Banner topic={topic} />

      <Container id="topicContent" className="topicContent mx-auto" ref={topicContentRef}>
        <Form.Control as="textarea" className="d-none" defaultValue={topic?.content} />
      </Container>

      {user?.username || comments.length ? (
        <Container className="topicComment mx-auto">
          {user?.username ? <CommentForm /> : null}

          {comments.length
            ? comments.map(item => <CommentItem key={item?._id} comment={item} />)
            : null}
        </Container>
      ) : null}
    </>
  )
}

export default TopicDetail
