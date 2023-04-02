import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { Hero } from '../components/Heading'
import { LoadingWrapper } from '../components/LoadingWrapper'
import { Navbar } from '../components/Navigation/Navbar'

const Home: NextPage = () => {
  const { status } = useSession()
  const style = status === 'loading' ? 'grid place-items-center' : ''

  return (
    <div className={`${style} h-full`}>
      <title>Event Wizard</title>
      <LoadingWrapper isLoading={status === 'loading'}>
        <Navbar />
        <main className="absolute flex h-full w-full flex-col items-center justify-center">
          <Hero />
          {/* <ContactForm /> */}
        </main>
      </LoadingWrapper>
    </div>
  )
}

export default Home
