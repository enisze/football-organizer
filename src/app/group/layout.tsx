import { GroupSelector } from '@/src/components/Groups/GroupSelector'
import { type ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center pt-2">
      <GroupSelector />

      {children}
    </div>
  )
}

export default Layout
