import { Button } from '@/ui/button'
import Link from 'next/link'
import type { FunctionComponent } from 'react'

export const CreateGroupButton: FunctionComponent = () => {
	return (
		<Link href={'/newGroup'}>
			<Button variant='outline' aria-label='new-group'>
				Create Group
			</Button>
		</Link>
	)
}
