import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import Header from '../Header'
import TabsComponent from '../TabsComponent'
import ListView from '../ListView'
import PaginationComp from '../PaginationComp'
import './index.less'

import { useTopicListStore } from '../../stores/topic'
import { User } from '../../types/user'

interface ListPageProps {
  activeKey: string
  BannerComp: JSX.Element | ((user: User) => JSX.Element)
  defaultActiveKey: string
  handleTabSelect: (key: string) => void
  tabs: {
    key: string
    label: string
    visibility: number
  }[]
}

const ListPage: React.FC<ListPageProps> = ({
  activeKey,
  BannerComp,
  defaultActiveKey,
  handleTabSelect,
  tabs
}) => {
  const { username = undefined } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const { fetchTopicList, theUser = {} as User } = useTopicListStore()
  useEffect(() => {
    fetchTopicList(username, page).catch((err: AxiosError) => {
      console.log('err', err)
    })
  }, [activeKey, page])

  return (
    <>
      <Header />
      {BannerComp instanceof Function ? BannerComp(theUser) : BannerComp}
      <main className="main mx-auto">
        <TabsComponent
          activeKey={activeKey}
          defaultActiveKey={defaultActiveKey}
          handleTabSelect={handleTabSelect}
          tabs={tabs}
        />
        <ListView activeKey={activeKey} handleTabSelect={handleTabSelect} />
        <PaginationComp />
      </main>
    </>
  )
}

export default ListPage
