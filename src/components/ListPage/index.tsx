import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import Header from '../Header'
import Banner from '../Banner'
import TabsComponent from '../TabsComponent'
import ListView from '../ListView'
import './index.less'

import { useTopicStore } from '../../stores/topic'
import { User } from '../../types/user'

interface ListPageProps {
  activeKey: string
  defaultActiveKey: string
  generateHeadline: (user: User) => JSX.Element
  generateSecondary: (user: User) => JSX.Element
  handleTabSelect: (key: string) => void
  tabs: {
    key: string
    label: string
    visibility: number
  }[]
}

const ListPage: React.FC<ListPageProps> = ({
  activeKey,
  defaultActiveKey,
  generateHeadline,
  generateSecondary,
  handleTabSelect,
  tabs
}) => {
  const { username = undefined } = useParams()

  const { fetchTopicList, theUser = {} as User } = useTopicStore()
  useEffect(() => {
    fetchTopicList(username).catch((err: AxiosError) => {
      console.log('err', err)
    })
  }, [activeKey])

  return (
    <>
      <Header />
      <Banner headline={generateHeadline(theUser)} secondary={generateSecondary(theUser)} />
      <main className="main mx-auto">
        <TabsComponent
          activeKey={activeKey}
          defaultActiveKey={defaultActiveKey}
          handleTabSelect={handleTabSelect}
          tabs={tabs}
        />
        <ListView activeKey={activeKey} handleTabSelect={handleTabSelect} />
      </main>
    </>
  )
}

export default ListPage
