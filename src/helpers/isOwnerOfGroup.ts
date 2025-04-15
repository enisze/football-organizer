import { prisma } from "@/src/server/db/client"
import { routes } from "@/src/shared/navigation"
import { revalidatePath } from "next/cache"
import { getServerComponentAuthSession } from "../server/auth/authOptions"

export const isOwnerOfGroup = async (groupId: string) => {
	const session = await getServerComponentAuthSession()

	if (!groupId || !session?.user?.id) return false

	const group = await prisma.group.findUnique({
		where: { id: groupId },
		select: { ownerId: true },
	})

	return group?.ownerId === session.user.id
}

export const isOwnerOfGroupOfEvent = async (eventId: string) => {
	const session = await getServerComponentAuthSession()

	if (!eventId || !session?.user?.id) return false

	const event = await prisma.event.findUnique({
		where: { id: eventId },
		select: {
			Group: {
				select: {
					ownerId: true,
				},
			},
		},
	})

	return event?.Group?.ownerId === session.user.id
}

export const revalidateGroup = async (groupId: string) => {
	revalidatePath(routes.groupDetails({ groupId }))
}
