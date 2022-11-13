import { Typography } from "@mui/joy";
import type { FunctionComponent, PropsWithChildren } from "react";

export const LoadingWrapper: FunctionComponent<
  PropsWithChildren<{ isLoading: boolean }>
> = ({ children, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Typography className="text-center leading-normal text-gray-700">
          Loading...
        </Typography>
      ) : (
        children
      )}
    </>
  );
};
