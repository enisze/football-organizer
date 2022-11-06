import { Link } from "@mui/joy";
import type { FunctionComponent } from "react";
import { trpc } from "../utils/trpc";
import { AddEventForm } from "./Events/AddEventForm";

export const AdminBoard: FunctionComponent = () => {
  const { data: link } = trpc.gmail.generateAuthLink.useQuery();
  return (
    <>
      <AddEventForm />
      <Link href={link}>Authorize gmail</Link>
    </>
  );
};
