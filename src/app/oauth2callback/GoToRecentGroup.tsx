'use client'

import { routes } from '@/src/shared/navigation'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { buttonVariants } from '@/ui/button'
import { useAtomValue } from 'jotai'
import { lastUsedGroupAtom } from '../group/LastUsedGroupAtom'

export const GoToRecentGroup = () => {
	const groupId = useAtomValue(lastUsedGroupAtom)
	if (!groupId) return null

	return (
		<OrganizerLink
			href={routes.settings({
				groupId,
			})}
			className={buttonVariants({ variant: 'outline' })}
		>
			Zurück zu den Einstellungen
		</OrganizerLink>
	)
}
