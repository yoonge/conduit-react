import { Card } from 'react-bootstrap'

import { BASE_URL } from '../../../constants/settiings'
import { Comment } from '../../../types/comment'

interface CommentItemProps {
  comment: Comment
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text as="div">
          <pre>{comment?.content}</pre>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between text-muted">
        <div className="commentOwner">
          <img
            alt="avatar"
            className="avatar"
            src={`${BASE_URL}${comment?.user?.avatar}`}
            title={comment?.user?.username}
            width="24"
            height="24"
          />
          {comment?.user?.nickname}
          <small>{comment?.createTime}</small>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default CommentItem
