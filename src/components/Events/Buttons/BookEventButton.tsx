import { api } from '@/src/server/trpc/api'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import { TextField } from '@/ui/TextField'
import { format } from 'date-fns'
import type { FunctionComponent } from 'react'
import { useState } from 'react'

export const BookEventButton: FunctionComponent<{ id: string }> = ({ id }) => {
  const trpcContext = api.useContext()

  const { mutate: bookEvent } = api.event.book.useMutation({
    onSuccess: () => trpcContext.invalidate(),
  })

  const [bookingDate, setBookingDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  )

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="w-full">
          Book
        </Button>
      </DialogTrigger>

      <DialogContent className="w-50">
        <DialogHeader>
          <DialogTitle>
            <h2 id="modal-title">Event buchen</h2>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col justify-center">
          <TextField
            label="Datum"
            type="date"
            name="date"
            onChange={(event) => {
              const date = new Date(event.target.value)
              setBookingDate(format(date, 'yyyy-MM-dd'))
            }}
            value={bookingDate}
            text={''}
            className="w-36"
          />
          <Button
            variant="outline"
            color="info"
            onClick={() => {
              bookEvent({ id, date: new Date(bookingDate) })
            }}
            className="w-36"
          >
            Buchen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
