import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { CreateGroupButton } from '../components/Authentication/CreateGroupButton'
import { LoginForm } from '../components/Authentication/LoginForm'
import { SignInAndSignOutButton } from '../components/Authentication/SignInAndSignOutButton'
import { Dashboard } from '../components/Dashboard/Dashboard'
import { Heading } from '../components/Heading'
import { LoadingWrapper } from '../components/LoadingWrapper'
import { Navbar } from '../components/Navigation/Navbar'
import { useWindowSize } from '../hooks/useWindowSize'

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession()

  const { width } = useWindowSize()

  const style = status === 'loading' ? 'grid place-items-center' : ''

  return (
    <div className={`${style} h-full`}>
      <title>Event Wizard</title>
      <LoadingWrapper isLoading={status === 'loading'}>
        <Navbar />
        {!sessionData ? (
          <main className="absolute flex h-full w-full flex-col items-center justify-center gap-y-2">
            <Heading size={width && width < 720 ? 'md' : 'lg'} />
            <LoginForm />
            <SignInAndSignOutButton />
            <CreateGroupButton />
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
