import { SpecificSettings } from '@/src/components/SettingsSidebar'

const SettingsLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:grid grid-cols-[220px_8px_auto]">
      <SpecificSettings />
      {children}
    </div>
  )
}

export default SettingsLayout
