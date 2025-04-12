import { EventCard } from "@/src/components/Events/EventCard"
import { isOwnerOfGroup } from "@/src/helpers/isOwnerOfGroup"
import { getServerComponentAuthSession } from "@/src/server/auth/authOptions"
import { prisma } from "@/src/server/db/client"
import { redis } from "@/src/server/db/redis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import type { Event } from "@prisma/client"
import { addDays } from "date-fns"
import { redirect } from "next/navigation"
import GroupAvailabilityPage from "./GroupPage"
import MyAvailabilityPage from "./MyAvailability"
import { getLatLong } from "./getLatLong"

export default async function MainPage({
	params: { groupId },
	searchParams: { date },
}: {
	params: { groupId: string }
	searchParams: { date: string }
}) {
	const session = await getServerComponentAuthSession()
	if (!session?.user?.id) redirect("/api/auth/signin")

	const isOwner = await isOwnerOfGroup()

	const [events, group, timeSlots, userInGroup] = await Promise.all([
		prisma.event.findMany({
			where: { groupId },
			orderBy: { date: "asc" },
		}),
		prisma.group.findUnique({
			where: { id: groupId },
			include: {
				users: {
					include: {
						user: true,
					},
				},
			},
		}),
		prisma.timeSlot.findMany({
			where: {
				user: { id: session.user.id },
				groupId,
			},
			orderBy: [{ type: "asc" }, { date: "asc" }, { startTime: "asc" }],
		}),
		prisma.userOnGroups.findFirst({
			where: {
				user: { id: session.user.id },
				groupId,
			},
		}),
	])

	if (!userInGroup) {
		return <div>Du gehörst nicht zu dieser Gruppe</div>
	}

	if (!group) {
		redirect("/")
	}

	const eventInfo = events.map((event: Event) => ({
		address: event.address,
		id: event.id,
	}))

	const data = await getLatLong(eventInfo)

	if (redis.isOpen) {
		await redis.disconnect()
	}

	const users = group.users.map((u) => u.user)

	const generalTimeSlots = timeSlots.filter((slot) => slot.type === "GENERAL")
	const weekendTimeSlots = timeSlots.filter((slot) => slot.type === "WEEKEND")

	return (
		<div className="flex flex-col pb-2">
			<Tabs defaultValue="events" className="w-full">
				<TabsList className="w-full">
					<TabsTrigger value="events">Aktuelle Events</TabsTrigger>
					<TabsTrigger value="myAvailability">Meine Verfügbarkeit</TabsTrigger>
					<TabsTrigger value="groupAvailability">
						Gruppenverfügbarkeit
					</TabsTrigger>
				</TabsList>
				<TabsContent value="events">
					<div className="m-8 flex flex-col gap-y-3 justify-center items-center">
						<ul className="flex flex-col gap-y-2">
							{events?.length > 0 &&
								events.map(async (event: Event) => {
									const payment = await prisma.payment.findFirst({
										where: {
											eventId: event.id,
											userId: session.user?.id ?? "",
										},
									})
									if (
										addDays(event.date, 3) < new Date() &&
										!isOwner &&
										payment
									)
										return null

									return (
										<li key={event.id}>
											<EventCard event={event} location={data?.get(event.id)} />
										</li>
									)
								})}
						</ul>
					</div>
				</TabsContent>
				<TabsContent value="myAvailability">
					<MyAvailabilityPage
						groupId={groupId}
						timeSlots={timeSlots}
						users={users}
					/>
				</TabsContent>
				<TabsContent value="groupAvailability">
					<GroupAvailabilityPage users={users} groupId={groupId} />
				</TabsContent>
			</Tabs>
		</div>
	)
}
