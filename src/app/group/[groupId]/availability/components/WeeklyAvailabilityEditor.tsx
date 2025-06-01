'use client'

import { cn } from '@/lib/utils/cn'
import {
	deleteTimeSlotAction,
	deleteWeek2TimeSlotsAction,
	updateBiWeeklySlotsAction,
	updateTimeSlotAction,
} from '@/src/app/group/[groupId]/availability/actions'
import { DeleteWeek2SlotsDialog } from '@/src/app/group/[groupId]/availability/components/DeleteWeek2SlotsDialog'
import { TimeSlotCreator } from '@/src/app/group/[groupId]/availability/components/TimeSlotCreator'
import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import { Label } from '@/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import type { TimeSlot } from '@prisma/client'
import { useTour } from '@reactour/tour'
import { getISOWeek } from 'date-fns'
import { Plus } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'

interface WeeklyAvailabilityEditorProps {
	timeSlots: Record<number, TimeSlot[]>
	groupId: string
}

// Separate time slots by week number
const separateTimeSlotsByWeek = (timeSlots: Record<number, TimeSlot[]>) => {
	const singleWeek: Record<number, TimeSlot[]> = {}
	const week1: Record<number, TimeSlot[]> = {}
	const week2: Record<number, TimeSlot[]> = {}
	let hasBiWeeklySlots = false

	for (const [day, slots] of Object.entries(timeSlots)) {
		// Week 1 is the default (includes null and 1)
		week1[Number(day)] = slots.filter(
			(slot) => slot.weekNumber === null || slot.weekNumber === 1,
		)
		week2[Number(day)] = slots.filter((slot) => slot.weekNumber === 2)

		// Single week view shows week 1 slots (default weekly mode)
		singleWeek[Number(day)] = week1[Number(day)] || []

		// Has bi-weekly slots if any slot has biWeeklyStartWeek set (indicates bi-weekly mode)
		if (slots.some((slot) => slot.biWeeklyStartWeek !== null)) {
			hasBiWeeklySlots = true
		}
	}

	return { singleWeek, week1, week2, hasBiWeeklySlots }
}

const days = [
	{ id: '1', name: 'Mo', fullName: 'Montag' },
	{ id: '2', name: 'Di', fullName: 'Dienstag' },
	{ id: '3', name: 'Mi', fullName: 'Mittwoch' },
	{ id: '4', name: 'Do', fullName: 'Donnerstag' },
	{ id: '5', name: 'Fr', fullName: 'Freitag' },
	{ id: '6', name: 'Sa', fullName: 'Samstag' },
	{ id: '0', name: 'So', fullName: 'Sonntag' },
]

const timeLabels = ['08', '10', '12', '14', '16', '18', '20', '22', '24']

