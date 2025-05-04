'use client'

import { cn } from '@/lib/utils/cn'
import { Toaster } from '@/ui/toaster'
import { TourProvider } from '@reactour/tour'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode, Suspense, useState } from 'react'

const tourSteps = [
	{
		selector: '[data-tour="groupAvailability"]',
		content:
			'Hier siehst du die Verfügbarkeiten deiner Gruppe. Dort siehst du an welchem Tag wieviele Leute Zeit haben.',
	},
	{
		selector: '[data-tour="events"]',
		content:
			'Hier findest du aktuelle Events für die Gruppe und kannst dort deine Verfügbarkeit anpassen. D.h. ob du an einem Event teilnehmen kannst oder nicht.',
	},
	{
		selector: '[data-tour="myAvailability"]',
		content:
			'Bitte klicke hier, um deine Zeiten anzupassen. Drücke dann auf den Pfeil um weiterzumachen.',
	},
	{
		selector: '[data-tour="exception"]',
		content:
			'Hier kannst du Ausnahmen für deine Verfügbarkeit hinzufügen oder entfernen.',
	},
	{
		selector: '[data-tour="date"]',
		content:
			'Wähle spezifische Tage aus und lege deine Zeiten fest. Das kannst du bspw. machen, wenn du an bestimmten Tagen weniger verfügbar bist als normalerweise.',
	},
	{
		selector: '[data-tour="weekly"]',
		content:
			'Hier kannst du für jeden Wochentag individuelle Zeiten festlegen.',
	},
	{
		selector: '[data-tour="create-time-slot"]',
		content: 'Klicke hier, um ein neues Zeitfenster hinzuzufügen.',
	},
	{
		selector: '[data-tour="presets-time"]',
		content: 'Hier kannst du vorausgewählte Zeitfenster auswählen.',
	},
	{
		selector: '[data-tour="quick-select"]',
		content: 'Hier kannst du vordefinierte Tage auswählen.',
	},
	{
		selector: '[data-tour="day-selection"]',
		content:
			'hier kannst du die Tage auswählen, für die du die Zeiten festlegen möchtest.',
	},
	{
		selector: '[data-tour="start-time"]',
		content: 'Wähle hier die Startzeit für dein Zeitfenster aus.',
	},
	{
		selector: '[data-tour="start-time-content"]',
		content: 'Wähle hier die Startzeit für dein Zeitfenster aus.',
	},
	{
		selector: '[data-tour="end-time"]',
		content: 'Wähle hier die Endzeit für dein Zeitfenster aus.',
	},
	{
		selector: '[data-tour="end-time-content"]',
		content: 'Wähle hier die Endzeit für dein Zeitfenster aus.',
	},
	{
		selector: '[data-tour="save-time-slot"]',
		content: 'Klicke hier, um das neue Zeitfenster zu speichern.',
	},
	{
		selector: '[data-tour="timeslots"]',
		content:
			'Super! Du hast dein erstes Zeitfenster erstellt. Du kannst nun auf ein Zeitfenster klicken, um es zu bearbeiten oder zu löschen.',
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
						components={{
							Arrow: ({ disabled, inverted }) => (
								<ArrowRight
									className={cn(
										'text-white',
										disabled && 'text-gray-500',
										!inverted && 'transform rotate-180',
									)}
								/>
							),
						}}
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
					>
						<NuqsAdapter>{children}</NuqsAdapter>
					</TourProvider>
				</QueryClientProvider>
			</Suspense>
		</ThemeProvider>
	)
}

export default Providers
