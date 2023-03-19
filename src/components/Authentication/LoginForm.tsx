import { Button } from '@/ui/base/Button'
import { TextField } from '@/ui/base/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoadingWrapper } from '../LoadingWrapper'

const loginSchema = z.object({
  email: z.string().email({ message: 'Bitte gib eine gültige Email ein.' }),
  password: z.string().min(2, { message: 'Passwort fehlt' }),
})

export const LoginForm: FunctionComponent<{ onSubmit?: () => void }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: zodResolver(loginSchema), mode: 'onBlur' })

  const { status } = useSession()

  const submit = async (values: FieldValues) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    })

    if (res?.error) {
      setError('authentication', {
        message: 'Die angegebenen Daten sind inkorrekt.',
      })
    }
    onSubmit?.()
  }

  return (
    <>
      <LoadingWrapper isLoading={status === 'loading'}>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col justify-center items-center gap-y-2"
        >
          <TextField
            placeholder="Email"
            label="Email"
            type="email"
            {...register('email')}
            text={errors.email?.message as string}
          />

          <TextField
            label="Passwort"
            placeholder="Passwort"
            type="password"
            {...register('password')}
            text={errors.password?.message as string}
          />

          {errors.authentication?.message && (
            <span className="text-red-500">
              {errors.authentication?.message as string}
            </span>
          )}

          <LoadingWrapper isLoading={status === 'loading'}>
            <Button type="submit" variant="outline" className="w-fit">
              Login
            </Button>
          </LoadingWrapper>
        </form>
      </LoadingWrapper>
    </>
  )
}
