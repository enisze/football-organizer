import { Button } from '@/ui/base/Button'
import { TextField } from '@/ui/base/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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

  const { status } = useSession()

  const submit = async (values: FieldValues) => {
    //TOOD: send email to me, with the email address of the user
    //TOOD: create accept button inside the email,
    // that will send a request to the backend to create a new user with the email address
    // and permissions to create a new group, but limited to just one group and 10 users max.
    //TODO: create role management -> how many groups can a user create?
    //TODO: which modes are possible? (free, premium, enterprise) -> how many groups
    // how many users per group?
    if (false) {
      setError('authentication', {
        message: 'Leider ist ein Fehler aufgetreten.',
      })
    }
    onSubmit?.()
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
              className="bg-gradient-to-br from-blue-300 to-blue-600 shadow-lg shadow-blue-500"
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
