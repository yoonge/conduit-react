import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
// import Banner from '../../components/Banner'
import { BASE_URL } from '../../constants/settiings'

import { AxiosResponse } from 'axios'
import axios from '../../utils/axios'
import { useAcountStore } from '../../stores/auth'

import { Topic } from '../../types/topic'
import { Comment } from '../../types/comment'

import './index.less'

const TopicDetail: React.FC = () => {
  const { user } = useAcountStore()
  const [topic, setTopic] = useState({} as Topic)
  const [comments, setComments] = useState([] as Array<Comment>)
  const [comment, setComment] = useState('')
  const { _id } = useParams()
  useEffect(() => {
    axios
      .get(`/topic-detail/${_id}`)
      .then((res: AxiosResponse) => {
        const { data: { comments: allComments = [], topic = {} } = {} } = res
        setComments(allComments)
        setTopic(topic)
      })
      .catch(err => {
        console.error('err', err)
      })
  }, [_id])

  return (
    <>
      <Header />
      {/* <Banner /> */}
      <div className="d-flex justify-content-center topicHeaderWrapper">
        <div className="topicHeader">
          <h2>{topic?.title}</h2>
          <div className="d-flex justify-content-between mt-5">
            <div className="card">
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <img
                    alt="avatar"
                    className="avatar"
                    src={`${BASE_URL}${topic?.user?.avatar}`}
                    title={topic?.user?.username}
                    width="32"
                    height="32"
                  />
                </div>
                <div>
                  <div className="card-body">
                    <h5 className="card-title">{topic?.user?.nickname}</h5>
                    <p className="card-text">
                      <small className="text-muted">
                        {topic?.updateTime?.toLocaleString()}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <a className="btn btn-outline-light" href="/topicUpdate/{{ topic?._id?.toString() }}">Edit</a>
            </div>
          </div>
        </div>
      </div>

      <div id="topicContent" className="topicContent">
        <textarea name="content" id="content" defaultValue={topic?.content} />
      </div>

      {user?.username || comments.length ? (
        <div className="topicComment">
          {user?.username ? (
            <form className="card" action="/topic/comment" method="post">
              <input type="hidden" name="topic" value={topic?._id} />
              <input type="hidden" name="user" value={user?._id} />
              <div className="card-body">
                <div className="card-text">
                  <textarea
                    className="form-control"
                    name="content"
                    id="content"
                    rows={6}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex card-footer justify-content-between text-muted">
                <div className="commentOwner">
                  <img
                    alt="avatar"
                    className="avatar"
                    src={`${BASE_URL}${user?.avatar}`}
                    title={user?.username}
                    width="24"
                    height="24"
                  />
                  {user?.nickname}
                </div>
                <button className="btn btn-sm btn-dark" type="submit">
                  Post Comment
                </button>
              </div>
            </form>
          ) : null}

          {comments.length
            ? comments.map(item => (
                <div className="card" key={item?._id}>
                  <div className="card-body">
                    <div className="card-text">
                      <pre>{item?.content}</pre>
                    </div>
                  </div>
                  <div className="d-flex card-footer justify-content-between text-muted">
                    <div className="commentOwner">
                      <img
                        alt="avatar"
                        className="avatar"
                        src={`${BASE_URL}${item?.user?.avatar}`}
                        title={item?.user?.username}
                        width="24"
                        height="24"
                      />
                      {item?.user?.nickname}
                      <small>{item?.createTime?.toLocaleString()}</small>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      ) : null}
    </>
  )
}

export default TopicDetail
