import { Skeleton } from "@/ui/skeleton"

const Loading = () => {
	return (
		<div className="m-8 flex flex-col gap-y-3 justify-center items-center">
			<div className="flex flex-col gap-y-2 justify-center">
				{Array.from({ length: 5 }).map((_, i) => {
					return (
						<div
							className="relative h-full w-full rounded-2xl bg-gradient-to-b from-purple-400 to-purple-100 p-[1px] md:w-[400px]"
							key={i}
						>
							<div className="flex w-full flex-col justify-center gap-2 rounded-2xl bg-gradient-to-tl from-white to-blue-100 shadow-xl dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-600 p-2">
								<Skeleton className="h-6 w-32 self-center" />
								{Array.from({ length: 4 }).map((_, i) => (
									<Skeleton className="h-6 w-69 md:w-80" key={i} />
								))}

								<div className="flex gap-x-2">
									{Array.from({ length: 3 }).map((_, i) => (
										<Skeleton className="h-10 w-23 md:w-28" key={i} />
									))}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Loading
