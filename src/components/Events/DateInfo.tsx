import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import type { FunctionComponent } from 'react'
import type { AddToCalendarButtonProps } from './Buttons/AddToCalendarButton'
import { AddToCalendarButton } from './Buttons/AddToCalendarButton'

type DateInfoProps = AddToCalendarButtonProps

export const DateInfo: FunctionComponent<DateInfoProps> = ({
  address,
  date,
  endTime,
  startTime,
}) => {
  const day = format(date, 'EEEE', { locale: de }).toUpperCase().slice(0, 2)
  const dateDay = format(date, 'dd', { locale: de })

  return (
    <div className="h-full flex w-full gap-x-1">
      <div className="flex flex-col items-center">
        <div className="font-bold">{day}</div>
        <div className="font-bold border rounded-full p-1 text-xs">
          {dateDay}
        </div>
        <AddToCalendarButton
          address={address}
          date={date}
          startTime={startTime}
          endTime={endTime}
        />
      </div>
    </div>
  )
}
