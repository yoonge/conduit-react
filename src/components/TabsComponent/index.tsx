import { Button, Tab, Tabs } from 'react-bootstrap'

import { useAcountStore } from '../../stores/auth'
import { Tab as TabType } from '../../types/topic'

interface TabsComponentProps {
  activeKey: string
  defaultActiveKey: string
  handleTabSelect: (key: string) => void
  tabs: Array<TabType>
}

const TabsComponent: React.FC<TabsComponentProps> = ({ activeKey, defaultActiveKey, handleTabSelect, tabs }) => {
  const { user } = useAcountStore()

  return (
    <>
      {user.username && (
        <div className="text-end">
          <Button variant="dark" href="/topic/initiate">New Topic</Button>
        </div>
      )}

      <Tabs
        className="mb-2"
        activeKey={activeKey}
        defaultActiveKey={defaultActiveKey}
        onSelect={key => handleTabSelect(key as string)}
      >
        {tabs.map(tab => {
          const tabItem = <Tab eventKey={tab.key} title={tab.label} key={tab.key} />
          if (tab.visibility === -1) {
            return !user.username ? tabItem : null
          }
          if (tab.visibility === 1) {
            return user.username ? tabItem : null
          }
          return tabItem
        })}
      </Tabs>
    </>
  )
}

export default TabsComponent
