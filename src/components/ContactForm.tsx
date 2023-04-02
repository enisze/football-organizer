import { Button } from '@/ui/base/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/ui/base/Dialog'
import { TRPCClientError } from '@trpc/client'
import { useSession } from 'next-auth/react'

import { LoginForm } from '@/src/components/Authentication/LoginForm'
import type { FunctionComponent } from 'react'
import { useState } from 'react'
import { useToast } from '../hooks/useToast'
import { trpc } from '../utils/trpc'

export const ContactForm: FunctionComponent<{ onSubmit?: () => void }> = ({
  onSubmit,
}) => {
  const { mutate: sendEmail } = trpc.gmail.sendGroupRequestMail.useMutation()

  const { status, data } = useSession()
  const { toast } = useToast()

  const [open, setOpen] = useState(false)

  const submit = () => {
    sendEmail(
      { email: data?.user?.email ?? '' },
      {
        onError: (err) => {
          if (
            err instanceof TRPCClientError &&
            err.message.includes('Too many requests')
          ) {
            toast({
              title: 'Zu viele Anfragen',
              description:
                'Du hast bereits eine Anfrage gestellt, bitte warte auf eine Antwort.',
            })
          } else {
            toast({
              title: 'Leider ist ein Fehler aufgetreten.',
              description: 'Bitte versuche es später noch einmal.',
            })
          }
        },
        onSuccess: () => {
          toast({
            title: 'Anfrage erfolgreich gestellt',
            description: 'Wir melden uns bei dir.',
          })
        },
      },
    )

    onSubmit?.()
    //TODO: create role management -> how many groups can a user create?
    //TODO: which modes are possible? (free, premium, enterprise) -> how many groups
  }

  return (
    <>
      <Button
        variant="outline"
        className="bg-gradient-to-br from-yellow-300/80 to-yellow-600 shadow-lg shadow-yellow-600"
        onClick={() => {
          status === 'unauthenticated' ? setOpen(true) : submit()
        }}
      >
        Anfrage senden
      </Button>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Logge dich ein</DialogTitle>
          </DialogHeader>
          <LoginForm
            onSubmit={() => {
              setOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
