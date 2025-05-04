import { authClient } from '@/src/lib/auth-client'
import { serverAuth } from '@/src/server/auth/session'
import { routes } from '@/src/shared/navigation'
import { Card } from '@/ui/card'
import { Container } from '@/ui/container'
import { redirect } from 'next/navigation'
import CredentialsForm from './CredentialsForm'
import { ProviderButton } from './ProviderButton'

export default async function SignInPage({
	searchParams,
}: {
	searchParams: Promise<{ callbackUrl?: string }>
}) {
	const resolvedParams = await searchParams
	const session = await serverAuth()

	if (session) {
		redirect(routes.home())
	}

	const { callbackUrl } = resolvedParams
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
						<ProviderButton
							provider='google'
							action={async () => {
								'use server'
								const res = await authClient.signIn.social({
									provider: 'google',
									callbackURL: callbackUrl,
								})

								if (res.data?.url) {
									redirect(res.data?.url)
								}
							}}
						/>

						<ProviderButton
							provider='discord'
							action={async () => {
								'use server'
								const res = await authClient.signIn.social({
									provider: 'discord',
									callbackURL: callbackUrl,
								})

								if (res.data?.url) {
									redirect(res.data?.url)
								}
							}}
						/>
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
