import { Button } from '@/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import { LoadingWrapper } from '../LoadingWrapper'

export const SignInAndSignOutButton: FunctionComponent = () => {
  const { data: sessionData, status } = useSession()

  return (
    <>
      <LoadingWrapper isLoading={status === 'loading'}>
        {sessionData ? <LogoutButton /> : <SignInButton />}
      </LoadingWrapper>
    </>
  )
}

const SignInButton: FunctionComponent = () => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/signUp`}>
      <Button variant="outline" aria-label="signup">
        Registrieren
      </Button>
    </Link>
  )
}

const LogoutButton: FunctionComponent = () => {
  return (
    <Button
      aria-label="signout"
      className="px-4 py-2"
      onClick={async () => {
        await signOut({ callbackUrl: '/' })
      }}
    >
      Ausloggen
    </Button>
  )
}
