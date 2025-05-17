'use client'

import type { ProviderType } from '@/src/server/auth/providers/types'
import { Badge } from '@/ui/badge'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { lastUsedProviderAtom } from './ProviderButton'

export function LastUsedProvider({
	provider,
	onClick,
}: { provider: ProviderType | 'discord'; onClick?: () => void }) {
	const [lastUsedProvider, setLastUsedProvider] = useAtom(lastUsedProviderAtom)

	useEffect(() => {
		if (onClick) {
			const originalOnClick = onClick
			onClick = () => {
				setLastUsedProvider(provider)
				originalOnClick()
			}
		}
	}, [onClick, provider, setLastUsedProvider])

	if (lastUsedProvider !== provider) return null

	return (
		<Badge variant='default' className='-top-2 -right-4 absolute'>
			Zuletzt
		</Badge>
	)
}
