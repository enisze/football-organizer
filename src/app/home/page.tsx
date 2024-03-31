import { Hero } from '@/src/components/Heading'
import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { Button } from '@/ui/button'
import Link from 'next/link'

const Home = async () => {
  const session = await getServerComponentAuthSession()

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
