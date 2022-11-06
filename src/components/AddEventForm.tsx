import { Button, TextField } from "@mui/joy";
import { Formik } from "formik";
import type { FunctionComponent } from "react";
import { trpc } from "../utils/trpc";

export const AddEventForm: FunctionComponent = () => {
  const trpcContext = trpc.useContext();
  const { mutateAsync: createEvent } = trpc.event.create.useMutation({
    onSuccess: () => {
      trpcContext.event.getAll.invalidate();
    },
  });
  return (
    <div>
      <Formik
        initialValues={{ address: "", date: "", startTime: "", endTime: "" }}
        onSubmit={(values, { setSubmitting }) => {
          const { address, startTime, endTime } = values;

          const date = new Date(values.date);

          createEvent({ address, date, startTime, endTime, booked: false });

          setSubmitting(false);
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
              placeholder="Type in here…"
              variant="outlined"
              name="address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              helperText={errors.address && touched.address}
            />

            <TextField
              label="Datum"
              placeholder="Type in here…"
              variant="outlined"
              type="date"
              name="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
            />

            <TextField
              label="Startzeit"
              placeholder="Type in here…"
              variant="outlined"
              type="time"
              name="startTime"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.startTime}
            />
            <TextField
              label="Endzeit"
              placeholder="Type in here…"
              variant="outlined"
              type="time"
              name="endTime"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.endTime}
            />
            <Button
              color="primary"
              variant="outlined"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
