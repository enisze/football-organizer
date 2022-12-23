import { Avatar, Typography } from "@mui/joy";
import { useSession } from "next-auth/react";
import type { FunctionComponent, MouseEventHandler } from "react";
import { useState } from "react";
import { Heading } from "../Heading";
import { OrganizerMenu } from "./OrganizerMenu";

export const Navbar: FunctionComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const { data } = useSession();

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    setAnchorEl(event.currentTarget);
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="from-dark-green to-dark-gray fixed z-10 flex w-full items-center justify-between bg-slate-800 bg-gradient-to-r px-4 py-3">
      <Heading size="sm" color="white" />

      <div>
        <div className="flex cursor-pointer items-center" onClick={handleClick}>
          <Avatar
            src="https://avatars2.githubusercontent.com/u/24394388?s=460&u=e7c1b6ab09c60a65a6a84ca6edcc46d5b35bcc60&v=4"
            size="sm"
            className="mr-2 "
          />
          <Typography color="primary">{data?.user?.name}</Typography>
          <OrganizerMenu
            anchorEl={anchorEl}
            setShowDropdown={setShowDropdown}
            showDropdown={showDropdown}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
