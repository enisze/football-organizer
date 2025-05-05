import { cn } from '@/lib/utils/cn'
import type { ContainerProps } from '@react-email/container'
import { Container } from '@react-email/container'

export const ContainerBox = (props: ContainerProps) => {
	const { className, ...propsWithoutClassName } = props

	return (
		<Container
			className={cn(
				'border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]',
				className,
			)}
			{...propsWithoutClassName}
		/>
	)
}
