import {
  Divider,
  Menu,
  MenuItem,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { signOut } from "next-auth/react";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { trpc } from "../../utils/trpc";
import { currentTabState } from "../Dashboard/tabState";
import { AddEventForm } from "../Events/AddEventForm";

export const OrganizerMenu: FunctionComponent<{
  showDropdown: boolean;
  setShowDropdown: (value: boolean) => void;
  anchorEl: HTMLDivElement | null;
}> = ({ showDropdown, setShowDropdown, anchorEl }) => {
  const isAdmin = useIsAdmin();
  const [open, setOpen] = useState(false);

  const { data: link } = trpc.gmail.generateAuthLink.useQuery(undefined, {
    enabled: isAdmin,
  });

  const { data: balance } = trpc.payment.getUserBalance.useQuery();

  const [tab, setTab] = useRecoilState(currentTabState);
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
        <MenuItem
          hidden={!isAdmin}
          className="text-white"
          onClick={() => setTab(2)}
        >
          Vergangene Events
        </MenuItem>
        <Divider hidden={!isAdmin} />
        <MenuItem className="text-white" onClick={() => setTab(1)}>
          Deine Events
        </MenuItem>
        <Divider />
        <MenuItem className="text-white" onClick={() => setTab(0)}>
          Kommende Events
        </MenuItem>
        <Divider />

        <MenuItem hidden={!isAdmin} className="text-white">
          {link && <Link href={link}>New gmail token</Link>}
        </MenuItem>
        <Divider hidden={!isAdmin} />
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
