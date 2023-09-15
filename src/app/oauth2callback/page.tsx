'use client'
import { api } from '@/src/server/trpc/api'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { useMemo } from 'react'

const Oauth2Callback = () => {
  const code = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.href.split('code=')[1]
    }
    return null
  }, [])

  api.gmail.setToken.useQuery(
    { code: code as string },
    { enabled: Boolean(code) },
  )

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">
        Das Token wurde erfolgreich gesetzt!
      </h1>
      <OrganizerLink href="/" className="justify-center">
        <span className="text-lg">Zurück zur Startseite</span>
      </OrganizerLink>
    </div>
  )
}

export default Oauth2Callback
