import { cn } from '@/lib/utils/cn'

export function TimeLineLoading({
	singleLine = false,
}: { singleLine?: boolean }) {
	// Generate some time labels for the skeleton
	const timeLabels = Array.from(
		{ length: 12 },
		(_, i) => String(i + 8).padStart(2, '0'), // Starting from 8:00 to show a reasonable time range
	)

	return (
		<div className='bg-white/5 backdrop-blur-sm border-white/20 rounded-lg overflow-hidden'>
			<div className='relative'>
				<div className='flex border-b border-white/20 px-4 py-2'>
					{!singleLine && <div className='w-5 flex-shrink-0' />}
					<div className='flex-1 flex'>
						{timeLabels.map((time) => (
							<div
								key={time}
								className='flex-1 text-xs text-white/80 text-center'
							>
								{time}
							</div>
						))}
					</div>
				</div>

				{singleLine ? (
					<div className='flex px-2 py-1 relative'>
						<div className='flex-1 relative h-8'>
							<div className='absolute inset-0 flex pointer-events-none'>
								{timeLabels.map((_, i) => (
									<div
										key={i}
										className={cn(
											'flex-1 h-full',
											i > 0 && 'border-l border-white/20',
										)}
									/>
								))}
							</div>
							{/* Loading slots */}
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className='absolute h-6 top-1 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse'
									style={{
										left: `${10 + i * 20}%`,
										width: '15%',
									}}
								/>
							))}
						</div>
					</div>
				) : (
					[...Array(5)].map((_, index) => (
						<div
							key={index}
							className={cn(
								'flex border-b border-white/20 px-2 py-1 relative',
								index === 4 && 'border-b-0',
							)}
						>
							<div className='w-6 flex-shrink-0 font-medium flex items-center border-r border-white/20'>
								<div className='text-xs w-full h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
							</div>

							<div className='flex-1 relative h-8'>
								<div className='absolute inset-0 flex pointer-events-none'>
									{timeLabels.map((_, i) => (
										<div
											key={i}
											className={cn(
												'flex-1 h-full',
												i > 0 && 'border-l border-white/20',
											)}
										/>
									))}
								</div>
								{/* Loading slot */}
								<div
									className='absolute h-6 top-1 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse'
									style={{
										left: `${15 + index * 10}%`,
										width: '25%',
									}}
								/>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	)
}
