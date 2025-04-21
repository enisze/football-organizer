'use client'

import { Button } from '@/ui/button'
import { Copy } from 'lucide-react'

export const ClipboardButton = ({ token }: { token: string }) => {
	return (
		<Button
			onClick={() => {
				navigator.clipboard.writeText(
					`${process.env.NEXT_PUBLIC_BASE_URL}/addToGroup/${token}`,
				)
			}}
			className="w-fit"
		>
			Einladungslink&nbsp;
			<Copy />
		</Button>
	)
}
