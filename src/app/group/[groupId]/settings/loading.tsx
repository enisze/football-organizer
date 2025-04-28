export default function Loading() {
	return (
		<div className='min-h-screen flex flex-col items-center p-4 pb-24'>
			<div className='w-full space-y-4'>
				{/* Header */}
				<div className='flex items-center justify-between'>
					<div className='h-8 w-36 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
					<div className='flex items-center gap-2'>
						<div className='h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
					</div>
				</div>

				<div className='grid gap-4'>
					{/* Appearance Card */}
					<div className='bg-white/5 backdrop-blur-sm border-white/10 rounded-lg p-6'>
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<div className='space-y-2'>
									<div className='h-6 w-36 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
									<div className='h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
								</div>
							</div>
							<div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse' />
						</div>
					</div>

					{/* User Profile Card */}
					<div className='bg-white/5 backdrop-blur-sm border-white/10 rounded-lg p-6'>
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<div className='space-y-2'>
									<div className='h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
									<div className='h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
								</div>
							</div>
							<div className='h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse' />
						</div>
					</div>

					{/* Group Management Card */}
					<div className='bg-white/5 backdrop-blur-sm border-white/10 rounded-lg p-6'>
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<div className='space-y-2'>
									<div className='h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
									<div className='h-4 w-56 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
								</div>
							</div>
							<div className='h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse' />
							{/* Group Selector skeleton */}
							<div className='space-y-2 mt-4'>
								{[...Array(3)].map((_, i) => (
									<div
										key={i}
										className='h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse'
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Sign Out Button skeleton */}
				<div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mt-4' />
			</div>

			{/* Floating Dock skeleton */}
			<div className='fixed bottom-0 left-0 right-0 p-4'>
				<div className='h-16 mx-auto max-w-lg bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse' />
			</div>
		</div>
	)
}
