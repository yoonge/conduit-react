import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { BASE_URL } from '../../../constants/settiings'

import { useAcountStore } from '../../../stores/auth'
import { Topic } from '../../../types/topic'

interface TopicBannerProps {
  topic: Topic
}

const TopicBanner: React.FC<TopicBannerProps> = ({ topic }) => {
  const { user } = useAcountStore()

  return (
    <section className="d-flex justify-content-center topicBannerWrapper">
      <Container className="topicBanner">
        <h2>{topic?.title}</h2>
        <div className="d-flex justify-content-between mt-5">
          <Card>
            <div className="d-flex justify-content-between">
              <Card.Header className="d-flex align-items-center p-0">
                <img
                  alt="avatar"
                  className="avatar"
                  src={`${BASE_URL}${topic?.user?.avatar}`}
                  title={topic?.user?.username}
                  width="32"
                  height="32"
                />
              </Card.Header>
              <Card.Body>
                <Card.Title>{topic?.user?.nickname}</Card.Title>
                <Card.Text>
                  <small className="text-muted">{topic?.createTime?.toLocaleString()}</small>
                </Card.Text>
              </Card.Body>
            </div>
          </Card>
          {user?._id === topic?.user?._id && (
            <div className="d-flex align-items-center">
              <Button variant="outline-light" href={`/topicDelete/${topic?._id?.toString()}`}>
                Edit
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export default TopicBanner
