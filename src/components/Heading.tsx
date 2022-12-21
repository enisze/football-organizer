import { Typography } from "@mui/joy";
import type { FunctionComponent } from "react";

export const Heading: FunctionComponent<{
  size?: "sm" | "md" | "lg";
  color?: "grey" | "white";
}> = ({ size = "lg", color = "grey" }) => {
  const textColor = color === "grey" ? "text-gray-700" : "text-white";
  return (
    <Typography
      className={`text-center font-extrabold leading-normal ${textColor}`}
      fontSize={size === "lg" ? 80 : size === "md" ? 48 : 20}
    >
      Football <span className="text-purple-300">Organizer</span> App
    </Typography>
  );
};
