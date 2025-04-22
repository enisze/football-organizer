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
		<form className="grid grid-cols-2 justify-center gap-2">
			<div className="col-span-2">
				<TextField
					label="Datum"
					defaultValue={defaultValues.date.toISOString().split('T')[0]}
					type="date"
					name="date"
					text=""
					className="w-fit"
				/>
			</div>
			<div className="col-span-2">
				<TextField
					label="Addresse"
					defaultValue={defaultValues.address}
					name="address"
					text=""
				/>
			</div>

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

			<div className="flex gap-x-2 col-span-2 items-center justify-between">
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
				variant="purple"
				type="submit"
				formAction={async (formData: FormData) => {
					formData.append('groupId', groupId)
					await createEvent(formData)
					onSubmit()
				}}
			>
				Submit
			</Button>
		</form>
	)
}
