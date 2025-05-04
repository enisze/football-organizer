import { serverAuth } from '@/src/server/auth/session'
import { Navbar } from './Navbar'

export const NavbarWrapper = async () => {
	const session = await serverAuth()

	return <Navbar user={session?.user} />
}
