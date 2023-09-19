import { type ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col items-center pt-2">{children}</div>
}

export default Layout
