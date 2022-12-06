import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField, Typography } from "@mui/joy";
import { signIn, useSession } from "next-auth/react";
import type { FunctionComponent } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingWrapper } from "../LoadingWrapper";

const loginSchema = z.object({
  email: z.string().email({ message: "Bitte gib eine gültige Email ein." }),
  password: z.string().min(2, { message: "Passwort fehlt" }),
});

export const LoginForm: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: zodResolver(loginSchema), mode: "onBlur" });

  const { status } = useSession();

  const onSubmit = async (values: FieldValues) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res?.error) {
      setError("authentication", {
        message: "Die angegebenen Daten sind inkorrekt.",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
      >
        <TextField
          label="Email"
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email?.message as string}
        />

        <TextField
          label="Passwort"
          type="password"
          {...register("password")}
          error={Boolean(errors.password)}
          helperText={errors.password?.message as string}
        />

        {errors.authentication?.message && (
          <Typography color="danger">
            {errors.authentication?.message as string}
          </Typography>
        )}

        <LoadingWrapper isLoading={status === "loading"}>
          <Button type="submit">Login</Button>
        </LoadingWrapper>
      </form>
    </>
  );
};
