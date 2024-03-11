import React from 'react'
import Vite from '../../assets/vite.svg'
import './index.less'

const ListItem: React.FC = () => {
  return (
    <div className="topicList list-group">
      <div className="d-flex list-group-item list-group-item-action gap-3">
        <a href="/profile/$value.user.username" title="$value.user.nickname" className="avatar flex-shrink-0">
          <img src={Vite} alt="vite.js" width="32" height="32" />
        </a>
        <div className="d-flex w-100 justify-content-between">
          <a href="/topicDetail/$value._id" className="topicSummary">
            <h5 className="mb-1">$value.title</h5>
            <p className="mb-4 text-muted">$value.content</p>
            <small className="text-muted">
              $value.comment comment(s).
            </small>
          </a>
          <div className="favorite d-flex flex-column justify-content-between align-items-end">
            <button className="btn btn-sm btn-outline-success btnFavor active" type="button">
              <input type="hidden" name="currentUserId" value="user?._id.toString()" />
              <input type="hidden" name="topicId" value="$value._id.toString()" />
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg><span className="favoriteCount">$value.favorite</span>
            </button>
            <small className="updateTime text-muted" title="{{ $value.updateTime.toLocaleString() }}">$value.updateTimeStr</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem
