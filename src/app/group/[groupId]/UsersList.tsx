"use client"

import type { User } from "@prisma/client"

const getRandomColor = () => {
	const letters = "0123456789ABCDEF"
	let color = "#"
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

interface UserListProps {
	users: User[]
	selectedUsers: User[]
}

export function UserList({ users, selectedUsers }: UserListProps) {
	return (
		<div className="space-y-2">
			{users.map((user) => {
				const isSelected = selectedUsers.some((u) => u.id === user.id)
				const userColor = getRandomColor()

				return (
					<div
						key={user.id}
						className="flex cursor-pointer items-center justify-between rounded-md border p-2 hover:bg-accent"
					>
						<div className="flex items-center gap-2">
							<div
								className="h-3 w-3 rounded-full"
								style={{ backgroundColor: userColor }}
							/>
							<span>{user.name}</span>
						</div>

						<div className="flex h-4 w-4 items-center justify-center rounded border">
							{isSelected && <div className="h-2 w-2 rounded-sm bg-primary" />}
						</div>
					</div>
				)
			})}
		</div>
	)
}
