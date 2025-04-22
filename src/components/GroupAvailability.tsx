'use client'

import { cn } from '@/lib/utils/cn'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs'
import type { User } from '@prisma/client'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { CalendarIcon, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useCallback } from 'react'
import {
	revalidateGroupAction,
	revalidateTagAction,
} from '../app/group/[groupId]/actions'
import type {
	ProcessedTimeSlot,
	TimeSlotDuration,
} from '../app/group/[groupId]/availability/processAvailability'

interface GroupAvailabilityViewProps {
	users: User[]
	date: Date
	processedSlots: ProcessedTimeSlot[]
	groupId: string
}

export function GroupAvailabilityView({
	date: initialDate,
	users,
	processedSlots,
	groupId,
}: GroupAvailabilityViewProps) {
	const [date, setDate] = useQueryState('date', {
		shallow: true,
	})
	const [duration, setDuration] = useQueryState('duration', {
		parse: (value) => value as TimeSlotDuration,
		shallow: true,
	})

	const router = useRouter()

	const [minUsers, setMinUsers] = useQueryState('minUsers', {
		defaultValue: '0',
		parse: (value) => value,
		shallow: true,
	})

	const refresh = useCallback(() => {
		revalidateTagAction({ tagId: 'groupAvailability' })
		revalidateGroupAction({
			groupId,
			date: date,
			duration,
			minUsers: Number.parseInt(minUsers),
		})
	}, [groupId, date, duration, minUsers])

	const handleDateChange = useCallback(
		async (newDate: Date | undefined) => {
			if (!newDate) return
			setDate(newDate.toISOString())

			refresh()
		},
		[setDate, refresh],
	)

	const currentDate = date ? new Date(date) : initialDate

	return (
		<div className="container p-0 mx-auto space-y-8 pt-2 pb-24">
			<Card className="bg-white/5 backdrop-blur-sm border-white/10">
				<CardHeader>
					<CardTitle className="text-2xl">
						{currentDate.toLocaleDateString('de-DE', {
							weekday: 'long',
							month: 'long',
							day: 'numeric',
						})}
					</CardTitle>
					<div className="flex items-center mt-2">
						<Clock className="mr-2 h-5 w-5 text-white/70" />
						<CardDescription className="text-white/70">
							Gruppenverfügbarkeit (Gruppengröße: {users.length})
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<h3 className="text-lg font-semibold mb-2">Datum</h3>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											'w-full justify-start text-left font-normal hover:bg-slate-700',
											!date && 'text-muted-foreground',
										)}
									>
										<CalendarIcon className="mr-2" />
										{date ? (
											format(date, 'PPP', { locale: de })
										) : (
											<span>Datum auswählen</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										id="date-picker"
										mode="single"
										selected={currentDate}
										onSelect={handleDateChange}
										className="mx-auto"
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="">
							<h3 className="text-lg font-semibold mb-2">Nutzeranzahl</h3>
							<div className="flex items-center justify-center gap-x-2 px-2">
								<Button
									variant="outline"
									size="icon"
									className="h-8 w-8 shrink-0 rounded-full"
									onClick={async () => {
										const newValue = Math.max(
											1,
											Number.parseInt(minUsers || '8') - 1,
										)
										setMinUsers(newValue.toString())
										refresh()
									}}
								>
									-
								</Button>
								<input
									type="text"
									value={minUsers}
									onChange={async (e) => {
										const value = e.target.value.replace(/[^0-9]/g, '')
										if (value === '') {
											setMinUsers('1')
											return
										}
										const val = Math.min(
											10,
											Math.max(1, Number.parseInt(value)),
										)
										setMinUsers(val.toString())
										refresh()
									}}
									className="h-8 w-16 rounded-md border border-white/10 bg-white/5 px-2 text-center focus:outline-none focus:ring-2 focus:ring-white/20"
								/>
								<Button
									variant="outline"
									size="icon"
									className="h-8 w-8 shrink-0 rounded-full"
									onClick={async () => {
										const newValue = Math.min(
											10,
											Number.parseInt(minUsers || '8') + 1,
										)
										setMinUsers(newValue.toString())
										refresh()
									}}
								>
									+
								</Button>
							</div>
							<div className="mt-2 text-center text-sm text-white/50">
								Mindestens {Number.parseInt(minUsers || '0')} Nutzer
							</div>
						</div>
					</div>

					<div className="border-t border-white/10 pt-6">
						<Tabs
							value={duration ?? undefined}
							onValueChange={async (value) => {
								setDuration(value as TimeSlotDuration)
								refresh()
							}}
							className="w-full"
						>
							<TabsList className="inline-flex rounded-xl bg-white/5 p-1 self-center">
								<TabsTrigger
									value="60min"
									className="px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5"
								>
									1 Stunde
								</TabsTrigger>
								<TabsTrigger
									value="90min"
									className="px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5"
								>
									90 Minuten
								</TabsTrigger>
								<TabsTrigger
									value="120min"
									className="px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5"
								>
									2 Stunden
								</TabsTrigger>
							</TabsList>
						</Tabs>

						<div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-[160px] mt-6">
							{processedSlots.map((slot, index) => {
								const availableCount = slot.availableUsers.length
								const percentage = (availableCount / 10) * 100

								return (
									<div
										key={index}
										className="relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
									>
										<div className="p-4 relative z-10">
											<div className="text-sm font-medium flex justify-between items-center">
												<span>
													{slot.startTime} - {slot.endTime}
												</span>
												<Badge variant="secondary" className="bg-white/10">
													{availableCount}/10
												</Badge>
											</div>

											<div className="mt-2">
												<div className="text-xs font-medium text-white/70 mb-1">
													Teilnehmer
												</div>
												<div className="flex flex-wrap gap-2">
													{slot.availableUsers.map((user) => (
														<div
															key={user.id}
															className="flex items-center gap-2 rounded-full bg-white/5 px-2 py-1 text-xs"
														>
															<div className="h-2 w-2 rounded-full bg-white/70" />
															{user.name}
														</div>
													))}
												</div>
											</div>
										</div>

										<div
											className={cn(
												'absolute bottom-0 left-0 right-0 transition-all duration-200',
												availableCount < 5
													? 'bg-red-500/30'
													: availableCount < 8
														? 'bg-orange-500/30'
														: 'bg-emerald-500/30',
											)}
											style={{
												height: `${percentage}%`,
												opacity: percentage / 100,
											}}
										/>
									</div>
								)
							})}

							{processedSlots.length === 0 && (
								<div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center p-4">
									<p className="text-white/50 text-sm">
										Keine Zeitfenster verfügbar
									</p>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
