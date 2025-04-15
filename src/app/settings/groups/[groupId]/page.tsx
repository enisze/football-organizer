import { Button } from "@/ui/button"
import { Separator } from "@/ui/separator"

import { getServerComponentAuthSession } from "@/src/server/auth/authOptions"
import { Container } from "@/ui/container"
import type { Group } from "@prisma/client"
import { XIcon } from "lucide-react"
import { DeleteGroupForm } from "./DeleteGroupForm"

import { prisma } from "@/src/server/db/client"
import { routes } from "@/src/shared/navigation"
import { sign } from "jsonwebtoken"
import { redirect } from "next/navigation"
import { ClipboardButton } from "./ClipboardButton"
import { ClipboardCode } from "./ClipboardCode"
import { EventDialog } from "./EventDialog"
import { NameChange } from "./NameChange"
import { deleteUserFromGroup } from "./actions"

interface PageProps {
	params: Promise<unknown>
}

const GroupSettings = async ({ params }: PageProps) => {
	const resolvedParams = await params
	const { groupId } = routes.groupSettings.$parseParams(resolvedParams)

	const session = await getServerComponentAuthSession()
	const userId = session?.user?.id

	const groupData = await prisma.group.findFirst({
		where: { id: groupId, ownerId: userId },
		include: { users: true },
	})

	const groupName = groupData?.name

	const userName = session?.user?.name

	const token = sign(
		{ id: groupId, groupName, ownerName: userName },
		process.env.JWT_SECRET as string,
	)

	if (!userId || !groupId) {
		// window.location.replace('/')
		// window.location.reload()
		return null
	}

	return (
		<form>
			<div className="flex">
				<Separator orientation="vertical" />

				<div className="flex flex-col gap-y-2 p-2">
					<h3 className="font-bold">Einstellungen für Gruppe {groupName}</h3>

					<NameChange groupName={groupName ?? ""} />

					<div className="flex items-center justify-between gap-x-2">
						<p>{`Mitglieder ${groupData?.users.length}/${
							getPricingInfos(groupData)?.maximalMembers
						}`}</p>

						<ClipboardButton token={token} />
						<ClipboardCode code={groupData?.code ?? ""} />
					</div>
					<EventDialog />

					<Container className="flex-col">
						{groupData?.users?.map(async (userInGroup, idx) => {
							const user = await prisma.user.findUnique({
								where: { id: userInGroup?.id },
								select: { name: true },
							})

							return (
								<div
									key={idx}
									className="grid grid-cols-3 w-full justify-between items-center"
								>
									<div>{user?.name}</div>

									<p className="justify-self-center">
										{/* TODO: setup dropdown list to change user role */}
										{
											groupData.users.find((groupUser) => {
												return groupUser.id === userInGroup?.id
											})?.role
										}
									</p>
									{userInGroup?.id === groupData.ownerId && (
										<Button
											variant="ghost"
											type="submit"
											className="w-fit justify-self-end"
											formAction={async () => {
												"use server"
												const res = await deleteUserFromGroup({
													groupId,
													userId: userInGroup.id,
												})

												if (res?.data?.groupDeleted) {
													redirect("/settings/groups")
												}
											}}
										>
											<XIcon />
										</Button>
									)}
								</div>
							)
						})}
					</Container>

					<DeleteGroupForm groupName={groupName ?? ""} groupId={groupId} />
				</div>
			</div>
			<Separator />
		</form>
	)
}

export default GroupSettings

const getPricingInfos = (group: Group | null | undefined) => {
	if (!group) return { maximalMembers: 0 }
	switch (group.pricingModel) {
		case "FREE":
			return { maximalMembers: 15 }
		case "SUPPORTER":
			return { maximalMembers: 30 }
	}
}
