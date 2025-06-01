import { routes } from '@/src/shared/navigation'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { UserPlus, Users } from 'lucide-react'

export const GroupNavigator = async () => {
	return (
		<div className='flex flex-col gap-2'>
			<OrganizerLink
				href={routes.groupSettings()}
				className='w-full px-8 py-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 group'
			>
				<div className='flex items-center gap-4'>
					<div className='p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors'>
						<Users className='w-6 h-6 text-white' />
					</div>
					<span className='text-lg font-medium text-white'>
						Gruppe erstellen
					</span>
				</div>
			</OrganizerLink>

			<OrganizerLink
				href={routes.enterGroup()}
				className='w-full px-8 py-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 group'
			>
				<div className='flex items-center gap-4'>
					<div className='p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors'>
						<UserPlus className='w-6 h-6 text-white' />
					</div>
					<span className='text-lg font-medium text-white'>
						Gruppe beitreten
					</span>
				</div>
			</OrganizerLink>
		</div>
	)
}
