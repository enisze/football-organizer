"use client"

import { GroupAvailabilityView } from "@/src/components/GroupAvailability"
import { Calendar } from "@/ui/calendar"
import { Label } from "@/ui/label"
import type { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useQueryState } from "nuqs"
import { useState } from "react"
import { UserList } from "./UsersList"
import { getGroupAvailabilityAction } from "./availability/actions"

interface GroupPageProps {
	users: User[]
	groupId: string
}

export default function GroupAvailabilityPage({
	users,
	groupId,
}: GroupPageProps) {
	const [date, setDate] = useQueryState("date", {
		defaultValue: new Date().toISOString(),
	})
	const [selectedUsers, setSelectedUsers] = useState<User[]>(users)

	const { data: availability } = useQuery({
		queryKey: ["groupAvailability", groupId, date],
		queryFn: async () => {
			const result = await getGroupAvailabilityAction({
				date: new Date(date),
				groupId,
			})
			return result?.data
		},
		enabled: Boolean(date),
	})

	return (
		<div className="container mx-auto py-6">
			<div className="grid gap-6 md:grid-cols-[300px_1fr]">
				<div className="space-y-4">
					<div className="rounded-lg border p-4">
						<div className="mb-2">
							<Label htmlFor="date-picker">Select Date</Label>
							<Calendar
								id="date-picker"
								mode="single"
								selected={date ? new Date(date) : undefined}
								onSelect={(newDate) =>
									newDate && setDate(newDate.toISOString())
								}
								className="mx-auto"
							/>
						</div>
					</div>

					<div className="rounded-lg border p-4">
						<div className="mb-2 flex items-center justify-between">
							<Label>Team Members</Label>
						</div>
						<UserList
							users={users}
							selectedUsers={selectedUsers}
							onChange={setSelectedUsers}
						/>
					</div>
				</div>

				<div className="rounded-lg border p-4">
					<h2 className="mb-4 text-xl font-semibold">
						{date
							? new Date(date).toLocaleDateString("de-DE", {
									weekday: "long",
									month: "long",
									day: "numeric",
								})
							: "Select a date"}
					</h2>

					{date && (
						<GroupAvailabilityView
							date={new Date(date)}
							users={selectedUsers}
							daySpecificSlots={availability?.daySpecificSlots ?? []}
							regularSlots={availability?.regularSlots ?? []}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
