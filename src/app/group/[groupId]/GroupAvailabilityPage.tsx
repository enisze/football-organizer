import { GroupAvailabilityView } from "@/src/components/GroupAvailability"
import { prisma } from "@/src/server/db/client"
import { Suspense } from "react"
import { getGroupAvailabilityAction } from "./availability/actions"
import { processGroupAvailability } from "./availability/processAvailability"

interface GroupAvailabilityPageProps {
	groupId: string
	date: Date
	minUsers: number
	duration: "60min" | "90min" | "120min"
}

async function GroupAvailabilityData({
	groupId,
	date,
	minUsers,
	duration,
}: GroupAvailabilityPageProps) {
	const group = await prisma.group.findUnique({
		where: { id: groupId },
		include: {
			users: {
				include: {
					user: true,
				},
			},
		},
	})

	if (!group) return null

	const users = group.users.map((u) => u.user)
	const availability = await getGroupAvailabilityAction({
		date,
		groupId,
	})

	const groupAvailability = processGroupAvailability({
		date,
		users,
		daySpecificSlots: availability?.data?.daySpecificSlots ?? [],
		regularSlots: availability?.data?.generalSlots ?? [],
		weekendSlots: availability?.data?.weekendSlots ?? [],
		duration,
	})

	const filteredAvailability = groupAvailability.filter(
		(slot) => slot.availableUsers.length >= minUsers,
	)

	return (
		<GroupAvailabilityView
			users={users}
			date={date}
			processedSlots={filteredAvailability}
			groupId={groupId}
		/>
	)
}

export default function GroupAvailabilityPage(
	props: GroupAvailabilityPageProps,
) {
	return (
		<Suspense fallback={<div>Loading availability...</div>}>
			<GroupAvailabilityData {...props} />
		</Suspense>
	)
}
