import { getServerComponentAuthSession } from "@/src/server/auth/authOptions"
import { prisma } from "@/src/server/db/client"
import { routes } from "@/src/shared/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import Link from "next/link"
import { redirect } from "next/navigation"
import CurrentEventsPage from "./CurrentEventsPage"
import GroupAvailabilityPage from "./GroupAvailabilityPage"
import MyAvailabilityPage from "./MyAvailabilityPage"

interface PageProps {
	params: Promise<unknown>
	searchParams: Promise<unknown>
}

export default async function MainPage({ params, searchParams }: PageProps) {
	const resolvedParams = await params
	const resolvedSearchParams = await searchParams
	const { groupId } = routes.groupDetails.$parseParams(resolvedParams)
	const res = routes.groupDetails.$parseSearchParams(resolvedSearchParams ?? {})

	const date = res?.date ? new Date(res.date) : new Date()

	const selectedDate = res?.selectedDate
	const duration = res?.duration ?? "60min"
	const minUsers = res?.minUsers ?? 0

	const tab = res?.tab

	const session = await getServerComponentAuthSession()
	if (!session?.user?.id) redirect("/api/auth/signin")

	// Just check if user belongs to group
	const userInGroup = await prisma.userOnGroups.findFirst({
		where: {
			user: { id: session.user.id },
			groupId,
		},
	})

	if (!userInGroup) {
		return <div>Du gehörst nicht zu dieser Gruppe</div>
	}

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
					<CurrentEventsPage groupId={groupId} />
				</TabsContent>

				<TabsContent value="myAvailability">
					<MyAvailabilityPage groupId={groupId} date={selectedDate} />
				</TabsContent>

				<TabsContent value="groupAvailability">
					<GroupAvailabilityPage
						groupId={groupId}
						date={date}
						minUsers={minUsers}
						duration={duration as "60min" | "90min" | "120min"}
					/>
				</TabsContent>
			</Tabs>
		</div>
	)
}
