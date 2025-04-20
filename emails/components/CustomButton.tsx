import { Button } from '@react-email/button'
import type { PropsWithChildren } from 'react'

export const CustomButton = (
	props: PropsWithChildren<{ className?: string; href?: string }>,
) => {
	const { className, children, ...propsWithoutClassName } = props

	return (
		<Button
			className={`bg-blue-200 text-black p-3 rounded ${className}`}
			{...propsWithoutClassName}
		>
			{children}
		</Button>
	)
}
