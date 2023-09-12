'use client'
import { Hero } from '../components/Heading'
import { Navbar } from '../components/Navigation/Navbar'

const Home = async () => {
  return (
    <div className="h-full">
      <title>Event Wizard</title>
      <main className="absolute flex h-full w-full flex-col items-center justify-center">
        <Navbar />
        <Hero />
        {/* <ContactForm /> */}
      </main>
    </div>
  )
}

export default Home
