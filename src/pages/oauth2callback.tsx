import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { trpc } from "../utils/trpc";

const Oauth2Callback: FunctionComponent = () => {
  const router = useRouter();

  const { code } = router.query;

  console.log(code);

  const { data } = trpc.gmail.listLabels.useQuery(
    { code: code as string },
    { enabled: Boolean(code) }
  );

  console.log(data);

  return <div>{code}</div>;
};

export default Oauth2Callback;
