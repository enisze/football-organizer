import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion'
import { MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { FunctionComponent } from 'react'
import { LoadingWrapper } from '../LoadingWrapper'
import type { OrganizerMapProps } from '../Map/OrganizerMap'

const DynamicOrganizerMap = dynamic<OrganizerMapProps>(
  () => import('../Map/OrganizerMap').then((module) => module.OrganizerMap),
  {
    ssr: false,
  },
)

export const MapAccordion: FunctionComponent<{
  address: string
  isLoading: boolean
  coordinates: number[]
}> = ({ address, isLoading, coordinates }) => {
  return (
    <Accordion type="single" collapsible className="p-0">
      <AccordionItem
        value="item-1"
        className="border-b-0"
        style={{ padding: 0 }}
      >
        <AccordionTrigger className="p-0 hover:no-underline">
          <div className="flex w-full items-center gap-x-1">
            <MapPin className="h-4 w-4 opacity-70 flex-none" />
            {address}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="relative h-[200px] w-[250px] md:h-[250px] md:w-[350px]">
            <LoadingWrapper isLoading={isLoading}>
              <div className="flex">
                <DynamicOrganizerMap coordinates={coordinates} />
              </div>
            </LoadingWrapper>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
