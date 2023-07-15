import { SpecificSettings } from '@/src/components/SettingsSidebar'
import type { ReactNode } from 'react'
import { ResizeEffect } from './ResizeEffect'

const Settings = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ResizeEffect />
      <SpecificSettings />
      {children}
    </>
  )
}

export default Settings
