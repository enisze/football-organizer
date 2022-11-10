import { signIn, signOut, useSession } from "next-auth/react";
import type { FunctionComponent } from "react";

export const LoginAndLogoutButton: FunctionComponent = () => {
  const { data: sessionData } = useSession();

  return (
    <button
      className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
      onClick={sessionData ? () => signOut() : () => signIn()}
    >
      {sessionData ? "Ausloggen" : "Einloggen"}
    </button>
  );
};
