import { useNavigate } from 'react-router-dom'
import { Button, Card, Container } from 'react-bootstrap'
import { BASE_URL } from '../../../constants/settiings'

import { useAcountStore } from '../../../stores/auth'
import { User } from '../../../types/user'
import { Topic } from '../../../types/topic'

interface TopicBannerProps {
  topic: Topic
}

const TopicBanner: React.FC<TopicBannerProps> = ({ topic = {} as Topic }) => {
  const navigate = useNavigate()
  const { logout, user = {} as User } = useAcountStore()

  const handleGoToUpdate = () => {
    if (!user?._id) {
      logout()
      localStorage.removeItem('topic')
      navigate('/login')
      return
    }

    if (!topic?._id) {
      localStorage.removeItem('topic')
      return
    }

    localStorage.setItem('topic', JSON.stringify(topic))
    navigate(`/topic/update/${topic?._id}`)
  }

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
                  width="48"
                  height="48"
                />
              </Card.Header>
              <Card.Body>
                <Card.Title>{topic?.user?.nickname}</Card.Title>
                <Card.Text>
                  <small className="text-muted">Created at: {topic?.createTime}</small>
                  <br />
                  <small className="text-muted">Updated at: {topic?.updateTime}</small>
                </Card.Text>
              </Card.Body>
            </div>
          </Card>
          {user?._id === topic?.user?._id && (
            <div className="d-flex align-items-center">
              <Button variant="outline-light" onClick={handleGoToUpdate}>
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
