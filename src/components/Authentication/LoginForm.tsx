import { useToast } from '@/src/hooks/useToast'
import { trpc } from '@/src/utils/trpc'
import { Button } from '@/ui/base/Button'
import { TextField } from '@/ui/base/TextField'
import { signIn } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { FunctionComponent, useState } from 'react'
import { z } from 'zod'

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

const emailSchema = z
  .string()
  .email({ message: 'Bitte gib eine gültige Email ein. ' })

export const LoginForm: FunctionComponent<{ onSubmit?: () => void }> = ({
  onSubmit,
}) => {
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [authState, setAuthState] = useState<'login' | 'register'>()
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [authenticationError, setAuthenticationError] = useState('')

  const { toast } = useToast()

  const submit = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      username,
    })

    if (res?.error) {
      setAuthenticationError(
        'Die angegebenen Daten sind inkorrekt. Falls du eine andere Loginvariante genutzt hast, nutze bitte diese.',
      )
      return
    }
    onSubmit?.()
  }

  return (
    <div className="flex flex-col gap-y-2">
      <EmailForm
        setAuthState={(val) => setAuthState(val)}
        setEmailExternal={setEmail}
      />
      {authState && (
        <>
          <div className="flex flex-col gap-y-1">
            <span>Email</span>
            <span>{email}</span>
          </div>

          <TextField
            label="Passwort"
            placeholder="Passwort"
            type="password"
            text=""
            value={password}
            onChange={(val) => setPassword(val.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submit()
              }
            }}
          />
        </>
      )}
      {authState === 'register' && (
        <TextField
          label="Name"
          placeholder="name"
          type="text"
          text=""
          value={username}
          onChange={(val) => setUsername(val.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submit()
            }
          }}
        />
      )}

      <div className="">
        <span className="text-red-500 h-20">{authenticationError}</span>
      </div>

      {authState && (
        <Button
          onClick={submit}
          variant="outline"
          className="w-fit self-center"
        >
          {authState === 'login' ? 'Login' : 'Registrieren'}
        </Button>
      )}

      <button
        className="self-center flex justify-center px-3 py-4 relative transition-all duration-100 ease-in-out
        bg-white text-[#7289DA] dark:bg-[#7289DA] dark:text-[#fff] rounded-lg p-2 w-[300px] items-center gap-x-2"
        onClick={async () => {
          try {
            await signIn('discord', { callbackUrl: '/' })
          } catch (e) {
            toast({
              title: 'Fehler beim Login',
              description: 'Bitte versuche es später erneut.',
            })
          }
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
        <span className="font-bold">Login mit Discord</span>
      </button>
    </div>
  )
}

const EmailForm = ({
  setAuthState,
  setEmailExternal,
}: {
  setAuthState: (state: 'login' | 'register') => void
  setEmailExternal: (email: string) => void
}) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const { data, mutateAsync } = trpc.user.checkByEmail.useMutation()

  const onClick = async () => {
    const res = emailSchema.safeParse(email)

    if (res.success) {
      setEmailExternal(email)
      const res = await mutateAsync({ email })
      setAuthState(res === true ? 'login' : 'register')
      setError('')

      return
    }

    setError(res.error.errors[0]?.message ?? '')
  }

  return (
    <>
      {data === undefined && (
        <div className="flex flex-col gap-y-2">
          <TextField
            placeholder="Email"
            label="Email"
            type="email"
            value={email}
            onChange={(val) => setEmail(val.target.value)}
            className="self-center md:self-start"
            text=""
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClick()
              }
            }}
          />

          <div className="h-5">
            <span className="text-red-500 h-20">{error}</span>
          </div>
          {data === undefined && (
            <Button
              type="submit"
              variant="outline"
              className="w-fit self-center"
              onClick={onClick}
            >
              Weiter
            </Button>
          )}
        </div>
      )}
    </>
  )
}
