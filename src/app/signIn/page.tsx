import { authClient } from '@/src/lib/auth-client'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { Container } from '@/ui/container'
import { Chrome, MessageSquare } from 'lucide-react'
import { redirect } from 'next/navigation'
import CredentialsForm from './CredentialsForm'

export default function SignInPage() {
	const isDev = process.env.NODE_ENV === 'development'

	return (
		<Container className='min-h-screen flex items-center justify-center'>
			<Card className='w-full max-w-md p-6 space-y-6'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold'>Welcome</h1>
					<p className='text-muted-foreground mt-2'>Sign in to your account</p>
				</div>

				<div className='flex flex-col gap-y-4'>
					<form className='flex flex-col gap-y-2'>
						<Button
							variant='outline'
							className='w-full flex items-center justify-center gap-2'
							formAction={async () => {
								'use server'
								const res = await authClient.signIn.social({
									provider: 'google',
								})

								if (res.data?.url) {
									redirect(res.data?.url)
								}
							}}
						>
							<Chrome className='w-5 h-5' />
							Continue with Google
						</Button>

						<Button
							variant='outline'
							className='w-full flex items-center justify-center gap-2'
							formAction={async () => {
								'use server'
								const res = await authClient.signIn.social({
									provider: 'discord',
								})

								if (res.data?.url) {
									redirect(res.data?.url)
								}
							}}
						>
							<MessageSquare className='w-5 h-5' />
							Continue with Discord
						</Button>
					</form>

					{isDev && (
						<>
							<div className='relative'>
								<div className='absolute inset-0 flex items-center'>
									<span className='w-full border-t' />
								</div>
								<div className='relative flex justify-center text-xs uppercase'>
									<span className='bg-background px-2 text-muted-foreground'>
										Or continue with email
									</span>
								</div>
							</div>
							<CredentialsForm />
						</>
					)}
				</div>
			</Card>
		</Container>
	)
}
