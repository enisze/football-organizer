import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { ContactForm } from '../components/ContactForm'
import { Dashboard } from '../components/Dashboard/Dashboard'
import { Hero } from '../components/Heading'
import { LoadingWrapper } from '../components/LoadingWrapper'
import { Navbar } from '../components/Navigation/Navbar'

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession()
  const style = status === 'loading' ? 'grid place-items-center' : ''

  return (
    <div className={`${style} h-full`}>
      <title>Event Wizard</title>
      <LoadingWrapper isLoading={status === 'loading'}>
        <Navbar />
        {!sessionData ? (
          <main className="absolute flex h-full w-full flex-col items-center justify-center">
            <Hero />
            <ContactForm />
          </main>
        ) : (
          <div className="flex flex-col pb-2">
            <div className="p-8" />
            <Dashboard />
          </div>
        )}
      </LoadingWrapper>
    </div>
  )
}

export default Home
