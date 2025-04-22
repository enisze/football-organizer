'use client'

import { Button } from '@/ui/button'
import { Copy } from 'lucide-react'

export const ClipboardButton = ({ code }: { code: string }) => {
	return (
		<Button
			onClick={() => {
				navigator.clipboard.writeText(
					`${process.env.NEXT_PUBLIC_BASE_URL}/group/enter?code=${code}`,
				)
			}}
			className="w-fit"
		>
			Einladungslink&nbsp;
			<Copy />
		</Button>
	)
}
