'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/dialog'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select'
import { Separator } from '@/ui/separator'
import { toast } from '@/ui/use-toast'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { CalendarPlus } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import {
	applyCalendarSlotsAction,
	previewCalendarDataAction,
} from '../app/group/[groupId]/availability/calendarActions'
import type { PreviewTimeSlot } from '../app/group/[groupId]/availability/types'

interface CalendarIntegrationProps {
	groupId: string
	isOwner?: boolean
}

type TimeRange = 'week' | 'month' | 'halfYear' | 'year'
type EventType = 'all' | 'fullday' | 'timed'

export function CalendarIntegration({
	groupId,
	isOwner = false,
}: CalendarIntegrationProps) {
	const [timeRange, setTimeRange] = useState<TimeRange>('week')
	const [eventType, setEventType] = useState<EventType>('all')
	const [previewSlots, setPreviewSlots] = useState<PreviewTimeSlot[]>([])
	const [showPreview, setShowPreview] = useState(false)

	const { execute: executePreview, status: previewStatus } = useAction(
		previewCalendarDataAction,
		{
			onSuccess: ({ data }) => {
				if (!data?.slots || data?.slots.length === 0) {
					toast({
						title: 'Keine Termine gefunden',
						description:
							'Es wurden keine Termine im ausgewählten Zeitraum gefunden.',
						variant: 'destructive',
					})
					return
				}

				setPreviewSlots(data?.slots)
				setShowPreview(true)
			},
			onError: ({ error: { serverError } }) => {
				console.log(serverError)

				if (serverError === 'No calendar providers connected') {
					toast({
						title: 'Keine Kalender verbunden',
						description:
							'Bitte verbinde zuerst mindestens einen Kalender-Provider in deinen Einstellungen.',
						variant: 'destructive',
					})
				} else {
					toast({
						title: 'Fehler bei der Vorschau',
						description:
							'Bitte stelle sicher, dass du die Berechtigung für den Kalenderzugriff erteilt hast.',
						variant: 'destructive',
					})
				}
			},
		},
	)

	const { execute: executeApply, status: applyStatus } = useAction(
		applyCalendarSlotsAction,
		{
			onSuccess: () => {
				toast({
					title: 'Kalender importiert',
					description:
						'Die ausgewählten Kalendertermine wurden erfolgreich importiert.',
				})
				setShowPreview(false)
				setPreviewSlots([])
			},
			onError: ({ error }) => {
				console.error('Failed to apply calendar slots:', error)
				toast({
					title: 'Fehler beim Import',
					description: 'Die Termine konnten nicht importiert werden.',
					variant: 'destructive',
				})
			},
		},
	)

	const handlePreview = () => {
		executePreview({
			timeRange,
			eventType,
		})
	}

	const handleToggleSlot = (slotId: string) => {
		setPreviewSlots((prev) =>
			prev.map((slot) =>
				slot.id === slotId ? { ...slot, selected: !slot.selected } : slot,
			),
		)
	}

	const handleApplySlots = () => {
		executeApply({
			groupId,
			slots: previewSlots.filter((slot) => slot.selected),
		})
	}

	return (
		<div className={cn('space-y-4', isOwner && 'px-4')}>
			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant='outline'
						className={cn('w-full gap-2', isOwner && 'max-w-xl')}
					>
						<CalendarPlus className='h-4 w-4' />
						Kalenderdaten importieren
					</Button>
				</DialogTrigger>
				<DialogContent
					className={cn(
						'space-y-4 bg-slate-900 text-white',
						isOwner && 'max-w-xl',
					)}
				>
					<DialogHeader>
						<DialogTitle>Kalenderdaten importieren</DialogTitle>
						<DialogDescription>
							Wähle den Zeitraum und die Art der Events, die du importieren
							möchtest
						</DialogDescription>
					</DialogHeader>

					<div className='space-y-4'>
						<div className='space-y-2'>
							<h4 className='text-sm font-medium'>Zeitraum</h4>
							<Select
								value={timeRange}
								onValueChange={(value: TimeRange) => setTimeRange(value)}
							>
								<SelectTrigger>
									<SelectValue placeholder='Wähle einen Zeitraum' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='week'>Eine Woche</SelectItem>
									<SelectItem value='month'>Ein Monat</SelectItem>
									<SelectItem value='halfYear'>Halbes Jahr</SelectItem>
									<SelectItem value='year'>Ein Jahr</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className='space-y-2'>
							<h4 className='text-sm font-medium'>Event Typ</h4>
							<Select
								value={eventType}
								onValueChange={(value: EventType) => setEventType(value)}
							>
								<SelectTrigger>
									<SelectValue placeholder='Wähle die Art der Events' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>Alle Events</SelectItem>
									<SelectItem value='fullday'>Nur ganztägige Events</SelectItem>
									<SelectItem value='timed'>Nur Events mit Uhrzeit</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Separator />

						{!showPreview ? (
							<Button
								variant='outline'
								onClick={handlePreview}
								disabled={previewStatus === 'executing'}
								className='w-full gap-2'
							>
								<CalendarPlus className='h-4 w-4' />
								{previewStatus === 'executing'
									? 'Lade Vorschau...'
									: 'Vorschau anzeigen'}
							</Button>
						) : (
							<div className='space-y-4'>
								<div className='max-h-[400px] space-y-2 overflow-y-auto rounded border border-white/10 p-4'>
									{previewSlots?.length === 0 ? (
										<p className='text-center text-sm text-white/70'>
											Keine Termine im ausgewählten Zeitraum gefunden.
										</p>
									) : (
										<>
											<div className='mb-4 flex items-center justify-between'>
												<p className='text-sm font-medium'>
													{previewSlots.length} Termine gefunden
												</p>
												<div>
													<Button
														variant='ghost'
														size='sm'
														onClick={() =>
															setPreviewSlots((prev) =>
																prev.map((slot) => ({
																	...slot,
																	selected: true,
																})),
															)
														}
														className='text-xs'
													>
														Alle auswählen
													</Button>

													<Button
														variant='ghost'
														size='sm'
														onClick={() =>
															setPreviewSlots((prev) =>
																prev.map((slot) => ({
																	...slot,
																	selected: false,
																})),
															)
														}
														className='text-xs'
													>
														Alle abwählen
													</Button>
												</div>
											</div>
											{previewSlots.map((slot) => (
												<div
													key={slot.id}
													className='flex items-center space-x-4 rounded bg-white/5 p-3'
												>
													<Checkbox
														id={slot.id}
														checked={slot.selected}
														onCheckedChange={() => handleToggleSlot(slot.id)}
													/>
													<div className='flex-1 space-y-1'>
														<p className='text-sm font-medium'>
															{slot.summary || 'Ohne Titel'}
														</p>
														<p className='text-xs text-white/70'>
															{format(new Date(slot.date), 'PPP', {
																locale: de,
															})}
															{!slot.isAllDay &&
																` • ${slot.startTime} - ${slot.endTime}`}
															{slot.isAllDay && ' • Ganztägig'}
														</p>
													</div>
												</div>
											))}
										</>
									)}
								</div>

								<div className='flex gap-2'>
									<Button
										variant='ghost'
										disabled={applyStatus === 'executing'}
										onClick={() => {
											setShowPreview(false)
											setPreviewSlots([])
										}}
										className='flex-1'
									>
										Zurück
									</Button>
									<Button
										variant='outline'
										onClick={handleApplySlots}
										disabled={
											applyStatus === 'executing' ||
											!previewSlots.some((slot) => slot.selected)
										}
										className='flex-1 gap-2'
									>
										<CalendarPlus className='h-4 w-4' />
										{applyStatus === 'executing'
											? 'Importiere...'
											: 'Zeiten hinzufügen'}
									</Button>
								</div>
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
