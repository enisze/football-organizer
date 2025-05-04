import { Button } from '@/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LandingPage } from '../components/LandingPage'
import { serverAuth } from '../server/auth/session'
import { prisma } from '../server/db/client'
import { routes } from '../shared/navigation'

const Home = async () => {
	const session = await serverAuth()

	const group = await prisma.userOnGroups.findFirst({
		where: {
			user: {
				id: session?.user?.id,
			},
		},
	})

	if (group) {
		redirect(
			routes.groupEvents({
				groupId: group.groupId,
			}),
		)
	}

	return (
		<div className='h-full'>
			<title>Event Wizard</title>

			<main className='flex relative h-full w-full flex-col items-center justify-center'>
				<LandingPage />
				{!session && (
					<Link href={routes.signIn()}>
						<Button className='shadow-md shadow-yellow-300/50'>
							Login / Registrieren
						</Button>
					</Link>
				)}
				{/* <ContactForm /> */}
			</main>
		</div>
	)
}

export default Home
