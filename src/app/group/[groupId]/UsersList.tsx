'use client'

interface User {
	id: number
	name: string
	color: string
}

interface UserListProps {
	users: User[]
	selectedUsers: User[]
	onToggleUser: (userId: number) => void
}

export function UserList({
	users,
	selectedUsers,
	onToggleUser
}: UserListProps) {
	return (
		<div className='space-y-2'>
			{users.map((user) => {
				const isSelected = selectedUsers.some((u) => u.id === user.id)

				return (
					<div
						key={user.id}
						className='flex cursor-pointer items-center justify-between rounded-md border p-2 hover:bg-accent'
						onClick={() => onToggleUser(user.id)}
					>
						<div className='flex items-center gap-2'>
							<div
								className='h-3 w-3 rounded-full'
								style={{ backgroundColor: user.color }}
							/>
							<span>{user.name}</span>
						</div>

						<div className='flex h-4 w-4 items-center justify-center rounded border'>
							{isSelected && <div className='h-2 w-2 rounded-sm bg-primary' />}
						</div>
					</div>
				)
			})}
		</div>
	)
}
