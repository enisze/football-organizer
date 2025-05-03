import { redirect } from 'next/navigation'

import { routes } from '@/src/shared/navigation'

const MainPage = async ({
	params,
}: {
	params: Promise<unknown>
}) => {
	const resolvedParams = await params
	const parsedParams = routes.groupDetails.$parseParams(resolvedParams)

	redirect(
		routes.groupEvents({
			groupId: parsedParams.groupId,
		}),
	)
}

export default MainPage
