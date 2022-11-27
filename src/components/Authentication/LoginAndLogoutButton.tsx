import { Button } from "@mui/joy";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import type { FunctionComponent } from "react";

export const LoginAndLogoutButton: FunctionComponent = () => {
  const { data: sessionData } = useSession();

  return <>{sessionData ? <LogoutButton /> : <SignInButton />}</>;
};

const SignInButton: FunctionComponent = () => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/signUp`}>
      <Button className="px-4 py-2 shadow-lg">Registrieren</Button>
    </Link>
  );
};

const LogoutButton: FunctionComponent = () => {
  return (
    <Button className="px-4 py-2 shadow-lg" onClick={() => signOut()}>
      Ausloggen
    </Button>
  );
};
