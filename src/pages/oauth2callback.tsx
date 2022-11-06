import { useRouter } from "next/router";
import type { FunctionComponent } from "react";

const Oauth2Callback: FunctionComponent = () => {
  const router = useRouter();

  const { code } = router.query;

  console.log(code);

  // const { data } = trpc.gmail.getToken.useQuery(
  //   { code: code as string },
  //   { enabled: Boolean(code) }
  // );

  return <div>{code}</div>;
};

export default Oauth2Callback;
