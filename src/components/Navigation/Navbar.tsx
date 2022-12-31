import { Avatar, Link, Typography } from "@mui/joy";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import type { FunctionComponent, MouseEventHandler } from "react";
import { useState } from "react";
import type { SnowfallProps } from "react-snowfall";
import { useRecoilState } from "recoil";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { useWindowSize } from "../../hooks/useWindowSize";
import { currentTabState } from "../Dashboard/tabState";
import { Heading } from "../Heading";
import { OrganizerMenu } from "./OrganizerMenu";

const Snowfall = dynamic<SnowfallProps>(() => import("react-snowfall"), {
  ssr: false,
});

export const Navbar: FunctionComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const isAdmin = useIsAdmin();

  const { data } = useSession();

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    setAnchorEl(event.currentTarget);
    setShowDropdown(!showDropdown);
  };

  const [tab, setTab] = useRecoilState(currentTabState);

  const noUnderline = showDropdown ? "hover:no-underline" : "";

  const { width } = useWindowSize();
  return (
    <nav className="from-dark-green to-dark-gray fixed z-10 flex w-full items-center justify-between bg-slate-800 bg-gradient-to-r px-4 py-3">
      <Heading size="sm" color="white" />
      <Snowfall
        snowflakeCount={80}
        speed={[0.2, 0.5]}
        rotationSpeed={[-0.5, 0.5]}
      />

      <div className="flex gap-x-2 ">
        {width && width > 768 && (
          <>
            <Link
              component="button"
              variant="plain"
              color={getColor(tab === 2)}
              onClick={() => setTab(2)}
              underline={getUnderline(tab === 2)}
              level="body1"
              className="decoration-[#73C8A9]"
              hidden={!isAdmin}
            >
              Vergangene Events
            </Link>

            <Link
              component="button"
              variant="plain"
              color={getColor(tab === 0)}
              underline={getUnderline(tab === 0)}
              onClick={() => setTab(0)}
              level="body1"
              className="decoration-[#73C8A9]"
            >
              Kommende Events
            </Link>
            <Link
              component="button"
              variant="plain"
              underline={getUnderline(tab === 1)}
              color={getColor(tab === 1)}
              onClick={() => setTab(1)}
              level="body1"
              className="decoration-[#73C8A9]"
            >
              Deine Events
            </Link>
          </>
        )}
        <div
          className={`flex cursor-pointer items-center decoration-[#73C8A9] hover:underline ${noUnderline} active:no-underline`}
          onClick={handleClick}
        >
          <Avatar
            src="https://avatars2.githubusercontent.com/u/24394388?s=460&u=e7c1b6ab09c60a65a6a84ca6edcc46d5b35bcc60&v=4"
            size="sm"
            className="mr-2 "
          />
          <Typography variant="plain" color="primary">
            {data?.user?.name}
          </Typography>
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

const getColor = (condition: boolean) => {
  return condition ? "success" : "primary";
};
const getUnderline = (condition: boolean) => {
  return condition ? "none" : "hover";
};

export default Navbar;
