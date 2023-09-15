import { api } from '@/src/server/trpc/api'
import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import { Formik } from 'formik'
import { useAtomValue } from 'jotai'
import type { FunctionComponent } from 'react'
import { selectedGroupAtom } from '../Groups/GroupSelector'

export const AddEventForm: FunctionComponent<{ onSubmit: () => void }> = ({
  onSubmit,
}) => {
  const groupId = useAtomValue(selectedGroupAtom)

  const trpcContext = api.useContext()

  const { mutate: createEvent } = api.event.create.useMutation({
    onSuccess: () => {
      trpcContext.invalidate()
    },
  })

  return (
    <div className="flex flex-col gap-y-3">
      <Formik
        initialValues={{
          address: 'Zülpicher Wall 1, 50674 Köln',
          date: '',
          startTime: '20:00',
          endTime: '21:30',
          cost: 45,
          maxParticipants: 10,
        }}
        onSubmit={(values, { setSubmitting }) => {
          const date = new Date(values.date)
          createEvent({
            groupId: groupId ?? '',
            ...values,
            date,
          })
          setSubmitting(false)
          onSubmit()
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-2"
          >
            <TextField
              label="Address"
              name="address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              text={errors.address ?? ''}
            />

            <TextField
              label="Datum"
              type="date"
              name="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
              text={errors.date ?? ''}
            />

            <TextField
              label="Startzeit"
              type="time"
              name="startTime"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.startTime}
              text={errors.startTime ?? ''}
            />
            <TextField
              label="Endzeit"
              type="time"
              name="endTime"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.endTime}
              text={errors.endTime ?? ''}
            />

            <TextField
              label="Kosten"
              name="cost"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cost}
              text={errors.cost ?? ''}
            />

            <TextField
              label="Teilnehmerzahl"
              name="maxParticipants"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.maxParticipants}
              text={errors.maxParticipants ?? ''}
            />
            <Button
              variant="outline"
              type="submit"
              disabled={isSubmitting}
              className="bg-[#73C8A9]"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}