export function WeeklyAvailabilityEditor({
	timeSlots,
	groupId,
}: WeeklyAvailabilityEditorProps) {
	const { execute: updateTimeSlot } = useAction(updateTimeSlotAction)
	const { execute: deleteTimeSlot } = useAction(deleteTimeSlotAction)
	const { execute: deleteWeek2TimeSlots } = useAction(
		deleteWeek2TimeSlotsAction,
	)
	const { execute: updateBiWeeklySlots } = useAction(updateBiWeeklySlotsAction)
	const [isCreatingSlot, setIsCreatingSlot] = useState(false)
	const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null)
	const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined)
	const [selectedWeek, setSelectedWeek] = useState<1 | 2>(1)
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)

	const { setCurrentStep } = useTour()

	// Separate time slots by week
	const { singleWeek, week1, week2, hasBiWeeklySlots } =
		separateTimeSlotsByWeek(timeSlots)

	// Check if there are any global slots in week 2 (slots applied to multiple groups)
	const hasGlobalWeek2Slots = Object.values(week2).some((daySlots) =>
		daySlots.some((slot) => {
			// This is a simplified check - in a real implementation, you might want to
			// query the database to check if the slot is connected to multiple groups
			// For now, we'll assume all slots could potentially be global
			return true
		}),
	)

	// State to control bi-weekly mode - true if user has existing bi-weekly slots or enables it
	const [isBiWeeklyMode, setIsBiWeeklyMode] = useState(hasBiWeeklySlots)

	// Global toggle for updating all corresponding slots
	const [updateGlobally, setUpdateGlobally] = useState(true)

	// Current week info
	const currentISOWeek = getISOWeek(new Date())

	// Helper function to determine initial currentWeekIs value based on existing time slots
	const getInitialCurrentWeekIs = (): 1 | 2 => {
		if (!hasBiWeeklySlots) return 1

		// Find any slot with biWeeklyStartWeek set
		for (const daySlots of Object.values(timeSlots)) {
			for (const slot of daySlots) {
				if (slot.biWeeklyStartWeek !== null) {
					// biWeeklyStartWeek is now 0 (even) or 1 (odd)
					// Check if current week matches the pattern
					const currentWeekParity = currentISOWeek % 2 // 0 for even, 1 for odd

					if (currentWeekParity === slot.biWeeklyStartWeek) {
						return 1 // Current week is week 1 in the pattern
					}
					return 2 // Current week is week 2 in the pattern
				}
			}
		}

		return 1 // Default fallback
	}

	// State for week start selection - determines if current week is week 1 or week 2
	const [currentWeekIs, setCurrentWeekIs] = useState<1 | 2>(
		getInitialCurrentWeekIs(),
	)

	// Helper function to calculate week parities based on current week selection
	const calculateWeekParities = (currentWeekIs: 1 | 2) => {
		const currentWeekParity = currentISOWeek % 2 // 0 for even, 1 for odd
		const nextWeekParity = (currentWeekParity + 1) % 2

		return {
			currentWeekParity,
			nextWeekParity,
		}
	}

	const getCurrentWeekNumber = (): 1 | 2 => {
		if (!isBiWeeklyMode) return 1
		// Use the user's selection for current week mapping
		return currentWeekIs
	}

	// Calculate the bi-weekly start week based on user's selection
	const getBiWeeklyStartWeek = (weekNumber?: 1 | 2): number => {
		if (!isBiWeeklyMode) return 0

		const { currentWeekParity, nextWeekParity } =
			calculateWeekParities(currentWeekIs)
		return weekNumber === currentWeekIs ? currentWeekParity : nextWeekParity
	}

	const timeToPosition = (time: string): number => {
		const [hoursStr, minutesStr] = time.split(':') || ['0', '0']
		const hours = Number.parseInt(hoursStr || '0', 10)
		const minutes = Number.parseInt(minutesStr || '0', 10)
		const totalMinutes = hours * 60 + minutes
		const minutesSince8 = totalMinutes - 8 * 60
		const totalRangeMinutes = 16 * 60
		return (minutesSince8 / totalRangeMinutes) * 100
	}

	const calculateSlotStyle = (start: string, end: string) => {
		const startPos = timeToPosition(start)
		const endPos = timeToPosition(end)
		const width = endPos - startPos
		return {
			left: `${startPos}%`,
			width: `${width}%`,
		}
	}

	const handleSlotSave = async (slot: {
		id?: string
		start: string
		end: string
		days: string[]
		isGlobalSlot: boolean
		weekNumber?: 1 | 2
	}) => {
		// Determine the week number based on current week display
		const effectiveWeekNumber =
			slot.weekNumber ?? (isBiWeeklyMode ? selectedWeek : 1)

		// Calculate bi-weekly start week based on user's selection
		let biWeeklyStartWeek: number | undefined = undefined

		if (isBiWeeklyMode) {
			// Use the calculated bi-weekly start week based on user's selection
			biWeeklyStartWeek = getBiWeeklyStartWeek(slot.weekNumber)
		}

		for (const dayId of slot.days) {
			updateTimeSlot({
				id: slot.id ?? '',
				startTime: slot.start,
				endTime: slot.end,
				type: 'DAY_SPECIFIC',
				day: Number.parseInt(dayId, 10),
				weekNumber: effectiveWeekNumber,
				biWeeklyStartWeek,
				groupId,
				isException: false,
				isGlobalSlot: updateGlobally,
			})
		}
		setIsCreatingSlot(false)
		setEditingSlot(null)
	}

	const handleDeleteWeek2Slots = async (deleteGlobally: boolean) => {
		deleteWeek2TimeSlots({
			groupId,
			deleteGlobally,
		})
		// Also reset week 1 slots back to weekly mode
		updateBiWeeklySlots({
			groupId,
			biWeeklyStartWeek: null,
			updateGlobally: deleteGlobally,
		})
		setIsBiWeeklyMode(false)
	}

	const renderWeekView = (weekSlots: Record<number, TimeSlot[]>) => (
		<div className='bg-white/5 backdrop-blur-sm border-white/20 rounded-lg overflow-hidden'>
			<div className='relative'>
				{/* Header with time labels - responsive */}
				<div className='flex border-b border-white/20 px-2 sm:px-4 py-2'>
					<div className='w-8 sm:w-10 flex-shrink-0' />
					<div className='flex-1 flex'>
						{timeLabels.map((time) => (
							<div
								key={time}
								className='flex-1 text-[10px] sm:text-xs text-white/80 text-center'
							>
								{time}
							</div>
						))}
					</div>
				</div>

				{days.map((day) => {
					const daySlots = weekSlots[Number.parseInt(day.id, 10)] || []
					return (
						<div
							key={day.id}
							className={cn(
								'flex border-b border-white/20 px-2 sm:px-4 py-1 relative group cursor-pointer hover:bg-white/5 transition-colors min-h-[32px] sm:min-h-[36px]',
								day.id === '0' && 'border-none',
							)}
							onClick={() => {
								setSelectedDay(Number.parseInt(day.id, 10))
								setIsCreatingSlot(true)
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									setSelectedDay(Number.parseInt(day.id, 10))
									setIsCreatingSlot(true)
								}
							}}
						>
							{/* Day label - responsive */}
							<div className='w-8 sm:w-10 flex-shrink-0 font-medium flex items-center'>
								<span className='text-slate-300 text-xs sm:text-sm'>
									{day.name}
								</span>
							</div>

							{/* Time slots container - responsive height */}
							<div className='flex-1 relative h-6 sm:h-8'>
								<div className='absolute inset-0 flex pointer-events-none'>
									{timeLabels.map((time, index) => (
										<div
											key={time}
											className={cn(
												'flex-1 h-full',
												index > 0 && 'border-l border-white/20',
											)}
										/>
									))}
								</div>

								{daySlots.map((slot) => {
									const style = calculateSlotStyle(slot.startTime, slot.endTime)
									return (
										<div
											key={slot.id}
											className={cn(
												'absolute cursor-pointer top-0.5 sm:top-1 h-5 sm:h-6 gap-2 bg-green-300 rounded-md touch-manipulation',
											)}
											style={style}
											onClick={(e) => {
												e.stopPropagation()
												setEditingSlot(slot)
												setIsCreatingSlot(true)
											}}
											onKeyDown={(e) => {
												if (e.key === 'Enter') {
													setEditingSlot(slot)
													setIsCreatingSlot(true)
												}
											}}
										/>
									)
								})}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)

	return (
		<div
			data-tour='timelsots'
			className='px-2 sm:px-4 flex flex-col gap-3 sm:gap-4'
		>
			{/* Bi-weekly mode toggle */}
			<div className='flex items-center space-x-2 touch-manipulation'>
				<Checkbox
					id='biweekly-mode'
					checked={isBiWeeklyMode}
					onCheckedChange={async (checked) => {
						const newBiWeeklyMode = checked === true

						// If switching from bi-weekly to weekly mode and there are week 2 slots
						if (!newBiWeeklyMode && isBiWeeklyMode && hasBiWeeklySlots) {
							// Show confirmation dialog for deleting week 2 slots
							setShowDeleteDialog(true)
						} else if (!newBiWeeklyMode && isBiWeeklyMode) {
							// Switching from bi-weekly to weekly mode - reset week 1 slots
							updateBiWeeklySlots({
								groupId,
								biWeeklyStartWeek: null,
								updateGlobally,
							})
							setIsBiWeeklyMode(newBiWeeklyMode)
							setCurrentWeekIs(1) // Reset to default
						} else if (newBiWeeklyMode && !isBiWeeklyMode) {
							// Switching from weekly to bi-weekly mode - update week 1 slots
							updateBiWeeklySlots({
								groupId,
								biWeeklyStartWeek: getBiWeeklyStartWeek(),
								updateGlobally,
							})
							setIsBiWeeklyMode(newBiWeeklyMode)
							// Reset to week 1 when enabling bi-weekly mode
							setSelectedWeek(1)
						}
					}}
				/>
				<Label
					htmlFor='biweekly-mode'
					className='text-xs sm:text-sm text-slate-300'
				>
					Zweiwöchige Rotation verwenden
				</Label>
			</div>

			{/* Week start selection for bi-weekly mode */}
			{isBiWeeklyMode && (
				<div className='space-y-2'>
					<div className='flex items-center space-x-2 touch-manipulation'>
						<Label
							htmlFor='current-week-selection'
							className='text-xs sm:text-sm text-slate-300'
						>
							Diese Woche (KW {currentISOWeek}) ist:
						</Label>
						<Select
							value={currentWeekIs.toString()}
							onValueChange={async (value) => {
								const newCurrentWeekIs = Number(value) as 1 | 2
								setCurrentWeekIs(newCurrentWeekIs)

								// Update existing bi-weekly slots with new biWeeklyStartWeek
								if (hasBiWeeklySlots) {
									const { currentWeekParity, nextWeekParity } =
										calculateWeekParities(newCurrentWeekIs)

									// Update both Week 1 and Week 2 slots with the new biWeeklyStartWeek
									await Promise.all([
										updateBiWeeklySlots({
											groupId,
											biWeeklyStartWeek:
												newCurrentWeekIs === 1
													? currentWeekParity
													: nextWeekParity,
											weekNumber: 1,
											updateGlobally,
										}),
										updateBiWeeklySlots({
											groupId,
											biWeeklyStartWeek:
												newCurrentWeekIs === 2
													? currentWeekParity
													: nextWeekParity,
											weekNumber: 2,
											updateGlobally,
										}),
									])
								}
							}}
						>
							<SelectTrigger className='w-32 bg-white/10 border-white/20'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='1'>Woche 1</SelectItem>
								<SelectItem value='2'>Woche 2</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			)}

			{/* Global update toggle for bi-weekly mode */}
			{isBiWeeklyMode && (
				<div className='flex items-center space-x-2 touch-manipulation'>
					<Checkbox
						id='update-globally'
						checked={updateGlobally}
						onCheckedChange={(checked) => setUpdateGlobally(checked === true)}
					/>
					<Label
						htmlFor='update-globally'
						className='text-xs sm:text-sm text-slate-300'
					>
						Änderungen global anwenden (alle Gruppen)
					</Label>
				</div>
			)}

			{/* Tabs for bi-weekly mode or single view for weekly mode */}
			{isBiWeeklyMode ? (
				<Tabs
					value={selectedWeek.toString()}
					onValueChange={(value) => setSelectedWeek(Number(value) as 1 | 2)}
					className='w-full'
				>
					<TabsList className='grid w-full grid-cols-2 bg-white/10 border-white/20 h-9 sm:h-10'>
						<TabsTrigger
							value='1'
							className={`data-[state=active]:bg-white/20 data-[state=active]:text-white text-sm touch-manipulation ${
								getCurrentWeekNumber() === 1 ? 'ring-2 ring-green-400/50' : ''
							}`}
						>
							Woche 1 {getCurrentWeekNumber() === 1 ? '(Aktuell)' : ''}
						</TabsTrigger>
						<TabsTrigger
							value='2'
							className={`data-[state=active]:bg-white/20 data-[state=active]:text-white text-sm touch-manipulation ${
								getCurrentWeekNumber() === 2 ? 'ring-2 ring-green-400/50' : ''
							}`}
						>
							Woche 2 {getCurrentWeekNumber() === 2 ? '(Aktuell)' : ''}
						</TabsTrigger>
					</TabsList>

					<TabsContent value='1' className='mt-4'>
						{renderWeekView(week1)}
					</TabsContent>

					<TabsContent value='2' className='mt-4'>
						{renderWeekView(week2)}
					</TabsContent>
				</Tabs>
			) : (
				<div className='mt-4'>{renderWeekView(singleWeek)}</div>
			)}

			{isCreatingSlot && (
				<TimeSlotCreator
					days={days}
					selectedDay={selectedDay}
					selectedWeek={isBiWeeklyMode ? selectedWeek : undefined}
					isBiWeeklyMode={isBiWeeklyMode}
					initialData={
						editingSlot
							? {
									id: editingSlot.id,
									start: editingSlot.startTime,
									end: editingSlot.endTime,
									days: [editingSlot.day?.toString() ?? ''],
									isGlobalSlot: updateGlobally,
									weekNumber: editingSlot.weekNumber as 1 | 2 | undefined,
								}
							: undefined
					}
					onSaveAction={handleSlotSave}
					onCancelAction={() => {
						setIsCreatingSlot(false)
						setEditingSlot(null)
					}}
					onDeleteAction={() => {
						setIsCreatingSlot(false)
						setEditingSlot(null)
						deleteTimeSlot({ id: editingSlot?.id ?? '' })
					}}
				/>
			)}

			<div className='flex flex-col sm:flex-row gap-2'>
				<Button
					variant='purple'
					onClick={() => {
						setIsCreatingSlot(true)
						setCurrentStep((prev) => prev + 1)
					}}
					data-tour='create-time-slot'
					className='touch-manipulation'
				>
					<Plus className='w-4 h-4 mr-2' />
					Neues Zeitfenster erstellen
				</Button>
			</div>

			<DeleteWeek2SlotsDialog
				open={showDeleteDialog}
				onOpenChangeAction={setShowDeleteDialog}
				onConfirmAction={handleDeleteWeek2Slots}
				hasGlobalSlots={hasGlobalWeek2Slots}
			/>
		</div>
	)
}
