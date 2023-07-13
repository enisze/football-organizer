import { getServerSession } from 'next-auth'
import { Hero } from '../components/Heading'
import { authOptions } from '../lib/auth'

const Home = async () => {
  const a = await getServerSession(authOptions)

  console.log(a)

  return (
    <div className="h-full">
      <title>Event Wizard</title>
      <main className="absolute flex h-full w-full flex-col items-center justify-center">
        <Hero />
        {/* <ContactForm /> */}
      </main>
    </div>
  )
}

export default Home
