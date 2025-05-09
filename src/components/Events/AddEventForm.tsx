'use client'
import { createEvent } from '@/src/app/settings/groups/[groupId]/actions'
import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import { Label } from '@/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select'
import { Switch } from '@/ui/switch'
import { toast } from '@/ui/use-toast'
import type { Event } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useState } from 'react'

interface AddEventFormProps {
	onSubmit: () => void
	templates: Partial<Event>[]
	initialTime?: {
		startTime: string
		endTime: string
		date: string
	}
}

export const AddEventForm = ({
	onSubmit,
	templates,
	initialTime,
}: AddEventFormProps) => {
	const params = useParams()
	const groupId = params?.groupId as string
	const [selectedTemplate, setSelectedTemplate] = useState<string>('')

	const handleTemplateSelect = (templateId: string) => {
		const template = templates.find((t) => t.id === templateId)
		if (template) {
			setSelectedTemplate(templateId)
			// Update form fields based on template
			const form = document.querySelector('form') as HTMLFormElement
			if (form) {
				form.address.value = template.address
				form.cost.value = template.cost
				form.environment.value = template.environment === 'INDOOR'
				form.maxParticipants.value = template.maxParticipants
				form.startTime.value = template.startTime
				form.endTime.value = template.endTime
			}
		}
	}

	return (
		<form className='grid grid-cols-2 justify-center gap-2'>
			{templates.length > 0 && (
				<div className='col-span-2 mb-4'>
					<Label>Nutze ein Template</Label>
					<Select onValueChange={handleTemplateSelect} value={selectedTemplate}>
						<SelectTrigger>
							<SelectValue placeholder='Select a template' />
						</SelectTrigger>
						<SelectContent>
							{templates.map((template) => (
								<SelectItem key={template.id} value={template.id ?? ''}>
									{template.address}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			)}
			<div className='col-span-2'>
				<TextField
					label='Datum'
					type='date'
					name='date'
					text=''
					className='w-full'
					defaultValue={initialTime?.date}
				/>
			</div>

			<div className='flex gap-x-2 col-span-2 items-center justify-between mb-4'>
				<Label htmlFor='isTemplate'>Template</Label>
				<Switch name='isTemplate' />
			</div>

			<div className='col-span-2'>
				<TextField label='Addresse' name='address' text='' />
			</div>

			<TextField
				label='Startzeit'
				type='time'
				name='startTime'
				text=''
				defaultValue={initialTime?.startTime}
			/>
			<TextField
				label='Endzeit'
				type='time'
				name='endTime'
				text=''
				defaultValue={initialTime?.endTime}
			/>

			<div className='flex gap-x-2 col-span-2 items-center justify-between'>
				<Label htmlFor='environment'>Indoor</Label>
				<Switch name='environment' />
			</div>

			<TextField label='Kosten' name='cost' type='number' text='' />

			<TextField
				label='Teilnehmerzahl'
				name='maxParticipants'
				type='number'
				text=''
			/>
			<div className='flex gap-2'>
				<Button
					variant='secondary'
					type='button'
					onClick={() => {
						onSubmit()
					}}
				>
					Schließen
				</Button>

				<Button
					variant='purple'
					type='submit'
					formAction={async (formData: FormData) => {
						formData.append('groupId', groupId)
						await createEvent(formData)
						onSubmit()

						toast({
							title: 'Event erstellt',
							description: 'Das Event wurde erfolgreich erstellt.',
						})
					}}
				>
					Erstellen
				</Button>
			</div>
		</form>
	)
}
