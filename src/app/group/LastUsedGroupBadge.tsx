'use client'

import { Badge } from '@/ui/badge'
import { useAtomValue } from 'jotai'
import { lastUsedGroupAtom } from './LastUsedGroupAtom'

export function LastUsedGroupBadge({ groupId }: { groupId: string }) {
	const lastUsedGroup = useAtomValue(lastUsedGroupAtom)

	if (lastUsedGroup !== groupId) return null

	return (
		<Badge variant='default' className='absolute top-2 right-2'>
			Zuletzt
		</Badge>
	)
}
