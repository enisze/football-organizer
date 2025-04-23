'use client'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/ui/accordion'
import { MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { FunctionComponent } from 'react'
import type { OrganizerMapProps } from '../Map/OrganizerMap'

const DynamicOrganizerMap = dynamic<OrganizerMapProps>(
	() => import('../Map/OrganizerMap').then((module) => module.OrganizerMap),
	{
		ssr: false,
	},
)

export const MapAccordion: FunctionComponent<{
	address: string
	coordinates: number[]
}> = ({ address, coordinates }) => {
	return (
		<Accordion type='single' collapsible className='p-0'>
			<AccordionItem
				value='item-1'
				className='border-b-0'
				style={{ padding: 0 }}
			>
				<AccordionTrigger className='p-0 hover:no-underline'>
					<div className='flex w-full items-center gap-x-3'>
						<MapPin className='w-5 h-5 text-red-400' />
						<div className='flex-1'>
							<div className='text-white font-medium'>{address}</div>
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div className='relative h-[200px] w-[250px] md:h-[250px] md:w-[350px]'>
						<div className='flex'>
							<DynamicOrganizerMap coordinates={coordinates} />
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
