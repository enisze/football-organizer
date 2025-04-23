import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'

import { cn } from '@/lib/utils/cn'
import { createGroup } from '@/src/app/settings/groups/[groupId]/actions'
import { Plus, Users } from 'lucide-react'

export const NewGroup = async ({
	disableStyling = false,
}: { disableStyling?: boolean }) => {
	return (
		<div
			className={cn(
				'min-h-[calc(100vh-140px)] flex items-center justify-center p-4',
				disableStyling && 'min-h-0 items-baseline justify-normal p-0 w-full',
			)}
		>
			<div className='w-full max-w-md px-8 py-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 group'>
				<div className='flex items-center gap-3 mb-8'>
					<div className='p-3 bg-indigo-600 rounded-xl'>
						<Users className='w-6 h-6 text-white' />
					</div>
					<h2 className='text-lg font-bold text-white'>
						Neue Gruppe erstellen
					</h2>
				</div>

				<form className='flex flex-col gap-y-6'>
					<TextField
						label='Name'
						name='groupName'
						className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'
						placeholder='Gruppe Name eingeben'
						text=''
					/>

					<Button
						type='submit'
						variant='purple'
						className='w-fit'
						formAction={async (formData) => {
							'use server'
							createGroup(formData)
						}}
					>
						<Plus className='w-5 h-5' />
						Gruppe erstellen
					</Button>
				</form>
			</div>
		</div>
	)
}
