export default function Loading() {
	return (
		<div className='container px-4 mx-auto space-y-8 pt-2 pb-20'>
			<div className='h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse' />

			{/* Tabs skeleton */}
			<div className='w-full flex flex-col items-center'>
				<div className='inline-flex rounded-xl bg-white/5 p-1'>
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className='w-24 h-10 mx-1 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse'
						/>
					))}
				</div>

				{/* Cards skeleton */}
				<div className='w-full mt-4 grid gap-6 md:grid-cols-2'>
					{[...Array(2)].map((_, i) => (
						<div
							key={i}
							className='bg-white/5 backdrop-blur-sm border-white/10 rounded-xl p-6 space-y-4'
						>
							<div className='space-y-2'>
								<div className='h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
								<div className='h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
							</div>
							<div className='space-y-2'>
								{[...Array(6)].map((_, j) => (
									<div
										key={j}
										className='h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse'
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
