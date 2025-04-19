import type { EventEnvironemnt } from '@prisma/client'
import { HomeIcon, TreePineIcon } from 'lucide-react'
import type { FunctionComponent } from 'react'

type EnvironmentInfoProps = { environment: EventEnvironemnt }

export const EnvironmentInfo: FunctionComponent<EnvironmentInfoProps> = ({
	environment,
}) => {
	return (
		<span className="text-sm font-medium text-slate-300">
			{environment === 'INDOOR' ? (
				<HomeIcon className="w-4 h-4 text-blue-400" />
			) : (
				<TreePineIcon className="w-4 h-4 text-emerald-400" />
			)}
		</span>
	)
}
