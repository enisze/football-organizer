import { Navbar } from '@/src/components/Navigation/Navbar'
import { SettingsSidebar } from '@/src/components/SettingsSidebar'
import { FunctionComponent } from 'react'

const Settings: FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <div className="md:hidden">
        <SettingsSidebar />
      </div>
    </>
  )
}

export default Settings
