const Pricing = () => {
	return (
		<div className='flex flex-col items-center justify-center space-y-8 p-8'>
			<h1 className='text-3xl font-bold'>Pricing Plans</h1>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				{Object.entries({
					FREE: 'Free tier with basic features',
					SUPPORTER: 'Enhanced features for supporters',
					PREMIUM: 'Full access to all features',
				}).map(([plan, description]) => (
					<div key={plan} className='border p-6 rounded-lg shadow-md'>
						<h2 className='text-xl font-semibold mb-4'>{plan}</h2>
						<p className='text-gray-600'>{description}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Pricing
