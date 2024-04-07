import { useSearchParams } from 'react-router-dom'
import { Badge, Button } from 'react-bootstrap'

import { BASE_URL } from '../../constants/settiings'
import { User } from '../../types/user'
import { Topic } from '../../types/topic'

import { useAcountStore, useLoadingStore } from '../../stores/auth'
import { useTopicListStore } from '../../stores/topic'
import axios from '../../utils/axios'
import { loadingDelay } from '../../utils/loading'

interface ListItemProps {
  topic: Topic
}

const ListItem: React.FC<ListItemProps> = ({ topic }) => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'all'
  const { update, user = {} as User } = useAcountStore()
  const { loading = false, setLoading } = useLoadingStore()
  const { removeTopicFromList, updateTopicList } = useTopicListStore()

  const handleFavor = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user?.username) {
      return
    }

    setLoading(true)
    try {
      const { data: { updatedTopic, updatedUser } = {} } = await axios.post('/favor', {
        topicId: topic._id,
        userId: user._id
      })
      update(updatedUser)
      if (tab === 'favorites' || tab === 'my-favorites') {
        removeTopicFromList(updatedTopic)
      } else {
        updateTopicList(updatedTopic)
      }
      await loadingDelay(400)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error('Favor error: ', err)
    }
  }

  return (
    <div className="d-flex list-group-item list-group-item-action gap-3">
      <a
        className="avatar flex-shrink-0"
        href={user?.username ? `/profile/${topic.user.username}` : undefined}
        title={topic.user.nickname || topic.user.username}
      >
        <img
          alt={topic.user.username}
          height="32"
          src={`${BASE_URL}${topic.user.avatar}`}
          width="32"
        />
      </a>
      <div className="d-flex w-100 justify-content-between">
        <div>
          <a href={`/topic/${topic._id}`} className="d-block mb-4">
            <h5 className="mb-1">{topic.title}</h5>
            <p className="text-muted">{topic?.content}</p>
          </a>
          <div className="d-flex justify-content-between">
            <small className="text-muted">
              {(topic.comment as number) > 1
                ? `${topic.comment} comments.`
                : `${topic.comment} comment.`}
            </small>
            <div className="text-end">
              {topic.tags?.map((tag, i) => (
                <Badge
                  as="a"
                  bg="success"
                  className={i === 0 ? '' : 'ms-2'}
                  href={`/tags/${tag}`}
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="favorite d-flex flex-column justify-content-between align-items-end text-end">
          <Button
            className={
              user?.favorite?.includes(topic._id.toString())
                ? 'btn-favorite active'
                : 'btn-favorite'
            }
            disabled={loading}
            onClick={handleFavor}
            size="sm"
            variant="outline-success"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
            <span className="favoriteCount">{topic.favorite}</span>
          </Button>
          <small className="updateTime text-muted" title={topic.updateTime}>
            {topic.updateTimeStr}
          </small>
        </div>
      </div>
    </div>
  )
}

export default ListItem
