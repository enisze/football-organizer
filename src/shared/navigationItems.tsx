import { IconCalendar, IconUserCircle, IconUsers } from '@tabler/icons-react'
import { Settings } from 'lucide-react'
import { routes } from './navigation'

type SearchParams = {
	selectedDate?: string
	duration?: '60min' | '90min' | '120min'
	minUsers?: number
	date?: string
	maxUsers?: number
}

export const getNavigationItems = ({
	groupId,
	selectedDate,
	duration,
	minUsers,
	maxUsers,
	date,
}: SearchParams & { groupId: string }) => {
	// Helper function to remove undefined values from an object
	const removeUndefined = <T extends Record<string, unknown>>(
		obj: T,
	): Partial<T> => {
		const result: Partial<T> = {}
		for (const [key, value] of Object.entries(obj)) {
			if (value !== undefined && value !== null) {
				result[key as keyof T] = value as T[keyof T]
			}
		}
		return result
	}

	return [
		{
			title: 'Events',
			icon: <IconCalendar className='h-full w-full' />,
			href: routes.groupEvents({ groupId }),
			id: 'events',
		},
		{
			title: 'Zeiten',
			icon: <IconUserCircle className='h-full w-full' />,
			href: routes.groupMyAvailability({
				groupId,
				search: removeUndefined<SearchParams>({
					selectedDate,
				}),
			}),
			id: 'myAvailability',
		},
		{
			title: 'Gruppe',
			icon: <IconUsers className='h-full w-full' />,
			href: routes.groupAvailability({
				groupId,
				search: removeUndefined<SearchParams>({
					duration,
					minUsers,
					maxUsers,
					date: date ? new Date(date).toISOString() : undefined,
				}),
			}),
			id: 'groupAvailability',
		},
		{
			title: 'Einstellungen',
			icon: <Settings className='h-full w-full' />,
			href: routes.settings({
				groupId,
			}),
			id: 'settings',
		},
	]
}
