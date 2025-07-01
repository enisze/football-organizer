export const Phone = () => {
	return (
		<div className='relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl'>
			<div className='w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute' />
			<div className='h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg' />
			<div className='h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg' />
			<div className='h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg' />
			<div className='rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800'>
				<video className='w-full' controls>
					<source src='/videoEdited.mp4' type='video/mp4' />
					<track kind="captions" srclang="en" label="English captions" />
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	)
}
