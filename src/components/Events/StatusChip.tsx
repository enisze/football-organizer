import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Check, X } from 'lucide-react'
import type { FunctionComponent } from 'react'
import type { EventStatus } from '../../../prisma/generated/client'
import { QuestionMark } from '../QuestionMark'

export const StatusChip: FunctionComponent<{
  status: EventStatus
}> = ({ status }) => {
  return (
    <Popover>
      <PopoverTrigger aria-label="event-status-button">
        <div className="flex items-center ">
          {status === 'BOOKED' ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
            </>
          ) : status === 'CANCELED' ? (
            <X className="h-4 w-4 text-red-500" />
          ) : (
            <>
              <QuestionMark className="h-4 w-4" />
            </>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="flex items-center">
          <Check className="mr-2 h-4 w-4 text-green-500 opacity-70" />
          <span>Gebucht, und findet statt. </span>
        </div>
        <div className="flex items-center">
          <X className="mr-2 h-4 w-4 text-red-500 opacity-70" />

          <span>Abgesagt, findet sicher nicht statt.</span>
        </div>
        <div className="flex items-center">
          <QuestionMark className="mr-2 h-4 w-4 opacity-70" />
          <span>Nicht gebucht, brauchen noch Teilnehmer.</span>
        </div>
      </PopoverContent>
    </Popover>
  )
}
