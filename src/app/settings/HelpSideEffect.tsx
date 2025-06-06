'use client'

import { Button } from '@/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog'
import { useTour } from '@reactour/tour'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useEffect, useState } from 'react'

const hasCompletedOnboardingAtom = atomWithStorage(
	'hasCompletedOnboarding',
	false,
)

export function HelpSideEffect() {
	const [isLoaded, setIsLoaded] = useState(false)
	const [hasCompletedOnboarding, setHasCompletedOnboarding] = useAtom(
		hasCompletedOnboardingAtom,
	)
	const { setIsOpen } = useTour()

	useEffect(() => {
		setIsLoaded(true)
	}, [])

	if (!isLoaded) {
		return null
	}

	return (
		<Dialog open={!hasCompletedOnboarding}>
			<DialogContent
				onClickClose={() => {
					setHasCompletedOnboarding(true)
					setIsOpen(false)
				}}
			>
				<DialogHeader>
					<DialogTitle className='text-center'>Onboarding</DialogTitle>
					<DialogDescription className='text-center'>
						Kleine Onboarding Tour um zu verstehen, wie alles funktioniert.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='flex gap-2 flex-col justify-start sm:justify-center'>
					<Button
						onClick={() => {
							setHasCompletedOnboarding(true)
							setIsOpen(true)
						}}
					>
						Tour starten
					</Button>
					<Button
						variant='outline'
						onClick={() => setHasCompletedOnboarding(true)}
					>
						Tour überspringen
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
