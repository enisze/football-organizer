import { CircularProgress } from "@mui/joy";
import type { FunctionComponent, PropsWithChildren } from "react";

export const LoadingWrapper: FunctionComponent<
  PropsWithChildren<{ isLoading: boolean; center?: boolean }>
> = ({ children, isLoading, center = false }) => {
  const className = center ? "absolute top-1/2 left-1/2 " : "";

  return (
    <>
      {isLoading ? (
        <div className={className}>
          <CircularProgress className="p-3" />
        </div>
      ) : (
        children
      )}
    </>
  );
};
