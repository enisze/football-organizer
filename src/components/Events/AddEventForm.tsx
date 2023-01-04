import { TextField } from "@mui/joy";
import {
  createTsForm,
  createUniqueFieldSchema,
  useDescription,
  useTsController,
} from "@ts-react/form";
import type { FunctionComponent, HTMLInputTypeAttribute } from "react";
import { z } from "zod";
import { trpc } from "../../utils/trpc";

const BaseTextField = ({
  type = "text",
}: {
  type?: HTMLInputTypeAttribute;
}) => {
  const { label } = useDescription();
  const {
    field: { onChange, value },
    error,
  } = useTsController<string>();

  return (
    <TextField
      type={type}
      label={label}
      onChange={(event) => onChange(event.target.value)}
      value={value}
      error={Boolean(error)}
      helperText={error?.errorMessage}
    />
  );
};

const PlainTextField = () => {
  return <BaseTextField />;
};

const DateField = () => {
  return <BaseTextField type="date" />;
};

const TimeField = () => {
  return <BaseTextField type="time" />;
};

const NumberField = () => {
  return <BaseTextField type="number" />;
};

const TimeSchema = createUniqueFieldSchema(z.string().datetime(), "x");

const mapping = [
  [z.string(), PlainTextField],
  [z.date(), DateField],
  [z.number(), NumberField],
  [TimeSchema, TimeField],
] as const;

const MyForm = createTsForm(mapping);

const EventSchema = z.object({
  address: z.string(),
  date: z.date().nullable(),
  startTime: TimeSchema,
  endTime: TimeSchema,
  cost: z.number(),
  maxParticipants: z.number(),
});

export const AddEventForm: FunctionComponent<{ onSubmit: () => void }> = ({
  onSubmit,
}) => {
  const trpcContext = trpc.useContext();
  const { mutate: createEvent } = trpc.event.create.useMutation({
    onSuccess: () => {
      trpcContext.invalidate();
    },
  });

  return (
    <MyForm
      schema={EventSchema}
      onSubmit={(data) => {
        console.log(data);
        // createEvent(data);
        // onSubmit();
      }}
      defaultValues={{
        address: "Zülpicher Wall 1, 50674 Köln",
        date: null,
        startTime: "20:00",
        endTime: "21:30",
        cost: 45,
        maxParticipants: 10,
      }}
      renderAfter={() => <button type="submit">Submit</button>}
    />
  );
};
