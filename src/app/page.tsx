import { Button } from '@/ui/button'
import Link from 'next/link'
import { Hero } from '../components/Heading'
import { getServerComponentAuthSession } from '../server/auth/authOptions'

const Home = async () => {
  const session = await getServerComponentAuthSession()

  return (
    <div className="h-full">
      <title>Event Wizard</title>

      <main className="absolute flex h-full w-full flex-col items-center justify-center">
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
