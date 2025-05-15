'use client'

import { Button } from '@/ui/button'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { Chrome, MessageSquare } from 'lucide-react'
import { LastUsedProvider } from './LastUsedProvider'

const MicrosoftIcon = () => (
	<svg viewBox='0 0 24 24' className='w-5 h-5' fill='currentColor'>
		<title>Microsoft</title>
		<path d='M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z' />
	</svg>
)

export const lastUsedProviderAtom = atomWithStorage<
	'google' | 'discord' | 'microsoft' | null
>('lastUsedProvider', null)

export function ProviderButton({
	provider,
	action,
}: {
	provider: 'google' | 'discord' | 'microsoft'
	action: () => Promise<void>
}) {
	const [, setLastUsedProvider] = useAtom(lastUsedProviderAtom)

	const Icon =
		provider === 'google'
			? Chrome
			: provider === 'microsoft'
				? MicrosoftIcon
				: MessageSquare

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
