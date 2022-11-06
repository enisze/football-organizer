import { CssVarsProvider, StyledEngineProvider } from "@mui/joy";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { Dashboard } from "./Dashboard";

export const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <div className="flex flex-col items-center justify-center gap-2">
          {sessionData && (
            <p className="text-2xl text-blue-500">
              Logged in as {sessionData?.user?.name}
            </p>
          )}
          {secretMessage && (
            <p className="text-2xl text-blue-500">{secretMessage}</p>
          )}
          <button
            className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
          {sessionData && <Dashboard />}
        </div>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};
