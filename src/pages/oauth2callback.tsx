import { trpc } from '@/src/utils/trpc'
import { OrganizerLink } from '@/ui/ui/OrganizerLink'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'
import { LoadingWrapper } from '../components/LoadingWrapper'
import Navbar from '../components/Navigation/Navbar'

const Oauth2Callback: FunctionComponent = () => {
  const router = useRouter()

  const { code } = router.query

  const { error, isSuccess, isLoading } = trpc.gmail.setToken.useQuery(
    { code: code as string },
    { enabled: Boolean(code) },
  )

  return (
    <>
      <Navbar />
      <LoadingWrapper isLoading={isLoading}>
        {isSuccess && (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">
              Das Token wurde erfolgreich gesetzt!
            </h1>
            <OrganizerLink href="/" className="justify-center">
              <span className="text-lg">Zurück zur Startseite</span>
            </OrganizerLink>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">
              Leider ist etwas schiefgelaufen!
            </h1>
            <p className="text-lg">{error.message}</p>

            <OrganizerLink href="/" className="justify-center">
              <span className="text-lg">Zurück zur Startseite</span>
            </OrganizerLink>
          </div>
        )}
      </LoadingWrapper>
    </>
  )
}

export default Oauth2Callback
