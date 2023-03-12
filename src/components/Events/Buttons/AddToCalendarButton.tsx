import { Button } from '@/ui/base/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/base/Dialog'
import type { CalendarOptions } from 'datebook'
import { GoogleCalendar, ICalendar, OutlookCalendar } from 'datebook'
import { CalendarPlus } from 'lucide-react'
import type { FunctionComponent } from 'react'

export type AddToCalendarButtonProps = {
  startTime: string
  endTime: string
  date: Date
  address: string
}

export const AddToCalendarButton: FunctionComponent<
  AddToCalendarButtonProps
> = ({ startTime, endTime, date, address }) => {
  const [startHours, startMinutes] = startTime.split(':')
  const [endHours, endMinutes] = endTime.split(':')

  const start = new Date(date)
  const end = new Date(date)

  start.setHours(Number(startHours), Number(startMinutes))
  end.setHours(Number(endHours), Number(endMinutes))

  const options: CalendarOptions = {
    title: 'Fußball',
    location: address,
    description:
      'Das (hoffentlich) wöchentliche Cl-Finale! Spiel und Spass vorprogrammiert. Lets go.',
    start: start,
    end: end,
  }
  const icalendar = new ICalendar(options)
  const googleCalendar = new GoogleCalendar(options)
  const outlookCalendar = new OutlookCalendar(options)

  const googleLink = googleCalendar.render()
  const outlookLink = outlookCalendar.render()

  return (
    <Dialog aria-labelledby="modal-title" aria-describedby="modal-desc">
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0 h-fit">
          <CalendarPlus />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-labelledby="size-modal-title"
        aria-describedby="size-modal-description"
      >
        <DialogHeader>
          <DialogTitle>Zum Kalender hinzufügen</DialogTitle>
          <DialogDescription>
            Füge das Event einem Kalender deiner Wahl hinyu
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-y-2">
          <Button
            variant="subtle"
            className="bg-[#73C8A9]"
            onClick={() => {
              icalendar.download()
            }}
          >
            ICal Kalendar
          </Button>
          <Button
            variant="subtle"
            className="bg-[#73C8A9]"
            onClick={() => {
              window.open(googleLink)
            }}
          >
            Google Kalendar
          </Button>

          <Button
            variant="subtle"
            className="bg-[#73C8A9]"
            onClick={() => {
              window.open(outlookLink)
            }}
          >
            Outlook Kalendar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
