import { Avatar, AvatarFallback } from "@/ui/base/Avatar";
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
import { Separator } from "@/ui/base/Separator";
import { Switch } from "@/ui/base/Switch";
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

  const { data: balance } = trpc.payment.getUserBalance.useQuery();

  const res = userData?.user?.name?.split(" ");

  const first = res[0]?.charAt(0) ?? "X";
  const second = res[1]?.charAt(0) ?? "X";

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-between gap-x-2">
          <Avatar className="flex items-center justify-center border-[1px] ">
            <AvatarFallback className="bg-white dark:bg-slate-900">
              {first + second}
            </AvatarFallback>
          </Avatar>
          <span>{userData?.user?.name}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Kontostand: {balance}€</DropdownMenuItem>
          <Separator />
          {isAdmin && (
            <DialogTrigger asChild>
              <DropdownMenuItem>Add Event</DropdownMenuItem>
            </DialogTrigger>
          )}
          {isAdmin && (
            <DropdownMenuItem hidden={!isAdmin}>
              {link ? (
                <Link href={link}>New gmail token</Link>
              ) : (
                <div>No link</div>
              )}
            </DropdownMenuItem>
          )}
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
          <Separator />
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
        <AddEventForm />
      </DialogContent>
    </Dialog>
  );
};
