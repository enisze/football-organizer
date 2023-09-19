'use client'
import { bookEvent } from '@/src/app/group/[groupId]/actions'
import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'

export const BookEventButton = async ({ id }: { id: string }) => {
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
            text={''}
            className="w-36"
          />
          <Button
            variant="outline"
            color="info"
            formAction={async (formData: FormData) => {
              await bookEvent({
                eventId: id,
                formData,
              })
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
