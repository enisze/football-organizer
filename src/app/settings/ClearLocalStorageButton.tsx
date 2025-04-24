'use client'

import { Button } from '@/ui/button'

export function ClearLocalStorageButton() {
	return (
		<Button variant='ghost' onClick={() => localStorage.clear()}>
			Clear Local Storage
		</Button>
	)
}
