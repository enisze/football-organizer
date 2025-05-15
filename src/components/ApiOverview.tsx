import { Badge } from '@/ui/badge'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
import { Separator } from '@/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Calendar, Mail } from 'lucide-react'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { CalendarIntegration } from './CalendarIntegration'
import { ConnectButton } from './ConnectButton'

interface ApiOverviewProps {
	groupId: string
	token?: string | null
	tokenExpiry?: string | null
}

export async function ApiOverview({
	groupId,
	token,
	tokenExpiry,
}: ApiOverviewProps) {
	'use cache'

	cacheTag('api-overview')

	const isCalendarValid =
		token && tokenExpiry && new Date(tokenExpiry) > new Date()

	return (
		<Card className='border-white/10 bg-white/5 backdrop-blur-sm'>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div className='space-y-1'>
						<CardTitle className='text-lg text-white'>
							API Integrations
						</CardTitle>
						<CardDescription className='text-white/70'>
							Connect your accounts to enable powerful integrations
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue='all' className='w-full'>
					<TabsList className='grid grid-cols-3 mb-6'>
						<TabsTrigger value='all'>All Integrations</TabsTrigger>
						<TabsTrigger value='mail'>Mail</TabsTrigger>
						<TabsTrigger value='calendar'>Calendar</TabsTrigger>
					</TabsList>

					<TabsContent value='all'>
						<div className='space-y-4'>
							{/* Google Mail Integration */}
							<div className='rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden'>
								<div className='flex items-center justify-between p-4'>
									<div className='flex items-center gap-3'>
										<div className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-800'>
											<Mail className='h-5 w-5 text-blue-400' />
										</div>
										<div>
											<h3 className='font-medium text-white'>Google Mail</h3>
											<p className='text-sm text-slate-400'>
												Connect to your Gmail account
											</p>
										</div>
									</div>
								</div>
								<Separator className='bg-slate-800' />
								<div className='p-4'>
									<ConnectButton
										type='email'
										className='bg-slate-800 hover:bg-slate-700 text-white'
									/>
								</div>
							</div>

							{/* Google Calendar Integration */}
							<div className='rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden'>
								<div className='flex items-center justify-between p-4'>
									<div className='flex items-center gap-3'>
										<div className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-800'>
											<Calendar className='h-5 w-5 text-green-400' />
										</div>
										<div>
											<h3 className='font-medium text-white'>
												Google Calendar
											</h3>
											<p className='text-sm text-slate-400'>
												Sync your calendar events
											</p>
										</div>
									</div>
								</div>
								<Separator className='bg-slate-800' />
								<div className='p-4 space-y-3'>
									<CalendarIntegration
										groupId={groupId}
										token={token}
										tokenExpiry={tokenExpiry}
									/>
									<ConnectButton
										type='calendar'
										className='bg-slate-800 hover:bg-slate-700 text-white'
									/>
								</div>
							</div>
						</div>
					</TabsContent>

					<TabsContent value='mail'>
						<div className='rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden'>
							<div className='flex items-center justify-between p-4'>
								<div className='flex items-center gap-3'>
									<div className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-800'>
										<Mail className='h-5 w-5 text-blue-400' />
									</div>
									<div>
										<h3 className='font-medium text-white'>Google Mail</h3>
										<p className='text-sm text-slate-400'>
											Connect to your Gmail account
										</p>
									</div>
								</div>
								<Badge
									variant='outline'
									className='bg-red-900/20 text-red-400 border-red-800'
								>
									Disconnected
								</Badge>
							</div>
							<Separator className='bg-slate-800' />
							<div className='p-4'>
								<ConnectButton
									type='email'
									className='bg-slate-800 hover:bg-slate-700 text-white'
								/>
							</div>
						</div>
					</TabsContent>

					<TabsContent value='calendar'>
						<div className='rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden'>
							<div className='flex items-center justify-between p-4'>
								<div className='flex items-center gap-3'>
									<div className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-800'>
										<Calendar className='h-5 w-5 text-green-400' />
									</div>
									<div>
										<h3 className='font-medium text-white'>Google Calendar</h3>
										<p className='text-sm text-slate-400'>
											Sync your calendar events
										</p>
									</div>
								</div>
								<Badge
									variant='outline'
									className={
										isCalendarValid
											? 'bg-green-900/20 text-green-400 border-green-800'
											: 'bg-red-900/20 text-red-400 border-red-800'
									}
								>
									{isCalendarValid ? 'Connected' : 'Disconnected'}
								</Badge>
							</div>
							<Separator className='bg-slate-800' />
							<div className='p-4 space-y-3'>
								{isCalendarValid ? (
									<CalendarIntegration
										groupId={groupId}
										token={token}
										tokenExpiry={tokenExpiry}
									/>
								) : (
									<ConnectButton
										type='calendar'
										className='bg-slate-800 hover:bg-slate-700 text-white'
									/>
								)}
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	)
}
