import { useParams } from 'react-router-dom'
import ListPage from '../../components/ListPage'
import { BASE_URL } from '../../constants/settiings'

import { User } from '../../types/user'

const Profile = () => {
  const { _id } = useParams()
  const theUser = {} as User

  const tabs = [
    { key: 'topics', label: 'Topics', visibility: 1 },
    { key: 'favorites', label: 'Favorites', visibility: 1 },
  ]

  return (
    <ListPage
      defaultActiveKey="topics"
      headline={<h2>
        <img
          alt={theUser?.username}
          src={`${BASE_URL}${theUser?.avatar}`}
          title={theUser?.nickname}
          width={100}
        />
      </h2>}
      secondary={<>
        <h4 className="mt-3">{theUser?.nickname}</h4>
        <p>{theUser?.bio}</p>
      </>}
      tabs={tabs}
      theUserId={_id}
    />
  )
}

export default Profile
