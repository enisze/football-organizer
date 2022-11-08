import { Avatar, Typography } from "@mui/joy";
import { signIn, signOut, useSession } from "next-auth/react";
import { useGetUserBalance } from "../hooks/useGetUserBalance";
import { Dashboard } from "./Dashboard";

export const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const balance = useGetUserBalance();

  return (
    <div className=" flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <>
          <Typography fontSize={"xl"}>Eingeloggt als: </Typography>

          <div className="flex items-center justify-center gap-x-2">
            <Avatar size="md" />
            <Typography>{sessionData?.user?.name}</Typography>
          </div>

          <Typography>Kontostand: {balance} €</Typography>
        </>
      )}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Ausloggen" : "Einloggen"}
      </button>
      {sessionData && <Dashboard />}
    </div>
  );
};
