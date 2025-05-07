'use client'
import { useSession } from '@/src/lib/auth-client'
import { routes } from '@/src/shared/navigation'
import { buttonVariants } from '@/ui/button'
import Link from 'next/link'

export const DashboardLink = () => {
	const { data } = useSession()

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
