import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { trpc } from "../utils/trpc";

const Oauth2Callback: FunctionComponent = () => {
  const router = useRouter();

  const { code } = router.query;

  const { data } = trpc.gmail.getToken.useQuery(
    { code: code as string },
    { enabled: Boolean(code) }
  );

  return <div>{data?.refresh_token}</div>;
};

export default Oauth2Callback;
