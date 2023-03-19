import type { FunctionComponent } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/base/Accordion'
import { Button } from '@/ui/base/Button'
import { TextField } from '@/ui/base/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { trpc } from '../utils/trpc'

const discordStyles = {
  logo: 'https://authjs.dev/img/providers/discord.svg',
  logoDark: 'https://authjs.dev/img/providers/discord-dark.svg',
  bg: '#fff',
  text: '#7289DA',
  bgDark: '#7289DA',
  textDark: '#fff',
}

const signUpSchema = z.object({
  email: z.string().email({ message: 'Bitte gib eine gültige Email ein.' }),
  username: z.string().regex(/^[^@]*$/, {
    message: 'Paypal name fehlt oder du gibst deine Email an!',
  }),
  password: z.string().min(2, { message: 'Passwort fehlt' }),
  key: z.string().min(1, {
    message: 'Der angegebene Schlüssel ist falsch.',
  }),
})

const SignUp: FunctionComponent = () => {
  const { theme } = useTheme()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema), mode: 'onBlur' })

  const router = useRouter()

  const { mutate: sendWelcomeMail } = trpc.gmail.sendWelcomeMail.useMutation()

  const onSubmit = async (values: FieldValues) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      username: values.username,
      key: values.key,
      callbackUrl: '/',
    })

    if (res?.error) {
      setError('authentication', {
        message:
          'Bitte überprüfe deine Eingaben, inklusive Schlüssel. Achte auf Gross- und Kleinschreibung.',
      })
    } else {
      sendWelcomeMail()
      if (res?.url) router.push(res.url)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute flex h-full w-full flex-col items-center justify-center gap-y-2"
    >
      {/* register your input into the hook by invoking the "register" function */}
      <TextField
        label="Email"
        {...register('email')}
        text={errors.email?.message as string}
      />

      <TextField
        label="Username"
        placeholder="Dein Paypal Name"
        text={errors.username?.message as string}
        {...register('username')}
      />

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Klicke hier für ein Beispiel wie der Paypal Name aussehen sollte.
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex max-w-[300px] flex-col gap-y-2">
              <Image
                src="/Paypal.jpg"
                alt="Paypal example"
                className="rounded"
                width="300"
                height="140"
              />
              <span>
                Der einzugebene Paypal Name wäre hier
                <span className="font-bold">Max Mustermann</span>
              </span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <TextField
        label="Passwort"
        {...register('password')}
        type="password"
        text={errors.password?.message as string}
      />
      <TextField
        label="Schlüssel"
        {...register('key')}
        text={errors.key?.message as string}
      />

      {errors.authentication?.message && (
        <div className="max-w-[300px]">
          <span className="text-red-500">
            {errors.authentication?.message as string}
          </span>
        </div>
      )}

      <Button type="submit" variant="outline">
        Registrieren
      </Button>
      <button
        type="submit"
        className="
        items-center flex justify-center px-3 py-4 relative transition-all duration-100 ease-in-out
        bg-white text-[#7289DA] dark:bg-[#7289DA] dark:text-[#fff] rounded-lg p-2 w-[300px]"
      >
        <Image
          id="discord-logo"
          src={theme === 'dark' ? discordStyles.logoDark : discordStyles.logo}
          alt="discord-logo"
          width="32"
          height="32"
        />
        <span className="flex-grow font-bold">Sign in with Discord</span>
      </button>
    </form>
  )
}

export default SignUp
