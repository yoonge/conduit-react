import { useState } from 'react'
import { Button, Card, Form, Spinner } from 'react-bootstrap'

import { useAcountStore } from '../../../stores/auth'
import { BASE_URL } from '../../../constants/settiings'

import { Comment } from '../../../types/comment'

interface CommentFormProps {
  handleCommentSubmit: (comment: Comment) => Promise<void>
  handleToastShow: (title: string, msg: string, bg?: Bg) => void
  loading: boolean
  topicId: string | undefined
}

const CommentForm: React.FC<CommentFormProps> = ({
  handleCommentSubmit,
  handleToastShow,
  loading,
  topicId
}) => {
  const { user } = useAcountStore()
  const [comment, setComment] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!comment.trim()) {
      handleToastShow('Error', 'Comment is required.', 'danger')
      return
    }

    const newComment = {
      content: comment,
      topic: topicId,
      user: user?._id
    }
    await handleCommentSubmit(newComment as Comment)
    setComment('')
  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Card>
        <Card.Body>
          <Card.Text>
            <Form.Control
              as="textarea"
              onChange={e => setComment(e.target.value)}
              required
              rows={6}
              value={comment}
            />
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between text-muted">
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
          <Button disabled={loading} size="sm" type="submit" variant="dark">
            <Spinner
              animation="border"
              aria-hidden="true"
              as="span"
              className="me-2"
              hidden={!loading}
              role="status"
              size="sm"
            />
            Post Comment
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  )
}

export default CommentForm
