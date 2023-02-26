import type { FunctionComponent } from "react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/base/Accordion";
import { Button } from "@/ui/base/Button";
import { TextField } from "@/ui/base/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/joy";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { z } from "zod";
import { trpc } from "../utils/trpc";

const signUpSchema = z.object({
  email: z.string().email({ message: "Bitte gib eine gültige Email ein." }),
  username: z.string().regex(/^[^@]*$/, {
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

  const [showExample, setShowExample] = useState(false);

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
          "Bitte überprüfe deine Eingaben, inklusive Schlüssel. Achte auf Gross- und Kleinschreibung.",
      });
    } else {
      sendWelcomeMail();
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
        text={errors.email?.message as string}
      />

      <TextField
        label="Username"
        placeholder="Dein Paypal Name"
        text={errors.username?.message as string}
        {...register("username")}
      />

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Klicke hier für ein Beispiel wie der Paypal Name aussehen sollte.
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex max-w-[300px] flex-col gap-y-2">
              <Image
                src="/Paypal.jpg"
                alt="Paypal example"
                className="rounded"
                width="300"
                height="140"
              />
              <Typography>
                Der einzugebene Paypal Name wäre hier{" "}
                <span className="font-bold">Max Mustermann</span>
              </Typography>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <TextField
        label="Passwort"
        {...register("password")}
        type="password"
        text={errors.password?.message as string}
      />
      <TextField
        label="Schlüssel"
        {...register("key")}
        text={errors.key?.message as string}
      />

      {errors.authentication?.message && (
        <div className="max-w-[300px]">
          <Typography color="danger">
            {errors.authentication?.message as string}
          </Typography>
        </div>
      )}

      <Button type="submit" variant="outline">
        Registrieren
      </Button>
    </form>
  );
};

export default SignUp;
