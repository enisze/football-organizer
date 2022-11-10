import Queue from "queue-promise";
import type { FunctionComponent, PropsWithChildren } from "react";
import { createContext, useContext } from "react";

const useQueueState = () => {
  const queue = new Queue({
    concurrent: 1,
    interval: 100,
  });

  return {
    queue,
  };
};

type IPromiseQueue = ReturnType<typeof useQueueState>;

const PromiseQueue = createContext({} as IPromiseQueue);

export const PromiseQueueContextProvider: FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
  const value = useQueueState();

  return (
    <PromiseQueue.Provider value={value}>{children}</PromiseQueue.Provider>
  );
};

export const usePromiseQueue = () => {
  return useContext(PromiseQueue);
};
