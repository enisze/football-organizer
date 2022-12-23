import { Button, TextField } from "@mui/joy";
import { Formik } from "formik";
import type { FunctionComponent } from "react";
import { trpc } from "../../utils/trpc";

export const AddEventForm: FunctionComponent<{ onSubmit: () => void }> = ({
  onSubmit,
}) => {
  const trpcContext = trpc.useContext();
  const { mutateAsync: createEvent } = trpc.event.create.useMutation({
    onSuccess: () => {
      trpcContext.invalidate();
    },
  });

  return (
    <div>
      <Formik
        initialValues={{
          address: "Zülpicher Wall 1, 50674 Köln",
          date: "",
          startTime: "20:00",
          endTime: "21:30",
          cost: 45,
          maxParticipants: 10,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const date = new Date(values.date);
          await createEvent({
            ...values,
            date,
          });
          setSubmitting(false);
          onSubmit();
        }}
      >
        {({
          values,
          errors,
          touched,
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
              variant="outlined"
              name="address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              helperText={errors.address && touched.address}
            />

            <TextField
              label="Datum"
              variant="outlined"
              type="date"
              name="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
            />

            <TextField
              label="Startzeit"
              variant="outlined"
              type="time"
              name="startTime"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.startTime}
            />
            <TextField
              label="Endzeit"
              variant="outlined"
              type="time"
              name="endTime"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.endTime}
            />

            <TextField
              label="Kosten"
              variant="outlined"
              name="cost"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cost}
              helperText={errors.cost && touched.cost}
            />

            <TextField
              label="Teilnehmerzahl"
              variant="outlined"
              name="maxParticipants"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.maxParticipants}
              helperText={errors.maxParticipants && touched.maxParticipants}
            />
            <Button variant="outlined" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
