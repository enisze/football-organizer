import { Typography } from "@mui/joy";
import type { FunctionComponent } from "react";

export const Heading: FunctionComponent = () => {
  return (
    <Typography className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
      Football <span className="text-purple-300">Organizer</span> App
    </Typography>
  );
};
