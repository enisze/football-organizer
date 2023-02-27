import { ThemeToggle } from "@/ui/theme-toggle";
import type { FunctionComponent } from "react";
import { Heading } from "../Heading";
import { OrganizerMenu } from "./OrganizerMenu";

export const Navbar: FunctionComponent = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <nav className="flex items-center justify-between px-4 py-3">
        <Heading size="sm" color="white" />

        <div className="flex gap-x-2 ">
          <div className={`flex cursor-pointer items-center`}>
            <OrganizerMenu />
            <div className="pl-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
