import { trpc } from '@/src/utils/trpc'
import { Button } from '@/ui/button'
import { TextField } from '@/ui/TextField'
import { useToast } from '@/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FunctionComponent } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const newGroupSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Der Gruppenname ist zu kurz. Mindestlaenge 5.' }),
})

export const NewGroup: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(newGroupSchema), mode: 'onBlur' })

  const trpcContext = trpc.useContext()

  const { toast } = useToast()

  const { mutate: createGroup } = trpc.group.create.useMutation({
    onSuccess(data) {
      trpcContext.invalidate()
      const groupName = data
      toast({
        title: `Gruppe ${groupName} erfolgreich erstellt`,
      })
    },
    onError(error) {
      toast({
        title: 'Fehler beim Erstellen der Gruppe',
        description: error.message,
      })
    },
  })

  const onSubmit = (values: FieldValues) => {
    createGroup({ name: values.name })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <h3>Neue Gruppe erstellen</h3>

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

      <Button type="submit" variant="outline" className="w-fit">
        Gruppe erstellen
      </Button>
    </form>
  )
}
