import { Check, X } from 'lucide-react'
import type React from 'react'

interface FeatureComparison {
	name: string
	basic: boolean
	pro: boolean
	enterprise: boolean
}

const features: FeatureComparison[] = [
	{ name: 'Unlimited projects', basic: true, pro: true, enterprise: true },
	{ name: 'API access', basic: false, pro: true, enterprise: true },
	{ name: 'Team collaboration', basic: false, pro: true, enterprise: true },
	{ name: 'Custom domains', basic: false, pro: false, enterprise: true },
	{ name: 'Advanced analytics', basic: false, pro: true, enterprise: true },
	{ name: 'Priority support', basic: false, pro: false, enterprise: true },
	{ name: 'SSO integration', basic: false, pro: false, enterprise: true },
]

const ComparisonTable: React.FC = () => {
	return (
		<div className='mt-16 overflow-x-auto'>
			<h2 className='text-2xl font-bold text-white text-center mb-8'>
				Feature Comparison
			</h2>
			<div className='inline-block min-w-full py-2 align-middle'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th
								scope='col'
								className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
							>
								Feature
							</th>
							<th
								scope='col'
								className='px-3 py-3.5 text-center text-sm font-semibold text-white'
							>
								Basic
							</th>
							<th
								scope='col'
								className='px-3 py-3.5 text-center text-sm font-semibold text-white bg-indigo-900 bg-opacity-30 rounded-t-lg'
							>
								Pro
							</th>
							<th
								scope='col'
								className='px-3 py-3.5 text-center text-sm font-semibold text-white'
							>
								Enterprise
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-700'>
						{features.map((feature, featureIdx) => (
							<tr
								key={feature.name}
								className={
									featureIdx % 2 === 0 ? 'bg-gray-800 bg-opacity-50' : undefined
								}
							>
								<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6'>
									{feature.name}
								</td>
								<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center'>
									{feature.basic ? (
										<Check className='h-5 w-5 text-emerald-400 mx-auto' />
									) : (
										<X className='h-5 w-5 text-gray-500 mx-auto' />
									)}
								</td>
								<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center bg-indigo-900 bg-opacity-20'>
									{feature.pro ? (
										<Check className='h-5 w-5 text-emerald-400 mx-auto' />
									) : (
										<X className='h-5 w-5 text-gray-500 mx-auto' />
									)}
								</td>
								<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center'>
									{feature.enterprise ? (
										<Check className='h-5 w-5 text-emerald-400 mx-auto' />
									) : (
										<X className='h-5 w-5 text-gray-500 mx-auto' />
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ComparisonTable
