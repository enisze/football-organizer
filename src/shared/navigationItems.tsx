import { IconCalendar, IconUserCircle, IconUsers } from '@tabler/icons-react'
import { Settings } from 'lucide-react'
import { routes } from './navigation'

type SearchParams = {
	tab?: 'events' | 'myAvailability' | 'groupAvailability'
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
	date,
}: {
	groupId: string
	selectedDate?: string
	duration?: '60min' | '90min' | '120min'
	minUsers?: number
	date?: Date
}) => {
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
			href: routes.groupDetails({ groupId, search: { tab: 'events' } }),
			id: 'events',
		},
		{
			title: 'Zeiten',
			icon: <IconUserCircle className='h-full w-full' />,
			href: routes.groupDetails({
				groupId,
				search: removeUndefined<SearchParams>({
					tab: 'myAvailability',
					selectedDate,
				}),
			}),
			id: 'myAvailability',
		},
		{
			title: 'Gruppe',
			icon: <IconUsers className='h-full w-full' />,
			href: routes.groupDetails({
				groupId,
				search: removeUndefined<SearchParams>({
					tab: 'groupAvailability',
					duration,
					minUsers,
					date: date?.toISOString(),
				}),
			}),
			id: 'groupAvailability',
		},
		{
			title: 'Einstellungen',
			icon: <Settings className='h-full w-full' />,
			href: routes.settings({
				search: {
					groupId,
				},
			}),
			id: 'settings',
		},
	]
}
