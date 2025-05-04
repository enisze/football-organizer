'use client'

import { Button } from '@/ui/button'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { Chrome, MessageSquare } from 'lucide-react'
import { LastUsedProvider } from './LastUsedProvider'

export const lastUsedProviderAtom = atomWithStorage<
	'google' | 'discord' | null
>('lastUsedProvider', null)

export function ProviderButton({
	provider,
	action,
}: {
	provider: 'google' | 'discord'
	action: () => Promise<void>
}) {
	const [, setLastUsedProvider] = useAtom(lastUsedProviderAtom)

	const Icon = provider === 'google' ? Chrome : MessageSquare

	return (
		<Button
			variant='outline'
			className='w-full flex items-center relative justify-center gap-2'
			formAction={async () => {
				setLastUsedProvider(provider)
				await action()
			}}
		>
			<Icon className='w-5 h-5' />
			Weiter mit {provider.charAt(0).toUpperCase() + provider.slice(1)}
			<LastUsedProvider provider={provider} />
		</Button>
	)
}
