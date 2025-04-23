'use client'

import { signOut } from '@/src/lib/auth-client'
import { routes } from '@/src/shared/navigation'
import { Button } from '@/ui/button'
import { redirect } from 'next/navigation'
import { revalidatePathAction } from '../group/[groupId]/actions'

export const SignOutButton = () => {
	return (
		<Button
			type='submit'
			variant='destructive'
			className='w-full'
			onClick={() => {
				signOut({
					fetchOptions: {
						onSuccess: () => {
							revalidatePathAction({
								path: routes.home(),
							})
							redirect(routes.signIn())
						},
					},
				})
			}}
		>
			Ausloggen
		</Button>
	)
}
