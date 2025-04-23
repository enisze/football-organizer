import { serverAuth } from '@/src/server/auth/session'
import { routes } from '@/src/shared/navigation'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
import { redirect } from 'next/navigation'
import { SuccessComp } from './_components/SuccessComp'

const Page = async ({
	searchParams,
}: {
	searchParams: Promise<{
		code?: string
	}>
}) => {
	const session = await serverAuth()
	const resolvedParams = await searchParams
	const { code } = resolvedParams

	if (!session?.user) {
		redirect(
			routes.signIn({
				search: {
					callbackUrl: routes.enterGroup({ search: { code } }),
				},
			}),
		)
	}

	return (
		<div className='w-full max-w-3xl space-y-6 px-4 pt-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold text-white'>Gruppe beitreten</h1>
			</div>

			<Card className='bg-white/5 backdrop-blur-sm border-white/10'>
				<CardHeader>
					<CardTitle className='text-lg text-white'>Einladungscode</CardTitle>
					<CardDescription className='text-white/70'>
						Gib den 6-stelligen Einladungscode ein, um der Gruppe beizutreten
					</CardDescription>
				</CardHeader>
				<CardContent>
					<SuccessComp code={code} />
				</CardContent>
			</Card>
		</div>
	)
}

export default Page
