import { Button } from '@/ui/button'
import { TextField } from '@/ui/TextField'

import { createGroup } from '@/src/app/settings/groups/[groupId]/actions'

// const newGroupSchema = z.object({
//   name: z
//     .string()
//     .min(5, { message: 'Der Gruppenname ist zu kurz. Mindestlaenge 5.' }),
// })

export const NewGroup = async () => {
  return (
    <form className="flex flex-col gap-y-2">
      <h3>Neue Gruppe erstellen</h3>

      <TextField label="Name" text="" name="groupName" />

      <Button
        type="submit"
        variant="outline"
        className="w-fit"
        formAction={createGroup}
      >
        Gruppe erstellen
      </Button>
    </form>
  )
}
