'use client'

import { cn } from '@/lib/utils/cn'
import { Badge } from '@/ui/badge'
import { Calendar } from '@/ui/calendar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
import { Slider } from '@/ui/slider'
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs'
import type { User } from '@prisma/client'
import { Clock } from 'lucide-react'
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

	const [minUsers, setMinUsers] = useQueryState('minUsers', {
		defaultValue: '0',
		parse: (value) => value,
		shallow: true,
	})

	const handleDateChange = useCallback(
		async (newDate: Date | undefined) => {
			if (!newDate) return
			setDate(newDate.toISOString())
			revalidateGroupAction({ groupId })
		},
		[setDate, groupId],
	)

	const currentDate = date ? new Date(date) : initialDate

	return (
		<div className="container mx-auto space-y-8">
			<h2 className="text-3xl font-bold mb-4 text-center">
				Verfügbare Termine
			</h2>
			<div className="grid gap-6 md:grid-cols-[300px_1fr]">
				<div className="space-y-4">
					<Card className="bg-white/5 backdrop-blur-sm border-white/10">
						<CardHeader>
							<CardTitle className="text-2xl">Datum</CardTitle>
							<CardDescription className="text-white/70">
								Wähle ein Datum aus
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Calendar
								id="date-picker"
								mode="single"
								selected={currentDate}
								onSelect={handleDateChange}
								className="mx-auto"
							/>
						</CardContent>
					</Card>

					<Card className="bg-white/5 backdrop-blur-sm border-white/10">
						<CardHeader>
							<CardTitle className="text-2xl">Filter</CardTitle>
							<CardDescription className="text-white/70">
								Mindestanzahl verfügbarer Nutzer
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="px-2 pt-4">
								<Slider
									defaultValue={[8]}
									max={10}
									step={1}
									value={[Number.parseInt(minUsers || '8')]}
									onValueChange={(value) => {
										setMinUsers(value[0]?.toString() ?? '8')
										revalidateGroupAction({ groupId })
									}}
									className="[&>[role=slider]]:bg-white [&>[role=slider]]:border-white/10"
								/>
							</div>
							<div className="mt-4 text-center text-sm text-white/50">
								Mindestens {Number.parseInt(minUsers || '0')} Nutzer
							</div>
						</CardContent>
					</Card>
				</div>

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
						<Tabs
							value={duration ?? undefined}
							onValueChange={(value) => {
								setDuration(value as TimeSlotDuration)
								revalidateGroupAction({
									groupId,
									duration: value as TimeSlotDuration,
									date: currentDate.toISOString(),
									minUsers: Number.parseInt(minUsers || '0'),
								})
								revalidateTagAction({ tagId: 'groupAvailability' })
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

						<div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-[160px]">
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
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
