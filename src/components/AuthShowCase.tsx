import { Avatar, Typography } from "@mui/joy";
import { useSession } from "next-auth/react";
import { useGetUserBalance } from "../hooks/useGetUserBalance";
import { Dashboard } from "./Dashboard";
import { Heading } from "./Heading";
import { LoginAndLogoutButton } from "./LoginAndLogoutButton";

export const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const balance = useGetUserBalance();

  return (
    <div className=" flex flex-col items-center justify-center gap-2">
      <Heading />
      <>
        <Typography fontSize={"xl"}>Eingeloggt als: </Typography>
        <div className="flex items-center justify-center gap-x-2">
          <Avatar size="md" />
          <Typography>{sessionData?.user?.name}</Typography>
        </div>
        <Typography>Kontostand: {balance} €</Typography>
        <LoginAndLogoutButton />
      </>
      <Dashboard />
    </div>
  );
};
