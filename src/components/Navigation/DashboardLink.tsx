import { serverAuth } from '@/src/server/auth/session'
import { routes } from '@/src/shared/navigation'
import { buttonVariants } from '@/ui/button'
import Link from 'next/link'

export const DashboardLink = async () => {
	const data = await serverAuth()

	return (
		<>
			{data?.user?.id && (
				<Link
					href={routes.group()}
					className={buttonVariants({ variant: 'purple' })}
				>
					Dashboard
				</Link>
			)}
		</>
	)
}
