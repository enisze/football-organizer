import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { Navbar } from './Navbar'

export const NavbarWrapper = async () => {
	const session = await serverAuth()
	const group = await prisma.group.findFirst({
		where: { users: { some: { id: session?.user?.id } } },
		select: { id: true },
	})

	return <Navbar group={group} user={session?.user} />
}
