import { Avatar, Typography } from "@mui/joy";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { Dashboard } from "./Dashboard";
import { Heading } from "./Heading";
import { LoadingWrapper } from "./LoadingWrapper";
import { LoginAndLogoutButton } from "./LoginAndLogoutButton";

export const AuthShowcase: React.FC = () => {
  const { data: sessionData, status } = useSession();

  const { data: balance, isLoading } = trpc.payment.getUserBalance.useQuery();

  return (
    <div className=" flex flex-col items-center justify-center gap-2">
      <Heading />
      <div className="pb-3">
        <Typography fontSize={"xl"}>Eingeloggt als: </Typography>
        <div className="flex items-center justify-center gap-x-2">
          <LoadingWrapper isLoading={status === "loading"}>
            <Avatar size="md" />
            <Typography>{sessionData?.user?.name}</Typography>
          </LoadingWrapper>
        </div>
        <LoadingWrapper isLoading={isLoading}>
          <Typography>Kontostand: {balance} €</Typography>
        </LoadingWrapper>
        <LoginAndLogoutButton />
      </div>
      <Dashboard />
    </div>
  );
};
