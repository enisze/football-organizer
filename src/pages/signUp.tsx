import type { FunctionComponent } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField, Typography } from "@mui/joy";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { z } from "zod";
import { trpc } from "../utils/trpc";

const signUpSchema = z.object({
  email: z.string().email({ message: "Bitte gib eine gültige Email ein." }),
  username: z
    .string()
    .regex(/^[^@]*$/, {
      message: "Paypal name fehlt oder du gibst deine Email an!",
    }),
  password: z.string().min(2, { message: "Passwort fehlt" }),
  key: z.string().min(1, {
    message: "Der angegebene Schlüssel ist falsch.",
  }),
});

const SignUp: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema), mode: "onBlur" });

  const router = useRouter();

  const { mutate: sendWelcomeMail } = trpc.gmail.sendWelcomeMail.useMutation();

  const onSubmit = async (values: FieldValues) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      username: values.username,
      key: values.key,
      callbackUrl: "/",
    });

    if (res?.error) {
      setError("authentication", {
        message:
          "Registrierung hat nicht funktioniert, bitte überprüfe deine Eingaben.",
      });
    } else {
      await sendWelcomeMail();
      if (res?.url) router.push(res.url);
    }
  };

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
        type="password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message as string}
      />
      <TextField
        label="Schlüssel"
        {...register("key")}
        error={Boolean(errors.key)}
        helperText={errors.key?.message as string}
      />

      {errors.authentication?.message && (
        <Typography color="danger">
          {errors.authentication?.message as string}
        </Typography>
      )}

      <Button type="submit">Registrieren</Button>
    </form>
  );
};

export default SignUp;
