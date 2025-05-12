export const GroupLoading = () => {
	return (
		<div className='container p-0 mx-auto space-y-4 pt-2 pb-16 px-4 sm:px-6 md:space-y-8 md:pb-24'>
			<div className='h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
			<div className='bg-white/5 backdrop-blur-sm border-white/10 rounded-lg'>
				<div className='p-4 pb-0 md:p-6 md:pb-0 space-y-2'>
					<div className='h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
					<div className='h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
				</div>
				<div className='space-y-4 p-4 md:space-y-6 md:p-6'>
					<div className='space-y-4'>
						{/* Date picker skeleton */}
						<div className='space-y-2'>
							<div className='h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
							<div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
						</div>

						{/* User count inputs skeleton */}
						<div className='space-y-2'>
							<div className='h-7 w-36 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
							<div className='grid gap-4 grid-cols-2'>
								<div className='h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
								<div className='h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
							</div>
						</div>
					</div>

					<div className='border-t border-white/10 pt-4 md:pt-6'>
						{/* Tabs skeleton */}
						<div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse mb-4 md:mb-6' />
					</div>
				</div>
			</div>
		</div>
	)
}
