import { LoadingWrapper } from '@/src/components/LoadingWrapper'
import { Navbar } from '@/src/components/Navigation/Navbar'
import { trpc } from '@/src/utils/trpc'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { useParams } from 'next/navigation'
import type { FunctionComponent } from 'react'

const Oauth2Callback: FunctionComponent = () => {
  const params = useParams()

  const code = params?.code as string

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
