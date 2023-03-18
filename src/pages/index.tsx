import { Button } from '@/ui/base/Button'
import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Dashboard } from '../components/Dashboard/Dashboard'
import { Hero } from '../components/Heading'
import { LoadingWrapper } from '../components/LoadingWrapper'
import { Navbar } from '../components/Navigation/Navbar'

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession()
  const style = status === 'loading' ? 'grid place-items-center' : ''

  const [show, showLogin] = useState(false)

  return (
    <div className={`${style} h-full`}>
      <title>Event Wizard</title>
      <LoadingWrapper isLoading={status === 'loading'}>
        <Navbar />
        {!sessionData ? (
          <main className="absolute flex h-full w-full flex-col items-center justify-center">
            <Hero />
            <Button
              variant="outline"
              className="bg-gradient-to-br from-blue-300 to-blue-600 shadow-lg shadow-blue-500"
              onClick={() => showLogin(!show)}
            >
              Anfrage stellen
            </Button>
            <div
              className={`flex flex-col items-center gap-y-2 opacity-0 ${
                show ? 'opacity-100' : 'pointer-events-none'
              } transition-opacity duration-500 ease-in-out w-64 h-64`}
            >
              test
            </div>
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
