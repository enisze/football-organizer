"use client"

import { GroupAvailabilityView } from "@/src/components/GroupAvailability"
import { Button } from "@/ui/button"
import { Calendar } from "@/ui/calendar"
import type { User, UserAvailability } from "@prisma/client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useQueryState } from "nuqs"
import { UserList } from "./UsersList"
import { revalidateGroupAction } from "./actions"

export default function GroupAvailabilityPage({
	users,
	allUserAvailabilities,
}: {
	users: User[]
	allUserAvailabilities: UserAvailability[]
}) {
	const [date, setDate] = useQueryState("date", {
		defaultValue: "",
	})

	return (
		<div className="container mx-auto py-6">
			<div className="mb-6 flex items-center">
				<Link href="/">
					<Button variant="ghost" size="sm">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back
					</Button>
				</Link>
				<h1 className="ml-4 text-2xl font-bold">Group Availability</h1>
			</div>

			<div className="grid gap-6 md:grid-cols-[300px_1fr]">
				<div className="space-y-4">
					<div className="rounded-lg border p-4">
						<Calendar
							mode="single"
							selected={new Date(date)}
							onSelect={async (date) => {
								setDate(date?.toISOString() || "")
								await revalidateGroupAction()
							}}
							className="mx-auto"
						/>
					</div>

					<div className="rounded-lg border p-4">
						<div className="mb-2 flex items-center justify-between">
							<h3 className="font-medium">Team Members</h3>
						</div>
						<UserList users={users} selectedUsers={users} />
					</div>
				</div>

				<div className="rounded-lg border p-4">
					<h2 className="mb-4 text-xl font-semibold">
						{date
							? new Date(date).toLocaleDateString("en-US", {
									weekday: "long",
									month: "long",
									day: "numeric",
								})
							: "Select a date"}
					</h2>

					{date && (
						<GroupAvailabilityView
							date={new Date(date)}
							users={users}
							allUserAvailabilities={allUserAvailabilities}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
