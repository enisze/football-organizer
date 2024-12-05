'use server'

import { prisma } from '@/src/server/db/client'

import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'

export const addToGroup = async (code: string) => {
	const session = await getServerComponentAuthSession()

	const group = await prisma.group.findFirst({
		where: {
			code
		}
	})
	if (!session?.user?.id) throw new Error('No user id')

	if (!group) throw new Error('Group not found')

	const isOnGrouo = await prisma.userOnGroups.findFirst({
		where: {
			groupId: group?.id,
			id: session?.user?.id
		},
		select: {
			group: { select: { name: true, id: true } }
		}
	})

	if (isOnGrouo) return isOnGrouo

	const result = await prisma.userOnGroups.create({
		data: {
			groupId: group?.id,
			id: session?.user?.id
		},
		select: {
			id: true,
			group: { select: { name: true, id: true } }
		}
	})

	return result
}
