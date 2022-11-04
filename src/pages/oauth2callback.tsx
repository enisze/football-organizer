import { useRouter } from "next/router";
import { FunctionComponent } from "react";

const Oauth2Callback: FunctionComponent = () => {
  const router = useRouter();

  const { code } = router.query;

  console.log(code);

  return <div>{code}</div>;
};

export default Oauth2Callback;
