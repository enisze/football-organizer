'use client'
import { useSession } from '@/src/lib/auth-client'
import { routes } from '@/src/shared/navigation'
import { buttonVariants } from '@/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const DashboardLink = ({ groupId }: { groupId: string | undefined }) => {
	const { data } = useSession()

	const pathname = usePathname()

	const onDashboard = pathname?.includes('/group')

	return (
		<>
			{!onDashboard && data?.user?.id && (
				<Link
					href={routes.groupEvents({ groupId: groupId ?? '' })}
					className={buttonVariants({ variant: 'purple' })}
				>
					Dashboard
				</Link>
			)}
		</>
	)
}
