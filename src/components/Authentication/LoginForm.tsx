import { Button } from '@/ui/base/Button'
import { TextField } from '@/ui/base/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import type { FunctionComponent } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoadingWrapper } from '../LoadingWrapper'

const discordStyles = {
  logo: 'https://authjs.dev/img/providers/discord.svg',
  logoDark: 'https://authjs.dev/img/providers/discord-dark.svg',
  bg: '#fff',
  text: '#7289DA',
  bgDark: '#7289DA',
  textDark: '#fff',
}

const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID

const link =
  'https://discord.com/api/oauth2/token?client_id=' +
  // 'https://discord.com/oauth2/authorize?client_id=' +
  clientId +
  '&scope=identify&email&response_type=code' +
  '&redirect_uri=' +
  process.env.NEXT_PUBLIC_BASE_URL +
  '/api/auth/callback/discord'

const loginSchema = z.object({
  email: z.string().email({ message: 'Bitte gib eine gültige Email ein. ' }),
  password: z.string().min(2, { message: 'Passwort fehlt' }),
})

export const LoginForm: FunctionComponent<{ onSubmit?: () => void }> = ({
  onSubmit,
}) => {
  const { theme } = useTheme()

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
    <div className="flex flex-col gap-y-2">
      <form onSubmit={handleSubmit(submit)}>
        <TextField
          placeholder="Email"
          label="Email"
          type="email"
          {...register('email')}
          text=""
        />

        <TextField
          label="Passwort"
          placeholder="Passwort"
          type="password"
          {...register('password')}
          text=""
        />

        <div className="h-5">
          <span className="text-red-500 h-20">
            {errors.authentication?.message as string}
            {errors.email?.message as string}
            {errors.password?.message as string}
          </span>
        </div>

        <LoadingWrapper isLoading={status === 'loading'}>
          <Button
            type="submit"
            variant="outline"
            className="w-fit align-self-center"
          >
            Login
          </Button>
        </LoadingWrapper>
      </form>
      <button
        className="
        items-center align-self-center flex justify-center px-3 py-4 relative transition-all duration-100 ease-in-out
        bg-white text-[#7289DA] dark:bg-[#7289DA] dark:text-[#fff] rounded-lg p-2 w-[300px]"
        onClick={async () => {
          await signIn('discord', { callbackUrl: '/' })
        }}
      >
        <Image
          id="discord-logo"
          src={theme === 'dark' ? discordStyles.logoDark : discordStyles.logo}
          alt="discord-logo"
          width="32"
          height="32"
          style={{
            background:
              theme === 'dark' ? discordStyles.bgDark : discordStyles.bg,
            color:
              theme === 'dark' ? discordStyles.textDark : discordStyles.text,
          }}
        />
        <span className="font-bold">Sign in with Discord</span>
      </button>
    </div>
  )
}
