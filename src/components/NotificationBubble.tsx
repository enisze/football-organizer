import { cn } from '@/lib/utils/cn'

export const NotificationBubble = ({
	position = 'topRight',
	className,
}: {
	position?: 'topLeft' | 'bottomRight' | 'topRight' | 'bottomLeft'
	className?: string
}) => {
	const getPos = () => {
		switch (position) {
			case 'topLeft':
				return 'top-0 left-0'
			case 'bottomRight':
				return 'bottom-0 right-0'
			case 'topRight':
				return 'top-0 right-0'
			case 'bottomLeft':
				return 'bottom-0 left-0'
		}
	}

	const pos = getPos()
	return (
		<div
			className={cn(
				'absolute inline-flex rounded-full bg-sky-400 opacity-75 h-3 w-3',
				pos,
				className,
			)}
		/>
	)
}
