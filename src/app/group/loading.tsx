export default function Loading() {
	return (
		<div className='m-4 flex flex-col gap-y-4'>
			<div className='flex justify-between items-center'>
				<div className='h-8 w-36 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
				<div className='h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
			</div>
			<div className='space-y-4'>
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className='h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse'
					/>
				))}
			</div>
		</div>
	)
}
