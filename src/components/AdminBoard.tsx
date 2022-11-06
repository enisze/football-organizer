import { FunctionComponent } from "react";
import { trpc } from "../utils/trpc";
import { AddEventForm } from "./Events/AddEventForm";

export const AdminBoard: FunctionComponent = () => {
  const { data: events } = trpc.event.getAll.useQuery();
  return <AddEventForm />;
};
