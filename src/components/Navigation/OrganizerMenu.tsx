import { Button } from "@/ui/base/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/base/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/base/DropDownMenu";
import { Label } from "@/ui/base/Label";
import { Switch } from "@/ui/base/Switch";
import { Avatar, Divider, Typography } from "@mui/joy";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { trpc } from "../../utils/trpc";
import { AddEventForm } from "../Events/AddEventForm";
import { LoadingWrapper } from "../LoadingWrapper";

export const OrganizerMenu: FunctionComponent = () => {
  const isAdmin = useIsAdmin();
  const trpcContext = trpc.useContext();
  const { data: userData } = useSession();

  const { data: link } = trpc.gmail.generateAuthLink.useQuery(undefined, {
    enabled: isAdmin,
  });

  const { data, isLoading } = trpc.user.getNotificationStatus.useQuery();

  const { mutate: updateNotificationsEnabled } =
    trpc.user.updateNotifications.useMutation({
      onSuccess: () => {
        trpcContext.invalidate();
      },
    });

  // const [notificationsLocal, setNotificationsLocal] = useState(
  //   data?.notificationsEnabled
  // );

  const { data: balance } = trpc.payment.getUserBalance.useQuery();
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Avatar
              src="https://avatars2.githubusercontent.com/u/24394388?s=460&u=e7c1b6ab09c60a65a6a84ca6edcc46d5b35bcc60&v=4"
              size="sm"
              className="mr-2 "
            />
            <Typography variant="plain" color="primary">
              {userData?.user?.name}
            </Typography>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount>
          <DropdownMenuItem>Kontostand: {balance}€</DropdownMenuItem>
          <Divider />
          <DialogTrigger asChild>
            <DropdownMenuItem hidden={!isAdmin}>Add Event</DropdownMenuItem>
          </DialogTrigger>
          <Divider hidden={!isAdmin} />
          <DropdownMenuItem hidden={!isAdmin}>
            {link && <Link href={link}>New gmail token</Link>}
          </DropdownMenuItem>
          <Divider hidden={!isAdmin} />
          <DropdownMenuItem
            onClick={() =>
              updateNotificationsEnabled({
                notificationsEnabled: !data?.notificationsEnabled,
              })
            }
          >
            <div className="flex items-center space-x-2">
              <Label htmlFor="airplane-mode">Notifications</Label>
              <LoadingWrapper isLoading={isLoading}>
                <Switch
                  id="notifications-enabled"
                  checked={data?.notificationsEnabled}
                />
              </LoadingWrapper>
            </div>
          </DropdownMenuItem>
          <Divider />
          <DropdownMenuItem onClick={() => signOut()}>
            Ausloggen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>Add a new event</DialogDescription>
        </DialogHeader>
        <AddEventForm
          onSubmit={() => {
            return;
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
