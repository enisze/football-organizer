import { Check, X } from 'lucide-react'
import { Suspense } from 'react'
import { QuestionMark } from '../../QuestionMark'
import { StatusButton } from './StatusButton'

export const EventStatusArea = async ({ id }: { id: string }) => {
	return (
		<div className="px-2">
			<div className="text-sm font-medium text-slate-400 mb-2">
				Mein Status:
			</div>
			<div className="grid grid-cols-3 gap-3">
				<Suspense fallback={<div className="h-5" />}>
					<StatusButton
						icon={<Check className="w-5 h-5" />}
						eventId={id}
						status="JOINED"
						label="Attending"
					/>
				</Suspense>
				<Suspense fallback={<div className="h-5" />}>
					<StatusButton
						icon={<QuestionMark className="w-5 h-5" />}
						eventId={id}
						status="MAYBE"
						label="Maybe"
					/>
				</Suspense>
				<Suspense fallback={<div className="h-5" />}>
					<StatusButton
						icon={<X className="w-5 h-5" />}
						eventId={id}
						status="CANCELED"
						label="Declined"
					/>
				</Suspense>
			</div>
		</div>
	)
}
