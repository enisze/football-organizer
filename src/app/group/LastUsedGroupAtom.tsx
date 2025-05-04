'use client'

import { useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useEffect } from 'react'

export const lastUsedGroupAtom = atomWithStorage<string | null>(
	'lastGroup',
	null,
)

export function LastUsedGroupSideEffect({ groupId }: { groupId: string }) {
	const setLastUsedGroup = useSetAtom(lastUsedGroupAtom)

	useEffect(() => {
		setLastUsedGroup(groupId)
	}, [groupId, setLastUsedGroup])

	return null
}
