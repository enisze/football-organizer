import { Skeleton } from '@/ui/skeleton'

const Loading = () => {
	return (
		<div className='m-8 flex flex-col gap-y-3 justify-center items-center'>
			{Array.from({ length: 5 }).map((_, i) => (
				<div key={i} className='mb-3 animate-in fade-in duration-500'>
					<div className='w-[320px] group'>
						<div className='relative w-full rounded-2xl bg-gradient-to-b from-purple-400 to-purple-100 p-[1px]'>
							<div className='flex w-full flex-col justify-between gap-2 rounded-2xl bg-gradient-to-tl from-white to-blue-100 shadow-xl dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-600 p-4'>
								<div className='flex flex-col gap-2'>
									<Skeleton className='h-6 w-32' />
									<Skeleton className='h-4 w-full' />
									<div className='flex items-center gap-2'>
										<Skeleton className='h-4 w-24' />
										<Skeleton className='h-4 w-16' />
									</div>
								</div>
								<div className='flex justify-between items-center mt-2'>
									<Skeleton className='h-6 w-24' />
									<Skeleton className='h-8 w-8 rounded-full' />
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Loading
