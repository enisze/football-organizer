'use client'

import { Toaster } from '@/ui/toaster'
import { TourProvider } from '@reactour/tour'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode, Suspense, useState } from 'react'

const tourSteps = [
	{
		selector: '[data-tour="myAvailability"]',
		content: 'Klicke hier, um deine Verfügbarkeiten anzupassen.',
	},
	{
		selector: '[data-tour="general"]',
		content:
			'Lege deine allgemeine Verfügbarkeit für Werktage und Wochenenden fest.',
	},
	{
		selector: '[data-tour="date"]',
		content:
			'Wähle spezifische Tage aus und lege deine Verfügbarkeit fest. Das kannst du bspw. machen, wenn du an bestimmten Tagen weniger verfügbar bist als normalerweise.',
	},
	{
		selector: '[data-tour="weekly"]',
		content:
			'Hier kannst du für jeden Wochentag individuelle Zeiten festlegen. Klicke auf den Tab, um weiterzumachen.',
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
	{
		selector: '[data-tour="save-time-slot"]',
		content: 'Super! Du hast dein erstes Zeitfenster erstellt.',
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
							badge: (base) => ({
								...base,
								background: '#4f46e5',
							}),
							dot: (base) => ({
								...base,
								background: '#4f46e5',
							}),
							popover: (base) => ({
								...base,
								background: '#18181b',
							}),
						}}
						onClickHighlighted={(
							event,
							{ currentStep, setCurrentStep, steps },
						) => {
							if (
								currentStep === 2 ||
								currentStep === 3 ||
								currentStep === (steps?.length ?? 0) - 1
							)
								return

							setCurrentStep(currentStep + 1)
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
