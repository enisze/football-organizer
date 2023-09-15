'use client'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { Button } from '@/ui/button'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Leider ist etwas schiefgelaufen!</h1>
      <p className="text-lg">{error.message}</p>
      <Button onClick={reset}>Versuch es nochmal</Button>

      <OrganizerLink href="/" className="justify-center">
        <span className="text-lg">Zurück zur Startseite</span>
      </OrganizerLink>
    </div>
  )
}

export default Error
