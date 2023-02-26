import { Progress } from "@/ui/base/Progress";
import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

export const LoadingWrapper: FunctionComponent<
  PropsWithChildren<{
    isLoading: boolean;
    center?: boolean;
    className?: string;
  }>
> = ({ children, isLoading, center = false, className }) => {
  const classNameStyling = className
    ? className
    : center
    ? "absolute top-1/2 left-1/2 "
    : "";
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={classNameStyling}>
          <Progress className="w-[60%] p-3" value={progress} />
        </div>
      ) : (
        children
      )}
    </>
  );
};
