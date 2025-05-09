import { Button } from '@/ui/button'

interface UserCountInputProps {
	value: number
	onChange: (value: number) => void
	label: string
	min?: number
	max?: number
}

export function UserCountInput({
	value,
	onChange,
	label,
	min = 1,
	max = 10,
}: UserCountInputProps) {
	return (
		<div>
			<h3 className='font-semibold text-xs mb-1'>{label}</h3>
			<div className='flex items-center justify-center gap-x-2 px-2'>
				<Button
					size='icon'
					className='h-6 w-6 shrink-0 rounded-full'
					onClick={() => {
						const newValue = Math.max(min, (value || 8) - 1)
						onChange(newValue)
					}}
				>
					-
				</Button>
				<input
					type='text'
					value={value}
					onChange={(e) => {
						const value = e.target.value.replace(/[^0-9]/g, '')
						if (value === '') {
							onChange(min)
							return
						}
						const val = Math.min(max, Math.max(min, Number.parseInt(value)))
						onChange(val)
					}}
					className='h-8 w-16 rounded-md border border-white/10 bg-white/5 px-2 text-center focus:outline-none focus:ring-2 focus:ring-white/20'
				/>
				<Button
					size='icon'
					className='h-6 w-6 shrink-0 rounded-full'
					onClick={() => {
						const newValue = Math.min(max, (value || 8) + 1)
						onChange(newValue)
					}}
				>
					+
				</Button>
			</div>
		</div>
	)
}
