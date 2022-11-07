import { CssVarsProvider, StyledEngineProvider } from "@mui/joy";
import { signIn, signOut, useSession } from "next-auth/react";
import { useGetUserBalance } from "../hooks/useGetUserBalance";
import { Dashboard } from "./Dashboard";

export const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const balance = useGetUserBalance();

  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <div className="flex flex-col items-center justify-center gap-2">
          {sessionData && (
            <>
              <p className="text-2xl text-gray-500">
                Eingeloggt als: {sessionData?.user?.name}
              </p>

              <p className="text-2xl text-gray-500">Kontostand: {balance} €</p>
            </>
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
