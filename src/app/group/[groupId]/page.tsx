import { EventCard } from "@/src/components/Events/EventCard"
import { GroupAvailabilityView } from "@/src/components/GroupAvailability"
import { isOwnerOfGroup } from "@/src/helpers/isOwnerOfGroup"
import { getServerComponentAuthSession } from "@/src/server/auth/authOptions"
import { prisma } from "@/src/server/db/client"
import { redis } from "@/src/server/db/redis"
import { routes } from "@/src/shared/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import type { Event, User, UserOnGroups } from "@prisma/client"
import { addDays } from "date-fns"
import Link from "next/link"
import { redirect } from "next/navigation"
import MyAvailabilityPage from "./MyAvailabilityPage"
import { getGroupAvailabilityAction } from "./availability/actions"
import { processGroupAvailability } from "./availability/processAvailability"
import { getLatLong } from "./getLatLong"

interface PageProps {
	params: Promise<unknown>
	searchParams: Promise<unknown>
}

export default async function MainPage({ params, searchParams }: PageProps) {
	const resolvedParams = await params
	const resolvedSearchParams = await searchParams
	const { groupId } = routes.groupDetails.$parseParams(resolvedParams)
	const res = routes.groupDetails.$parseSearchParams(resolvedSearchParams ?? {})

	const date = res?.date

	const selectedDate = res?.selectedDate
	const duration = res?.duration ?? "60min"
	const minUsers = res?.minUsers ?? 0

	const tab = res?.tab

	const session = await getServerComponentAuthSession()
	if (!session?.user?.id) redirect("/api/auth/signin")

	const isOwner = await isOwnerOfGroup(groupId)
	const currentDate = date ? new Date(date) : new Date()

	const [
		events,
		group,
		generalTimeSlots,
		weekendTimeSlots,
		daySpecificTimeSlots,
		userInGroup,
		availability,
	] = await Promise.all([
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
				type: "GENERAL",
			},
			orderBy: [{ date: "asc" }, { startTime: "asc" }],
			include: {
				user: true,
			},
		}),
		prisma.timeSlot.findMany({
			where: {
				user: { id: session.user.id },
				groupId,
				type: "WEEKEND",
			},
			orderBy: [{ date: "asc" }, { startTime: "asc" }],
			include: {
				user: true,
			},
		}),
		prisma.timeSlot.findMany({
			where: {
				user: { id: session.user.id },
				groupId,
				date: selectedDate ? new Date(selectedDate) : undefined,
				type: "DAY_SPECIFIC",
			},
			orderBy: [{ date: "asc" }, { startTime: "asc" }],
			include: {
				user: true,
			},
		}),
		prisma.userOnGroups.findFirst({
			where: {
				user: { id: session.user.id },
				groupId,
			},
		}),
		getGroupAvailabilityAction({
			date: currentDate,
			groupId,
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

	const users = group.users.map((u: UserOnGroups & { user: User }) => u.user)

	const groupAvailability = processGroupAvailability({
		date: currentDate,
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
		<div className="flex flex-col pb-2">
			<Tabs defaultValue={tab} className="w-full">
				<TabsList className="w-full">
					<Link
						href={routes.groupDetails({ groupId, search: { tab: "events" } })}
						className="w-full"
					>
						<TabsTrigger value="events">Aktuelle Events</TabsTrigger>
					</Link>
					<Link
						href={routes.groupDetails({
							groupId,
							search: { tab: "myAvailability" },
						})}
						className="w-full"
					>
						<TabsTrigger value="myAvailability">
							Meine Verfügbarkeit
						</TabsTrigger>
					</Link>
					<Link
						href={routes.groupDetails({
							groupId,
							search: { tab: "groupAvailability" },
						})}
						className="w-full"
					>
						<TabsTrigger value="groupAvailability">
							Gruppenverfügbarkeit
						</TabsTrigger>
					</Link>
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
						generalTimeSlots={generalTimeSlots}
						weekendTimeSlots={weekendTimeSlots}
						daySpecificTimeSlots={daySpecificTimeSlots}
					/>
				</TabsContent>
				<TabsContent value="groupAvailability">
					<GroupAvailabilityView
						users={users}
						date={currentDate}
						processedSlots={filteredAvailability}
					/>
				</TabsContent>
			</Tabs>
		</div>
	)
}
