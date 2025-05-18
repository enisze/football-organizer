import type { ProviderType } from '@/src/server/auth/providers/types'
import { PROVIDERS } from '@/src/server/auth/providers/types'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
import { Separator } from '@/ui/separator'
import type { TokenType } from '@prisma/client'
import { Calendar, CheckCircle, Mail } from 'lucide-react'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { getProvider } from '../server/auth/providers'
import { prisma } from '../server/db/client'
import { CalendarIntegration } from './CalendarIntegration'
import { ConnectButton } from './ConnectButton'

interface ApiOverviewProps {
	groupId: string
	token?: string | null
	tokenExpiry?: string | null
	isOwner: boolean
	userId: string
}

export async function ApiOverview({
	groupId,
	token,
	tokenExpiry,
	isOwner,
	userId,
}: ApiOverviewProps) {
	'use cache'

	cacheTag('api-overview')

	const tokens = await prisma.tokens.findMany({
		where: { ownerId: userId },
		select: {
			type: true,
			provider: true,
			refresh_token: true,
		},
	})

	const isConnected = async (
		type: TokenType,
		provider: ProviderType,
	): Promise<boolean> => {
		const token = tokens.find((t) => t.type === type && t.provider === provider)
		if (!token?.refresh_token) return false

		try {
			const authProvider = getProvider(provider)
			await authProvider.refreshToken(token.refresh_token, type)
			return true
		} catch (error) {
			console.error(`Failed to refresh ${provider} ${type} token:`, error)
			return false
		}
	}

	// Pre-compute all connection statuses to avoid waterfall of requests
	const connectionStatuses = await Promise.all(
		tokens.map(async (token) => ({
			type: token.type,
			provider: token.provider,
			isConnected: await isConnected(
				token.type as TokenType,
				token.provider as ProviderType,
			),
		})),
	)

	const checkStatus = (type: TokenType, provider: ProviderType): boolean => {
		return connectionStatuses.some(
			(status) =>
				status.type === type &&
				status.provider === provider &&
				status.isConnected,
		)
	}

	return (
		<Card className='border-white/10 bg-white/5 backdrop-blur-sm'>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div className='space-y-1'>
						<CardTitle className='text-lg text-white'>
							API Integrationen
						</CardTitle>
						<CardDescription className='text-white/70'>
							Verbinde deine Konten für erweiterte Funktionen
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					{/* Email Integration Section */}
					{isOwner && (
						<div className='rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden'>
							<div className='flex items-center justify-between p-4'>
								<div className='flex items-center gap-3'>
									<div className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-800'>
										<Mail className='h-5 w-5 text-blue-400' />
									</div>
									<div>
										<h3 className='font-medium text-white'>
											E-Mail Integration
										</h3>
										<p className='text-sm text-slate-400'>
											Verbinde deine E-Mail-Konten
										</p>
									</div>
								</div>
							</div>
							<Separator className='bg-slate-800' />
							<div className='p-4 space-y-3'>
								{PROVIDERS.map((provider) => {
									const connected = checkStatus('email', provider)
									return (
										<div
											key={`email-${provider}`}
											className='flex relative items-center gap-2'
										>
											<ConnectButton type='email' provider={provider} />
											{connected && (
												<div className='absolute -top-1 -right-1'>
													<CheckCircle className='h-4 w-4 text-green-400' />
												</div>
											)}
										</div>
									)
								})}
							</div>
						</div>
					)}

					{/* Calendar Integration Section */}
					<div className='rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden'>
						<div className='flex items-center justify-between p-4'>
							<div className='flex items-center gap-3'>
								<div className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-800'>
									<Calendar className='h-5 w-5 text-green-400' />
								</div>
								<div>
									<h3 className='font-medium text-white'>
										Kalender Integration
									</h3>
									<p className='text-sm text-slate-400'>
										Verbinde deine Kalender-Konten
									</p>
								</div>
							</div>
						</div>
						<Separator className='bg-slate-800' />
						<div className='p-4 space-y-3'>
							{PROVIDERS.map((provider) => {
								const connected = checkStatus('calendar', provider)
								return (
									<div
										key={`calendar-${provider}`}
										className='flex relative items-center gap-2'
									>
										<ConnectButton type='calendar' provider={provider} />
										{connected && (
											<div className='absolute -top-1 -right-1'>
												<CheckCircle className='h-4 w-4 text-green-400' />
											</div>
										)}
									</div>
								)
							})}

							<CalendarIntegration groupId={groupId} />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
