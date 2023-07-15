import { SettingsSidebar } from '@/src/components/SettingsSidebar'
import type { FunctionComponent } from 'react'
import { ResizeEffect } from './ResizeEffect'

const Settings: FunctionComponent = () => {
  return (
    <>
      <ResizeEffect />
      <div className="md:hidden">
        {/* @ts-expect-error Server Component */}
        <SettingsSidebar />
      </div>
    </>
  )
}

export default Settings
