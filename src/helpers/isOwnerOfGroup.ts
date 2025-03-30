import { headers } from 'next/headers'
import { getServerComponentAuthSession } from '../server/auth/authOptions'

import { prisma } from '@/src/server/db/client'
import { revalidatePath } from 'next/cache'

export const isOwnerOfGroup = async () => {
	const session = await getServerComponentAuthSession()

	const groupId = await getGroupId()

	if (!groupId || !session?.user?.id) return false

	const userOnGroup = prisma.userOnGroups.findUnique({
		where: {
			id_groupId: {
				groupId,
				id: session?.user?.id
			}
		}
	})

	const isOwnerUrl = getIsOwnerFromURL()

	return isOwnerUrl !== undefined ? isOwnerUrl === 'true' : Boolean(userOnGroup)
}

const getIsOwnerFromURL = () => {
	const params = headers().get('x-params')?.split('&')

	const isOwnerUrl = params
		?.find((param) => param.includes('isOwner'))
		?.split('=')[1]

	return isOwnerUrl
}

export const revalidateGroup = async () => {
	const groupId = await getGroupId()
	revalidatePath(`group/${groupId}`)
}

export const getGroupId = async () => {
	const pathname = await headers().get('x-pathname')
	const groupId = pathname?.split('/').at(-1)

	return groupId
}
