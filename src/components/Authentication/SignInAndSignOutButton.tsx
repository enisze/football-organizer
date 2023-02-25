import { Button } from "@/ui/base/Button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { LoadingWrapper } from "../LoadingWrapper";

export const SignInAndSignOutButton: FunctionComponent = () => {
  const { data: sessionData, status } = useSession();

  return (
    <>
      <LoadingWrapper isLoading={status === "loading"}>
        {sessionData ? <LogoutButton /> : <SignInButton />}
      </LoadingWrapper>
    </>
  );
};

const SignInButton: FunctionComponent = () => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/signUp`}>
      <Button className="px-4 py-2" variant="outline">
        Registrieren
      </Button>
    </Link>
  );
};

const LogoutButton: FunctionComponent = () => {
  return (
    <Button className="px-4 py-2" onClick={async () => await signOut()}>
      Ausloggen
    </Button>
  );
};
