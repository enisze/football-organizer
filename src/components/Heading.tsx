import { Typography } from "@mui/joy";
import Link from "next/link";
import type { FunctionComponent } from "react";

export const Heading: FunctionComponent<{
  size?: "sm" | "md" | "lg";
  color?: "grey" | "white";
}> = ({ size = "lg", color = "grey" }) => {
  const textColor = color === "grey" ? "text-gray-700" : "text-white";
  return (
    <Link href={process.env.NEXT_PUBLIC_BASE_URL ?? ""}>
      <Typography
        className={`cursor-pointer text-center font-extrabold leading-normal ${textColor}`}
        fontSize={size === "lg" ? 80 : size === "md" ? 48 : 20}
      >
        Football <span className="text-purple-300">Organizer</span>
      </Typography>
    </Link>
  );
};
