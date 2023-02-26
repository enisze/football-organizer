import { ThemeToggle } from "@/ui/theme-toggle";
import { Link } from "@mui/joy";
import type { FunctionComponent } from "react";
import { useRecoilState } from "recoil";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { useWindowSize } from "../../hooks/useWindowSize";
import { currentTabState } from "../Dashboard/tabState";
import { Heading } from "../Heading";
import { OrganizerMenu } from "./OrganizerMenu";

export const Navbar: FunctionComponent = () => {
  const isAdmin = useIsAdmin();

  const [tab, setTab] = useRecoilState(currentTabState);

  const { width } = useWindowSize();
  return (
    <nav className="from-dark-green to-dark-gray fixed z-10 flex w-full items-center justify-between bg-slate-800 bg-gradient-to-r px-4 py-3">
      <Heading size="sm" color="white" />

      <div className="flex gap-x-2 ">
        {false && width && (
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
          className={`flex cursor-pointer items-center decoration-[#73C8A9] hover:underline active:no-underline`}
        >
          <OrganizerMenu />
          <div className="pl-2">
            <ThemeToggle />
          </div>
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
