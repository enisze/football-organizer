import { cn } from '@/lib/utils/cn'
import { Button } from '@/ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/ui/drawer'
import { ScrollArea } from '@/ui/scroll-area'
import type { User } from '@prisma/client'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Clock, Users } from 'lucide-react'
import { UserAvatar } from './UserAvatar'

interface DrawerSlotDetailsProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	startTime: string
	endTime: string
	date: Date
	availableUsers: User[]
	maxUsers: number
	onCreateEvent: () => void
}

export function DrawerSlotDetails({
	open,
	onOpenChange,
	startTime,
	endTime,
	date,
	availableUsers,
	maxUsers,
	onCreateEvent,
}: DrawerSlotDetailsProps) {
	const percentage = (availableUsers.length / maxUsers) * 100

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent>
				<div className='container px-4'>
					<DrawerHeader className='px-0'>
						<DrawerTitle className='flex items-center space-x-2'>
							<Clock className='h-5 w-5' />
							<span>Verfügbarkeit</span>
						</DrawerTitle>
						<div className='space-y-2'>
							<div className='flex items-center justify-between text-sm'>
								<span>
									{format(date, 'EEEE, dd. MMMM yyyy', { locale: de })}
								</span>
								<span className='font-medium'>
									{startTime} - {endTime}
								</span>
							</div>
						</div>
					</DrawerHeader>
					<div className='space-y-6 pb-8'>
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<h3 className='font-semibold flex items-center gap-2'>
									<Users className='h-4 w-4' />
									<span>Verfügbare Nutzer</span>
								</h3>
								<span className='text-sm font-medium'>
									{availableUsers.length}/{maxUsers}
								</span>
							</div>
							<div className='relative pt-1'>
								<div className='overflow-hidden h-2 text-xs flex rounded bg-white/10'>
									<div
										style={{ width: `${percentage}%` }}
										className={cn(
											'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all',
											percentage < 50
												? 'bg-red-500'
												: percentage < 75
													? 'bg-orange-500'
													: 'bg-emerald-500',
										)}
									/>
								</div>
							</div>
							<ScrollArea className='h-[180px] pr-4'>
								<div className='space-y-1'>
									{availableUsers.map((user) => (
										<div
											key={user.id}
											className='flex items-center gap-2 text-sm text-slate-300 py-2 px-3 rounded-md hover:bg-white/5'
										>
											<UserAvatar name={user.name} className='h-6 w-6' />
											<span>{user.name}</span>
										</div>
									))}
								</div>
							</ScrollArea>
						</div>
						<div className='flex gap-2 justify-end'>
							<Button
								variant='outline'
								onClick={() => {
									onOpenChange(false)
								}}
							>
								Schließen
							</Button>
							<Button variant='purple' onClick={onCreateEvent}>
								Event erstellen
							</Button>
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
