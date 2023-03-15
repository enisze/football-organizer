import type { FunctionComponent } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { Button } from '@/ui/base/Button'
import { TextField } from '@/ui/base/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { trpc } from '../utils/trpc'

const newGroupSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Der Gruppenname ist zu kurz. Mindestlaenge 5.' }),
})

const NewGroup: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(newGroupSchema), mode: 'onBlur' })

  //TODO: set error and success

  const router = useRouter()

  const { mutate: createGroup } = trpc.group.create.useMutation({
    onSuccess(data, variables, context) {
      const groupName = data.name
    },
    onError(error, variables, context) {
      console.log(error)
    },
  })

  const onSubmit = (values: FieldValues) => {
    createGroup({ name: values.name })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute flex h-full w-full flex-col items-center justify-center gap-y-2"
    >
      <TextField
        label="Name"
        {...register('name')}
        text={errors.name?.message as string}
      />

      {errors.authentication?.message && (
        <div className="max-w-[300px]">
          <span className="text-red-500">
            {errors.authentication?.message as string}
          </span>
        </div>
      )}

      <Button type="submit" variant="outline">
        Gruppe erstellen
      </Button>
    </form>
  )
}

export default NewGroup