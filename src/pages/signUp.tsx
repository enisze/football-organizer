import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/joy";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email({ message: "Bitte gib eine gültige Email ein." }),
  username: z.string().regex(/\s/, { message: "Paypal name fehlt" }),
  password: z.string().min(2, { message: "Passwort fehlt" }),
  key: z.string().refine(
    (value) => {
      //TODO: Fix
      // return value === process.env.AUTH_KEY;

      return true;
    },
    {
      message: "Der angegebene Schlüssel ist falsch.",
    }
  ),
});

const SignUp: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema), mode: "onBlur" });

  const onSubmit = (data: any) => console.log(data);

  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute flex h-full w-full flex-col items-center justify-center gap-y-2"
    >
      {/* register your input into the hook by invoking the "register" function */}
      <TextField
        label="Email"
        {...register("email")}
        error={Boolean(errors.email)}
        helperText={errors.email?.message as string}
      />

      <TextField
        label="Username"
        placeholder="Dein Paypal Name"
        error={Boolean(errors.username)}
        helperText={errors.username?.message as string}
        {...register("username")}
      />
      <TextField
        label="Passwort"
        {...register("password")}
        error={Boolean(errors.password)}
        helperText={errors.password?.message as string}
      />
      <TextField
        label="Schlüssel"
        {...register("key")}
        error={Boolean(errors.key)}
        helperText={errors.key?.message as string}
      />

      <Button type="submit">submit</Button>
    </form>
  );
};

export default SignUp;
