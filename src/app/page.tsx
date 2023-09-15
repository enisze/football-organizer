import { Button } from '@/ui/button'
import { Link } from 'lucide-react'
import { Hero } from '../components/Heading'

const Home = () => {
  return (
    <div className="h-full">
      <title>Event Wizard</title>

      <main className="absolute flex h-full w-full flex-col items-center justify-center">
        <Hero />
        <Link href="/api/auth/signin">
          <Button className="shadow-md shadow-yellow-300/50 ">
            Login / Registrieren
          </Button>
        </Link>
        {/* <ContactForm /> */}
      </main>
    </div>
  )
}

export default Home
