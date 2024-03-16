import React from 'react'
import './index.less'

import { BASE_URL } from '../../constants/settiings'
import { User } from '../../types/user'
import { Topic } from '../../types/topic'

import { useAcountStore } from '../../stores/auth'

interface ListItemProps {
  topic: Topic
}

const ListItem: React.FC<ListItemProps> = ({ topic }) => {
  const { user = {} as User } = useAcountStore()

  return (
    <div className="d-flex list-group-item list-group-item-action gap-3">
      <a href={`/profile/${topic.user.username}`} title={topic.user.nickname} className="avatar flex-shrink-0">
        <img src={`${BASE_URL}${topic.user.avatar}`} alt={topic.user.username} width="32" height="32" />
      </a>
      <div className="d-flex w-100 justify-content-between">
        <a href={`/topicDetail/${topic._id}`} className="topicSummary">
          <h5 className="mb-1">{topic.title}</h5>
          <p className="mb-4 text-muted">{topic.content}</p>
          <small className="text-muted">
            {topic.comment as number > 1 ? (
              `${topic.comment} comments.`
            ) : (
              `${topic.comment} comment.`
            )}
          </small>
        </a>
        <div className="favorite d-flex flex-column justify-content-between align-items-end">
          <button className="btn btn-sm btn-outline-success btnFavor active" type="button">
            <input type="hidden" name="currentUserId" value={user?._id?.toString()} />
            <input type="hidden" name="topicId" value={topic._id.toString()} />
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg><span className="favoriteCount">{topic.favorite}</span>
          </button>
          <small className="updateTime text-muted" title={topic.updateTime.toLocaleString()}>{topic.updateTimeStr}</small>
        </div>
      </div>
    </div>
  )
}

export default ListItem
