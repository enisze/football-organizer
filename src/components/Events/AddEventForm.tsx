import { Button, TextField } from "@mui/joy";
import { Formik } from "formik";
import type { FunctionComponent } from "react";
import { inngest } from "../../../.inngest/inngestClient";
import { trpc } from "../../utils/trpc";

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
        initialValues={{
          address: "",
          date: "",
          startTime: "",
          endTime: "",
          cost: 45,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const { address, startTime, endTime, cost } = values;
          const date = new Date(values.date);
          await createEvent({
            address,
            date,
            startTime,
            endTime,
            booked: false,
            cost,
          });
          await inngest.send("event/new", { data: { values } });
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
