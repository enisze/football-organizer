import { SpecificSettings } from '@/src/components/SettingsSidebar'
import type { ReactNode } from 'react'

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col md:grid grid-cols-[220px_8px_auto]">
      <SpecificSettings />
      {children}
    </div>
  )
}

export default SettingsLayout
