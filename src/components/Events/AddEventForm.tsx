import { createEvent } from '@/src/app/settings/groups/[groupId]/actions'
import { defaultValues } from '@/src/helpers/constants'
import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import { Label } from '@/ui/label'
import { Switch } from '@/ui/switch'
import { useParams } from 'next/navigation'

export const AddEventForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const params = useParams()

  const groupId = params?.groupId as string

  return (
    <form className="flex flex-col justify-center gap-2">
      <TextField
        label="Address"
        defaultValue={defaultValues.address}
        name="address"
        text=""
      />

      <TextField
        label="Datum"
        defaultValue={defaultValues.date.toISOString()}
        type="date"
        name="date"
        text=""
      />

      <TextField
        label="Startzeit"
        defaultValue={defaultValues.startTime}
        type="time"
        name="startTime"
        text=""
      />
      <TextField
        label="Endzeit"
        defaultValue={defaultValues.endTime}
        type="time"
        name="endTime"
        text=""
      />

      <div className="flex gap-x-2 items-center">
        <Label htmlFor="environment">Indoor</Label>
        <Switch name="environment" defaultValue={defaultValues.environment} />
      </div>

      <TextField
        label="Kosten"
        defaultValue={defaultValues.cost}
        name="cost"
        type="number"
        text=""
      />

      <TextField
        label="Teilnehmerzahl"
        defaultValue={defaultValues.maxParticipants}
        name="maxParticipants"
        type="number"
        text=""
      />
      <Button
        variant="outline"
        type="submit"
        className="bg-[#73C8A9]"
        formAction={async (formData: FormData) => {
          await createEvent({ formData, groupId })
          onSubmit()
        }}
      >
        Submit
      </Button>
    </form>
  )
}
