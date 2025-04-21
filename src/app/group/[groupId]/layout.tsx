import type { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
	return <div className="mb-14">{children}</div>
}

export default Layout
