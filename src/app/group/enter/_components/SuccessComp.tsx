'use client'
import { cn } from '@/lib/utils/cn'
import { routes } from '@/src/shared/navigation'
import { Button, buttonVariants } from '@/ui/button'
import { Input } from '@/ui/input'
import { CheckCircleIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { addToGroupAction } from '../action'

export const SuccessComp = ({
	code,
}: {
	code: string | undefined | null
}) => {
	const formRef = useRef<HTMLFormElement>(null)
	const [codeValues, setCodeValues] = useState<string[]>(Array(6).fill(''))
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	const [error, setError] = useState<string | null>(null)

	const { execute: addToGroup, result } = useAction(addToGroupAction, {
		onError: () => {
			setError('Der Einladungscode ist ungültig oder abgelaufen')
		},
	})

	const groupName = result.data?.group.name
	const groupId = result.data?.group.id

	const submitForm = async () => {
		const joinCode = codeValues.join('')
		addToGroup({
			code: joinCode,
		})
	}

	// Auto-submit when code is provided via props
	useEffect(() => {
		const submitWithPropCode = async () => {
			addToGroup({
				code: code || '',
			})
		}

		if (code) {
			const codeArray = code.split('')
			setCodeValues(codeArray.concat(Array(6 - codeArray.length).fill('')))

			const timer = setTimeout(() => {
				submitWithPropCode()
			}, 2000)

			return () => clearTimeout(timer)
		}
	}, [code, addToGroup])

	const handleInputChange = (index: number, value: string) => {
		const newValue = value.slice(-1) // Only take the last character if multiple are pasted
		const newCodeValues = [...codeValues]
		newCodeValues[index] = newValue

		setCodeValues(newCodeValues)

		if (!newCodeValues.every((val) => val !== '')) {
			setError(null)
		}

		// Auto-focus next field
		if (newValue && index < 5) {
			inputRefs.current[index + 1]?.focus()
		}

		// Auto-submit when all fields are filled
		if (newCodeValues.every((val) => val !== '')) {
			submitForm()
		}
	}

	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === 'Backspace' && !codeValues[index] && index > 0) {
			// Move to previous input when backspace is pressed on empty field
			inputRefs.current[index - 1]?.focus()
		}
	}

	return (
		<div className='space-y-4'>
			<form
				ref={formRef}
				onSubmit={(e) => {
					e.preventDefault()
					submitForm()
				}}
				className='space-y-4'
			>
				<div className='flex flex-col gap-4'>
					<div className='flex gap-2 justify-center'>
						{Array(6)
							.fill(null)
							.map((_, index) => (
								<Input
									key={index}
									ref={(el) => {
										inputRefs.current[index] = el
									}}
									type='text'
									inputMode='numeric'
									pattern='[0-9]*'
									maxLength={1}
									className={cn(
										'w-12 h-12 text-center bg-white/5 border-white/10 text-white placeholder:text-white/50',
										error && 'border-red-500',
									)}
									value={codeValues[index]}
									onChange={(e) => handleInputChange(index, e.target.value)}
									onKeyDown={(e) => handleKeyDown(index, e)}
									onPaste={(e) => {
										e.preventDefault()
										const paste = e.clipboardData.getData('text')
										const pasteArray = paste.slice(0, 6).split('')
										const newCodeValues = [...codeValues]
										pasteArray.forEach((char, i) => {
											if (index + i < 6) {
												newCodeValues[index + i] = char
											}
										})
										setCodeValues(newCodeValues)
										// Focus the next empty field or the last field
										const nextEmptyIndex = newCodeValues.findIndex(
											(val) => !val,
										)
										if (nextEmptyIndex !== -1) {
											inputRefs.current[nextEmptyIndex]?.focus()
										} else {
											inputRefs.current[5]?.focus()
										}
										// Auto-submit if all fields are filled
										if (newCodeValues.every((val) => val !== '')) {
											submitForm()
										}
									}}
								/>
							))}
					</div>
					{error && (
						<div className='text-red-500 text-sm text-center'>{error}</div>
					)}
				</div>
				<Button type='submit' className='w-full'>
					Beitreten
				</Button>
			</form>

			{groupName && (
				<div className='flex flex-col items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10'>
					<div className='flex items-center gap-2 text-emerald-400 font-bold'>
						<CheckCircleIcon className='h-5 w-5' />
						<span>Du bist Gruppe {groupName} beigetreten</span>
					</div>

					<Link
						href={routes.groupDetails({
							groupId: groupId || '',
						})}
						className={buttonVariants({})}
					>
						Hier geht es zur Gruppe
					</Link>
				</div>
			)}
		</div>
	)
}
