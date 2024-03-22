import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'

import { useAcountStore } from '../../../stores/auth'
import { BASE_URL } from '../../../constants/settiings'

const CommentForm: React.FC = () => {
  const { user } = useAcountStore()
  const [comment, setComment] = useState('')

  return (
    <Card>
      {/* <input type="hidden" name="topic" value={topic?._id} />
      <input type="hidden" name="user" value={user?._id} /> */}
      <Card.Body>
        <Card.Text>
          <Form.Control
            as="textarea"
            rows={6}
            value={comment}
            onChange={e => setComment(e.target.value)}
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
        <Button variant="dark" size="sm">
          Post Comment
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default CommentForm
