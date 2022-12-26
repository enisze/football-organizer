import {
  Divider,
  Menu,
  MenuItem,
  Modal,
  ModalClose,
  ModalDialog,
  Switch,
} from "@mui/joy";
import { signOut } from "next-auth/react";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { trpc } from "../../utils/trpc";
import { AddEventForm } from "../Events/AddEventForm";
import { LoadingWrapper } from "../LoadingWrapper";

export const OrganizerMenu: FunctionComponent<{
  showDropdown: boolean;
  setShowDropdown: (value: boolean) => void;
  anchorEl: HTMLDivElement | null;
}> = ({ showDropdown, setShowDropdown, anchorEl }) => {
  const isAdmin = useIsAdmin();
  const [open, setOpen] = useState(false);
  const trpcContext = trpc.useContext();

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
    <>
      <Menu
        className="m-2 mt-2 w-40 bg-slate-800 "
        open={showDropdown}
        anchorEl={anchorEl}
        sx={{ marginTop: "8px", margin: "8px" }}
        onClose={() => setShowDropdown(false)}
      >
        <MenuItem className="cursor-text text-white">
          Kontostand: {balance}€
        </MenuItem>
        <Divider />
        <MenuItem
          hidden={!isAdmin}
          className="text-white"
          onClick={() => setOpen(true)}
        >
          Add Event
        </MenuItem>
        <Divider hidden={!isAdmin} />
        <MenuItem hidden={!isAdmin} className="text-white">
          {link && <Link href={link}>New gmail token</Link>}
        </MenuItem>
        <Divider hidden={!isAdmin} />
        <MenuItem
          className="text-white"
          onClick={() =>
            updateNotificationsEnabled({
              notificationsEnabled: !data?.notificationsEnabled,
            })
          }
        >
          <div className="flex gap-x-2">
            Notifications
            <LoadingWrapper isLoading={isLoading}>
              <Switch
                checked={data?.notificationsEnabled}
                color={data?.notificationsEnabled ? "success" : "primary"}
                variant={data?.notificationsEnabled ? "outlined" : "solid"}
                endDecorator={data?.notificationsEnabled ? "On" : "Off"}
              />
            </LoadingWrapper>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem className="text-white" onClick={() => signOut()}>
          Ausloggen
        </MenuItem>
      </Menu>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ModalDialog
          aria-labelledby="size-modal-title"
          aria-describedby="size-modal-description"
        >
          <ModalClose variant="outlined" className="rounded shadow-md" />
          <AddEventForm onSubmit={() => setOpen(false)} />
        </ModalDialog>
      </Modal>
    </>
  );
};
