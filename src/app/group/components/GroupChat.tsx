'use client'

import { useChat } from '@ai-sdk/react'

export default function GroupChat({ groupId }: { groupId: string }) {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		maxSteps: 5,
		api: '/api/ai/chat',
		body: {
			groupId,
		},
	})

	return (
		<div className='absolute -bottom-12 right-4 flex flex-col gap-4'>
			{messages.map((message) => (
				<div key={message.id}>
					<strong>{`${message.role}: `}</strong>
					{message.parts.map((part, index) => {
						switch (part.type) {
							case 'text':
								return <span key={index}>{part.text}</span>
							case 'tool-invocation':
								switch (part.toolInvocation.state) {
									case 'call':
										return (
											<div key={index} className='text-gray-500'>
												Checking availability...
											</div>
										)
									case 'result':
										return (
											<div key={index} className='text-green-600'>
												{part.toolInvocation.result}
											</div>
										)
								}
								break
						}
					})}
				</div>
			))}

			<form onSubmit={handleSubmit} className='flex gap-2'>
				<input
					value={input}
					onChange={handleInputChange}
					placeholder='Ask about group availability...'
					className='flex-1 p-2 border rounded'
				/>
				<button
					type='submit'
					className='px-4 py-2 bg-blue-500 text-white rounded'
				>
					Send
				</button>
			</form>
		</div>
	)
}
