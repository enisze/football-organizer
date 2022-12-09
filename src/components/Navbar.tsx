import { Avatar, Divider, Menu, MenuItem, Typography } from "@mui/joy";
import { signOut, useSession } from "next-auth/react";
import type { FunctionComponent, MouseEventHandler } from "react";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { Heading } from "./Heading";

export const Navbar: FunctionComponent = () => {
  const [showDropDown, setShowDropdown] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const { data: balance } = trpc.payment.getUserBalance.useQuery();

  const { data } = useSession();

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    setAnchorEl(event.currentTarget);
    setShowDropdown(!showDropDown);
  };

  return (
    <nav className="from-dark-green to-dark-gray flex items-center justify-between bg-slate-800 bg-gradient-to-r px-4 py-3">
      <Heading size="sm" />

      <div>
        <div className="flex cursor-pointer items-center" onClick={handleClick}>
          <Avatar
            src="https://avatars2.githubusercontent.com/u/24394388?s=460&u=e7c1b6ab09c60a65a6a84ca6edcc46d5b35bcc60&v=4"
            size="sm"
            className="mr-2 "
          />
          <Typography color="primary">{data?.user?.name}</Typography>
        </div>
        <Menu
          className="m-2 mt-2 w-40 bg-slate-800 "
          open={showDropDown}
          anchorEl={anchorEl}
          sx={{ marginTop: "8px", margin: "8px" }}
        >
          <MenuItem className="text-white">Kontostand: {balance}€</MenuItem>
          <Divider />
          <MenuItem className="text-white" onClick={() => signOut()}>
            Ausloggen
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
