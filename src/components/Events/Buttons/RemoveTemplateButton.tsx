import type { ButtonProps } from '@/ui/button'
import { Button } from '@/ui/button'
import { removeTemplateAction } from './actions'

interface RemoveTemplateButtonProps extends ButtonProps {
	id: string
}

export const RemoveTemplateButton = async ({
	id,
	...props
}: RemoveTemplateButtonProps) => {
	return (
		<Button
			variant='outline'
			size='sm'
			onClick={async () => {
				'use server'
				await removeTemplateAction({ id })
			}}
			{...props}
		>
			Remove Template
		</Button>
	)
}
