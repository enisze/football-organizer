import { Button } from "@/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Hero } from "../components/Heading"
import { getServerComponentAuthSession } from "../server/auth/authOptions"
import { prisma } from "../server/db/client"

const Home = async () => {
	const session = await getServerComponentAuthSession()

	const group = await prisma.userOnGroups.findFirst({
		where: {
			user: {
				id: session?.user?.id,
			},
		},
	})

	if (group) {
		redirect(`/group/${group.groupId}`)
	}

	return (
		<div className="h-full">
			<title>Event Wizard</title>

			<main className="flex relative h-full w-full flex-col items-center justify-center">
				<Hero />
				{!session && (
					<Link href="/api/auth/signin">
						<Button className="shadow-md shadow-yellow-300/50">
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
