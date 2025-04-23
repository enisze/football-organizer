'use client'

import { Button } from '@/ui/button'
import { Toaster } from '@/ui/toaster'
import { TourProvider } from '@reactour/tour'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode, Suspense, useState } from 'react'

const tourSteps = [
	{
		selector: '[data-tour="myAvailability"]',
		content: 'Hier kannst du deine Verfügbarkeiten anpassen.',
	},
	{
		selector: '[data-tour="general"]',
		content:
			'Lege deine allgemeine Verfügbarkeit für Werktage und Wochenenden fest.',
	},
	{
		selector: '[data-tour="weekly"]',
		content:
			'Hier kannst du für jeden Wochentag individuelle Zeiten festlegen.',
	},
	{
		selector: '[data-tour="date"]',
		content:
			'Wähle spezifische Tage aus und lege deine Verfügbarkeit fest. Das kannst du bspw. machen, wenn du an bestimmten Tagen weniger verfügbar bist als normalerweise.',
	},
	{
		selector: '[data-tour="add-time-slot"]',
		content: 'Klicke hier, um ein neues Zeitfenster hinzuzufügen.',
	},
	{
		selector: '[data-tour="start-time"]',
		content: 'Wähle hier die Startzeit für dein Zeitfenster aus.',
	},
	{
		selector: '[data-tour="end-time"]',
		content: 'Wähle hier die Endzeit für dein Zeitfenster aus.',
	},
	{
		selector: '[data-tour="save-time-slot"]',
		content: 'Klicke hier, um das neue Zeitfenster zu speichern.',
	},
]

const Providers = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<ThemeProvider attribute='class'>
			<Suspense>
				<QueryClientProvider client={queryClient}>
					<Toaster />
					<TourProvider
						steps={tourSteps}
						scrollSmooth
						styles={{
							popover: (base) => ({
								...base,
								background: '#18181b',
								borderRadius: '8px',
								overflow: 'hidden',
								borderColor: 'white',
							}),
						}}
						ContentComponent={({ currentStep, steps, setCurrentStep }) => {
							const content = steps[currentStep]?.content
							if (!content) return null

							return (
								<div className=''>
									<div className='mb-4 text-foreground'>
										{typeof content === 'function' ? null : content}
									</div>
									<div className='flex justify-between items-center'>
										<span className='text-sm text-muted-foreground'>
											Schritt {currentStep + 1} von {steps.length}
										</span>
										<Button
											variant='default'
											type='button'
											onClick={() => {
												if (currentStep === steps.length - 1) {
													setCurrentStep(0)
												} else {
													setCurrentStep((s) => s + 1)
												}
											}}
										>
											Weiter
										</Button>
									</div>
								</div>
							)
						}}
					>
						<NuqsAdapter>{children}</NuqsAdapter>
					</TourProvider>
				</QueryClientProvider>
			</Suspense>
		</ThemeProvider>
	)
}

export default Providers
