import { Button } from '@/ui/base/Button'
import { TextField } from '@/ui/base/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { TRPCClientError } from '@trpc/client'
import { useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '../hooks/useToast'
import { trpc } from '../utils/trpc'
import { LoadingWrapper } from './LoadingWrapper'

const contactSchema = z.object({
  email: z.string().email({ message: 'Bitte gib eine gültige Email ein.' }),
})

export const ContactForm: FunctionComponent<{ onSubmit?: () => void }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: zodResolver(contactSchema), mode: 'onBlur' })

  const { mutate: sendEmail } = trpc.gmail.sendGroupRequestMail.useMutation()

  const { status } = useSession()
  const { toast } = useToast()

  const submit = async (values: FieldValues) => {
    sendEmail(
      { email: values.email },
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
            setError('Create group', {
              message: 'Leider ist ein Fehler aufgetreten.',
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
    //TOOD: create accept button inside the email -> which sends an email to the user
    // with a magic link for authentication (password needed)
    // and permissions to create a new group, but limited to just one group and 10 users max.
    //TODO: create role management -> how many groups can a user create?
    //TODO: which modes are possible? (free, premium, enterprise) -> how many groups
  }

  return (
    <>
      <LoadingWrapper isLoading={status === 'loading'}>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col justify-center gap-y-2"
        >
          <TextField
            placeholder="Email"
            label="Email"
            type="email"
            {...register('email')}
            text={errors.email?.message as string}
          />
          {errors.authentication?.message && (
            <span className="text-red-500">
              {errors.authentication?.message as string}
            </span>
          )}

          <LoadingWrapper isLoading={status === 'loading'}>
            <Button
              variant="outline"
              className="bg-gradient-to-br from-yellow-300/80 to-yellow-600 shadow-lg shadow-yellow-600"
              type="submit"
            >
              Anfrage senden
            </Button>
          </LoadingWrapper>
        </form>
      </LoadingWrapper>
    </>
  )
}
