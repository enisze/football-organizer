import { Hero } from '@/src/components/Heading'
import { serverAuth } from '@/src/server/auth/session'
import { routes } from '@/src/shared/navigation'
import { Button } from '@/ui/button'
import Link from 'next/link'

const Home = async () => {
	const session = await serverAuth()

	return (
		<div className="h-full">
			<title>Event Wizard</title>

			<main className="flex relative h-full w-full flex-col items-center justify-center">
				<Hero />
				{!session && (
					<Link href={routes.signIn()}>
						<Button className="shadow-md shadow-yellow-300/50">
							Login / Registrieren
						</Button>
					</Link>
				)}
			</main>
		</div>
	)
}

export default Home
