import { routes } from '@/src/shared/navigation'
import { Button } from '@/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function RateLimitPage() {
	return (
		<div className='min-h-screen bg-[#0f1420] text-white flex flex-col'>
			<main className='flex-1 container mx-auto px-6 py-12 max-w-3xl'>
				<div className='bg-[#171c2c] rounded-lg p-8 shadow-lg'>
					<div className='flex flex-col items-center text-center mb-8'>
						<div className='w-16 h-16 rounded-full bg-[#4361ee]/10 flex items-center justify-center mb-6'>
							<AlertCircle className='w-8 h-8 text-[#4361ee]' />
						</div>
						<h1 className='text-2xl font-bold mb-2'>
							Anfragelimit überschritten
						</h1>
						<p className='text-gray-400 max-w-md'>
							Sie haben die maximal zulässige Anzahl von Anfragen innerhalb des
							Zeitraums erreicht. Bitte warten Sie, bevor Sie es erneut
							versuchen.
						</p>
					</div>

					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button variant='purple' size='lg'>
							<Link href={routes.group()}>Zurück zum Dashboard</Link>
						</Button>
					</div>
				</div>
			</main>
		</div>
	)
}
