import { Button, TextField } from "@mui/joy";
import { Formik } from "formik";
import { FunctionComponent } from "react";
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
        initialValues={{ address: "", startDate: "", endDate: "" }}
        onSubmit={(values, { setSubmitting }) => {
          const { address } = values;

          const startDate = new Date(values.startDate);
          const endDate = new Date(values.endDate);

          createEvent({ address, startDate, endDate, booked: false });

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
              label="Start Datum"
              placeholder="Type in here…"
              variant="outlined"
              type="datetime-local"
              name="startDate"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.startDate}
              helperText={errors.startDate && touched.startDate}
            />

            <TextField
              label="End Datum"
              placeholder="Type in here…"
              variant="outlined"
              type="datetime-local"
              name="endDate"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.endDate}
              helperText={errors.endDate && touched.endDate}
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
