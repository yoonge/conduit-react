import React from 'react'
import { Button, Tab, Tabs } from 'react-bootstrap'

import { useAcountStore } from '../../stores/auth'

interface TabsComponentProps {
  activeKey: string
  handleTabSelect: (key: string) => void
}

const TabsComponent: React.FC<TabsComponentProps> = ({ activeKey, handleTabSelect }) => {
  const { user } = useAcountStore()

  return (
    <>
      {user.username ? (
        <div className="text-end">
          <Button variant="dark" href="/topic/initiate">New Topic</Button>
        </div>
      ) : null}

      <Tabs
        className="mb-2"
        defaultActiveKey={activeKey}
        onSelect={key => handleTabSelect(key as string)}
      >
        <Tab eventKey="all" title="All Topics" />
        {user.username ? (
          <>
            <Tab eventKey="my-topics" title="My Topics" />
            <Tab eventKey="my-favorites" title="My Favorites" />
          </>
        ) : (
          <Tab eventKey="sign-in" title="Sign in to see your own topics & favorites" />
        )}
      </Tabs>
    </>
  )
}

export default TabsComponent