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
import { useEffect } from 'react'

const hasCompletedOnboardingAtom = atomWithStorage(
	'hasCompletedOnboarding',
	false,
)

export function HelpSideEffect() {
	const [hasCompletedOnboarding, setHasCompletedOnboarding] = useAtom(
		hasCompletedOnboardingAtom,
	)
	const { setIsOpen } = useTour()

	useEffect(() => {
		if (!hasCompletedOnboarding) {
			// Show the dialog if user hasn't completed onboarding
		}
	}, [hasCompletedOnboarding])

	return (
		<Dialog open={!hasCompletedOnboarding}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center'>Onboarding</DialogTitle>
					<DialogDescription className='text-center'>
						Kleine Onboarding Tour um zu verstehen, wie alles funktioniert.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='flex justify-start sm:justify-center'>
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
