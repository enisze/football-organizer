'use client'
import { Hero } from '../components/Heading'

const Home = async () => {
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
