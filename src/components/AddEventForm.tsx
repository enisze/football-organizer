import { Button, TextField } from "@mui/joy";
import { Formik } from "formik";
import { FunctionComponent } from "react";

export const AddEventForm: FunctionComponent = () => {
  return (
    <div>
      <Formik
        initialValues={{ address: "", startDate: "", endDate: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
              type="date"
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
              type="date"
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
