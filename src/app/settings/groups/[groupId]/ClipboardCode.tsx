'use client'

import { Button } from '@/ui/button'
import { Copy } from 'lucide-react'

export const ClipboardCode = ({ code }: { code: string }) => {
	return (
		<Button
			variant="outline"
			onClick={() => {
				navigator.clipboard.writeText(code)
			}}
			className="flex gap-2"
		>
			Code {code}
			<Copy />
		</Button>
	)
}
