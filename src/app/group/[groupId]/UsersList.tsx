"use client"

import type { User } from "@prisma/client"
import type { Dispatch, SetStateAction } from "react"

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
	onChange: Dispatch<SetStateAction<User[]>>
}

export function UserList({ users, selectedUsers, onChange }: UserListProps) {
	const handleUserClick = (user: User) => {
		if (selectedUsers.some((u) => u.id === user.id)) {
			onChange(selectedUsers.filter((u) => u.id !== user.id))
		} else {
			onChange([...selectedUsers, user])
		}
	}

	const renderUsers = () => {
		const userElements = []
		for (const user of users) {
			const isSelected = selectedUsers.some((u) => u.id === user.id)
			const userColor = getRandomColor()

			userElements.push(
				<div
					key={user.id}
					className="flex cursor-pointer items-center justify-between rounded-md border p-2 hover:bg-accent"
					onClick={() => handleUserClick(user)}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							handleUserClick(user)
						}
					}}
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
				</div>,
			)
		}
		return userElements
	}

	return <div className="space-y-2">{renderUsers()}</div>
}
